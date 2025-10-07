'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import EnhancedForm from '@/components/forms/enhanced/EnhancedForm';
import FormInput from '@/components/forms/enhanced/FormInput';
import FormSelect from '@/components/forms/enhanced/FormSelect';
import CostaRicaUpload from '@/components/upload/country/CostaRicaUpload';

// Costa Rica Specific Step Components
const PersonalInfoStep = ({ formData, setFormData, errors }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ [name]: value });
  };

  const countryOptions = [
    { value: 'cr', label: 'Costa Rica' },
    { value: 'us', label: 'United States' },
    { value: 'ca', label: 'Canada' },
    { value: 'mx', label: 'Mexico' },
    { value: 'br', label: 'Brazil' },
    { value: 'ar', label: 'Argentina' },
    { value: 'cl', label: 'Chile' },
    { value: 'co', label: 'Colombia' },
    { value: 'es', label: 'Spain' },
    { value: 'fr', label: 'France' },
    { value: 'de', label: 'Germany' },
    { value: 'it', label: 'Italy' },
    { value: 'jp', label: 'Japan' },
    { value: 'kr', label: 'South Korea' },
    { value: 'au', label: 'Australia' },
    { value: 'nz', label: 'New Zealand' }
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormInput
          label="Nombre"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          error={errors.nombre}
          placeholder="Ingrese su nombre"
          required
          autoComplete="given-name"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>
          }
          helpText="Ingrese su nombre como aparece en su pasaporte"
        />

        <FormInput
          label="Apellidos"
          name="apellidos"
          value={formData.apellidos}
          onChange={handleChange}
          error={errors.apellidos}
          placeholder="Ingrese sus apellidos"
          required
          autoComplete="family-name"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>
          }
        />

        <FormInput
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          placeholder="ejemplo@correo.com"
          required
          autoComplete="email"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75z" />
            </svg>
          }
        />

        <FormSelect
          label="Nacionalidad"
          name="nacionalidad"
          value={formData.nacionalidad}
          onChange={handleChange}
          options={countryOptions}
          error={errors.nacionalidad}
          placeholder="Seleccione su nacionalidad"
          required
          searchable
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 3v1.5M3 21v-6m0 0l2.77-.693a9 9 0 016.208.682l.108.054a9 9 0 006.086.71l3.114-.732a48.524 48.524 0 01-.005-10.499l-3.11.732a9 9 0 01-6.085-.711l-.108-.054a9 9 0 00-6.208-.682L3 4.5M3 15V4.5" />
            </svg>
          }
          helpText="Seleccione el país que emitió su pasaporte"
        />

        <div className="md:col-span-2">
          <FormInput
            label="Número de Pasaporte"
            name="numeroPasaporte"
            value={formData.numeroPasaporte}
            onChange={handleChange}
            error={errors.numeroPasaporte}
            placeholder="Ingrese su número de pasaporte"
            required
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0z" />
              </svg>
            }
          />
        </div>
      </div>
    </div>
  );
};

const ProfessionalInfoStep = ({ formData, setFormData, errors }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ [name]: value });
  };

  const employmentOptions = [
    { value: 'empleado', label: 'Empleado' },
    { value: 'independiente', label: 'Independiente' },
    { value: 'empresario', label: 'Empresario' },
    { value: 'otro', label: 'Otro' }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormSelect
          label="Tipo de Empleo"
          name="tipoEmpleo"
          value={formData.tipoEmpleo}
          onChange={handleChange}
          options={employmentOptions}
          error={errors.tipoEmpleo}
          placeholder="Seleccione tipo de empleo"
          required
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
            </svg>
          }
        />

        <FormInput
          label="Ingresos Mensuales (USD)"
          name="ingresosMensuales"
          type="number"
          value={formData.ingresosMensuales}
          onChange={handleChange}
          error={errors.ingresosMensuales}
          placeholder="0.00"
          required
          min="0"
          step="0.01"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
          helpText="Ingrese sus ingresos mensuales en dólares estadounidenses"
        />
      </div>
    </div>
  );
};

const DocumentUploadStep = ({ formData, setFormData, errors }) => {
  const handleFileSelect = (file) => {
    console.log('File selected:', file);
    setFormData({ passportDocument: file });
  };

  const handleUploadComplete = (file) => {
    console.log('Upload completed:', file);
  };

  return (
    <div className="space-y-8">
      <CostaRicaUpload
        onFileSelect={handleFileSelect}
        onUploadComplete={handleUploadComplete}
        error={errors.passportDocument}
      />
    </div>
  );
};

