'use client';

import React, { useState } from 'react';
import PersonalInfo from './components/PersonalInfo';
import DocumentUpload from './components/DocumentUpload';

const Form = () => {
  const [formData, setFormData] = useState({
    // Personal Information
    nombreCompleto: '',
    fechaNacimiento: '',
    lugarNacimiento: '',
    nacionalidad: '',
    // Contact Information
    email: '',
    telefono: '',
    direccionResidencia: '',
    // Passport Details
    numeroPasaporte: '',
    fechaEmisionPasaporte: '',
    fechaExpiracionPasaporte: '',
    // Documents
    documentos: {
      fotoCarnet: null,
      pasaporteEscaneado: null
    },
    // Security & Legal
    antecedentesPenales: false,
    rechazosMigratorios: false,
    consentimientoDatos: false,
    // Application Status
    estado: 'pendiente',
    fechaCreacion: new Date().toISOString()
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    // Personal Information Validation
    if (!formData.nombreCompleto) newErrors.nombreCompleto = 'El nombre completo es requerido';
    if (!formData.fechaNacimiento) newErrors.fechaNacimiento = 'La fecha de nacimiento es requerida';
    if (!formData.lugarNacimiento) newErrors.lugarNacimiento = 'El lugar de nacimiento es requerido';
    if (!formData.nacionalidad) newErrors.nacionalidad = 'La nacionalidad es requerida';

    // Contact Information Validation
    if (!formData.email) newErrors.email = 'El correo electrónico es requerido';
    if (!formData.telefono) newErrors.telefono = 'El teléfono es requerido';
    if (!formData.direccionResidencia) newErrors.direccionResidencia = 'La dirección de residencia es requerida';

    // Passport Validation
    if (!formData.numeroPasaporte) newErrors.numeroPasaporte = 'El número de pasaporte es requerido';
    if (!formData.fechaEmisionPasaporte) newErrors.fechaEmisionPasaporte = 'La fecha de emisión del pasaporte es requerida';
    if (!formData.fechaExpiracionPasaporte) newErrors.fechaExpiracionPasaporte = 'La fecha de expiración del pasaporte es requerida';

    // Document Validation
    if (!formData.documentos.fotoCarnet) {
      newErrors.documentos = {
        ...newErrors.documentos,
        fotoCarnet: 'La fotografía es requerida'
      };
    }
    if (!formData.documentos.pasaporteEscaneado) {
      newErrors.documentos = {
        ...newErrors.documentos,
        pasaporteEscaneado: 'El escaneo del pasaporte es requerido'
      };
    }

    // Security & Legal Validation
    if (formData.antecedentesPenales === undefined) newErrors.antecedentesPenales = 'Debe indicar si tiene antecedentes penales';
    if (formData.rechazosMigratorios === undefined) newErrors.rechazosMigratorios = 'Debe indicar si ha sido rechazado previamente';
    if (!formData.consentimientoDatos) newErrors.consentimientoDatos = 'Debe aceptar el procesamiento de sus datos';

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
      const response = await fetch('/api/uk', {
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
        nombreCompleto: '',
        fechaNacimiento: '',
        lugarNacimiento: '',
        nacionalidad: '',
        email: '',
        telefono: '',
        direccionResidencia: '',
        numeroPasaporte: '',
        fechaEmisionPasaporte: '',
        fechaExpiracionPasaporte: '',
        documentos: {
          fotoCarnet: null,
          pasaporteEscaneado: null
        },
        antecedentesPenales: false,
        rechazosMigratorios: false,
        consentimientoDatos: false,
        estado: 'pendiente',
        fechaCreacion: new Date().toISOString()
      });
      
    } catch (error) {
      console.error('Error:', error);
      setErrors({
        submit: 'Error al enviar la solicitud. Por favor, intente nuevamente.'
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

export default Form;
