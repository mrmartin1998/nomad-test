'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import RichTextEditor from '@/components/admin/RichTextEditor';

const PostForm = ({ initialData }) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    author: '',
    category: '',
    tags: '',
    image: '',
    status: 'draft',
    metaDescription: '',
    slug: ''
  });
  const [categories, setCategories] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCategories();
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        content: initialData.content || '',
        author: initialData.author || '',
        category: initialData.category?._id || '',
        tags: initialData.tags?.join(', ') || '',
        image: initialData.image || '',
        status: initialData.status || 'draft',
        metaDescription: initialData.metaDescription || '',
        slug: initialData.slug || ''
      });
    }
  }, [initialData]);

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/blog/categories');
      const data = await response.json();
      if (response.ok) {
        setCategories(data);
      }
    } catch (error) {
      setError('Error al cargar las categorías');
    }
  };

  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[áéíóúñü]/g, c => ({ á: 'a', é: 'e', í: 'i', ó: 'o', ú: 'u', ñ: 'n', ü: 'u' })[c])
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const updates = { [name]: value };
      if (name === 'title') {
        updates.slug = generateSlug(value);
      }
      return { ...prev, ...updates };
    });
  };

  // New handler for rich text editor
  const handleContentChange = (content) => {
    setFormData(prev => ({ ...prev, content }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/blog/images', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error al subir la imagen');
      }

      setFormData(prev => ({
        ...prev,
        image: data.url
      }));
    } catch (error) {
      setError(error.message);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title) newErrors.title = 'El título es requerido';
    if (!formData.content || formData.content.trim() === '<p><br></p>') {
      newErrors.content = 'El contenido es requerido';
    }
    if (!formData.author) newErrors.author = 'El autor es requerido';
    if (!formData.category) newErrors.category = 'La categoría es requerida';
    if (!formData.metaDescription) newErrors.metaDescription = 'La descripción meta es requerida';
    if (!formData.slug) newErrors.slug = 'El slug es requerido';
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
        ? `/api/blog/posts/${initialData.slug}`
        : '/api/blog/posts';
      
      const response = await fetch(url, {
        method: initialData ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error al guardar el post');
      }

      router.push('/admin/posts');
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

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="form-control">
          <label className="label">
            <span className="label-text text-lg font-medium">Título *</span>
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={`input input-bordered ${errors.title ? 'input-error' : ''}`}
            placeholder="Título del post"
          />
          {errors.title && (
            <label className="label">
              <span className="label-text-alt text-error">{errors.title}</span>
            </label>
          )}
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text text-lg font-medium">Contenido *</span>
          </label>
          <RichTextEditor
            value={formData.content}
            onChange={handleContentChange}
            placeholder="Escribe el contenido de tu post aquí..."
          />
          {errors.content && (
            <label className="label">
              <span className="label-text-alt text-error">{errors.content}</span>
            </label>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Autor *</span>
            </label>
            <input
              type="text"
              name="author"
              value={formData.author}
              onChange={handleChange}
              className={`input input-bordered ${errors.author ? 'input-error' : ''}`}
              placeholder="Nombre del autor"
            />
            {errors.author && (
              <label className="label">
                <span className="label-text-alt text-error">{errors.author}</span>
              </label>
            )}
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Categoría *</span>
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={`select select-bordered ${errors.category ? 'select-error' : ''}`}
            >
              <option value="">Seleccionar categoría</option>
              {categories.map(category => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
            {errors.category && (
              <label className="label">
                <span className="label-text-alt text-error">{errors.category}</span>
              </label>
            )}
          </div>
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">Etiquetas</span>
          </label>
          <input
            type="text"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            className="input input-bordered"
            placeholder="Etiquetas separadas por comas (ej: visa, viaje, turismo)"
          />
          <label className="label">
            <span className="label-text-alt">Separa las etiquetas con comas</span>
          </label>
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Imagen</span>
          </label>
          <div className="space-y-4">
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleImageUpload}
              className="file-input file-input-bordered w-full"
            />
            {formData.image && (
              <div className="relative">
                <img
                  src={formData.image}
                  alt="Preview"
                  className="max-w-xs rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, image: '' }))}
                  className="btn btn-circle btn-sm absolute top-2 right-2"
                >
                  ×
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Estado</span>
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="select select-bordered"
            >
              <option value="draft">Borrador</option>
              <option value="published">Publicado</option>
            </select>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Slug *</span>
            </label>
            <input
              type="text"
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              className={`input input-bordered ${errors.slug ? 'input-error' : ''}`}
              placeholder="url-amigable-del-post"
            />
            {errors.slug && (
              <label className="label">
                <span className="label-text-alt text-error">{errors.slug}</span>
              </label>
            )}
          </div>
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">Descripción Meta *</span>
          </label>
          <textarea
            name="metaDescription"
            value={formData.metaDescription}
            onChange={handleChange}
            className={`textarea textarea-bordered h-24 ${errors.metaDescription ? 'textarea-error' : ''}`}
            placeholder="Descripción para SEO (160 caracteres máximo)"
            maxLength={160}
          />
          <label className="label">
            <span className="label-text-alt">{formData.metaDescription.length}/160 caracteres</span>
          </label>
          {errors.metaDescription && (
            <label className="label">
              <span className="label-text-alt text-error">{errors.metaDescription}</span>
            </label>
          )}
        </div>

        <div className="flex justify-end gap-4 pt-6">
          <button
            type="button"
            onClick={() => router.push('/admin/posts')}
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
            ) : initialData ? 'Actualizar Post' : 'Crear Post'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostForm;