import React from 'react';
import AdminLayout from '@/components/admin/layout/AdminLayout';
import CategoryForm from '@/components/admin/categories/CategoryForm';

const NewCategoryPage = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Nueva Categoría</h1>
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <CategoryForm />
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default NewCategoryPage; 