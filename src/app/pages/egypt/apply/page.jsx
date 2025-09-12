'use client';

import React, { useState } from 'react';
import EnhancedForm from '@/components/forms/enhanced/EnhancedForm';
import FormInput from '@/components/forms/enhanced/FormInput';
import FormSelect from '@/components/forms/enhanced/FormSelect';
import EgyptUpload from '@/components/upload/country/EgyptUpload';

// Step Components
const PersonalInfoStep = ({ formData, setFormData, errors }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ [name]: value });
  };

  const countryOptions = [
    { value: 'eg', label: 'Egipto' },
    { value: 'us', label: 'Estados Unidos' },
    { value: 'ca', label: 'Canadá' },
    { value: 'uk', label: 'Reino Unido' },
    { value: 'mx', label: 'México' },
    { value: 'br', label: 'Brasil' },
    { value: 'ar', label: 'Argentina' },
    { value: 'co', label: 'Colombia' }
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
      />

      <FormInput
        label="Fecha de Emisión del Pasaporte"
        name="fechaEmisionPasaporte"
        type="date"
        value={formData.fechaEmisionPasaporte}
        onChange={handleChange}
        error={errors.fechaEmisionPasaporte}
        required
        icon={
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5a2.25 2.25 0 002.25-2.25m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5a2.25 2.25 0 012.25 2.25v7.5" />
          </svg>
        }
      />

      <FormInput
        label="Fecha de Expiración del Pasaporte"
        name="fechaExpiracionPasaporte"
        type="date"
        value={formData.fechaExpiracionPasaporte}
        onChange={handleChange}
        error={errors.fechaExpiracionPasaporte}
        required
        helpText="Debe ser válido por al menos 6 meses desde la fecha de viaje"
        icon={
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5a2.25 2.25 0 002.25-2.25m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5a2.25 2.25 0 012.25 2.25v7.5" />
          </svg>
        }
      />

      <div className="md:col-span-2">
        <FormInput
          label="Dirección de Residencia"
          name="direccionResidencia"
          value={formData.direccionResidencia}
          onChange={handleChange}
          error={errors.direccionResidencia}
          placeholder="Ingrese su dirección de residencia"
          required
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
            </svg>
          }
        />
      </div>
    </div>
  );
};


const TravelInfoStep = ({ formData, setFormData, errors }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ [name]: value });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="md:col-span-2">
        <FormInput
          label="Itinerario de Viaje (Fechas Aproximadas)"
          name="itinerarioViaje"
          value={formData.itinerarioViaje}
          onChange={handleChange}
          error={errors.itinerarioViaje}
          placeholder="Ej: 15-30 de marzo 2024, visitando El Cairo, Luxor y Alejandría"
          required
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5a2.25 2.25 0 002.25-2.25m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5a2.25 2.25 0 012.25 2.25v7.5" />
            </svg>
          }
          helpText="Describa su plan de viaje con fechas aproximadas y lugares que visitará"
        />
      </div>

      <div className="md:col-span-2">
        <FormInput
          label="Hotel o Alojamiento en Egipto"
          name="alojamientoEgipto"
          value={formData.alojamientoEgipto}
          onChange={handleChange}
          error={errors.alojamientoEgipto}
          placeholder="Nombre del hotel, dirección y detalles de contacto"
          required
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.5V3m-3.75 9.75v10.5" />
            </svg>
          }
          helpText="Proporcione información detallada sobre su alojamiento en Egipto"
        />
      </div>
    </div>
  );
};

const DocumentUploadStep = ({ formData, setFormData, errors }) => {
  const handleFileSelect = (file, documentType) => {
    console.log('File selected:', file, documentType);
    setFormData(prev => ({
      ...prev,
      [documentType]: file
    }));
  };

  const handleUploadComplete = (file, documentType) => {
    console.log('Upload completed:', file, documentType);
  };

  return (
    <div className="space-y-8">
      <EgyptUpload
        onFileSelect={(file) => handleFileSelect(file, 'fotoCarnet')}
        onUploadComplete={(file) => handleUploadComplete(file, 'fotoCarnet')}
        error={errors.fotoCarnet}
        documentType="foto"
      />
      
      <EgyptUpload
        onFileSelect={(file) => handleFileSelect(file, 'pasaporteEscaneado')}
        onUploadComplete={(file) => handleUploadComplete(file, 'pasaporteEscaneado')}
        error={errors.pasaporteEscaneado}
        documentType="pasaporte"
      />
    </div>
  );
};

const ConsentStep = ({ formData, setFormData, errors }) => {
  const handleChange = (e) => {
    const { name, checked } = e.target;
    setFormData({ [name]: checked });
  };

  return (
    <div className="space-y-6">
      <div className="alert alert-info">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        <div>
          <h3 className="font-bold">Consentimiento Legal</h3>
          <div className="text-sm">
            <p>Para completar su solicitud de eVisa, debe aceptar los siguientes términos y condiciones.</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <label className="label cursor-pointer justify-start gap-4">
          <input
            type="checkbox"
            name="consentimientoProcesamiento"
            checked={formData.consentimientoProcesamiento || false}
            onChange={handleChange}
            className="checkbox checkbox-primary"
          />
          <span className="label-text">
            <strong>Consentimiento de Procesamiento de Datos:</strong> Acepto que mis datos personales sean procesados para la tramitación de mi solicitud de eVisa para Egipto.
          </span>
        </label>
        {errors.consentimientoProcesamiento && (
          <p className="text-error text-sm">{errors.consentimientoProcesamiento}</p>
        )}

        <label className="label cursor-pointer justify-start gap-4">
          <input
            type="checkbox"
            name="veracidadInformacion"
            checked={formData.veracidadInformacion || false}
            onChange={handleChange}
            className="checkbox checkbox-primary"
          />
          <span className="label-text">
            <strong>Veracidad de la Información:</strong> Declaro que toda la información proporcionada es verdadera y completa.
          </span>
        </label>
        {errors.veracidadInformacion && (
          <p className="text-error text-sm">{errors.veracidadInformacion}</p>
        )}

        <label className="label cursor-pointer justify-start gap-4">
          <input
            type="checkbox"
            name="aceptacionTerminos"
            checked={formData.aceptacionTerminos || false}
            onChange={handleChange}
            className="checkbox checkbox-primary"
          />
          <span className="label-text">
            <strong>Aceptación de Términos y Condiciones:</strong> Acepto los términos y condiciones del servicio y las políticas de privacidad.
          </span>
        </label>
        {errors.aceptacionTerminos && (
          <p className="text-error text-sm">{errors.aceptacionTerminos}</p>
        )}
      </div>
    </div>
  );
};

export default function EgyptFormPage() {
  const [submissionResult, setSubmissionResult] = useState(null);

  const formSteps = [
    {
      title: "Información Personal",
      description: "Ingrese sus datos personales y del pasaporte",
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
        if (!data.nombreCompleto) errors.nombreCompleto = 'El nombre completo es requerido';
        if (!data.fechaNacimiento) errors.fechaNacimiento = 'La fecha de nacimiento es requerida';
        if (!data.nacionalidad) errors.nacionalidad = 'La nacionalidad es requerida';
        if (!data.email) errors.email = 'El correo electrónico es requerido';
        if (!data.telefono) errors.telefono = 'El teléfono es requerido';
        if (!data.direccionResidencia) errors.direccionResidencia = 'La dirección de residencia es requerida';
        if (!data.numeroPasaporte) errors.numeroPasaporte = 'El número de pasaporte es requerido';
        if (!data.fechaEmisionPasaporte) errors.fechaEmisionPasaporte = 'La fecha de emisión del pasaporte es requerida';
        if (!data.fechaExpiracionPasaporte) errors.fechaExpiracionPasaporte = 'La fecha de expiración del pasaporte es requerida';
        return errors;
      }
    },
    {
      title: "Información de Viaje",
      description: "Detalles de su itinerario y alojamiento",
      estimatedTime: 3,
      component: TravelInfoStep,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-primary">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5a2.25 2.25 0 002.25-2.25m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5a2.25 2.25 0 012.25 2.25v7.5" />
        </svg>
      ),
      helpText: "Proporcione información detallada sobre su plan de viaje y alojamiento en Egipto.",
      validate: (data) => {
        const errors = {};
        if (!data.itinerarioViaje) errors.itinerarioViaje = 'El itinerario de viaje es requerido';
        if (!data.alojamientoEgipto) errors.alojamientoEgipto = 'La información de alojamiento es requerida';
        return errors;
      }
    },
    {
      title: "Carga de Documentos",
      description: "Suba los documentos requeridos",
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
        if (!data.fotoCarnet) errors.fotoCarnet = 'La fotografía tipo carnet es requerida';
        if (!data.pasaporteEscaneado) errors.pasaporteEscaneado = 'El pasaporte escaneado es requerido';
        return errors;
      }
    },
    {
      title: "Consentimiento Legal",
      description: "Acepte los términos y condiciones",
      estimatedTime: 2,
      component: ConsentStep,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-primary">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      helpText: "Para completar su solicitud, debe aceptar todos los términos y condiciones.",
      validate: (data) => {
        const errors = {};
        if (!data.consentimientoProcesamiento) errors.consentimientoProcesamiento = 'Debe aceptar el consentimiento de procesamiento de datos';
        if (!data.veracidadInformacion) errors.veracidadInformacion = 'Debe confirmar la veracidad de la información';
        if (!data.aceptacionTerminos) errors.aceptacionTerminos = 'Debe aceptar los términos y condiciones';
        return errors;
      }
    }
  ];

  const handleSubmit = async (formData) => {
    try {
      console.log('Submitting Egypt visa application:', formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setSubmissionResult({
        success: true,
        message: 'Su solicitud de eVisa para Egipto ha sido enviada exitosamente!',
        applicationId: 'EGYPT-EVISA-' + Math.random().toString(36).substr(2, 9).toUpperCase()
      });
    } catch (error) {
      console.error('Error submitting application:', error);
      setSubmissionResult({
        success: false,
        message: 'Error al enviar la solicitud. Por favor, intente nuevamente.'
      });
    }
  };

  const handleStepChange = (stepIndex, formData) => {
    console.log(`Step changed to ${stepIndex}:`, formData);
  };

  if (submissionResult?.success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
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
            <a className="btn btn-ghost text-xl" href="/pages/egypt">
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
            🇪🇬 Solicitud de eVisa Egipto
          </h1>
          <p className="text-xl text-center mt-4 opacity-90">
            Complete el siguiente formulario para solicitar su eVisa para Egipto
          </p>
        </div>
      </div>

      {/* Enhanced Form */}
      <EnhancedForm
        steps={formSteps}
        onSubmit={handleSubmit}
        onStepChange={handleStepChange}
        autoSave={true}
        autoSaveKey="egypt-evisa-form"
        countryTheme="egypt"
      />
    </div>
  );
}
