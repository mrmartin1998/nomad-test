'use client';

import React, { useState } from 'react';
import EnhancedForm from '@/components/forms/enhanced/EnhancedForm';
import FormInput from '@/components/forms/enhanced/FormInput';
import FormSelect from '@/components/forms/enhanced/FormSelect';
import CubaUpload from '@/components/upload/country/CubaUpload';

// Step Components
const PersonalInfoStep = ({ formData, setFormData, errors }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ [name]: value });
  };

  const countryOptions = [
    { value: 'cuba', label: 'Cuba' },
    { value: 'us', label: 'Estados Unidos' },
    { value: 'mx', label: 'México' },
    { value: 'ca', label: 'Canadá' },
    { value: 'es', label: 'España' },
    { value: 'ar', label: 'Argentina' },
    { value: 'co', label: 'Colombia' },
    { value: 've', label: 'Venezuela' }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <FormInput
        label="Nombre Completo"
        name="nombreCompleto"
        value={formData.nombreCompleto}
        onChange={handleChange}
        error={errors.nombreCompleto}
        placeholder="Ingrese su nombre completo"
        required
        autoComplete="name"
        icon={
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
          </svg>
        }
        helpText="Ingrese su nombre como aparece en su pasaporte"
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
      />

      <FormInput
        label="Fecha de Nacimiento"
        name="fechaNacimiento"
        type="date"
        value={formData.fechaNacimiento}
        onChange={handleChange}
        error={errors.fechaNacimiento}
        required
        icon={
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5a2.25 2.25 0 002.25-2.25m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5a2.25 2.25 0 012.25 2.25v7.5" />
          </svg>
        }
      />

      <FormInput
        label="Fecha Estimada de Entrada"
        name="fechaEntradaEstimada"
        type="date"
        value={formData.fechaEntradaEstimada}
        onChange={handleChange}
        error={errors.fechaEntradaEstimada}
        required
        icon={
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5a2.25 2.25 0 002.25-2.25m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5a2.25 2.25 0 012.25 2.25v7.5" />
          </svg>
        }
        helpText="Fecha aproximada de su llegada a Cuba"
      />

      <div className="md:col-span-2">
        <FormInput
          label="Dirección de Alojamiento en Cuba"
          name="direccionAlojamientoCuba"
          value={formData.direccionAlojamientoCuba}
          onChange={handleChange}
          error={errors.direccionAlojamientoCuba}
          placeholder="Ingrese su dirección de alojamiento en Cuba"
          required
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
            </svg>
          }
        />
      </div>

      <FormInput
        label="Número de Vuelo de Entrada"
        name="vueloEntrada"
        value={formData.vueloEntrada}
        onChange={handleChange}
        error={errors.vueloEntrada}
        placeholder="Ej: AA1234"
        icon={
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
          </svg>
        }
        helpText="Número de vuelo de su llegada a Cuba (opcional)"
      />

      <FormInput
        label="Dirección de Residencia"
        name="direccionResidencia"
        value={formData.direccionResidencia}
        onChange={handleChange}
        error={errors.direccionResidencia}
        placeholder="Ingrese su dirección de residencia actual"
        required
        icon={
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
          </svg>
        }
      />

      <FormInput
        label="Correo Electrónico"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        error={errors.email}
        placeholder="su.email@ejemplo.com"
        required
        autoComplete="email"
        icon={
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75z" />
          </svg>
        }
      />

      <FormInput
        label="Teléfono"
        name="telefono"
        type="tel"
        value={formData.telefono}
        onChange={handleChange}
        error={errors.telefono}
        placeholder="+1 (555) 123-4567"
        required
        autoComplete="tel"
        icon={
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
          </svg>
        }
      />

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
        helpText="Número de pasaporte como aparece en el documento"
      />
    </div>
  );
};

const DeliveryAndConsentStep = ({ formData, setFormData, errors }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ [name]: value });
  };

  const deliveryOptions = [
    { value: 'correo', label: 'Correo Postal' },
    { value: 'recogida', label: 'Recogida en Oficina' }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <FormSelect
        label="¿Quieres recibir la tarjeta por correo o recogerla?"
        name="metodoEntrega"
        value={formData.metodoEntrega}
        onChange={handleChange}
        options={deliveryOptions}
        error={errors.metodoEntrega}
        placeholder="Seleccione método de entrega"
        required
        icon={
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m6.75 4.5v-6a2.25 2.25 0 00-2.25-2.25H6a2.25 2.25 0 00-2.25 2.25v6m7.5 0V9.75a2.25 2.25 0 00-2.25-2.25H9a2.25 2.25 0 00-2.25 2.25v9.75m7.5 0V9.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25v9.75m-7.5 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m6.75 4.5v-6a2.25 2.25 0 00-2.25-2.25H6a2.25 2.25 0 00-2.25 2.25v6" />
          </svg>
        }
        helpText="Cómo desea recibir su tarjeta turística"
      />

      {formData.metodoEntrega === 'correo' && (
        <div className="md:col-span-2">
          <FormInput
            label="Dirección de envío (si aplica)"
            name="direccionEnvio"
            value={formData.direccionEnvio}
            onChange={handleChange}
            error={errors.direccionEnvio}
            placeholder="Ingrese su dirección completa para envío"
            required
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
              </svg>
            }
          />
        </div>
      )}

      <div className="md:col-span-2">
        <div className="form-control">
          <label className="label cursor-pointer justify-start gap-4">
            <input
              type="checkbox"
              name="consentimientoProcesamiento"
              checked={formData.consentimientoProcesamiento || false}
              onChange={(e) => handleChange({ target: { name: 'consentimientoProcesamiento', value: e.target.checked } })}
              className="checkbox checkbox-primary"
            />
            <span className="label-text">
              <strong>Consentimiento para el procesamiento del trámite</strong> - Acepto el procesamiento de mis datos personales para la solicitud de tarjeta turística
            </span>
          </label>
          {errors.consentimientoProcesamiento && (
            <label className="label">
              <span className="label-text-alt text-error">{errors.consentimientoProcesamiento}</span>
            </label>
          )}
        </div>
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
      <CubaUpload
        onFileSelect={handleFileSelect}
        onUploadComplete={handleUploadComplete}
        error={errors.passportDocument}
      />
    </div>
  );
};

