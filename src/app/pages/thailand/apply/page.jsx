'use client';

import React from 'react';
import Form from '@/components/forms/thailand/Form';

const ApplyPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Solicitud de Visa para Tailandia</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Complete el siguiente formulario para solicitar su visa para Tailandia. 
          Asegúrese de tener todos los documentos requeridos antes de comenzar.
        </p>
      </div>

      {/* Required Documents Section */}
      <div className="bg-base-200 rounded-lg p-6 mb-12">
        <h2 className="text-2xl font-semibold mb-4">Documentos Requeridos</h2>
        <ul className="space-y-3">
          <li className="flex items-center gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Pasaporte válido con al menos 6 meses de vigencia</span>
          </li>
          <li className="flex items-center gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Fotografía reciente tipo carnet (fondo blanco, 2x2 pulgadas)</span>
          </li>
          <li className="flex items-center gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Boleto de salida de Tailandia</span>
          </li>
          <li className="flex items-center gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Reserva de hotel o carta de invitación</span>
          </li>
        </ul>
      </div>

      {/* Form Section */}
      <div className="max-w-4xl mx-auto">
        <Form />
      </div>

      {/* Important Information Section */}
      <div className="mt-12 text-center text-sm text-gray-600">
        <p>
          Al enviar este formulario, usted acepta nuestros{' '}
          <a href="/terms" className="link link-primary">Términos y Condiciones</a>
          {' '}y{' '}
          <a href="/privacy" className="link link-primary">Política de Privacidad</a>
        </p>
        <p className="mt-2">
          Para cualquier consulta, por favor contacte a nuestro equipo de soporte.
        </p>
      </div>
    </div>
  );
};

export default ApplyPage;

