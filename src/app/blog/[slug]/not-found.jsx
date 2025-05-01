'use client';

import React from 'react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-4xl font-bold mb-4">Post no encontrado</h1>
      <p className="text-xl text-gray-600 mb-8">
        Lo sentimos, no pudimos encontrar el post que estás buscando.
      </p>
      <Link
        href="/blog"
        className="btn btn-primary"
      >
        Volver al blog
      </Link>
    </div>
  );
} 