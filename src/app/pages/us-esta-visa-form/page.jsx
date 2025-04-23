'use client';

import React from 'react';
import Link from 'next/link';
import Form from "@/components/forms/us/Form";

export default function USVisaFormPage() {
  return (
    <div className="min-h-screen bg-base-100">
      {/* Navigation */}
      <div className="navbar bg-base-200">
        <div className="container mx-auto">
          <div className="flex-1">
            <Link href="/" className="btn btn-ghost text-xl">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              Atrás
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-primary mb-4">
              Solicitud de Visa ESTA para Estados Unidos
            </h1>
            <div className="divider"></div>
            <p className="text-base-content/70">
              Complete el formulario con su información personal y documentos requeridos
            </p>
          </div>

          {/* Progress Steps */}
          <ul className="steps steps-horizontal w-full mb-12">
            <li className="step step-primary">Información Personal</li>
            <li className="step step-primary">Información Profesional</li>
            <li className="step step-primary">Documentos</li>
          </ul>

          {/* Form */}
          <Form />
        </div>
      </div>
    </div>
  );
} 