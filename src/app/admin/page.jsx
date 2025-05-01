'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import AdminLayout from '@/components/admin/layout/AdminLayout';
import PostList from '@/components/admin/posts/PostList';
import CategoryList from '@/components/admin/categories/CategoryList';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalPosts: 0,
    totalCategories: 0,
    draftPosts: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch post stats
        const postsResponse = await fetch('/api/blog/posts/stats');
        const postsData = await postsResponse.json();
        
        // Fetch category stats
        const categoriesResponse = await fetch('/api/blog/categories/stats');
        const categoriesData = await categoriesResponse.json();

        setStats({
          totalPosts: postsData.published || 0,
          draftPosts: postsData.drafts || 0,
          totalCategories: categoriesData.total || 0
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchStats();
  }, []);

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header Section */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Panel de Administración</h1>
          <div className="flex gap-4">
            <Link href="/admin/posts/new" className="btn btn-primary">
              Nuevo Post
            </Link>
            <Link href="/admin/categories/new" className="btn btn-ghost">
              Nueva Categoría
            </Link>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="stats shadow">
            <div className="stat">
              <div className="stat-title">Posts Totales</div>
              <div className="stat-value">{stats.totalPosts}</div>
              <div className="stat-desc">Posts publicados</div>
            </div>
          </div>
          <div className="stats shadow">
            <div className="stat">
              <div className="stat-title">Categorías</div>
              <div className="stat-value">{stats.totalCategories}</div>
              <div className="stat-desc">Categorías activas</div>
            </div>
          </div>
          <div className="stats shadow">
            <div className="stat">
              <div className="stat-title">Borradores</div>
              <div className="stat-value">{stats.draftPosts}</div>
              <div className="stat-desc">Posts en borrador</div>
            </div>
          </div>
        </div>

        {/* Recent Posts Section */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Posts Recientes</h2>
            <PostList limit={5} />
          </div>
        </div>

        {/* Categories Section */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Categorías</h2>
            <CategoryList />
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard; 