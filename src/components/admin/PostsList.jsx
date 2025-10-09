'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function PostsList({ limit = null, showActions = true }) {
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
        let postsData = data.posts || [];
        if (limit) {
          postsData = postsData.slice(0, limit);
        }
        setPosts(postsData);
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
      <div className="space-y-4">
        {[...Array(limit || 5)].map((_, i) => (
          <div key={i} className="skeleton h-16 w-full"></div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-error">
        {error}
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-base-content/60 mb-4">No posts found</p>
        <Link href="/admin/posts/new" className="btn btn-primary">
          Create Your First Post
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <div key={post._id} className="card bg-base-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="card-body p-4">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <h3 className="font-semibold">{post.title}</h3>
                  <div className={`badge badge-sm ${
                    post.status === 'published' 
                      ? 'badge-success' 
                      : 'badge-warning'
                  }`}>
                    {post.status}
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm text-base-content/60 mt-1">
                  <span>{post.author}</span>
                  <span>•</span>
                  <span>{post.category?.name || 'No category'}</span>
                  <span>•</span>
                  <span>{new Date(post.date).toLocaleDateString('es-ES')}</span>
                </div>
              </div>
              
              {showActions && (
                <div className="flex items-center gap-2">
                  <Link 
                    href={`/blog/${post.slug}`}
                    className="btn btn-ghost btn-sm"
                    target="_blank"
                  >
                    View
                  </Link>
                  <Link 
                    href={`/admin/posts/${post.slug}`}
                    className="btn btn-primary btn-sm"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(post.slug)}
                    className="btn btn-error btn-sm"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
      
      {limit && posts.length >= limit && (
        <div className="text-center pt-4">
          <Link href="/admin/posts" className="btn btn-outline">
            View All Posts
          </Link>
        </div>
      )}
    </div>
  );
}
