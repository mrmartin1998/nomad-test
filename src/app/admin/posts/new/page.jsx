import React from 'react';
import AdminLayout from '@/components/admin/layout/AdminLayout';
import PostForm from '@/components/admin/posts/PostForm';

const NewPostPage = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Nuevo Post</h1>
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <PostForm />
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default NewPostPage; 