'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useSession, getSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import EnhancedForm from '@/components/forms/enhanced/EnhancedForm';
import FormInput from '@/components/forms/enhanced/FormInput';
import FormSelect from '@/components/forms/enhanced/FormSelect';
import ThailandUpload from '@/components/upload/country/ThailandUpload';

// Thailand form step components
const PersonalInfoStep = ({ formData, setFormData, errors }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const countryOptions = [
    { value: 'mx', label: 'México' },
    { value: 'us', label: 'Estados Unidos' },
    { value: 'ca', label: 'Canadá' },
    { value: 'br', label: 'Brasil' },
    { value: 'ar', label: 'Argentina' },
    { value: 'co', label: 'Colombia' },
    { value: 'pe', label: 'Perú' },
    { value: 'cl', label: 'Chile' },
    { value: 'es', label: 'España' }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <FormInput
        label="Nombre Completo"
        name="nombreCompleto"
        value={formData.nombreCompleto || ''}
        onChange={handleChange}
        error={errors.nombreCompleto}
        placeholder="Ingrese su nombre completo"
        required
        icon={
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
          </svg>
        }
      />

      <FormInput
        label="Fecha de Nacimiento"
        name="fechaNacimiento"
        type="date"
        value={formData.fechaNacimiento || ''}
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
        label="Lugar de Nacimiento"
        name="lugarNacimiento"
        value={formData.lugarNacimiento || ''}
        onChange={handleChange}
        error={errors.lugarNacimiento}
        placeholder="Ciudad y País"
        required
        icon={
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
          </svg>
        }
      />

      <FormSelect
        label="Nacionalidad"
        name="nacionalidad"
        value={formData.nacionalidad || ''}
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
        label="Correo Electrónico"
        name="email"
        type="email"
        value={formData.email || ''}
        onChange={handleChange}
        error={errors.email}
        placeholder="ejemplo@correo.com"
        required
        icon={
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75z" />
          </svg>
        }
      />

      <FormInput
        label="Número de Teléfono"
        name="telefono"
        type="tel"
        value={formData.telefono || ''}
        onChange={handleChange}
        error={errors.telefono}
        placeholder="+34 (XXX) XXX-XXX"
        required
        icon={
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
          </svg>
        }
      />

      <FormInput
        label="Dirección de Residencia"
        name="direccionResidencia"
        value={formData.direccionResidencia || ''}
        onChange={handleChange}
        error={errors.direccionResidencia}
        placeholder="Ingrese su dirección completa"
        required
        multiline
        rows={3}
        className="md:col-span-2"
        icon={
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.5V3m-3 4.5l3-1.5m0 0l3 1.5m-3-1.5v3m-3 0l3 1.5" />
          </svg>
        }
      />
    </div>
  );
};

const PassportInfoStep = ({ formData, setFormData, errors }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <FormInput
        label="Número de Pasaporte"
        name="numeroPasaporte"
        value={formData.numeroPasaporte || ''}
        onChange={handleChange}
        error={errors.numeroPasaporte}
        placeholder="Ingrese su número de pasaporte"
        required
        icon={
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5a2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0z" />
          </svg>
        }
      />

      <FormInput
        label="Fecha de Emisión del Pasaporte"
        name="fechaEmisionPasaporte"
        type="date"
        value={formData.fechaEmisionPasaporte || ''}
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
        value={formData.fechaExpiracionPasaporte || ''}
        onChange={handleChange}
        error={errors.fechaExpiracionPasaporte}
        required
        icon={
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5a2.25 2.25 0 002.25-2.25m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5a2.25 2.25 0 012.25 2.25v7.5" />
          </svg>
        }
      />
      
      <FormInput
        label="Fechas planificadas de viaje"
        name="fechasViaje"
        value={formData.fechasViaje || ''}
        onChange={handleChange}
        error={errors.fechasViaje}
        placeholder="Ej: 15-30 Junio 2025"
        required
        icon={
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5a2.25 2.25 0 002.25-2.25m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5a2.25 2.25 0 012.25 2.25v7.5" />
          </svg>
        }
      />
      
      <FormInput
        label="Alojamiento en Tailandia"
        name="alojamiento"
        value={formData.alojamiento || ''}
        onChange={handleChange}
        error={errors.alojamiento}
        placeholder="Nombre del hotel o dirección de alojamiento"
        required
        className="md:col-span-2"
        icon={
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.5V3m-3 4.5l3-1.5m0 0l3 1.5m-3-1.5v3m-3 0l3 1.5" />
          </svg>
        }
      />
    </div>
  );
};

