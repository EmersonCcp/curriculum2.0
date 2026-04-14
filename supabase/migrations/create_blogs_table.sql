-- Script para crear la tabla de Blogs y el Bucket de Storage en Supabase

-- 1. Crear la tabla de Blogs
CREATE TABLE blogs (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  summary TEXT,
  content TEXT,
  cover_image TEXT,
  tags TEXT[],
  published BOOLEAN DEFAULT false,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Habilitar Row Level Security para la tabla blogs
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;

-- Política: Cualquiera puede ver los blogs publicados
CREATE POLICY "Public blogs are viewable by everyone" ON blogs
  FOR SELECT USING (published = true);

-- Política: Solo el usuario autenticado puede insertar sus propios blogs
CREATE POLICY "Users can insert their own blogs" ON blogs
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Política: Solo el creador puede actualizar sus blogs
CREATE POLICY "Users can update their own blogs" ON blogs
  FOR UPDATE USING (auth.uid() = user_id);

-- Política: Solo el creador puede borrar sus blogs
CREATE POLICY "Users can delete their own blogs" ON blogs
  FOR DELETE USING (auth.uid() = user_id);
  
-- Política: El creador puede ver sus blogs no publicados
CREATE POLICY "Users can view their own unpublished blogs" ON blogs
  FOR SELECT USING (auth.uid() = user_id);


-- 2. Crear el Bucket de Storage para las imágenes de los blogs
INSERT INTO storage.buckets (id, name, public) 
VALUES ('blog-images', 'blog-images', true)
ON CONFLICT (id) DO NOTHING;

-- Configuramos las Políticas de Seguridad del Bucket "blog-images"
-- Política para Permitir que cualquiera pueda visualizar/descargar imágenes del bucket
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING ( bucket_id = 'blog-images' );

-- Política para Permitir a los usuarios autenticados subir (insertar) imágenes
CREATE POLICY "Auth Insert"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'blog-images' 
  AND auth.role() = 'authenticated'
);

-- Política para Permitir a los usuarios autenticados borrar sus imágenes (opcional pero recomendado)
CREATE POLICY "Auth Delete"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'blog-images'
  AND auth.role() = 'authenticated'
);
