'use client';

import React, { useState } from 'react';
import PersonalInfo from './components/PersonalInfo';
import ProfessionalInfo from './components/ProfessionalInfo';
import DocumentUpload from './components/DocumentUpload';

const Form = () => {
  const [formData, setFormData] = useState({
    // Personal Info
    fullName: '',
    dateOfBirth: '',
    birthCity: '',
    birthCountry: '',
    nationality: '',
    email: '',
    phone: '',
    address: '',
    fatherName: '',
    motherName: '',
    // Passport Info
    passportNumber: '',
    passportIssueDate: '',
    passportExpiryDate: '',
    passportIssuingCountry: '',
    // US Specific
    previousUsTravel: false,
    usAddress: '',
    hasCriminalRecord: false,
    criminalRecordDetails: '',
    // Professional Info
    companyName: '',
    position: '',
    companyAddress: {
      street: '',
      city: '',
      state: '',
      country: '',
      zipCode: ''
    },
    // Documents
    documents: {}
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    // Personal Info Validation
    if (!formData.fullName) newErrors.fullName = 'El nombre completo es requerido';
    if (!formData.dateOfBirth) newErrors.dateOfBirth = 'La fecha de nacimiento es requerida';
    if (!formData.birthCity) newErrors.birthCity = 'La ciudad de nacimiento es requerida';
    if (!formData.birthCountry) newErrors.birthCountry = 'El país de nacimiento es requerido';
    if (!formData.nationality) newErrors.nationality = 'La nacionalidad es requerida';
    if (!formData.email) newErrors.email = 'El correo electrónico es requerido';
    if (!formData.phone) newErrors.phone = 'El número de teléfono es requerido';
    if (!formData.address) newErrors.address = 'La dirección es requerida';
    if (!formData.fatherName) newErrors.fatherName = "El nombre del padre es requerido";
    if (!formData.motherName) newErrors.motherName = "El nombre de la madre es requerido";
    if (!formData.usAddress) newErrors.usAddress = 'La dirección en Estados Unidos es requerida';

    // Passport Validation
    if (!formData.passportNumber) newErrors.passportNumber = 'El número de pasaporte es requerido';
    if (!formData.passportIssueDate) newErrors.passportIssueDate = 'La fecha de emisión es requerida';
    if (!formData.passportExpiryDate) newErrors.passportExpiryDate = 'La fecha de vencimiento es requerida';
    if (!formData.passportIssuingCountry) newErrors.passportIssuingCountry = 'El país emisor es requerido';

    // Professional Info Validation
    if (!formData.companyName) newErrors.companyName = 'El nombre de la empresa es requerido';
    if (!formData.position) newErrors.position = 'El cargo es requerido';
    if (!formData.companyAddress.street) newErrors.companyStreet = 'La dirección de la calle es requerida';
    if (!formData.companyAddress.city) newErrors.companyCity = 'La ciudad es requerida';
    if (!formData.companyAddress.country) newErrors.companyCountry = 'El país es requerido';

    // Document Validation
    if (!formData.documents.passport) {
      newErrors.documents = {
        ...newErrors.documents,
        passport: 'El escaneo del pasaporte es requerido'
      };
    }
    if (!formData.documents.photo) {
      newErrors.documents = {
        ...newErrors.documents,
        photo: 'La foto de pasaporte es requerida'
      };
    }
    if (!formData.documents.employmentProof) {
      newErrors.documents = {
        ...newErrors.documents,
        employmentProof: 'El comprobante de empleo es requerido'
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
        body: JSON.stringify({
          ...formData,
          type: 'usa',
          status: 'submitted',
          submissionDate: new Date().toISOString()
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error al enviar la solicitud');
      }

      // Success handling
      alert('Solicitud enviada exitosamente');
      setFormData({
        // Personal Info
        fullName: '',
        dateOfBirth: '',
        birthCity: '',
        birthCountry: '',
        nationality: '',
        email: '',
        phone: '',
        address: '',
        fatherName: '',
        motherName: '',
        // Passport Info
        passportNumber: '',
        passportIssueDate: '',
        passportExpiryDate: '',
        passportIssuingCountry: '',
        // US Specific
        previousUsTravel: false,
        usAddress: '',
        hasCriminalRecord: false,
        criminalRecordDetails: '',
        // Professional Info
        companyName: '',
        position: '',
        companyAddress: {
          street: '',
          city: '',
          state: '',
          country: '',
          zipCode: ''
        },
        // Documents
        documents: {}
      });
      
    } catch (error) {
      console.error('Error:', error);
      setErrors({
        submit: 'Error submitting form. Please try again.'
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

export default Form;
