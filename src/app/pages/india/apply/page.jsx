'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import EnhancedForm from '@/components/forms/enhanced/EnhancedForm';
import FormInput from '@/components/forms/enhanced/FormInput';
import FormSelect from '@/components/forms/enhanced/FormSelect';
import IndiaUpload from '@/components/upload/country/IndiaUpload';

// Personal Information Step Component
const PersonalInfoStep = ({ formData, setFormData, errors }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const countryOptions = [
    { value: 'mx', label: 'México' },
    { value: 'us', label: 'Estados Unidos' },
    { value: 'ca', label: 'Canadá' },
    { value: 'br', label: 'Brasil' },
    { value: 'ar', label: 'Argentina' },
    { value: 'co', label: 'Colombia' },
    { value: 'pe', label: 'Perú' },
    { value: 'cl', label: 'Chile' }
  ];

  return (
    <div className="space-y-8">
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

        <FormInput
          label="Lugar de Nacimiento"
          name="lugarNacimiento"
          value={formData.lugarNacimiento}
          onChange={handleChange}
          error={errors.lugarNacimiento}
          placeholder="Ingrese su lugar de nacimiento"
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
          label="Correo Electrónico"
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

        <FormInput
          label="Teléfono"
          name="telefono"
          type="tel"
          value={formData.telefono}
          onChange={handleChange}
          error={errors.telefono}
          placeholder="+52 (555) 123-4567"
          required
          autoComplete="tel"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
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
            placeholder="Ingrese su dirección completa de residencia"
            required
            autoComplete="address-line1"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
              </svg>
            }
          />
        </div>
      </div>
    </div>
  );
};

// Passport Information Step Component
const PassportInfoStep = ({ formData, setFormData, errors }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
      </div>
    </div>
  );
};

// Professional Information Step Component
const ProfessionalInfoStep = ({ formData, setFormData, errors }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormInput
          label="Ocupación Actual"
          name="ocupacionActual"
          value={formData.ocupacionActual}
          onChange={handleChange}
          error={errors.ocupacionActual}
          placeholder="Ingrese su ocupación actual"
          required
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
            </svg>
          }
        />

        <FormInput
          label="Nombre de la Empresa"
          name="nombreEmpresa"
          value={formData.nombreEmpresa}
          onChange={handleChange}
          error={errors.nombreEmpresa}
          placeholder="Ingrese el nombre de su empresa"
          required
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 7.5h10.5M6.75 12h10.5M6.75 16.5h10.5" />
            </svg>
          }
        />

        <div className="md:col-span-2">
          <FormInput
            label="Dirección del Empleador"
            name="direccionEmpleador"
            value={formData.direccionEmpleador}
            onChange={handleChange}
            error={errors.direccionEmpleador}
            placeholder="Ingrese la dirección completa de su empleador"
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
          label="Teléfono del Empleador"
          name="telefonoEmpleador"
          type="tel"
          value={formData.telefonoEmpleador}
          onChange={handleChange}
          error={errors.telefonoEmpleador}
          placeholder="+52 (555) 123-4567"
          required
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
            </svg>
          }
        />
      </div>
    </div>
  );
};

// Travel Information Step Component
const TravelInfoStep = ({ formData, setFormData, errors }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const airportOptions = [
    { value: 'delhi', label: 'Delhi (DEL)' },
    { value: 'mumbai', label: 'Mumbai (BOM)' },
    { value: 'bangalore', label: 'Bangalore (BLR)' },
    { value: 'chennai', label: 'Chennai (MAA)' },
    { value: 'hyderabad', label: 'Hyderabad (HYD)' },
    { value: 'kolkata', label: 'Kolkata (CCU)' },
    { value: 'kochi', label: 'Kochi (COK)' },
    { value: 'goa', label: 'Goa (GOI)' },
    { value: 'pune', label: 'Pune (PNQ)' },
    { value: 'ahmedabad', label: 'Ahmedabad (AMD)' }
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormSelect
          label="Aeropuerto de Entrada en India"
          name="aeropuertoEntrada"
          value={formData.aeropuertoEntrada}
          onChange={handleChange}
          options={airportOptions}
          error={errors.aeropuertoEntrada}
          placeholder="Seleccione el aeropuerto de entrada"
          required
          searchable
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
            </svg>
          }
        />

        <FormInput
          label="Fecha de Llegada Prevista"
          name="fechaLlegada"
          type="date"
          value={formData.fechaLlegada}
          onChange={handleChange}
          error={errors.fechaLlegada}
          required
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5a2.25 2.25 0 002.25-2.25m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5a2.25 2.25 0 012.25 2.25v7.5" />
            </svg>
          }
        />

        <div className="md:col-span-2">
          <FormInput
            label="Alojamiento en India"
            name="alojamientoIndia"
            value={formData.alojamientoIndia}
            onChange={handleChange}
            error={errors.alojamientoIndia}
            placeholder="Ingrese el nombre del hotel o dirección donde se alojará"
            required
            helpText="Proporcione el nombre del hotel o la dirección completa donde se alojará en India"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.5V3m-3 4.5l3-1.5m12 0l3 1.5m-3-1.5v-1.5" />
              </svg>
            }
          />
        </div>
      </div>
    </div>
  );
};

