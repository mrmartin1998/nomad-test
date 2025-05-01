import React from 'react';
import Link from 'next/link';
import AdminLayout from '@/components/admin/layout/AdminLayout';
import PostList from '@/components/admin/posts/PostList';

const PostsPage = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Gestión de Posts</h1>
          <Link href="/admin/posts/new" className="btn btn-primary">
            Nuevo Post
          </Link>
        </div>

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <PostList />
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default PostsPage; 