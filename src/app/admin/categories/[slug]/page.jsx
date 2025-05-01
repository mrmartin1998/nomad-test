import React from 'react';
import AdminLayout from '@/components/admin/layout/AdminLayout';
import CategoryForm from '@/components/admin/categories/CategoryForm';

const EditCategoryPage = async ({ params }) => {
  const { slug } = params;

  // Fetch category data
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blog/categories/${slug}`, {
    cache: 'no-store'
  });
  const category = await response.json();

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Editar Categoría</h1>
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <CategoryForm initialData={category} />
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default EditCategoryPage; 