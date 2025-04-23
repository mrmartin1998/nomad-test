import React from 'react';

const ProfessionalInfo = ({ formData, setFormData, errors }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Professional Information</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Current Occupation</span>
          </label>
          <input
            type="text"
            name="occupation"
            value={formData.occupation}
            onChange={handleChange}
            className={`input input-bordered w-full ${errors.occupation ? 'input-error' : ''}`}
            placeholder="Enter your current occupation"
          />
          {errors.occupation && (
            <label className="label">
              <span className="label-text-alt text-error">{errors.occupation}</span>
            </label>
          )}
        </div>

        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Company Name</span>
          </label>
          <input
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            className={`input input-bordered w-full ${errors.companyName ? 'input-error' : ''}`}
            placeholder="Enter your company name"
          />
          {errors.companyName && (
            <label className="label">
              <span className="label-text-alt text-error">{errors.companyName}</span>
            </label>
          )}
        </div>

        <div className="form-control w-full md:col-span-2">
          <label className="label">
            <span className="label-text">Company Address</span>
          </label>
          <textarea
            name="companyAddress"
            value={formData.companyAddress}
            onChange={handleChange}
            className={`textarea textarea-bordered w-full h-24 ${errors.companyAddress ? 'textarea-error' : ''}`}
            placeholder="Enter your company's address"
          />
          {errors.companyAddress && (
            <label className="label">
              <span className="label-text-alt text-error">{errors.companyAddress}</span>
            </label>
          )}
        </div>

        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Position</span>
          </label>
          <input
            type="text"
            name="position"
            value={formData.position}
            onChange={handleChange}
            className={`input input-bordered w-full ${errors.position ? 'input-error' : ''}`}
            placeholder="Enter your position"
          />
          {errors.position && (
            <label className="label">
              <span className="label-text-alt text-error">{errors.position}</span>
            </label>
          )}
        </div>

        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Annual Income</span>
          </label>
          <input
            type="number"
            name="annualIncome"
            value={formData.annualIncome}
            onChange={handleChange}
            className={`input input-bordered w-full ${errors.annualIncome ? 'input-error' : ''}`}
            placeholder="Enter your annual income"
          />
          {errors.annualIncome && (
            <label className="label">
              <span className="label-text-alt text-error">{errors.annualIncome}</span>
            </label>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfessionalInfo; 