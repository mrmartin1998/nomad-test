import { NextResponse } from 'next/server';
import Post from '@/lib/models/Post';
import connectDB from '@/lib/mongodb';

export async function GET() {
  try {
    await connectDB();
    
    // Count published posts
    const published = await Post.countDocuments({ status: 'published' });
    
    // Count draft posts
    const drafts = await Post.countDocuments({ status: 'draft' });

    return NextResponse.json({
      published,
      drafts,
      total: published + drafts
    });
  } catch (error) {
    console.error('Error fetching post stats:', error);
    return NextResponse.json(
      { error: 'Error al obtener estadísticas' },
      { status: 500 }
    );
  }
} 