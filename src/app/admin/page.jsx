'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import AdminLayout from '@/components/admin/layout/AdminLayout';
import PostList from '@/components/admin/posts/PostList';
import CategoryList from '@/components/admin/categories/CategoryList';
import { useSession } from 'next-auth/react';

const AdminDashboard = () => {
  const { data: session } = useSession();
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

  const quickActions = [
    {
      title: 'Crear Nuevo Post',
      description: 'Escribe un nuevo post para el blog',
      href: '/admin/posts/new',
      icon: '✍️',
      color: 'btn-primary'
    },
    {
      title: 'Gestionar Posts',
      description: 'Ver y editar posts existentes',
      href: '/admin/posts',
      icon: '📝',
      color: 'btn-secondary'
    },
    {
      title: 'Categorías',
      description: 'Gestionar las categorías del blog',
      href: '/admin/categories',
      icon: '🏷️',
      color: 'btn-accent'
    },
    {
      title: 'Ver Blog',
      description: 'Ver cómo se ve tu blog para los visitantes',
      href: '/blog',
      icon: '👁️',
      color: 'btn-outline'
    }
  ];

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header Section */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Panel de Administración</h1>
            <p className="text-base-content/70 mt-1">
              ¡Bienvenido de nuevo, {session?.user?.name}! Administra el contenido de tu blog aquí.
            </p>
          </div>
          <div className="flex gap-4">
            <Link href="/admin/posts/new" className="btn btn-primary">
              Nuevo Post
            </Link>
            <Link href="/admin/categories/new" className="btn btn-ghost">
              Nueva Categoría
            </Link>
          </div>
        </div>

        {/* Quick Actions Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickActions.map((action) => (
            <Link
              key={action.href}
              href={action.href}
              className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="card-body text-center">
                <div className="text-4xl mb-2">{action.icon}</div>
                <h3 className="card-title text-lg justify-center">{action.title}</h3>
                <p className="text-sm text-base-content/70">{action.description}</p>
                <div className="card-actions justify-center mt-4">
                  <button className={`btn btn-sm ${action.color}`}>
                    Abrir
                  </button>
                </div>
              </div>
            </Link>
          ))}
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

        {/* Additional Info Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="card bg-base-100 shadow-lg">
            <div className="card-body">
              <h3 className="card-title">Actividad Reciente</h3>
              <p className="text-base-content/70">
                Tus actividades recientes de gestión del blog aparecerán aquí.
              </p>
            </div>
          </div>
          
          <div className="card bg-base-100 shadow-lg">
            <div className="card-body">
              <h3 className="card-title">Estadísticas del Blog</h3>
              <p className="text-base-content/70">
                Las estadísticas y análisis del blog se mostrarán aquí.
              </p>
            </div>
          </div>
          
          <div className="card bg-base-100 shadow-lg">
            <div className="card-body">
              <h3 className="card-title">Consejos Rápidos</h3>
              <ul className="text-sm text-base-content/70 space-y-1">
                <li>• Usa categorías para organizar tus posts</li>
                <li>• Agrega imágenes destacadas para hacer los posts más atractivos</li>
                <li>• Previsualiza tus posts antes de publicar</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;