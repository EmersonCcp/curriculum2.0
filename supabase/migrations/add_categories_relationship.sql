-- 1. Crear tabla de categorías
CREATE TABLE categories (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 2. Habilitar RLS para categorías
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Categories are viewable by everyone" 
ON categories FOR SELECT 
USING (true);

-- Política para que solo admin pueda insertar/editar (opcional, por ahora permitimos lectura pública)
-- Si tienes un rol de admin puedes restringir INSERT/UPDATE/DELETE

-- 3. Relacionar con blogs
-- Añadimos la columna category_id (permitimos null temporalmente si hay datos antiguos)
ALTER TABLE blogs ADD COLUMN category_id UUID REFERENCES categories(id);

-- 4. Insertar algunas categorías iniciales
INSERT INTO categories (name) VALUES 
('Programación'),
('Diseño UI/UX'),
('Backend'),
('Frontend'),
('Mobile'),
('DevOps'),
('Inteligencia Artificial');

-- 5. Opcional: Migrar datos existentes (si el texto coincide exactamente con un nombre de categoría)
-- UPDATE blogs b
-- SET category_id = c.id
-- FROM categories c
-- WHERE b.category = c.name;