// References Step Component
const ReferencesStep = ({ formData, setFormData, errors }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="space-y-8">
      <div className="alert alert-info mb-6">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        <div>
          <h3 className="font-bold">Información de Referencias</h3>
          <div className="text-sm">
            <p>• Proporcione contactos de emergencia en India y España</p>
            <p>• Las referencias deben ser personas que puedan confirmar su identidad</p>
            <p>• Incluya nombre completo, dirección y número de teléfono</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <h3 className="text-lg font-semibold mb-4 text-primary">Referencia en India</h3>
        </div>

        <FormInput
          label="Nombre de la Referencia en India"
          name="nombreReferenciaIndia"
          value={formData.nombreReferenciaIndia}
          onChange={handleChange}
          error={errors.nombreReferenciaIndia}
          placeholder="Ingrese el nombre completo de la referencia"
          required
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>
          }
        />

        <FormInput
          label="Teléfono de la Referencia en India"
          name="telefonoReferenciaIndia"
          type="tel"
          value={formData.telefonoReferenciaIndia}
          onChange={handleChange}
          error={errors.telefonoReferenciaIndia}
          placeholder="+91 (XX) XXXX-XXXX"
          required
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
            </svg>
          }
        />

        <div className="md:col-span-2">
          <FormInput
            label="Dirección de la Referencia en India"
            name="direccionReferenciaIndia"
            value={formData.direccionReferenciaIndia}
            onChange={handleChange}
            error={errors.direccionReferenciaIndia}
            placeholder="Ingrese la dirección completa de la referencia en India"
            required
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
              </svg>
            }
          />
        </div>

        <div className="md:col-span-2">
          <h3 className="text-lg font-semibold mb-4 text-primary mt-8">Referencia en España</h3>
        </div>

        <FormInput
          label="Nombre de la Referencia en España"
          name="nombreReferenciaEspana"
          value={formData.nombreReferenciaEspana}
          onChange={handleChange}
          error={errors.nombreReferenciaEspana}
          placeholder="Ingrese el nombre completo de la referencia"
          required
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>
          }
        />

        <FormInput
          label="Relación con la Referencia"
          name="relacionReferenciaEspana"
          value={formData.relacionReferenciaEspana}
          onChange={handleChange}
          error={errors.relacionReferenciaEspana}
          placeholder="Ej: Familiar, Amigo, Colega"
          required
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
            </svg>
          }
        />

        <FormInput
          label="Teléfono de la Referencia en España"
          name="telefonoReferenciaEspana"
          type="tel"
          value={formData.telefonoReferenciaEspana}
          onChange={handleChange}
          error={errors.telefonoReferenciaEspana}
          placeholder="+34 (XXX) XXX-XXX"
          required
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
            </svg>
          }
        />
      </div>
    </div>
  );
};

