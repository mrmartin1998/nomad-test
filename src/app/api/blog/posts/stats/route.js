import { NextResponse } from 'next/server';
import Post from '@/lib/models/Post';
import connectDB from '@/lib/mongodb';

export async function GET() {
  try {
    const db = await connectDB();
    
    // If no DB connection (during build or error), return empty stats
    if (!db) {
      return NextResponse.json({
        published: 0,
        drafts: 0,
        total: 0
      });
    }
    
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
    // Return empty stats on error
    return NextResponse.json({
      published: 0,
      drafts: 0,
      total: 0
    });
  }
} 