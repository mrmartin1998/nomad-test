import { NextResponse } from 'next/server';
import Category from '@/lib/models/Category';
import connectDB from '@/lib/mongodb';

// GET all categories
export async function GET(request) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const includePosts = searchParams.get('includePosts') === 'true';
    
    let query = Category.find().sort({ name: 1 });
    
    if (includePosts) {
      query = query.populate({
        path: 'posts',
        select: 'title slug date status',
        match: { status: 'published' },
        options: { sort: { date: -1 }, limit: 5 }
      });
    }

    const categories = await query;

    return NextResponse.json(categories);
  } catch (error) {
    return NextResponse.json(
      { error: 'Error al obtener las categorías' },
      { status: 500 }
    );
  }
}

// POST new category
export async function POST(request) {
  try {
    await connectDB();
    
    const body = await request.json();
    const category = new Category(body);
    await category.save();

    return NextResponse.json(category, { status: 201 });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }
    if (error.code === 11000) {
      return NextResponse.json(
        { error: 'Ya existe una categoría con ese nombre o slug' },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: 'Error al crear la categoría' },
      { status: 500 }
    );
  }
} 