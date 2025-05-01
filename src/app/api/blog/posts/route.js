import { NextResponse } from 'next/server';
import Post from '@/lib/models/Post';
import connectDB from '@/lib/mongodb';

// GET all posts
export async function GET(request) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const page = Number(searchParams.get('page')) || 1;
    const limit = Number(searchParams.get('limit')) || 9;
    const status = searchParams.get('status');

    // Build query based on status
    const query = status && status !== 'all' ? { status } : {};

    const skip = (page - 1) * limit;
    
    // Get total count for pagination
    const totalPosts = await Post.countDocuments(query);
    const totalPages = Math.ceil(totalPosts / limit);

    // Fetch posts with pagination and handle population errors gracefully
    let posts = await Post.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    // Try to populate categories, but don't fail if it doesn't work
    try {
      posts = await Post.populate(posts, { path: 'category' });
    } catch (populateError) {
      console.error('Error populating categories:', populateError);
      // Continue with unpopulated posts
    }

    return NextResponse.json({
      posts,
      totalPages,
      currentPage: page
    });
  } catch (error) {
    console.error('Error in posts API:', error);
    return NextResponse.json(
      { error: 'Error al cargar los posts' },
      { status: 500 }
    );
  }
}

// POST new post
export async function POST(request) {
  try {
    await connectDB();
    
    const body = await request.json();
    
    // Convert metaDescription to meta_description to match schema
    const { metaDescription, ...rest } = body;
    const postData = {
      ...rest,
      meta_description: metaDescription
    };

    const post = new Post(postData);
    await post.save();

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error('Error creating post:', error);
    if (error.name === 'ValidationError') {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: 'Error al crear el post' },
      { status: 500 }
    );
  }
}

// PUT update post
export async function PUT(request) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');
    
    if (!slug) {
      return NextResponse.json(
        { error: 'Slug no proporcionado' },
        { status: 400 }
      );
    }

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

// DELETE post
export async function DELETE(request) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');
    
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