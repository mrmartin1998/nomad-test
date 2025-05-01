'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const CategoryList = () => {
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/blog/categories');
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Error al cargar las categorías');
      }

      setCategories(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('¿Está seguro de que desea eliminar esta categoría? Esto afectará a todos los posts asociados.')) {
      return;
    }

    try {
      const response = await fetch(`/api/blog/categories/${id}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('Error al eliminar la categoría');
      }

      // Refresh the list
      fetchCategories();
    } catch (error) {
      setError(error.message);
    }
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
        <h2 className="text-2xl font-bold">Gestión de Categorías</h2>
        <Link href="/admin/categories/new" className="btn btn-primary">
          Nueva Categoría
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Slug</th>
              <th>Descripción</th>
              <th>Posts</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category._id}>
                <td>
                  <div className="font-bold">{category.name}</div>
                </td>
                <td>
                  <div className="text-sm opacity-50">{category.slug}</div>
                </td>
                <td>
                  <div className="max-w-xs truncate">
                    {category.description}
                  </div>
                </td>
                <td>
                  <span className="badge badge-ghost">
                    {category.posts?.length || 0} posts
                  </span>
                </td>
                <td>
                  <div className="flex gap-2">
                    <Link
                      href={`/admin/categories/${category.slug}`}
                      className="btn btn-sm btn-ghost"
                    >
                      Editar
                    </Link>
                    <button
                      onClick={() => handleDelete(category._id)}
                      className="btn btn-sm btn-error"
                      disabled={category.posts?.length > 0}
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

      {categories.length === 0 && (
        <div className="text-center py-8">
          <p className="text-lg">No hay categorías disponibles</p>
        </div>
      )}
    </div>
  );
};

export default CategoryList; 