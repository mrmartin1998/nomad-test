import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { ensureDirectory } from '@/lib/utils/fileSystem';

// POST upload image
export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file) {
      return NextResponse.json(
        { error: 'No se ha proporcionado ningún archivo' },
        { status: 400 }
      );
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Tipo de archivo no permitido. Use JPG, PNG o WEBP' },
        { status: 400 }
      );
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'El archivo es demasiado grande. Máximo 5MB' },
        { status: 400 }
      );
    }

    // Generate unique filename
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const extension = file.type.split('/')[1];
    const filename = `${uuidv4()}.${extension}`;
    
    // Ensure upload directory exists
    const publicDir = join(process.cwd(), 'public', 'uploads', 'blog');
    await ensureDirectory(publicDir);
    
    // Save file
    const filepath = join(publicDir, filename);
    await writeFile(filepath, buffer);

    // Return the URL path
    const publicPath = `/uploads/blog/${filename}`;

    return NextResponse.json({ 
      url: publicPath,
      filename: filename
    });
  } catch (error) {
    console.error('Error uploading image:', error);
    return NextResponse.json(
      { error: 'Error al subir la imagen' },
      { status: 500 }
    );
  }
} 