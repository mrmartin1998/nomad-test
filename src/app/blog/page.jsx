import React, { Suspense } from 'react';
import BlogContent from '@/components/blog/BlogContent';

export const metadata = {
  title: 'Blog | Nomad',
  description: 'Explora nuestros artículos sobre visas y viajes',
};

export default function BlogPage() {
  return (
    <Suspense fallback={
      <div className="container mx-auto px-4 py-8 text-center">
        <div className="loading loading-spinner loading-lg"></div>
      </div>
    }>
      <BlogContent />
    </Suspense>
  );
} 