const DocumentUploadStep = ({ formData, setFormData, errors }) => {
  const handleFileSelect = (file, documentType) => {
    console.log('File selected:', file, 'Type:', documentType);
    setFormData(prev => ({
      ...prev,
      documentos: {
        ...prev.documentos || {},
        [documentType]: file
      }
    }));
  };

  const handleUploadComplete = (file, documentType) => {
    console.log('Upload completed:', file, 'Type:', documentType);
    // Keep the file object in state during form completion
    // It will be processed during final submission
  };

  return (
    <div className="space-y-8">
      <ThailandUpload
        documentType="fotoCarnet"
        onFileSelect={(file) => handleFileSelect(file, 'fotoCarnet')}
        onUploadComplete={(file) => handleUploadComplete(file, 'fotoCarnet')}
        error={errors?.documentos?.fotoCarnet}
      />
      
      <ThailandUpload
        documentType="pasaporteEscaneado"
        onFileSelect={(file) => handleFileSelect(file, 'pasaporteEscaneado')}
        onUploadComplete={(file) => handleUploadComplete(file, 'pasaporteEscaneado')}
        error={errors?.documentos?.pasaporteEscaneado}
      />
      
      <ThailandUpload
        documentType="billeteSalida"
        onFileSelect={(file) => handleFileSelect(file, 'billeteSalida')}
        onUploadComplete={(file) => handleUploadComplete(file, 'billeteSalida')}
        error={errors?.documentos?.billeteSalida}
      />
      
      <ThailandUpload
        documentType="reservaHotel"
        onFileSelect={(file) => handleFileSelect(file, 'reservaHotel')}
        onUploadComplete={(file) => handleUploadComplete(file, 'reservaHotel')}
        error={errors?.documentos?.reservaHotel}
      />
    </div>
  );
};

