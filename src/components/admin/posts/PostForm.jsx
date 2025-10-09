'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import RichTextEditor from '@/components/admin/RichTextEditor';
import MediaLibrary from '@/components/admin/MediaLibrary';

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
  const [showMediaLibrary, setShowMediaLibrary] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

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

  const handleImageSelect = (image) => {
    setFormData(prev => ({
      ...prev,
      image: image.url
    }));
    setShowMediaLibrary(false);
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

  const handlePreview = () => {
    if (!formData.title || !formData.content) {
      setError('Title and content are required for preview');
      return;
    }
    setShowPreview(true);
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
            <span className="label-text font-medium">Imagen destacada</span>
          </label>
          <div className="space-y-4">
            {formData.image ? (
              <div className="relative inline-block">
                <img
                  src={formData.image}
                  alt="Featured image preview"
                  className="max-w-xs max-h-48 rounded-lg object-cover"
                />
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, image: '' }))}
                  className="btn btn-circle btn-sm absolute -top-2 -right-2 btn-error"
                >
                  ×
                </button>
              </div>
            ) : (
              <div className="text-center py-8 border-2 border-dashed border-base-300 rounded-lg">
                <p className="text-base-content/70 mb-4">No image selected</p>
              </div>
            )}
            
            <button
              type="button"
              onClick={() => setShowMediaLibrary(true)}
              className="btn btn-outline"
            >
              {formData.image ? 'Change Image' : 'Select Image'}
            </button>
          </div>
        </div>

        {/* Media Library Modal */}
        {showMediaLibrary && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-base-100 rounded-lg p-6 max-w-4xl w-full max-h-[80vh] overflow-y-auto m-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Media Library</h2>
                <button
                  onClick={() => setShowMediaLibrary(false)}
                  className="btn btn-circle btn-sm"
                >
                  ×
                </button>
              </div>
              <MediaLibrary 
                onSelect={handleImageSelect}
                selectedImage={formData.image ? { url: formData.image } : null}
              />
            </div>
          </div>
        )}

        {/* Preview Modal */}
        {showPreview && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-base-100 rounded-lg p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto m-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Post Preview</h2>
                <button
                  onClick={() => setShowPreview(false)}
                  className="btn btn-circle btn-sm"
                >
                  ×
                </button>
              </div>
              
              <article className="prose prose-lg max-w-none">
                <header className="mb-8">
                  <h1 className="text-4xl font-bold mb-4">{formData.title}</h1>
                  <div className="flex items-center gap-4 text-gray-600">
                    <span>{formData.author}</span>
                    {formData.category && categories.find(c => c._id === formData.category) && (
                      <>
                        <span>·</span>
                        <span>{categories.find(c => c._id === formData.category)?.name}</span>
                      </>
                    )}
                  </div>
                </header>

                {formData.image && (
                  <div className="mb-8">
                    <img
                      src={formData.image}
                      alt={formData.title}
                      className="w-full h-[400px] object-cover rounded-lg"
                    />
                  </div>
                )}

                <div dangerouslySetInnerHTML={{ __html: formData.content }} />

                {formData.tags && (
                  <div className="mt-8 pt-4 border-t">
                    <h2 className="text-xl font-semibold mb-4">Tags:</h2>
                    <div className="flex flex-wrap gap-2">
                      {formData.tags.split(',').map((tag, index) => (
                        <span 
                          key={index}
                          className="px-3 py-1 bg-gray-100 rounded-full text-sm"
                        >
                          {tag.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </article>
            </div>
          </div>
        )}

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

        <div className="flex justify-between items-center pt-6">
          <button
            type="button"
            onClick={handlePreview}
            className="btn btn-outline"
          >
            Preview
          </button>
          
          <div className="flex justify-end gap-4">
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
        </div>
      </form>
    </div>
  );
};

export default PostForm;