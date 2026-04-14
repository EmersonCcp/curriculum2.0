-- 1. Añadir columnas de contadores a la tabla blogs
ALTER TABLE blogs ADD COLUMN IF NOT EXISTS likes_count BIGINT DEFAULT 0;
ALTER TABLE blogs ADD COLUMN IF NOT EXISTS views_count BIGINT DEFAULT 0;

-- 2. Función para incrementar vistas de forma atómica por SLUG
CREATE OR REPLACE FUNCTION increment_blog_views(blog_slug TEXT)
RETURNS VOID AS $$
BEGIN
  UPDATE blogs
  SET views_count = COALESCE(views_count, 0) + 1
  WHERE slug = blog_slug;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 3. Función para incrementar likes de forma atómica por ID
CREATE OR REPLACE FUNCTION increment_blog_likes(blog_id UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE blogs
  SET likes_count = COALESCE(likes_count, 0) + 1
  WHERE id = blog_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
