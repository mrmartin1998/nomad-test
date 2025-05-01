'use client';

import React from 'react';
import Form from '@/components/forms/uk/Form';

const ApplyPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Solicitud de Visa para Reino Unido</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Complete el siguiente formulario para solicitar su visa para el Reino Unido. 
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
        </ul>
      </div>

      {/* Important Information Section */}
      <div className="bg-base-200 rounded-lg p-6 mb-12">
        <h2 className="text-2xl font-semibold mb-4">Información Importante</h2>
        <div className="space-y-4">
          <div className="alert alert-info">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <div>
              <h3 className="font-bold">Proceso de Solicitud</h3>
              <p>El proceso de revisión puede tomar hasta 15 días hábiles.</p>
            </div>
          </div>
          <div className="alert alert-warning">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
            </svg>
            <div>
              <h3 className="font-bold">Veracidad de la Información</h3>
              <p>Proporcionar información falsa puede resultar en el rechazo de su solicitud y restricciones futuras.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className="max-w-4xl mx-auto">
        <Form />
      </div>

      {/* Footer Section */}
      <div className="mt-12 text-center text-sm text-gray-600">
        <p>
          Para cualquier consulta, por favor contacte a nuestro equipo de soporte.
        </p>
        <p className="mt-2">
          Horario de atención: Lunes a Viernes, 9:00 AM - 5:00 PM
        </p>
      </div>
    </div>
  );
};

export default ApplyPage;