// Consent Step Component
const ConsentStep = ({ formData, setFormData, errors }) => {
  const handleChange = (e) => {
    const { name, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  return (
    <div className="space-y-8">
      <div className="alert alert-warning mb-6">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path></svg>
        <div>
          <h3 className="font-bold">Consentimiento y Condiciones</h3>
          <div className="text-sm">
            <p>• Lea cuidadosamente las condiciones antes de aceptar</p>
            <p>• Asegúrese de que toda la información proporcionada es veraz</p>
            <p>• Entienda que proporcionar información falsa puede resultar en el rechazo de la visa</p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="form-control">
          <label className="label cursor-pointer justify-start gap-4">
            <input
              type="checkbox"
              name="consentimientoProcesamiento"
              checked={formData.consentimientoProcesamiento || false}
              onChange={handleChange}
              className="checkbox checkbox-primary"
            />
            <span className="label-text">
              <strong>Consentimiento de Procesamiento de Datos:</strong> Autorizo el procesamiento de mis datos personales para la solicitud de visa eVisa India de acuerdo con la política de privacidad.
            </span>
          </label>
          {errors.consentimientoProcesamiento && (
            <label className="label">
              <span className="label-text-alt text-error">{errors.consentimientoProcesamiento}</span>
            </label>
          )}
        </div>

        <div className="form-control">
          <label className="label cursor-pointer justify-start gap-4">
            <input
              type="checkbox"
              name="veracidadInformacion"
              checked={formData.veracidadInformacion || false}
              onChange={handleChange}
              className="checkbox checkbox-primary"
            />
            <span className="label-text">
              <strong>Veracidad de la Información:</strong> Declaro que toda la información proporcionada en esta solicitud es verdadera, completa y correcta.
            </span>
          </label>
          {errors.veracidadInformacion && (
            <label className="label">
              <span className="label-text-alt text-error">{errors.veracidadInformacion}</span>
            </label>
          )}
        </div>

        <div className="form-control">
          <label className="label cursor-pointer justify-start gap-4">
            <input
              type="checkbox"
              name="aceptacionTerminos"
              checked={formData.aceptacionTerminos || false}
              onChange={handleChange}
              className="checkbox checkbox-primary"
            />
            <span className="label-text">
              <strong>Términos y Condiciones:</strong> Acepto los términos y condiciones de la solicitud de visa eVisa India y entiendo que el procesamiento puede tomar varios días hábiles.
            </span>
          </label>
          {errors.aceptacionTerminos && (
            <label className="label">
              <span className="label-text-alt text-error">{errors.aceptacionTerminos}</span>
            </label>
          )}
        </div>
      </div>
    </div>
  );
};

// Document Upload Step Component
const DocumentUploadStep = ({ formData, setFormData, errors }) => {
  const handleFileSelect = (file, documentType) => {
    console.log('File selected:', file, documentType);
    setFormData(prev => ({
      ...prev,
      documentos: {
        ...prev.documentos,
        [documentType]: file
      }
    }));
  };

  const handleUploadComplete = (file, documentType) => {
    console.log('Upload completed:', file, documentType);
  };

  return (
    <div className="space-y-8">
      <IndiaUpload
        onFileSelect={(file) => handleFileSelect(file, 'pasaporteEscaneado')}
        onUploadComplete={(file) => handleUploadComplete(file, 'pasaporteEscaneado')}
        error={errors.documentos?.pasaporteEscaneado}
        documentType="pasaporte"
      />
      
      <div className="divider">Fotografía</div>
      
      <IndiaUpload
        onFileSelect={(file) => handleFileSelect(file, 'fotoCarnet')}
        onUploadComplete={(file) => handleUploadComplete(file, 'fotoCarnet')}
        error={errors.documentos?.fotoCarnet}
        documentType="foto"
      />
    </div>
  );
};

export default function IndiaFormPage() {
  const [submissionResult, setSubmissionResult] = useState(null);

  // Form step configuration for India
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
        if (!data.fechaNacimiento) errors.fechaNacimiento = 'La fecha de nacimiento es requerida';
        if (!data.lugarNacimiento) errors.lugarNacimiento = 'El lugar de nacimiento es requerido';
        if (!data.nacionalidad) errors.nacionalidad = 'La nacionalidad es requerida';
        if (!data.email) errors.email = 'El correo electrónico es requerido';
        if (!data.telefono) errors.telefono = 'El teléfono es requerido';
        if (!data.direccionResidencia) errors.direccionResidencia = 'La dirección de residencia es requerida';
        return errors;
      }
    },
    {
      title: "Detalles del Pasaporte",
      description: "Información de su pasaporte",
      estimatedTime: 2,
      component: PassportInfoStep,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-primary">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0z" />
        </svg>
      ),
      helpText: "Verifique que todos los detalles del pasaporte sean correctos.",
      validate: (data) => {
        const errors = {};
        if (!data.numeroPasaporte) errors.numeroPasaporte = 'El número de pasaporte es requerido';
        if (!data.fechaEmisionPasaporte) errors.fechaEmisionPasaporte = 'La fecha de emisión es requerida';
        if (!data.fechaExpiracionPasaporte) errors.fechaExpiracionPasaporte = 'La fecha de expiración es requerida';
        return errors;
      }
    },
    {
      title: "Información Profesional",
      description: "Datos laborales y de empleo",
      estimatedTime: 3,
      component: ProfessionalInfoStep,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-primary">
          <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
        </svg>
      ),
      helpText: "Proporcione información detallada sobre su empleo actual.",
      validate: (data) => {
        const errors = {};
        if (!data.ocupacionActual) errors.ocupacionActual = 'La ocupación actual es requerida';
        if (!data.nombreEmpresa) errors.nombreEmpresa = 'El nombre de la empresa es requerido';
        if (!data.direccionEmpleador) errors.direccionEmpleador = 'La dirección del empleador es requerida';
        if (!data.telefonoEmpleador) errors.telefonoEmpleador = 'El teléfono del empleador es requerido';
        return errors;
      }
    },
    {
      title: "Información de Viaje",
      description: "Detalles de su viaje a India",
      estimatedTime: 3,
      component: TravelInfoStep,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-primary">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
        </svg>
      ),
      helpText: "Proporcione información detallada sobre su viaje a India.",
      validate: (data) => {
        const errors = {};
        if (!data.aeropuertoEntrada) errors.aeropuertoEntrada = 'El aeropuerto de entrada es requerido';
        if (!data.fechaLlegada) errors.fechaLlegada = 'La fecha de llegada es requerida';
        if (!data.alojamientoIndia) errors.alojamientoIndia = 'El alojamiento en India es requerido';
        return errors;
      }
    },
    {
      title: "Referencias",
      description: "Contactos de emergencia en India y España",
      estimatedTime: 4,
      component: ReferencesStep,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-primary">
          <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
        </svg>
      ),
      helpText: "Proporcione contactos de emergencia que puedan confirmar su identidad.",
      validate: (data) => {
        const errors = {};
        if (!data.nombreReferenciaIndia) errors.nombreReferenciaIndia = 'El nombre de la referencia en India es requerido';
        if (!data.telefonoReferenciaIndia) errors.telefonoReferenciaIndia = 'El teléfono de la referencia en India es requerido';
        if (!data.direccionReferenciaIndia) errors.direccionReferenciaIndia = 'La dirección de la referencia en India es requerida';
        if (!data.nombreReferenciaEspana) errors.nombreReferenciaEspana = 'El nombre de la referencia en España es requerido';
        if (!data.relacionReferenciaEspana) errors.relacionReferenciaEspana = 'La relación con la referencia es requerida';
        if (!data.telefonoReferenciaEspana) errors.telefonoReferenciaEspana = 'El teléfono de la referencia en España es requerido';
        return errors;
      }
    },
    {
      title: "Documentos",
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
        if (!data.documentos?.pasaporteEscaneado) {
          errors.documentos = {
            ...errors.documentos,
            pasaporteEscaneado: 'El documento del pasaporte es requerido'
          };
        }
        if (!data.documentos?.fotoCarnet) {
          errors.documentos = {
            ...errors.documentos,
            fotoCarnet: 'La fotografía tipo carnet es requerida'
          };
        }
        return errors;
      }
    },
    {
      title: "Consentimiento",
      description: "Acepte los términos y condiciones",
      estimatedTime: 2,
      component: ConsentStep,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-primary">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      helpText: "Lea cuidadosamente y acepte todos los términos y condiciones.",
      validate: (data) => {
        const errors = {};
        if (!data.consentimientoProcesamiento) errors.consentimientoProcesamiento = 'Debe aceptar el procesamiento de datos';
        if (!data.veracidadInformacion) errors.veracidadInformacion = 'Debe confirmar la veracidad de la información';
        if (!data.aceptacionTerminos) errors.aceptacionTerminos = 'Debe aceptar los términos y condiciones';
        return errors;
      }
    }
  ];

  const handleSubmit = async (formData) => {
    // Simulate API submission
    console.log('Submitting India visa form data:', formData);
    
    await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate delay
    
    setSubmissionResult({
      success: true,
      message: 'Su solicitud de visa para India ha sido enviada exitosamente!',
      applicationId: 'IND-' + Math.random().toString(36).substr(2, 9).toUpperCase()
    });
  };

  const handleStepChange = (stepIndex, formData) => {
    console.log(`Step changed to ${stepIndex}:`, formData);
  };

  if (submissionResult?.success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-green-50 flex items-center justify-center">
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
            🇮🇳 Solicitud de Visa India
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
        autoSaveKey="india-visa-form"
        countryTheme="india"
      />
    </div>
  );
};
