'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import AdminLayout from '@/components/admin/layout/AdminLayout';

export default function AdminPostsPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/blog/posts');
      const data = await response.json();
      
      if (response.ok) {
        setPosts(data.posts || []);
      } else {
        throw new Error(data.error || 'Error fetching posts');
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (slug) => {
    if (!confirm('¿Estás seguro de que quieres eliminar este post?')) return;

    try {
      const response = await fetch(`/api/blog/posts/${slug}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        setPosts(posts.filter(post => post.slug !== slug));
      } else {
        const data = await response.json();
        throw new Error(data.error || 'Error deleting post');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Posts</h1>
          <div className="skeleton h-10 w-32"></div>
        </div>
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="skeleton h-20 w-full"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Gestionar Posts</h1>
          <Link href="/admin/posts/new" className="btn btn-primary">
            Crear Nuevo Post
          </Link>
        </div>

        {error && (
          <div className="alert alert-error">
            {error}
          </div>
        )}

        {posts.length === 0 ? (
          <div className="card bg-base-100 shadow-lg">
            <div className="card-body text-center">
              <h2 className="text-xl font-semibold mb-4">No hay posts todavía</h2>
              <p className="text-base-content/70 mb-6">
                Crea tu primer post para empezar a llenar tu blog
              </p>
              <Link href="/admin/posts/new" className="btn btn-primary">
                Crear Primer Post
              </Link>
            </div>
          </div>
        ) : (
          <div className="card bg-base-100 shadow-lg">
            <div className="card-body">
              <div className="overflow-x-auto">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Título</th>
                      <th>Autor</th>
                      <th>Categoría</th>
                      <th>Estado</th>
                      <th>Fecha</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {posts.map((post) => (
                      <tr key={post._id}>
                        <td>
                          <div className="font-medium">{post.title}</div>
                          <div className="text-sm text-base-content/70">
                            /{post.slug}
                          </div>
                        </td>
                        <td>{post.author}</td>
                        <td>
                          <span className="badge badge-outline">
                            {post.category?.name || 'Sin categoría'}
                          </span>
                        </td>
                        <td>
                          <span 
                            className={`badge ${
                              post.status === 'published' 
                                ? 'badge-success' 
                                : 'badge-warning'
                            }`}
                          >
                            {post.status === 'published' ? 'Publicado' : 'Borrador'}
                          </span>
                        </td>
                        <td>
                          {new Date(post.date).toLocaleDateString('es-ES', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </td>
                        <td>
                          <div className="flex gap-2">
                            <Link 
                              href={`/blog/${post.slug}`}
                              className="btn btn-ghost btn-sm"
                              target="_blank"
                            >
                              Ver
                            </Link>
                            <Link 
                              href={`/admin/posts/${post.slug}`}
                              className="btn btn-primary btn-sm"
                            >
                              Editar
                            </Link>
                            <button
                              onClick={() => handleDelete(post.slug)}
                              className="btn btn-error btn-sm"
                            >
                              Eliminar
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}