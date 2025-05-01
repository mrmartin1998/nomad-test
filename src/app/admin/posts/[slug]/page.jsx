import React from 'react';
import PostForm from '@/components/admin/posts/PostForm';
import AdminLayout from '@/components/admin/layout/AdminLayout';
import Post from '@/lib/models/Post';
import connectDB from '@/lib/mongodb';

// This is required for static export
export async function generateStaticParams() {
  try {
    await connectDB();
    const posts = await Post.find({}, 'slug');
    return posts.map((post) => ({
      slug: post.slug,
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

async function getPost(slug) {
  try {
    await connectDB();
    const post = await Post.findOne({ slug }).populate('category');
    if (!post) return null;
    return post;
  } catch (error) {
    console.error('Error fetching post:', error);
    return null;
  }
}

export default async function EditPostPage({ params }) {
  const post = await getPost(params.slug);

  if (!post) {
    return (
      <AdminLayout>
        <div className="alert alert-error">
          Post no encontrado
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Editar Post</h1>
        <PostForm initialData={JSON.parse(JSON.stringify(post))} />
      </div>
    </AdminLayout>
  );
} 