import React from 'react';
import Link from 'next/link';
import AdminLayout from '@/components/admin/layout/AdminLayout';
import CategoryList from '@/components/admin/categories/CategoryList';

const CategoriesPage = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Gestión de Categorías</h1>
          <Link href="/admin/categories/new" className="btn btn-primary">
            Nueva Categoría
          </Link>
        </div>

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <CategoryList />
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default CategoriesPage; 