import { NextResponse } from 'next/server';
import Category from '@/lib/models/Category';
import connectDB from '@/lib/mongodb';

export async function GET() {
  try {
    await connectDB();
    
    // Count total categories
    const total = await Category.countDocuments();

    return NextResponse.json({
      total
    });
  } catch (error) {
    console.error('Error fetching category stats:', error);
    return NextResponse.json(
      { error: 'Error al obtener estadísticas' },
      { status: 500 }
    );
  }
} 