const ThailandForm = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [submissionResult, setSubmissionResult] = useState(null);
  const [initialFormData, setInitialFormData] = useState({});
  const hasAutoSubmitted = useRef(false);

  // Check for pending submission when component mounts
  useEffect(() => {
    const pendingSubmission = localStorage.getItem('thailand_pending_submission');
    
    if (pendingSubmission && !hasAutoSubmitted.current) {
      try {
        const { formData, timestamp } = JSON.parse(pendingSubmission);
        
        // Only restore if the data is less than 1 hour old
        const now = new Date().getTime();
        const oneHour = 60 * 60 * 1000;
        
        if (now - timestamp < oneHour) {
          setInitialFormData(formData);
          
          // Auto-submit only once when authenticated
          if (session && status === 'authenticated') {
            hasAutoSubmitted.current = true;
            localStorage.removeItem('thailand_pending_submission');
            handleSubmit(formData);
          }
        } else {
          localStorage.removeItem('thailand_pending_submission');
        }
      } catch (error) {
        console.error('Error parsing pending submission:', error);
        localStorage.removeItem('thailand_pending_submission');
      }
    }
  }, [session, status]);
  
  const formSteps = [
    {
      title: "Información Personal",
      description: "Datos personales del solicitante",
      estimatedTime: 3,
      component: PersonalInfoStep,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-primary">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
        </svg>
      ),
      helpText: "Ingrese sus datos personales exactamente como aparecen en su pasaporte.",
      validate: (data) => {
        const errors = {};
        if (!data.nombreCompleto) errors.nombreCompleto = 'El nombre completo es requerido';
        if (!data.fechaNacimiento) errors.fechaNacimiento = 'La fecha de nacimiento es requerida';
        if (!data.lugarNacimiento) errors.lugarNacimiento = 'El lugar de nacimiento es requerido';
        if (!data.nacionalidad) errors.nacionalidad = 'La nacionalidad es requerida';
        if (!data.email) errors.email = 'El correo electrónico es requerido';
        if (!data.telefono) errors.telefono = 'El número de teléfono es requerido';
        if (!data.direccionResidencia) errors.direccionResidencia = 'La dirección de residencia es requerida';
        return errors;
      }
    },
    {
      title: "Información del Pasaporte",
      description: "Detalles de su pasaporte y viaje",
      estimatedTime: 2,
      component: PassportInfoStep,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-primary">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5a2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0z" />
        </svg>
      ),
      helpText: "Revise los detalles de su pasaporte y fechas de viaje.",
      validate: (data) => {
        const errors = {};
        if (!data.numeroPasaporte) errors.numeroPasaporte = 'El número de pasaporte es requerido';
        if (!data.fechaEmisionPasaporte) errors.fechaEmisionPasaporte = 'La fecha de emisión es requerida';
        if (!data.fechaExpiracionPasaporte) errors.fechaExpiracionPasaporte = 'La fecha de expiración es requerida';
        if (!data.fechasViaje) errors.fechasViaje = 'Las fechas de viaje son requeridas';
        if (!data.alojamiento) errors.alojamiento = 'El alojamiento es requerido';
        return errors;
      }
    },
    {
      title: "Documentación",
      description: "Suba los documentos requeridos",
      estimatedTime: 5,
      component: DocumentUploadStep,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-primary">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m6.75 12l-3-3m0 0l-3 3m3-3v6m-1.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c-.621 0-1.125-.504-1.125-1.125V11.25a9 9 0 00-9-9z" />
        </svg>
      ),
      helpText: "Asegúrese de subir documentos claros y legibles. Formatos aceptados: PDF, JPG, PNG.",
      validate: (data) => {
        const errors = {};
        const docs = data.documentos || {};
        if (!docs.fotoCarnet) {
          errors.documentos = { ...errors.documentos, fotoCarnet: 'La foto de carnet es requerida' };
        }
        if (!docs.pasaporteEscaneado) {
          errors.documentos = { ...errors.documentos, pasaporteEscaneado: 'El pasaporte escaneado es requerido' };
        }
        return errors;
      }
    }
  ];

  const handleStepChange = (stepIndex, formData) => {
    console.log(`Step changed to ${stepIndex}:`, formData);
  };

  const handleSubmit = async (formData) => {
    // Check authentication before submission
    const currentSession = await getSession();
    if (!currentSession) {
      // Get full URL with pathname and search params for reliable redirect
      const currentUrl = window.location.pathname + window.location.search;
      console.log('User not authenticated, storing pending submission and redirecting to login');
      
      // Store the form data for later submission
      localStorage.setItem('thailand_pending_submission', JSON.stringify({
        formData,
        timestamp: new Date().getTime(),
        returnUrl: currentUrl
      }));
      
      // Redirect to login with callback URL
      router.push(`/login?callbackUrl=${encodeURIComponent(currentUrl)}`);
      return;
    }

    console.log('Submitting Thailand visa form data with user ID:', currentSession.user.id);
    
    try {
      // Process the document data properly
      const processedDocuments = {
        fotoCarnet: formData.documentos?.fotoCarnet?.name || "",
        pasaporteEscaneado: formData.documentos?.pasaporteEscaneado?.name || "",
        billeteSalida: formData.documentos?.billeteSalida?.name || "",
        reservaHotel: formData.documentos?.reservaHotel?.name || ""
      };

      // Format data for API submission
      const formattedData = {
        // Required fields
        nombreCompleto: formData.nombreCompleto || '',
        fechaNacimiento: formData.fechaNacimiento || '',
        lugarNacimiento: formData.lugarNacimiento || '',
        nacionalidad: formData.nacionalidad || '',
        email: formData.email || '',
        telefono: formData.telefono || '',
        direccionResidencia: formData.direccionResidencia || '',
        numeroPasaporte: formData.numeroPasaporte || '',
        fechaEmisionPasaporte: formData.fechaEmisionPasaporte || '',
        fechaExpiracionPasaporte: formData.fechaExpiracionPasaporte || '',
        fechasViaje: formData.fechasViaje || '',
        alojamiento: formData.alojamiento || '',
        
        // Add user ID and timestamps
        userId: currentSession.user.id,
        fechaCreacion: new Date().toISOString(),
        
        // Document handling - use processed strings instead of objects
        documentos: processedDocuments
      };

      console.log('Sending data to API:', formattedData);

      // Submit to API
      const response = await fetch('/api/thailand', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formattedData),
        credentials: 'include'
      });

      // Parse response safely
      const responseText = await response.text();
      let responseData;
      
      try {
        responseData = JSON.parse(responseText);
      } catch (e) {
        console.error('Failed to parse response as JSON:', responseText);
        throw new Error(`Server returned non-JSON response: ${responseText.substring(0, 100)}...`);
      }

      if (!response.ok) {
        throw new Error(responseData.error || `Error ${response.status}: Failed to submit form`);
      }

      console.log('API success response:', responseData);

      setSubmissionResult({
        success: true,
        message: 'Su solicitud de visa para Tailandia ha sido enviada con éxito!',
        applicationId: responseData.data?._id || responseData.applicationId || 'THAI-' + Math.random().toString(36).substr(2, 9).toUpperCase()
      });
      
      // Clear pending submission data on successful submission
      localStorage.removeItem('thailand_pending_submission');
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmissionResult({
        success: false,
        message: `Error: ${error.message || 'Error desconocido'}`
      });
    }
  };

  if (submissionResult?.success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-yellow-50 flex items-center justify-center">
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
          <button className="btn btn-primary" onClick={() => window.location.reload()}>
            Iniciar Nueva Solicitud
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <EnhancedForm
        initialData={initialFormData}
        countryTheme="thailand"
        autoSaveKey="thailand-visa-form"
        autoSave={true}
        onStepChange={handleStepChange}
        onSubmit={handleSubmit}
        steps={formSteps}
      />
    </div>
  );
};

export default ThailandForm;
