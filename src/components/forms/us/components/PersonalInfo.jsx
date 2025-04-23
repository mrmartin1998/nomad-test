import React from 'react';

const PersonalInfo = ({ formData, setFormData, errors }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  return (
    <div className="form-control w-full">
      <div className="flex items-center gap-4 mb-6">
        <div className="bg-primary/10 p-3 rounded-full">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-primary">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
          </svg>
        </div>
        <div>
          <h2 className="text-2xl font-bold">Personal Information</h2>
          <p className="text-base-content/70">Enter your personal details as they appear in your passport</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Basic Personal Information */}
        <div className="form-control">
          <label className="label" htmlFor="fullName">
            <span className="label-text font-medium">Full Name (as in passport)</span>
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName || ''}
            onChange={handleChange}
            className={`input input-bordered w-full ${errors.fullName ? 'input-error' : ''}`}
            placeholder="Enter your full name"
          />
          {errors.fullName && (
            <label className="label">
              <span className="label-text-alt text-error flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                </svg>
                {errors.fullName}
              </span>
            </label>
          )}
        </div>

        <div className="form-control">
          <label className="label" htmlFor="dateOfBirth">
            <span className="label-text font-medium">Date of Birth</span>
          </label>
          <input
            type="date"
            id="dateOfBirth"
            name="dateOfBirth"
            value={formData.dateOfBirth || ''}
            onChange={handleChange}
            className={`input input-bordered w-full ${errors.dateOfBirth ? 'input-error' : ''}`}
          />
          {errors.dateOfBirth && (
            <label className="label">
              <span className="label-text-alt text-error flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                </svg>
                {errors.dateOfBirth}
              </span>
            </label>
          )}
        </div>

        <div className="form-control">
          <label className="label" htmlFor="birthCity">
            <span className="label-text font-medium">City of Birth</span>
          </label>
          <input
            type="text"
            id="birthCity"
            name="birthCity"
            value={formData.birthCity || ''}
            onChange={handleChange}
            className={`input input-bordered w-full ${errors.birthCity ? 'input-error' : ''}`}
            placeholder="Enter your city of birth"
          />
          {errors.birthCity && (
            <label className="label">
              <span className="label-text-alt text-error flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                </svg>
                {errors.birthCity}
              </span>
            </label>
          )}
        </div>

        <div className="form-control">
          <label className="label" htmlFor="birthCountry">
            <span className="label-text font-medium">Country of Birth</span>
          </label>
          <input
            type="text"
            id="birthCountry"
            name="birthCountry"
            value={formData.birthCountry || ''}
            onChange={handleChange}
            className={`input input-bordered w-full ${errors.birthCountry ? 'input-error' : ''}`}
            placeholder="Enter your country of birth"
          />
          {errors.birthCountry && (
            <label className="label">
              <span className="label-text-alt text-error flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                </svg>
                {errors.birthCountry}
              </span>
            </label>
          )}
        </div>

        <div className="form-control">
          <label className="label" htmlFor="nationality">
            <span className="label-text font-medium">Nationality</span>
          </label>
          <input
            type="text"
            id="nationality"
            name="nationality"
            value={formData.nationality || ''}
            onChange={handleChange}
            className={`input input-bordered w-full ${errors.nationality ? 'input-error' : ''}`}
            placeholder="Enter your nationality"
          />
          {errors.nationality && (
            <label className="label">
              <span className="label-text-alt text-error flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                </svg>
                {errors.nationality}
              </span>
            </label>
          )}
        </div>

        {/* Parents Information */}
        <div className="form-control">
          <label className="label" htmlFor="fatherName">
            <span className="label-text font-medium">Father's Name</span>
          </label>
          <input
            type="text"
            id="fatherName"
            name="fatherName"
            value={formData.fatherName || ''}
            onChange={handleChange}
            className={`input input-bordered w-full ${errors.fatherName ? 'input-error' : ''}`}
            placeholder="Enter your father's full name"
          />
          {errors.fatherName && (
            <label className="label">
              <span className="label-text-alt text-error flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                </svg>
                {errors.fatherName}
              </span>
            </label>
          )}
        </div>

        <div className="form-control">
          <label className="label" htmlFor="motherName">
            <span className="label-text font-medium">Mother's Name</span>
          </label>
          <input
            type="text"
            id="motherName"
            name="motherName"
            value={formData.motherName || ''}
            onChange={handleChange}
            className={`input input-bordered w-full ${errors.motherName ? 'input-error' : ''}`}
            placeholder="Enter your mother's full name"
          />
          {errors.motherName && (
            <label className="label">
              <span className="label-text-alt text-error flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                </svg>
                {errors.motherName}
              </span>
            </label>
          )}
        </div>

        {/* Contact Information */}
        <div className="form-control">
          <label className="label" htmlFor="email">
            <span className="label-text font-medium">Email</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email || ''}
            onChange={handleChange}
            className={`input input-bordered w-full ${errors.email ? 'input-error' : ''}`}
            placeholder="example@email.com"
          />
          {errors.email && (
            <label className="label">
              <span className="label-text-alt text-error flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                </svg>
                {errors.email}
              </span>
            </label>
          )}
        </div>

        <div className="form-control">
          <label className="label" htmlFor="phone">
            <span className="label-text font-medium">Phone Number</span>
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone || ''}
            onChange={handleChange}
            className={`input input-bordered w-full ${errors.phone ? 'input-error' : ''}`}
            placeholder="Enter your phone number"
          />
          {errors.phone && (
            <label className="label">
              <span className="label-text-alt text-error flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                </svg>
                {errors.phone}
              </span>
            </label>
          )}
        </div>

        {/* Passport Information */}
        <div className="form-control">
          <label className="label" htmlFor="passportNumber">
            <span className="label-text font-medium">Passport Number</span>
          </label>
          <input
            type="text"
            id="passportNumber"
            name="passportNumber"
            value={formData.passportNumber || ''}
            onChange={handleChange}
            className={`input input-bordered w-full ${errors.passportNumber ? 'input-error' : ''}`}
            placeholder="Enter your passport number"
          />
          {errors.passportNumber && (
            <label className="label">
              <span className="label-text-alt text-error flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                </svg>
                {errors.passportNumber}
              </span>
            </label>
          )}
        </div>

        <div className="form-control">
          <label className="label" htmlFor="passportIssueDate">
            <span className="label-text font-medium">Passport Issue Date</span>
          </label>
          <input
            type="date"
            id="passportIssueDate"
            name="passportIssueDate"
            value={formData.passportIssueDate || ''}
            onChange={handleChange}
            className={`input input-bordered w-full ${errors.passportIssueDate ? 'input-error' : ''}`}
          />
          {errors.passportIssueDate && (
            <label className="label">
              <span className="label-text-alt text-error flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                </svg>
                {errors.passportIssueDate}
              </span>
            </label>
          )}
        </div>

        <div className="form-control">
          <label className="label" htmlFor="passportExpiryDate">
            <span className="label-text font-medium">Passport Expiry Date</span>
          </label>
          <input
            type="date"
            id="passportExpiryDate"
            name="passportExpiryDate"
            value={formData.passportExpiryDate || ''}
            onChange={handleChange}
            className={`input input-bordered w-full ${errors.passportExpiryDate ? 'input-error' : ''}`}
          />
          {errors.passportExpiryDate && (
            <label className="label">
              <span className="label-text-alt text-error flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                </svg>
                {errors.passportExpiryDate}
              </span>
            </label>
          )}
        </div>

        <div className="form-control">
          <label className="label" htmlFor="passportIssuingCountry">
            <span className="label-text font-medium">Passport Issuing Country</span>
          </label>
          <input
            type="text"
            id="passportIssuingCountry"
            name="passportIssuingCountry"
            value={formData.passportIssuingCountry || ''}
            onChange={handleChange}
            className={`input input-bordered w-full ${errors.passportIssuingCountry ? 'input-error' : ''}`}
            placeholder="Enter issuing country"
          />
          {errors.passportIssuingCountry && (
            <label className="label">
              <span className="label-text-alt text-error flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                </svg>
                {errors.passportIssuingCountry}
              </span>
            </label>
          )}
        </div>

        {/* Address Information */}
        <div className="form-control md:col-span-2">
          <label className="label" htmlFor="address">
            <span className="label-text font-medium">Residential Address</span>
          </label>
          <textarea
            id="address"
            name="address"
            value={formData.address || ''}
            onChange={handleChange}
            className={`textarea textarea-bordered w-full h-24 ${errors.address ? 'textarea-error' : ''}`}
            placeholder="Enter your full residential address"
          />
          {errors.address && (
            <label className="label">
              <span className="label-text-alt text-error flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                </svg>
                {errors.address}
              </span>
            </label>
          )}
        </div>

        <div className="form-control md:col-span-2">
          <label className="label" htmlFor="usAddress">
            <span className="label-text font-medium">Planned US Address</span>
          </label>
          <textarea
            id="usAddress"
            name="usAddress"
            value={formData.usAddress || ''}
            onChange={handleChange}
            className={`textarea textarea-bordered w-full h-24 ${errors.usAddress ? 'textarea-error' : ''}`}
            placeholder="Enter your planned address in the US (hotel or contact)"
          />
          {errors.usAddress && (
            <label className="label">
              <span className="label-text-alt text-error flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                </svg>
                {errors.usAddress}
              </span>
            </label>
          )}
        </div>

        {/* Additional Questions */}
        <div className="form-control md:col-span-2">
          <label className="label cursor-pointer justify-start gap-4">
            <input
              type="checkbox"
              name="previousUsTravel"
              checked={formData.previousUsTravel || false}
              onChange={handleCheckboxChange}
              className="checkbox checkbox-primary"
            />
            <span className="label-text">Have you previously traveled to the United States?</span>
          </label>
        </div>

        <div className="form-control md:col-span-2">
          <label className="label cursor-pointer justify-start gap-4">
            <input
              type="checkbox"
              name="hasCriminalRecord"
              checked={formData.hasCriminalRecord || false}
              onChange={handleCheckboxChange}
              className="checkbox checkbox-primary"
            />
            <span className="label-text">Do you have any criminal records or immigration issues?</span>
          </label>
          {formData.hasCriminalRecord && (
            <div className="mt-2">
              <textarea
                name="criminalRecordDetails"
                value={formData.criminalRecordDetails || ''}
                onChange={handleChange}
                className="textarea textarea-bordered w-full"
                placeholder="Please provide details"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo; 