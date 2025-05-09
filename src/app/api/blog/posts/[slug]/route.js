import { NextResponse } from 'next/server';
import Post from '@/lib/models/Post';
import connectDB from '@/lib/mongodb';

// Using the same mock data from the posts route
const mockPosts = [
  {
    _id: '1',
    title: 'Guía para Visa de Tailandia',
    content: '<p>Esta es una guía completa para obtener tu visa de Tailandia. Aquí encontrarás todos los requisitos y pasos necesarios para aplicar exitosamente.</p><h2>Requisitos Principales</h2><ul><li>Pasaporte vigente</li><li>Formulario de aplicación</li><li>Fotos</li><li>Comprobante de fondos</li></ul>',
    author: 'Admin',
    date: new Date().toISOString(),
    category: {
      _id: '1',
      name: 'Visas',
      slug: 'visas'
    },
    tags: ['tailandia', 'visa', 'viajes'],
    image: 'https://picsum.photos/800/400',
    status: 'published',
    slug: 'guia-visa-tailandia',
    metaDescription: 'Guía completa para obtener tu visa de Tailandia'
  },
  {
    _id: '2',
    title: 'Visa de Reino Unido: Requisitos 2024',
    content: '<p>Descubre los requisitos actualizados para obtener tu visa de Reino Unido en 2024. Esta guía te ayudará a preparar tu aplicación correctamente.</p><h2>Documentos Necesarios</h2><ul><li>Pasaporte vigente</li><li>Prueba de fondos</li><li>Carta de invitación</li><li>Itinerario de viaje</li></ul>',
    author: 'Admin',
    date: new Date().toISOString(),
    category: {
      _id: '2',
      name: 'Reino Unido',
      slug: 'reino-unido'
    },
    tags: ['uk', 'visa', 'viajes'],
    image: 'https://picsum.photos/800/400',
    status: 'published',
    slug: 'visa-reino-unido-requisitos',
    metaDescription: 'Todo lo que necesitas saber sobre los requisitos para la visa de Reino Unido'
  }
];

// DELETE post by slug
export async function DELETE(request, { params }) {
  try {
    await connectDB();
    
    const { slug } = params;
    
    if (!slug) {
      return NextResponse.json(
        { error: 'Slug no proporcionado' },
        { status: 400 }
      );
    }

    const post = await Post.findOneAndDelete({ slug });

    if (!post) {
      return NextResponse.json(
        { error: 'Post no encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: 'Post eliminado correctamente' });
  } catch (error) {
    console.error('Error deleting post:', error);
    return NextResponse.json(
      { error: 'Error al eliminar el post' },
      { status: 500 }
    );
  }
}

// GET single post by slug
export async function GET(request, { params }) {
  try {
    await connectDB();
    
    const { slug } = params;
    
    const post = await Post.findOne({ slug }).populate('category');

    if (!post) {
      return NextResponse.json(
        { error: 'Post no encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json(post);
  } catch (error) {
    console.error('Error fetching post:', error);
    return NextResponse.json(
      { error: 'Error al cargar el post' },
      { status: 500 }
    );
  }
}

// PUT update post by slug
export async function PUT(request, { params }) {
  try {
    await connectDB();
    
    const { slug } = params;
    
    const body = await request.json();
    const { metaDescription, ...rest } = body;
    const postData = {
      ...rest,
      meta_description: metaDescription
    };

    const post = await Post.findOneAndUpdate(
      { slug },
      postData,
      { new: true, runValidators: true }
    ).populate('category');

    if (!post) {
      return NextResponse.json(
        { error: 'Post no encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json(post);
  } catch (error) {
    console.error('Error updating post:', error);
    if (error.name === 'ValidationError') {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: 'Error al actualizar el post' },
      { status: 500 }
    );
  }
} 