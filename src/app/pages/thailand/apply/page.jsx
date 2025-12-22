'use client';

import React from 'react';
import ThailandForm from '@/components/forms/thailand/Form';

export default function ThailandApplyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-yellow-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Solicitud de Visa para Tailandia</h1>
          <p className="text-base-content/70">
            Complete todos los campos requeridos y suba los documentos necesarios para su solicitud de visa para Tailandia.
          </p>
        </div>
        
        <ThailandForm />
      </div>
    </div>
  );
}