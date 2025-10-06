'use client';

import React, { useState } from 'react';
import { useSession, getSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import EnhancedForm from '@/components/forms/enhanced/EnhancedForm';
import FormInput from '@/components/forms/enhanced/FormInput';
import FormSelect from '@/components/forms/enhanced/FormSelect';
import USAUpload from '@/components/upload/country/USAUpload';

// USA ESTA Specific Step Components
const PersonalInfoStep = ({ formData, setFormData, errors }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ [name]: value });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData({ [name]: checked });
  };

  const countryOptions = [
    { value: 'us', label: 'United States' },
    { value: 'ca', label: 'Canada' },
    { value: 'uk', label: 'United Kingdom' },
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
      {/* Basic Personal Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormInput
          label="Full Name (as appears on passport)"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          error={errors.fullName}
          placeholder="Enter your full name"
          required
          autoComplete="name"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>
          }
          helpText="Enter your name exactly as it appears on your passport"
        />

        <FormInput
          label="Date of Birth"
          name="dateOfBirth"
          type="date"
          value={formData.dateOfBirth}
          onChange={handleChange}
          error={errors.dateOfBirth}
          required
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5a2.25 2.25 0 002.25-2.25m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5a2.25 2.25 0 012.25 2.25v7.5" />
            </svg>
          }
        />

        <FormInput
          label="City of Birth"
          name="birthCity"
          value={formData.birthCity}
          onChange={handleChange}
          error={errors.birthCity}
          placeholder="Enter your city of birth"
          required
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
            </svg>
          }
        />

        <FormInput
          label="Country of Birth"
          name="birthCountry"
          value={formData.birthCountry}
          onChange={handleChange}
          error={errors.birthCountry}
          placeholder="Enter your country of birth"
          required
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3s-4.5 4.03-4.5 9 2.015 9 4.5 9z" />
            </svg>
          }
        />

        <FormSelect
          label="Nationality"
          name="nationality"
          value={formData.nationality}
          onChange={handleChange}
          options={countryOptions}
          error={errors.nationality}
          placeholder="Select your nationality"
          required
          searchable
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 3v1.5M3 21v-6m0 0l2.77-.693a9 9 0 016.208.682l.108.054a9 9 0 006.086.71l3.114-.732a48.524 48.524 0 01-.005-10.499l-3.11.732a9 9 0 01-6.085-.711l-.108-.054a9 9 0 00-6.208-.682L3 4.5M3 15V4.5" />
            </svg>
          }
          helpText="Select the country that issued your passport"
        />

        <FormInput
          label="Email Address"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          placeholder="your.email@example.com"
          required
          autoComplete="email"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75z" />
            </svg>
          }
        />

        <FormInput
          label="Phone Number"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          error={errors.phone}
          placeholder="+1 (555) 123-4567"
          required
          autoComplete="tel"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
            </svg>
          }
        />
      </div>

      {/* Parents Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-base-content">Parents Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormInput
            label="Father's Name"
            name="fatherName"
            value={formData.fatherName}
            onChange={handleChange}
            error={errors.fatherName}
            placeholder="Enter your father's full name"
            required
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
            }
          />

          <FormInput
            label="Mother's Name"
            name="motherName"
            value={formData.motherName}
            onChange={handleChange}
            error={errors.motherName}
            placeholder="Enter your mother's full name"
            required
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
            }
          />
        </div>
      </div>

      {/* Address Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-base-content">Address Information</h3>
        <div className="space-y-6">
          <FormInput
            label="Residential Address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            error={errors.address}
            placeholder="Enter your complete residential address"
            required
            multiline
            rows={3}
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.5V3m-3 4.5l3-1.5m0 0l3 1.5m-3-1.5v3m-3 0l3 1.5" />
              </svg>
            }
          />

          <FormInput
            label="Planned Address in United States"
            name="usAddress"
            value={formData.usAddress}
            onChange={handleChange}
            error={errors.usAddress}
            placeholder="Enter your planned address in the United States (hotel or contact)"
            required
            multiline
            rows={3}
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
              </svg>
            }
          />
        </div>
      </div>

      {/* Additional Questions */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-base-content">Additional Questions</h3>
        <div className="space-y-4">
          <div className="form-control">
            <label className="label cursor-pointer justify-start gap-4">
              <input
                type="checkbox"
                name="previousUsTravel"
                checked={formData.previousUsTravel || false}
                onChange={handleCheckboxChange}
                className="checkbox checkbox-primary"
              />
              <span className="label-text">Have you traveled to the United States before?</span>
            </label>
          </div>

          <div className="form-control">
            <label className="label cursor-pointer justify-start gap-4">
              <input
                type="checkbox"
                name="hasCriminalRecord"
                checked={formData.hasCriminalRecord || false}
                onChange={handleCheckboxChange}
                className="checkbox checkbox-primary"
              />
              <span className="label-text">Do you have any criminal record or immigration problems?</span>
            </label>
            {formData.hasCriminalRecord && (
              <div className="mt-2">
                <FormInput
                  label="Please provide details"
                  name="criminalRecordDetails"
                  value={formData.criminalRecordDetails}
                  onChange={handleChange}
                  error={errors.criminalRecordDetails}
                  placeholder="Please provide details"
                  multiline
                  rows={3}
                />
              </div>
            )}
          </div>
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

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormInput
          label="Current Occupation"
          name="occupation"
          value={formData.occupation}
          onChange={handleChange}
          error={errors.occupation}
          placeholder="Enter your current occupation"
          required
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
            </svg>
          }
        />

        <FormInput
          label="Company Name"
          name="companyName"
          value={formData.companyName}
          onChange={handleChange}
          error={errors.companyName}
          placeholder="Enter your company name"
          required
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3a.75.75 0 01.75-.75h3a.75.75 0 01.75.75v3m-6 0h9" />
            </svg>
          }
        />

        <FormInput
          label="Position/Job Title"
          name="position"
          value={formData.position}
          onChange={handleChange}
          error={errors.position}
          placeholder="Enter your position or job title"
          required
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
            </svg>
          }
        />

        <FormInput
          label="Annual Income"
          name="annualIncome"
          type="number"
          value={formData.annualIncome}
          onChange={handleChange}
          error={errors.annualIncome}
          placeholder="Enter your annual income"
          required
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        />

        <div className="md:col-span-2">
          <FormInput
            label="Company Address"
            name="companyAddress"
            value={formData.companyAddress}
            onChange={handleChange}
            error={errors.companyAddress}
            placeholder="Enter your company address"
            required
            multiline
            rows={3}
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.5V3m-3 4.5l3-1.5m0 0l3 1.5m-3-1.5v3m-3 0l3 1.5" />
              </svg>
            }
          />
        </div>
      </div>
    </div>
  );
};

