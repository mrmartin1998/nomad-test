'use client';

import React from 'react';
import Form from '@/components/forms/cuba/Form';

const CubaApplyPage = () => {
  return (
    <div className="min-h-screen bg-base-100 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Solicitud de Visa para Cuba</h1>
            <p className="text-lg text-base-content/70">
              Complete el siguiente formulario para solicitar su visa para Cuba. 
              Todos los campos marcados con * son obligatorios.
            </p>
          </div>

          <div className="alert alert-info mb-8">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <div>
              <h3 className="font-bold">Información Importante</h3>
              <div className="text-sm">
                <p>• Por favor, asegúrese de tener todos los documentos necesarios antes de comenzar.</p>
                <p>• El proceso puede tardar hasta 15 días hábiles.</p>
                <p>• Se le notificará por correo electrónico sobre el estado de su solicitud.</p>
              </div>
            </div>
          </div>

          <Form />
        </div>
      </div>
    </div>
  );
};

export default CubaApplyPage;
