'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const CategoryForm = ({ initialData }) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    slug: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        description: initialData.description || '',
        slug: initialData.slug || ''
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Generate slug from name
    if (name === 'name') {
      const slug = value
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      setFormData(prev => ({
        ...prev,
        slug
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'El nombre es requerido';
    if (!formData.slug) newErrors.slug = 'El slug es requerido';
    if (!formData.description) newErrors.description = 'La descripción es requerida';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setLoading(true);
      const url = initialData
        ? `/api/blog/categories/${initialData.slug}`
        : '/api/blog/categories';
      
      const response = await fetch(url, {
        method: initialData ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error al guardar la categoría');
      }

      router.push('/admin/categories');
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {error && (
        <div className="alert alert-error">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Nombre</span>
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`input input-bordered ${errors.name ? 'input-error' : ''}`}
            placeholder="Nombre de la categoría"
          />
          {errors.name && (
            <label className="label">
              <span className="label-text-alt text-error">{errors.name}</span>
            </label>
          )}
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Slug</span>
          </label>
          <input
            type="text"
            name="slug"
            value={formData.slug}
            onChange={handleChange}
            className={`input input-bordered ${errors.slug ? 'input-error' : ''}`}
            placeholder="slug-de-la-categoria"
          />
          {errors.slug && (
            <label className="label">
              <span className="label-text-alt text-error">{errors.slug}</span>
            </label>
          )}
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Descripción</span>
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className={`textarea textarea-bordered h-24 ${errors.description ? 'textarea-error' : ''}`}
            placeholder="Descripción de la categoría"
          />
          {errors.description && (
            <label className="label">
              <span className="label-text-alt text-error">{errors.description}</span>
            </label>
          )}
        </div>

        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => router.push('/admin/categories')}
            className="btn btn-ghost"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? (
              <span className="loading loading-spinner"></span>
            ) : initialData ? 'Actualizar' : 'Crear'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CategoryForm; 