const PassportInfoStep = ({ formData, setFormData, errors }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ [name]: value });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <FormInput
        label="Passport Number"
        name="passportNumber"
        value={formData.passportNumber}
        onChange={handleChange}
        error={errors.passportNumber}
        placeholder="Enter passport number"
        required
        icon={
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0z" />
          </svg>
        }
      />

      <FormInput
        label="Passport Issue Date"
        name="passportIssueDate"
        type="date"
        value={formData.passportIssueDate}
        onChange={handleChange}
        error={errors.passportIssueDate}
        required
      />

      <FormInput
        label="Passport Expiry Date"
        name="passportExpiryDate"
        type="date"
        value={formData.passportExpiryDate}
        onChange={handleChange}
        error={errors.passportExpiryDate}
        required
        helpText="Must be valid for at least 6 months from travel date"
      />

      <FormInput
        label="Issuing Country"
        name="passportIssuingCountry"
        value={formData.passportIssuingCountry}
        onChange={handleChange}
        error={errors.passportIssuingCountry}
        placeholder="Country that issued your passport"
        required
      />
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
      <USAUpload
        onFileSelect={handleFileSelect}
        onUploadComplete={handleUploadComplete}
        error={errors.passportDocument}
      />
    </div>
  );
};

const Form = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [submissionResult, setSubmissionResult] = useState(null);

  // Form step configuration for USA ESTA
  const formSteps = [
    {
      title: "Personal Information",
      description: "Tell us about yourself",
      estimatedTime: 5,
      component: PersonalInfoStep,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-primary">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
        </svg>
      ),
      helpText: "Make sure all information matches your passport exactly.",
      validate: (data) => {
        const errors = {};
        if (!data.fullName) errors.fullName = 'Full name is required';
        if (!data.dateOfBirth) errors.dateOfBirth = 'Date of birth is required';
        if (!data.birthCity) errors.birthCity = 'City of birth is required';
        if (!data.birthCountry) errors.birthCountry = 'Country of birth is required';
        if (!data.nationality) errors.nationality = 'Nationality is required';
        if (!data.fatherName) errors.fatherName = 'Father\'s name is required';
        if (!data.motherName) errors.motherName = 'Mother\'s name is required';
        if (!data.email) errors.email = 'Email is required';
        if (!data.phone) errors.phone = 'Phone number is required';
        if (!data.address) errors.address = 'Residential address is required';
        if (!data.usAddress) errors.usAddress = 'US address is required';
        return errors;
      }
    },
    {
      title: "Professional Information",
      description: "Provide your work details",
      estimatedTime: 3,
      component: ProfessionalInfoStep,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-primary">
          <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
        </svg>
      ),
      helpText: "Provide accurate professional information for your application.",
      validate: (data) => {
        const errors = {};
        if (!data.occupation) errors.occupation = 'Occupation is required';
        if (!data.companyName) errors.companyName = 'Company name is required';
        if (!data.position) errors.position = 'Position is required';
        if (!data.annualIncome) errors.annualIncome = 'Annual income is required';
        if (!data.companyAddress) errors.companyAddress = 'Company address is required';
        return errors;
      }
    },
    {
      title: "Passport Details",
      description: "Provide your passport information",
      estimatedTime: 2,
      component: PassportInfoStep,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-primary">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0z" />
        </svg>
      ),
      helpText: "Double-check all passport details for accuracy.",
      validate: (data) => {
        const errors = {};
        if (!data.passportNumber) errors.passportNumber = 'Passport number is required';
        if (!data.passportIssueDate) errors.passportIssueDate = 'Issue date is required';
        if (!data.passportExpiryDate) errors.passportExpiryDate = 'Expiry date is required';
        if (!data.passportIssuingCountry) errors.passportIssuingCountry = 'Issuing country is required';
        return errors;
      }
    },
    {
      title: "Document Upload",
      description: "Upload your required documents",
      estimatedTime: 5,
      component: DocumentUploadStep,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-primary">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m6.75 12l-3-3m0 0l-3 3m3-3v6m-1.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c-.621 0-1.125-.504-1.125-1.125V11.25a9 9 0 00-9-9z" />
        </svg>
      ),
      helpText: "Ensure your documents are clear and readable. Accepted formats: PDF, JPG, PNG.",
      validate: (data) => {
        const errors = {};
        if (!data.passportDocument) errors.passportDocument = 'Passport document is required';
        return errors;
      }
    }
  ];

  const handleSubmit = async (formData) => {
    // Check authentication
    const currentSession = await getSession();
    
    if (!currentSession) {
      const currentUrl = window.location.pathname;
      router.push(`/login?callbackUrl=${encodeURIComponent(currentUrl)}`);
      return;
    }

    // Submit with user ID
    const dataWithUser = {
      ...formData,
      userId: currentSession.user.id
    };

    // Simulate API submission
    console.log('Submitting USA ESTA form data:', dataWithUser);
    
    await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate delay
    
    setSubmissionResult({
      success: true,
      message: 'Your USA ESTA application has been submitted successfully!',
      applicationId: 'ESTA-' + Math.random().toString(36).substr(2, 9).toUpperCase()
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
          <h1 className="text-2xl font-bold text-success mb-2">Application Submitted!</h1>
          <p className="text-base-content/70 mb-4">{submissionResult.message}</p>
          <div className="bg-base-200 rounded-lg p-3 mb-6">
            <p className="text-sm text-base-content/60">Application ID</p>
            <p className="font-mono font-bold">{submissionResult.applicationId}</p>
          </div>
          <button 
            className="btn btn-primary"
            onClick={() => window.location.reload()}
          >
            Start New Application
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-secondary text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center">
            🇺🇸 USA ESTA Application
          </h1>
          <p className="text-xl text-center mt-4 opacity-90">
            Apply for your Electronic System for Travel Authorization
          </p>
        </div>
      </div>

      {/* Enhanced Form - Full Width */}
      <div className="w-full">
        <EnhancedForm
          steps={formSteps}
          onSubmit={handleSubmit}
          onStepChange={handleStepChange}
          autoSave={true}
          autoSaveKey="usa-esta-visa-form"
          countryTheme="usa"
        />
      </div>
    </div>
  );
};

export default Form;
