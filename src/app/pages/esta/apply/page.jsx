'use client';

import React from 'react';
import Form from '@/components/forms/us/Form';

const ApplyPage = () => {
  return (
    <div className="min-h-screen bg-base-100">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Solicitud de ESTA para Estados Unidos</h1>
            <p className="text-lg text-base-content/70">
              Complete el siguiente formulario para solicitar su autorización ESTA para viajar a Estados Unidos.
              Asegúrese de tener todos los documentos necesarios antes de comenzar.
            </p>
          </div>

          <div className="bg-base-200 rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-4">📋 Documentos Requeridos</h2>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <span className="text-primary">✓</span>
                Pasaporte válido con al menos 6 meses de vigencia
              </li>
              <li className="flex items-center gap-2">
                <span className="text-primary">✓</span>
                Comprobante de empleo o carta de trabajo
              </li>
              <li className="flex items-center gap-2">
                <span className="text-primary">✓</span>
                Fotografía reciente tipo pasaporte
              </li>
              <li className="flex items-center gap-2">
                <span className="text-primary">✓</span>
                Información de contacto en Estados Unidos
              </li>
            </ul>
          </div>

          <Form />
        </div>
      </div>
    </div>
  );
};

export default ApplyPage;
