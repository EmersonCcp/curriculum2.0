-- Script SQL para agregar la columna "category" a la tabla "blogs" existente

ALTER TABLE blogs
ADD COLUMN category TEXT DEFAULT 'General';
