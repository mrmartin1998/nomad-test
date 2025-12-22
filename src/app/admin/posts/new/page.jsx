import React from 'react';
import PostForm from '@/components/admin/posts/PostForm';

export default function NewPostPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <h1 className="text-3xl font-bold">Crear Nuevo Post</h1>
        <div className="badge badge-primary">Nuevo</div>
      </div>
      <div className="text-base-content/70">
        Llena el formulario para crear un nuevo post para tu blog
      </div>
      <PostForm />
    </div>
  );
}