import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { Button } from "../../components/ui/button";
import { toast } from "sonner";
import { createBlog, updateBlog, getBlogById, uploadBlogImage, getCategories, type Category } from "../../lib/blogs";
import { ArrowLeft, Loader2, ImagePlus } from "lucide-react";

export default function CreateBlog() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const isEditing = !!id;

  // Form states
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState(""); // This will now store category_id
  const [categories, setCategories] = useState<Category[]>([]);
  const [tagsInput, setTagsInput] = useState("");
  const [published, setPublished] = useState(false);
  
  // Image handling
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    loadInitialData();
  }, [id]);

  const loadInitialData = async () => {
    await fetchCategories();
    if (isEditing) {
      await loadBlogData();
    }
  };

  const fetchCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data);
      if (!isEditing && data.length > 0) {
        setCategory(data[0].id); // Set first category as default for new blogs
      }
    } catch (error: any) {
      toast.error("Error al cargar categorías: " + error.message);
    }
  };

  const loadBlogData = async () => {
    setFetching(true);
    try {
      const blog = await getBlogById(id!);
      setTitle(blog.title);
      setSummary(blog.summary);
      setContent(blog.content);
      setCategory(blog.category_id || "");
      setTagsInput(blog.tags?.join(", ") || "");
      setPublished(blog.published);
      if (blog.cover_image) {
        setImagePreview(blog.cover_image);
      }
    } catch (error: any) {
      toast.error("Error al cargar el blog: " + error.message);
      navigate("/admin");
    } finally {
      setFetching(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content || !category) {
      toast.error("El título, el contenido y la categoría son obligatorios");
      return;
    }

    setLoading(true);
    try {
      let coverImageUrl = undefined;
      
      // Si el usuario seleccionó una imagen, la subimos primero a Supabase Storage
      if (imageFile) {
        toast.info("Subiendo imagen de portada...");
        coverImageUrl = await uploadBlogImage(imageFile);
      }

      // Procesamos las etiquetas por comas
      const tags = tagsInput
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0);

      toast.info("Guardando cambios...");
      
      if (isEditing) {
        await updateBlog(id!, {
          title,
          summary,
          content,
          category_id: category,
          tags,
          published,
          coverImage: coverImageUrl
        });
        toast.success("¡Blog actualizado con éxito!");
      } else {
        await createBlog({
          title,
          summary,
          content,
          category_id: category,
          tags,
          published,
          coverImage: coverImageUrl
        });
        toast.success("¡Blog creado con éxito!");
      }
      
      navigate("/admin");

    } catch (error: any) {
      toast.error(`Ocurrió un error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Módulos para ReactQuill
  const quillModules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image', 'video'],
      ['clean']
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50/50 pb-12">
      {/* Navbar Minimalista */}
      <nav className="bg-white border-b border-gray-200 px-4 py-3 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate("/admin")}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold">
            {isEditing ? "Editar Artículo" : "Crear Nuevo Artículo"}
          </h1>
        </div>
      </nav>

      {fetching ? (
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
          <p className="text-muted-foreground">Cargando datos del artículo...</p>
        </div>
      ) : (
        <main className="max-w-5xl mx-auto px-4 py-8">
        <form onSubmit={handlePublish} className="space-y-8">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Columna Principal (Título, Resumen, Editor) */}
            <div className="md:col-span-2 space-y-6">
              
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Título del Artículo</label>
                <input
                  type="text"
                  placeholder="Ej: ¿Cómo aprender React en 2026?"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full text-xl p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Resumen Corto</label>
                <textarea
                  placeholder="Una breve descripción para la vista previa del artículo..."
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  rows={3}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
                />
              </div>

              <div className="space-y-2 bg-white rounded-lg">
                <label className="text-sm font-semibold text-gray-700 mb-2 block">Contenido</label>
                <div className="h-[400px]">
                  <ReactQuill 
                    theme="snow" 
                    value={content} 
                    onChange={setContent} 
                    modules={quillModules}
                    className="h-[350px] bg-white"
                  />
                </div>
              </div>

            </div>

            {/* Columna Secundaria (Imagen, Etiquetas, Guardado) */}
            <div className="space-y-6">
              
              {/* Imagen de Portada */}
              <div className="bg-white p-6 border border-gray-200 rounded-xl shadow-sm">
                <h3 className="text-sm font-semibold text-gray-700 mb-4">Imagen de Portada</h3>
                
                <div className="space-y-4 text-center">
                  {imagePreview ? (
                    <div className="relative rounded-lg overflow-hidden border border-gray-200 group">
                      <img src={imagePreview} alt="Preview" className="w-full h-40 object-cover" />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                        <label className="cursor-pointer text-white font-medium text-sm hover:underline">
                          Cambiar imagen
                          <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                        </label>
                      </div>
                    </div>
                  ) : (
                    <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <ImagePlus className="w-8 h-8 mb-3 text-gray-400" />
                        <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Haz clic para subir</span></p>
                        <p className="text-xs text-gray-500">PNG, JPG, WEBP (MAX. 5MB)</p>
                      </div>
                      <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                    </label>
                  )}
                </div>
              </div>

              {/* Etiquetas */}
              <div className="bg-white p-6 border border-gray-200 rounded-xl shadow-sm">
                <h3 className="text-sm font-semibold text-gray-700 mb-4">Metadatos</h3>
                
                <div className="space-y-2">
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Categoría
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full p-2 text-sm border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white"
                    required
                  >
                    <option value="" disabled>Selecciona una categoría</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Etiquetas (separadas por comas)
                  </label>
                  <input
                    type="text"
                    placeholder="react, frontend, tutorial"
                    value={tagsInput}
                    onChange={(e) => setTagsInput(e.target.value)}
                    className="w-full p-2 text-sm border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>
              </div>

              {/* Acciones */}
              <div className="bg-white p-6 border border-gray-200 rounded-xl shadow-sm">
                <h3 className="text-sm font-semibold text-gray-700 mb-4">Publicación</h3>
                
                <label className="flex items-center gap-3 mb-6 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={published}
                    onChange={(e) => setPublished(e.target.checked)}
                    className="w-5 h-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700 font-medium">
                    {published ? "Publicar Inmediatamente" : "Guardar como Borrador"}
                  </span>
                </label>

                <Button 
                  type="submit" 
                  disabled={loading}
                  className="w-full h-11"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Guardando...
                    </>
                  ) : (
                    isEditing ? (published ? "Actualizar Artículo" : "Guardar Cambios") : (published ? "Publicar Artículo" : "Guardar Borrador")
                  )}
                </Button>
              </div>

            </div>
          </div>

        </form>
      </main>
      )}
    </div>
  );
}
