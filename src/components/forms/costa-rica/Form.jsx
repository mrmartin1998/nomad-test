'use client';

import React, { useState } from 'react';
import PersonalInfo from './components/PersonalInfo';
import ProfessionalInfo from './components/ProfessionalInfo';
import DocumentUpload from './components/DocumentUpload';

const CostaRicaForm = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellidos: '',
    email: '',
    nacionalidad: '',
    numeroPasaporte: '',
    tipoEmpleo: '',
    ingresosMensuales: '',
    documentos: {}
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    // Personal Info Validation
    if (!formData.nombre) newErrors.nombre = 'El nombre es requerido';
    if (!formData.apellidos) newErrors.apellidos = 'Los apellidos son requeridos';
    if (!formData.email) newErrors.email = 'El email es requerido';
    if (!formData.nacionalidad) newErrors.nacionalidad = 'La nacionalidad es requerida';
    if (!formData.numeroPasaporte) newErrors.numeroPasaporte = 'El número de pasaporte es requerido';

    // Professional Info Validation
    if (!formData.tipoEmpleo) newErrors.tipoEmpleo = 'El tipo de empleo es requerido';
    if (!formData.ingresosMensuales) newErrors.ingresosMensuales = 'Los ingresos mensuales son requeridos';

    // Document Validation
    if (!formData.documentos.pasaporte) {
      newErrors.documentos = {
        ...newErrors.documentos,
        pasaporte: 'El pasaporte es requerido'
      };
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error al enviar la solicitud');
      }

      // Success handling
      alert('Solicitud enviada exitosamente');
      setFormData({
        nombre: '',
        apellidos: '',
        email: '',
        nacionalidad: '',
        numeroPasaporte: '',
        tipoEmpleo: '',
        ingresosMensuales: '',
        documentos: {}
      });
      
    } catch (error) {
      console.error('Error:', error);
      setErrors({
        submit: 'Error al enviar el formulario. Por favor intente nuevamente.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="card bg-base-200 shadow-xl">
      <div className="card-body">
        <form onSubmit={handleSubmit} className="space-y-12">
          <PersonalInfo 
            formData={formData}
            setFormData={setFormData}
            errors={errors}
          />

          <div className="divider"></div>

          <ProfessionalInfo 
            formData={formData}
            setFormData={setFormData}
            errors={errors}
          />

          <div className="divider"></div>

          <DocumentUpload 
            formData={formData}
            setFormData={setFormData}
            errors={errors}
          />

          {errors.submit && (
            <div className="alert alert-error">
              <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{errors.submit}</span>
            </div>
          )}

          <div className="flex justify-center pt-6">
            <button
              type="submit"
              className={`btn btn-primary btn-lg gap-2 ${isSubmitting ? 'loading' : ''}`}
              disabled={isSubmitting}
            >
              {!isSubmitting && (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                </svg>
              )}
              {isSubmitting ? 'Enviando...' : 'Enviar Solicitud'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CostaRicaForm;