export default function CostaRicaFormPage() {
  const [submissionResult, setSubmissionResult] = useState(null);

  // Form step configuration for Costa Rica
  const formSteps = [
    {
      title: "Información Personal",
      description: "Cuéntanos sobre ti",
      estimatedTime: 5,
      component: PersonalInfoStep,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-primary">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
        </svg>
      ),
      helpText: "Asegúrese de que toda la información coincida exactamente con su pasaporte.",
      validate: (data) => {
        const errors = {};
        if (!data.nombre) errors.nombre = 'El nombre es requerido';
        if (!data.apellidos) errors.apellidos = 'Los apellidos son requeridos';
        if (!data.email) errors.email = 'El email es requerido';
        if (!data.nacionalidad) errors.nacionalidad = 'La nacionalidad es requerida';
        if (!data.numeroPasaporte) errors.numeroPasaporte = 'El número de pasaporte es requerido';
        return errors;
      }
    },
    {
      title: "Información Profesional",
      description: "Proporcione sus datos laborales",
      estimatedTime: 3,
      component: ProfessionalInfoStep,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-primary">
          <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
        </svg>
      ),
      helpText: "Proporcione información profesional precisa para su solicitud.",
      validate: (data) => {
        const errors = {};
        if (!data.tipoEmpleo) errors.tipoEmpleo = 'El tipo de empleo es requerido';
        if (!data.ingresosMensuales) errors.ingresosMensuales = 'Los ingresos mensuales son requeridos';
        return errors;
      }
    },
    {
      title: "Documentos Requeridos",
      description: "Suba los documentos necesarios",
      estimatedTime: 5,
      component: DocumentUploadStep,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-primary">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m6.75 12l-3-3m0 0l-3 3m3-3v6m-1.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c-.621 0-1.125-.504-1.125-1.125V11.25a9 9 0 00-9-9z" />
        </svg>
      ),
      helpText: "Asegúrese de que sus documentos sean claros y legibles. Formatos aceptados: PDF, JPG, PNG.",
      validate: (data) => {
        const errors = {};
        if (!data.passportDocument) errors.passportDocument = 'El documento de pasaporte es requerido';
        return errors;
      }
    }
  ];

  const handleSubmit = async (formData) => {
    // Simulate API submission
    console.log('Submitting Costa Rica form data:', formData);
    
    await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate delay
    
    setSubmissionResult({
      success: true,
      message: 'Su solicitud de visa para Costa Rica ha sido enviada exitosamente!',
      applicationId: 'CR-' + Math.random().toString(36).substr(2, 9).toUpperCase()
    });
  };

  const handleStepChange = (stepIndex, formData) => {
    console.log(`Step changed to ${stepIndex}:`, formData);
  };

  if (submissionResult?.success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center">
        <div className="max-w-lg mx-auto bg-base-100 rounded-2xl shadow-xl p-8 text-center">
          <div className="w-16 h-16 bg-success rounded-full flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8 text-success-content">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-success mb-2">¡Solicitud Enviada!</h1>
          <p className="text-base-content/70 mb-4">{submissionResult.message}</p>
          <div className="bg-base-200 rounded-lg p-3 mb-6">
            <p className="text-sm text-base-content/60">ID de Solicitud</p>
            <p className="font-mono font-bold">{submissionResult.applicationId}</p>
          </div>
          <button 
            className="btn btn-primary"
            onClick={() => window.location.reload()}
          >
            Iniciar Nueva Solicitud
          </button>
        </div>
      </div>
    );
  }

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
              Volver
            </Link>
          </div>
        </div>
      </div>

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-primary to-secondary text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center">
            🚀 Solicitud de Visa Costa Rica
            </h1>
          <p className="text-xl text-center mt-4 opacity-90">
              Complete el formulario con sus datos personales y documentos requeridos
            </p>
        </div>
      </div>

      {/* Enhanced Form */}
      <EnhancedForm
        steps={formSteps}
        onSubmit={handleSubmit}
        onStepChange={handleStepChange}
        autoSave={true}
        autoSaveKey="costa-rica-visa-form"
        countryTheme="costa-rica"
      />
    </div>
  );
} 