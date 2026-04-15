import { supabase } from "./supabase";

export interface Category {
  id: string;
  name: string;
  created_at?: string;
}

export interface BlogInput {
  title: string;
  summary: string;
  content: string;
  coverImage?: string; // We'll pass the generated URL
  tags: string[];
  category_id: string;
  published: boolean;
}

export const convertToSlug = (text: string) => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

const generateUniqueSlug = async (title: string): Promise<string> => {
  const baseSlug = convertToSlug(title);
  let slug = baseSlug;
  let counter = 1;
  let unique = false;

  while (!unique) {
    const { data, error } = await supabase
      .from("blogs")
      .select("id")
      .eq("slug", slug)
      .maybeSingle();

    if (error) {
      console.error("Error checking slug uniqueness:", error);
      throw new Error("Error al verificar la unicidad del slug");
    }

    if (!data) {
      unique = true;
    } else {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }
  }

  return slug;
};

export const createBlog = async (blogInput: BlogInput) => {
  const { data: userData, error: userError } = await supabase.auth.getUser();

  if (userError || !userData.user) {
    throw new Error("Usuario no autenticado");
  }

  // Generar un slug limpio y único
  const slug = await generateUniqueSlug(blogInput.title);

  const { data, error } = await supabase
    .from("blogs")
    .insert([
      {
        title: blogInput.title,
        slug,
        summary: blogInput.summary,
        content: blogInput.content,
        cover_image: blogInput.coverImage,
        tags: blogInput.tags,
        category_id: blogInput.category_id,
        published: blogInput.published,
        user_id: userData.user.id,
      },
    ])
    .select();

  if (error) {
    console.error("Supabase insert error:", error);
    throw new Error(error.message);
  }

  return data;
};

export const getAdminBlogs = async () => {
  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError || !userData.user) return [];

  const { data, error } = await supabase
    .from("blogs")
    .select("*, categories(name)")
    .eq("user_id", userData.user.id)
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data || [];
};

export const getPublicBlogs = async (limit?: number) => {
  let query = supabase
    .from("blogs")
    .select("*, categories(name)")
    .eq("published", true)
    .order("created_at", { ascending: false });
    
  if (limit) {
    query = query.limit(limit);
  }

  const { data, error } = await query;
  if (error) throw new Error(error.message);
  return data || [];
};

export const getBlogBySlug = async (slug: string) => {
  const { data, error } = await supabase
    .from("blogs")
    .select("*, categories(name)")
    .eq("slug", slug)
    .single();

  if (error) throw new Error(error.message);
  return data;
};

export const getBlogById = async (id: string) => {
  const { data, error } = await supabase
    .from("blogs")
    .select("*, categories(name)")
    .eq("id", id)
    .single();

  if (error) throw new Error(error.message);
  return data;
};

export const updateBlog = async (id: string, blogInput: Partial<BlogInput>) => {
  const updateData: any = {
    title: blogInput.title,
    summary: blogInput.summary,
    content: blogInput.content,
    tags: blogInput.tags,
    category_id: blogInput.category_id,
    published: blogInput.published,
  };

  if (blogInput.coverImage) {
    updateData.cover_image = blogInput.coverImage;
  }

  const { data, error } = await supabase
    .from("blogs")
    .update(updateData)
    .eq("id", id)
    .select();

  if (error) throw new Error(error.message);
  return data;
};

export const deleteBlog = async (id: string) => {
  const { error } = await supabase.from("blogs").delete().eq("id", id);
  if (error) throw new Error(error.message);
};

export const getCategories = async (): Promise<Category[]> => {
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("name", { ascending: true });

  if (error) throw new Error(error.message);
  return data || [];
};

export const uploadBlogImage = async (file: File): Promise<string> => {
  const fileName = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;

  const { data, error } = await supabase.storage
    .from("blog-images")
    .upload(fileName, file);

  if (error) {
    console.error("Storage upload error:", error);
    throw new Error(error.message);
  }

  const { data: publicUrlData } = supabase.storage
    .from("blog-images")
    .getPublicUrl(data.path);

  return publicUrlData.publicUrl;
};

export const incrementViews = async (slug: string) => {
  const { error } = await supabase.rpc("increment_blog_views", { blog_slug: slug });
  if (error) console.error("Error incrementing views:", error);
};

export const incrementLikes = async (id: string) => {
  const { error } = await supabase.rpc("increment_blog_likes", { blog_id: id });
  if (error) throw new Error(error.message);
};
