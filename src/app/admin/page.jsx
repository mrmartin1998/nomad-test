'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import AdminLayout from '@/components/admin/layout/AdminLayout';
import AdminStats from '@/components/admin/AdminStats';
import RecentPosts from '@/components/admin/RecentPosts';

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
      title: 'Biblioteca de Medios',
      description: 'Gestionar imágenes subidas',
      href: '/admin/media',
      icon: '📁',
      color: 'btn-info'
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
          <Link href="/admin/posts/new" className="btn btn-primary">
            Nuevo Post
          </Link>
        </div>

        {/* Stats Section */}
        <AdminStats />

        {/* Quick Actions Section */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Acciones Rápidas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action) => (
              <Link
                key={action.href}
                href={action.href}
                className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="card-body text-center">
                  <div className="text-3xl mb-2">{action.icon}</div>
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
        </div>

        {/* Recent Posts Section */}
        <div>
          <RecentPosts />
        </div>

        {/* Tips & Help Section */}
        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <h3 className="card-title">Consejos Rápidos</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-2">✍️ Creación de Contenido</h4>
                <ul className="text-sm text-base-content/70 space-y-1">
                  <li>• Usa categorías para organizar tus posts</li>
                  <li>• Agrega imágenes destacadas para hacer los posts más atractivos</li>
                  <li>• Escribe descripciones meta atractivas para SEO</li>
                  <li>• Usa etiquetas para mejorar la discoverabilidad</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">🚀 Consejos de Publicación</h4>
                <ul className="text-sm text-base-content/70 space-y-1">
                  <li>• Guarda como borrador primero para revisar el contenido</li>
                  <li>• Previsualiza tus posts antes de publicar</li>
                  <li>• Usa slugs significativos para mejores URLs</li>
                  <li>• Mantén las descripciones meta por debajo de 160 caracteres</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;