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
      <h2 className="text-xl font-semibold">Información Profesional</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Ocupación Actual</span>
          </label>
          <input
            type="text"
            name="occupation"
            value={formData.occupation}
            onChange={handleChange}
            className={`input input-bordered w-full ${errors.occupation ? 'input-error' : ''}`}
            placeholder="Ingrese su ocupación actual"
          />
          {errors.occupation && (
            <label className="label">
              <span className="label-text-alt text-error">{errors.occupation}</span>
            </label>
          )}
        </div>

        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Nombre de la Empresa</span>
          </label>
          <input
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            className={`input input-bordered w-full ${errors.companyName ? 'input-error' : ''}`}
            placeholder="Ingrese el nombre de la empresa"
          />
          {errors.companyName && (
            <label className="label">
              <span className="label-text-alt text-error">{errors.companyName}</span>
            </label>
          )}
        </div>

        <div className="form-control w-full md:col-span-2">
          <label className="label">
            <span className="label-text">Dirección de la Empresa</span>
          </label>
          <textarea
            name="companyAddress"
            value={formData.companyAddress}
            onChange={handleChange}
            className={`textarea textarea-bordered w-full h-24 ${errors.companyAddress ? 'textarea-error' : ''}`}
            placeholder="Ingrese la dirección de la empresa"
          />
          {errors.companyAddress && (
            <label className="label">
              <span className="label-text-alt text-error">{errors.companyAddress}</span>
            </label>
          )}
        </div>

        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Cargo</span>
          </label>
          <input
            type="text"
            name="position"
            value={formData.position}
            onChange={handleChange}
            className={`input input-bordered w-full ${errors.position ? 'input-error' : ''}`}
            placeholder="Ingrese su cargo"
          />
          {errors.position && (
            <label className="label">
              <span className="label-text-alt text-error">{errors.position}</span>
            </label>
          )}
        </div>

        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Ingreso Anual</span>
          </label>
          <input
            type="number"
            name="annualIncome"
            value={formData.annualIncome}
            onChange={handleChange}
            className={`input input-bordered w-full ${errors.annualIncome ? 'input-error' : ''}`}
            placeholder="Ingrese su ingreso anual"
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