export default function CubaFormPage() {
  const [submissionResult, setSubmissionResult] = useState(null);

  // Form step configuration
  const formSteps = [
    {
      title: "Información Personal",
      description: "Datos personales y de contacto",
      estimatedTime: 4,
      component: PersonalInfoStep,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-primary">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
        </svg>
      ),
      helpText: "Asegúrese de que toda la información coincida exactamente con su pasaporte.",
      validate: (data) => {
        const errors = {};
        if (!data.nombreCompleto) errors.nombreCompleto = 'El nombre completo es requerido';
        if (!data.nacionalidad) errors.nacionalidad = 'La nacionalidad es requerida';
        if (!data.fechaNacimiento) errors.fechaNacimiento = 'La fecha de nacimiento es requerida';
        if (!data.numeroPasaporte) errors.numeroPasaporte = 'El número de pasaporte es requerido';
        if (!data.fechaEntradaEstimada) errors.fechaEntradaEstimada = 'La fecha estimada de entrada es requerida';
        if (!data.direccionAlojamientoCuba) errors.direccionAlojamientoCuba = 'La dirección de alojamiento en Cuba es requerida';
        if (!data.direccionResidencia) errors.direccionResidencia = 'La dirección de residencia en España es requerida';
        if (!data.email) errors.email = 'El correo electrónico es requerido';
        if (!data.telefono) errors.telefono = 'El teléfono es requerido';
        return errors;
      }
    },
    {
      title: "Entrega y Consentimiento",
      description: "Método de entrega y consentimiento",
      estimatedTime: 2,
      component: DeliveryAndConsentStep,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-primary">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m6.75 4.5v-6a2.25 2.25 0 00-2.25-2.25H6a2.25 2.25 0 00-2.25 2.25v6m7.5 0V9.75a2.25 2.25 0 00-2.25-2.25H9a2.25 2.25 0 00-2.25 2.25v9.75m7.5 0V9.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25v9.75m-7.5 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m6.75 4.5v-6a2.25 2.25 0 00-2.25-2.25H6a2.25 2.25 0 00-2.25 2.25v6" />
        </svg>
      ),
      helpText: "Seleccione cómo desea recibir su tarjeta turística y acepte los términos.",
      validate: (data) => {
        const errors = {};
        if (!data.metodoEntrega) errors.metodoEntrega = 'El método de entrega es requerido';
        if (data.metodoEntrega === 'correo' && !data.direccionEnvio) {
          errors.direccionEnvio = 'La dirección de envío es requerida';
        }
        if (!data.consentimientoProcesamiento) {
          errors.consentimientoProcesamiento = 'Debe aceptar el procesamiento de sus datos personales';
        }
        return errors;
      }
    },
    {
      title: "Documentos",
      description: "Suba los documentos requeridos",
      estimatedTime: 3,
      component: DocumentUploadStep,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-primary">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m6.75 12l-3-3m0 0l-3 3m3-3v6m-1.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c-.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
        </svg>
      ),
      helpText: "Asegúrese de que sus documentos sean claros y legibles. Formatos aceptados: PDF, JPG, PNG.",
      validate: (data) => {
        const errors = {};
        if (!data.passportDocument) errors.passportDocument = 'El documento del pasaporte es requerido';
        return errors;
      }
    }
  ];

  const handleSubmit = async (formData) => {
    // Simulate API submission
    console.log('Submitting Cuba form data:', formData);
    
    await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate delay
    
    setSubmissionResult({
      success: true,
      message: 'Su solicitud de tarjeta turística para Cuba ha sido enviada exitosamente!',
      applicationId: 'CUBA-TC-' + Math.random().toString(36).substr(2, 9).toUpperCase()
    });
  };

  const handleStepChange = (stepIndex, formData) => {
    console.log(`Step changed to ${stepIndex}:`, formData);
  };

  if (submissionResult?.success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-red-50 flex items-center justify-center">
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
            Nueva Solicitud
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
            <a className="btn btn-ghost text-xl" href="/pages/cuba">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              Volver
            </a>
          </div>
        </div>
      </div>

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-primary to-secondary text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center">
            🇨🇺 Solicitud de Tarjeta Turística Cuba
          </h1>
          <p className="text-xl text-center mt-4 opacity-90">
            Complete su solicitud de tarjeta turística para Cuba con nuestro sistema mejorado
          </p>
        </div>
      </div>

      {/* Enhanced Form */}
      <EnhancedForm
        steps={formSteps}
        onSubmit={handleSubmit}
        onStepChange={handleStepChange}
        autoSave={true}
        autoSaveKey="cuba-tc-form"
        countryTheme="cuba"
      />
    </div>
  );
}
