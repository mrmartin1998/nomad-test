'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function ESTAForm() {
  const [formData, setFormData] = useState({
    // Personal Information
    fullName: '',
    birthDate: '',
    birthCity: '',
    birthCountry: '',
    nationality: '',
    email: '',
    phone: '',
    address: '',
    
    // Parents Information
    fatherName: '',
    motherName: '',
    
    // Passport Information
    passportNumber: '',
    passportIssueDate: '',
    passportExpiryDate: '',
    passportIssuingCountry: '',
    
    // Travel Information
    previousUSTravel: false,
    usAddress: '',
    
    // Employment Information
    employer: '',
    jobTitle: '',
    workAddress: '',
    
    // Additional Information
    hasCriminalRecord: false,
    
    // Terms
    termsAccepted: false
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    
    // Personal Information Validation
    if (!formData.fullName) newErrors.fullName = 'El nombre completo es requerido';
    if (!formData.birthDate) newErrors.birthDate = 'La fecha de nacimiento es requerida';
    if (!formData.birthCity) newErrors.birthCity = 'La ciudad de nacimiento es requerida';
    if (!formData.birthCountry) newErrors.birthCountry = 'El país de nacimiento es requerido';
    if (!formData.nationality) newErrors.nationality = 'La nacionalidad es requerida';
    if (!formData.email) newErrors.email = 'El email es requerido';
    if (!formData.phone) newErrors.phone = 'El teléfono es requerido';
    if (!formData.address) newErrors.address = 'La dirección es requerida';
    
    // Parents Information Validation
    if (!formData.fatherName) newErrors.fatherName = 'El nombre del padre es requerido';
    if (!formData.motherName) newErrors.motherName = 'El nombre de la madre es requerido';
    
    // Passport Information Validation
    if (!formData.passportNumber) newErrors.passportNumber = 'El número de pasaporte es requerido';
    if (!formData.passportIssueDate) newErrors.passportIssueDate = 'La fecha de emisión es requerida';
    if (!formData.passportExpiryDate) newErrors.passportExpiryDate = 'La fecha de expiración es requerida';
    if (!formData.passportIssuingCountry) newErrors.passportIssuingCountry = 'El país de emisión es requerido';
    
    // Travel Information Validation
    if (!formData.usAddress) newErrors.usAddress = 'La dirección en EE.UU. es requerida';
    
    // Employment Information Validation
    if (!formData.employer) newErrors.employer = 'El nombre de la empresa es requerido';
    if (!formData.jobTitle) newErrors.jobTitle = 'El cargo es requerido';
    if (!formData.workAddress) newErrors.workAddress = 'La dirección del trabajo es requerida';
    
    // Terms Validation
    if (!formData.termsAccepted) newErrors.termsAccepted = 'Debe aceptar los términos y condiciones';

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
      const response = await fetch('/api/esta-applications', {
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
      alert('Solicitud ESTA enviada exitosamente');
      setFormData({
        fullName: '',
        birthDate: '',
        birthCity: '',
        birthCountry: '',
        nationality: '',
        email: '',
        phone: '',
        address: '',
        fatherName: '',
        motherName: '',
        passportNumber: '',
        passportIssueDate: '',
        passportExpiryDate: '',
        passportIssuingCountry: '',
        previousUSTravel: false,
        usAddress: '',
        employer: '',
        jobTitle: '',
        workAddress: '',
        hasCriminalRecord: false,
        termsAccepted: false
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

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-primary mb-4">
              Solicitud ESTA (EE.UU.)
            </h1>
            <div className="divider"></div>
            <p className="text-base-content/70">
              Complete el formulario con sus datos personales para la autorización ESTA
            </p>
          </div>

          {/* Progress Steps */}
          <ul className="steps steps-horizontal w-full mb-12">
            <li className="step step-primary">Información Personal</li>
            <li className="step step-primary">Información Familiar</li>
            <li className="step step-primary">Pasaporte</li>
            <li className="step step-primary">Viaje y Empleo</li>
          </ul>

          {/* Form */}
          <div className="card bg-base-200 shadow-xl">
            <div className="card-body">
              <form onSubmit={handleSubmit} className="space-y-12">
                {/* Personal Information */}
                <div className="space-y-4">
                  <h2 className="text-2xl font-semibold mb-6">Información Personal</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Nombre Completo</span>
                      </label>
                      <input
                        type="text"
                        className={`input input-bordered ${errors.fullName ? 'input-error' : ''}`}
                        value={formData.fullName}
                        onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                      />
                      {errors.fullName && <span className="text-error text-sm mt-1">{errors.fullName}</span>}
                    </div>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Fecha de Nacimiento</span>
                      </label>
                      <input
                        type="date"
                        className={`input input-bordered ${errors.birthDate ? 'input-error' : ''}`}
                        value={formData.birthDate}
                        onChange={(e) => setFormData({...formData, birthDate: e.target.value})}
                      />
                      {errors.birthDate && <span className="text-error text-sm mt-1">{errors.birthDate}</span>}
                    </div>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Ciudad de Nacimiento</span>
                      </label>
                      <input
                        type="text"
                        className={`input input-bordered ${errors.birthCity ? 'input-error' : ''}`}
                        value={formData.birthCity}
                        onChange={(e) => setFormData({...formData, birthCity: e.target.value})}
                      />
                      {errors.birthCity && <span className="text-error text-sm mt-1">{errors.birthCity}</span>}
                    </div>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">País de Nacimiento</span>
                      </label>
                      <input
                        type="text"
                        className={`input input-bordered ${errors.birthCountry ? 'input-error' : ''}`}
                        value={formData.birthCountry}
                        onChange={(e) => setFormData({...formData, birthCountry: e.target.value})}
                      />
                      {errors.birthCountry && <span className="text-error text-sm mt-1">{errors.birthCountry}</span>}
                    </div>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Nacionalidad</span>
                      </label>
                      <input
                        type="text"
                        className={`input input-bordered ${errors.nationality ? 'input-error' : ''}`}
                        value={formData.nationality}
                        onChange={(e) => setFormData({...formData, nationality: e.target.value})}
                      />
                      {errors.nationality && <span className="text-error text-sm mt-1">{errors.nationality}</span>}
                    </div>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Email</span>
                      </label>
                      <input
                        type="email"
                        className={`input input-bordered ${errors.email ? 'input-error' : ''}`}
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                      />
                      {errors.email && <span className="text-error text-sm mt-1">{errors.email}</span>}
                    </div>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Teléfono</span>
                      </label>
                      <input
                        type="tel"
                        className={`input input-bordered ${errors.phone ? 'input-error' : ''}`}
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      />
                      {errors.phone && <span className="text-error text-sm mt-1">{errors.phone}</span>}
                    </div>
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Dirección Completa</span>
                    </label>
                    <textarea
                      className={`textarea textarea-bordered h-24 ${errors.address ? 'textarea-error' : ''}`}
                      value={formData.address}
                      onChange={(e) => setFormData({...formData, address: e.target.value})}
                    />
                    {errors.address && <span className="text-error text-sm mt-1">{errors.address}</span>}
                  </div>
                </div>

                <div className="divider"></div>

                {/* Parents Information */}
                <div className="space-y-4">
                  <h2 className="text-2xl font-semibold mb-6">Información de Padres</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Nombre del Padre</span>
                      </label>
                      <input
                        type="text"
                        className={`input input-bordered ${errors.fatherName ? 'input-error' : ''}`}
                        value={formData.fatherName}
                        onChange={(e) => setFormData({...formData, fatherName: e.target.value})}
                      />
                      {errors.fatherName && <span className="text-error text-sm mt-1">{errors.fatherName}</span>}
                    </div>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Nombre de la Madre</span>
                      </label>
                      <input
                        type="text"
                        className={`input input-bordered ${errors.motherName ? 'input-error' : ''}`}
                        value={formData.motherName}
                        onChange={(e) => setFormData({...formData, motherName: e.target.value})}
                      />
                      {errors.motherName && <span className="text-error text-sm mt-1">{errors.motherName}</span>}
                    </div>
                  </div>
                </div>

                <div className="divider"></div>

                {/* Passport Information */}
                <div className="space-y-4">
                  <h2 className="text-2xl font-semibold mb-6">Información del Pasaporte</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Número de Pasaporte</span>
                      </label>
                      <input
                        type="text"
                        className={`input input-bordered ${errors.passportNumber ? 'input-error' : ''}`}
                        value={formData.passportNumber}
                        onChange={(e) => setFormData({...formData, passportNumber: e.target.value})}
                      />
                      {errors.passportNumber && <span className="text-error text-sm mt-1">{errors.passportNumber}</span>}
                    </div>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">País de Emisión</span>
                      </label>
                      <input
                        type="text"
                        className={`input input-bordered ${errors.passportIssuingCountry ? 'input-error' : ''}`}
                        value={formData.passportIssuingCountry}
                        onChange={(e) => setFormData({...formData, passportIssuingCountry: e.target.value})}
                      />
                      {errors.passportIssuingCountry && <span className="text-error text-sm mt-1">{errors.passportIssuingCountry}</span>}
                    </div>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Fecha de Emisión</span>
                      </label>
                      <input
                        type="date"
                        className={`input input-bordered ${errors.passportIssueDate ? 'input-error' : ''}`}
                        value={formData.passportIssueDate}
                        onChange={(e) => setFormData({...formData, passportIssueDate: e.target.value})}
                      />
                      {errors.passportIssueDate && <span className="text-error text-sm mt-1">{errors.passportIssueDate}</span>}
                    </div>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Fecha de Expiración</span>
                      </label>
                      <input
                        type="date"
                        className={`input input-bordered ${errors.passportExpiryDate ? 'input-error' : ''}`}
                        value={formData.passportExpiryDate}
                        onChange={(e) => setFormData({...formData, passportExpiryDate: e.target.value})}
                      />
                      {errors.passportExpiryDate && <span className="text-error text-sm mt-1">{errors.passportExpiryDate}</span>}
                    </div>
                  </div>
                </div>

                <div className="divider"></div>

                {/* Travel and Employment Information */}
                <div className="space-y-8">
                  {/* Travel Information */}
                  <div className="space-y-4">
                    <h2 className="text-2xl font-semibold mb-6">Información de Viaje</h2>
                    <div className="space-y-4">
                      <div className="form-control">
                        <label className="label cursor-pointer">
                          <span className="label-text">¿Has viajado anteriormente a EE.UU.?</span>
                          <input
                            type="checkbox"
                            className="checkbox"
                            checked={formData.previousUSTravel}
                            onChange={(e) => setFormData({...formData, previousUSTravel: e.target.checked})}
                          />
                        </label>
                      </div>

                      <div className="form-control">
                        <label className="label">
                          <span className="label-text">Dirección en EE.UU. (hotel o contacto)</span>
                        </label>
                        <textarea
                          className={`textarea textarea-bordered h-24 ${errors.usAddress ? 'textarea-error' : ''}`}
                          value={formData.usAddress}
                          onChange={(e) => setFormData({...formData, usAddress: e.target.value})}
                        />
                        {errors.usAddress && <span className="text-error text-sm mt-1">{errors.usAddress}</span>}
                      </div>
                    </div>
                  </div>

                  {/* Employment Information */}
                  <div className="space-y-4">
                    <h2 className="text-2xl font-semibold mb-6">Información Laboral</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text">Empresa</span>
                        </label>
                        <input
                          type="text"
                          className={`input input-bordered ${errors.employer ? 'input-error' : ''}`}
                          value={formData.employer}
                          onChange={(e) => setFormData({...formData, employer: e.target.value})}
                        />
                        {errors.employer && <span className="text-error text-sm mt-1">{errors.employer}</span>}
                      </div>

                      <div className="form-control">
                        <label className="label">
                          <span className="label-text">Cargo</span>
                        </label>
                        <input
                          type="text"
                          className={`input input-bordered ${errors.jobTitle ? 'input-error' : ''}`}
                          value={formData.jobTitle}
                          onChange={(e) => setFormData({...formData, jobTitle: e.target.value})}
                        />
                        {errors.jobTitle && <span className="text-error text-sm mt-1">{errors.jobTitle}</span>}
                      </div>
                    </div>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Dirección del Trabajo</span>
                      </label>
                      <textarea
                        className={`textarea textarea-bordered h-24 ${errors.workAddress ? 'textarea-error' : ''}`}
                        value={formData.workAddress}
                        onChange={(e) => setFormData({...formData, workAddress: e.target.value})}
                      />
                      {errors.workAddress && <span className="text-error text-sm mt-1">{errors.workAddress}</span>}
                    </div>
                  </div>

                  {/* Additional Information */}
                  <div className="space-y-4">
                    <h2 className="text-2xl font-semibold mb-6">Información Adicional</h2>
                    <div className="form-control">
                      <label className="label cursor-pointer">
                        <span className="label-text">¿Tienes antecedentes penales o problemas migratorios?</span>
                        <input
                          type="checkbox"
                          className="checkbox"
                          checked={formData.hasCriminalRecord}
                          onChange={(e) => setFormData({...formData, hasCriminalRecord: e.target.checked})}
                        />
                      </label>
                    </div>
                  </div>
                </div>

                <div className="divider"></div>

                {/* Terms and Conditions */}
                <div className="form-control">
                  <label className="label cursor-pointer justify-start gap-4">
                    <input
                      type="checkbox"
                      className={`checkbox ${errors.termsAccepted ? 'checkbox-error' : ''}`}
                      checked={formData.termsAccepted}
                      onChange={(e) => setFormData({...formData, termsAccepted: e.target.checked})}
                    />
                    <span className="label-text">Acepto los términos y condiciones</span>
                  </label>
                  {errors.termsAccepted && <span className="text-error text-sm mt-1">{errors.termsAccepted}</span>}
                </div>

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
        </div>
      </div>
    </div>
  );
} 