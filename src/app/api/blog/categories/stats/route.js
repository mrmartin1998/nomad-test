import { NextResponse } from 'next/server';
import Category from '@/lib/models/Category';
import connectDB from '@/lib/mongodb';

export async function GET() {
  try {
    const db = await connectDB();
    
    // If no DB connection (during build or error), return empty stats
    if (!db) {
      return NextResponse.json({
        total: 0,
        active: 0
      });
    }
    
    // Count total categories
    const total = await Category.countDocuments();
    
    // Count active categories
    const active = await Category.countDocuments({ status: 'active' });

    return NextResponse.json({
      total,
      active
    });
  } catch (error) {
    console.error('Error fetching category stats:', error);
    // Return empty stats on error
    return NextResponse.json({
      total: 0,
      active: 0
    });
  }
} 