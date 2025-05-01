'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import PostCard from '@/components/blog/PostCard';

export default function BlogPage() {
  const searchParams = useSearchParams();
  const [posts, setPosts] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const page = Number(searchParams.get('page')) || 1;

  useEffect(() => {
    async function fetchPosts() {
      try {
        setLoading(true);
        const res = await fetch(
          `/api/blog/posts?page=${page}&limit=9`
        );
        
        if (!res.ok) {
          throw new Error('Failed to fetch posts');
        }
        
        const data = await res.json();
        setPosts(data.posts || []);
        setTotalPages(data.totalPages || 0);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setError('Error al cargar los posts. Por favor, intenta de nuevo más tarde.');
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, [page]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <div className="loading loading-spinner loading-lg"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="alert alert-error">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Blog</h1>
        <p className="text-xl text-gray-600">
          Explora nuestros artículos sobre visas y viajes
        </p>
      </header>

      {posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {posts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-xl text-gray-600">No hay posts disponibles.</p>
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex justify-center gap-4">
          {page > 1 && (
            <a
              href={`/blog?page=${page - 1}`}
              className="btn btn-outline"
            >
              Anterior
            </a>
          )}
          {page < totalPages && (
            <a
              href={`/blog?page=${page + 1}`}
              className="btn btn-outline"
            >
              Siguiente
            </a>
          )}
        </div>
      )}
    </div>
  );
} 