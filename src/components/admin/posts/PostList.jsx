'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const PostList = ({ limit }) => {
  const router = useRouter();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchPosts();
  }, [statusFilter, currentPage]);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/blog/posts?status=${statusFilter}&page=${currentPage}&limit=${limit || 10}`);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Error al cargar los posts');
      }

      setPosts(data.posts);
      setTotalPages(data.totalPages);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (slug) => {
    if (!confirm('¿Está seguro de que desea eliminar este post?')) {
      return;
    }

    try {
      const response = await fetch(`/api/blog/posts/${slug}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('Error al eliminar el post');
      }

      // Refresh the list
      fetchPosts();
    } catch (error) {
      setError(error.message);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {error && (
        <div className="alert alert-error">
          {error}
        </div>
      )}

      <div className="flex justify-between items-center">
        <div className="flex gap-4">
          <select
            className="select select-bordered"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">Todos</option>
            <option value="published">Publicados</option>
            <option value="draft">Borradores</option>
          </select>
        </div>
        <Link href="/admin/posts/new" className="btn btn-primary">
          Nuevo Post
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Título</th>
              <th>Autor</th>
              <th>Categoría</th>
              <th>Fecha</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post._id}>
                <td>
                  <div className="font-bold">{post.title}</div>
                </td>
                <td>{post.author}</td>
                <td>
                  <span className="badge badge-ghost">
                    {post.category?.name || 'Sin categoría'}
                  </span>
                </td>
                <td>{formatDate(post.date)}</td>
                <td>
                  <span className={`badge ${post.status === 'published' ? 'badge-success' : 'badge-warning'}`}>
                    {post.status === 'published' ? 'Publicado' : 'Borrador'}
                  </span>
                </td>
                <td>
                  <div className="flex gap-2">
                    <Link
                      href={`/admin/posts/${post.slug}`}
                      className="btn btn-sm btn-ghost"
                    >
                      Editar
                    </Link>
                    <button
                      onClick={() => handleDelete(post.slug)}
                      className="btn btn-sm btn-error"
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

      {!limit && totalPages > 1 && (
        <div className="flex justify-center gap-2">
          <button
            className="btn btn-sm"
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Anterior
          </button>
          <span className="btn btn-sm btn-disabled">
            Página {currentPage} de {totalPages}
          </span>
          <button
            className="btn btn-sm"
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Siguiente
          </button>
        </div>
      )}

      {posts.length === 0 && (
        <div className="text-center py-8">
          <p className="text-lg">No hay posts disponibles</p>
        </div>
      )}
    </div>
  );
};

export default PostList; 