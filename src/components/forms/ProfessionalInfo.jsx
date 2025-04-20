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
    <div className="form-control w-full">
      <div className="flex items-center gap-4 mb-6">
        <div className="bg-primary/10 p-3 rounded-full">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-primary">
            <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
          </svg>
        </div>
        <div>
          <h2 className="text-2xl font-bold">Información Profesional</h2>
          <p className="text-base-content/70">Ingrese sus datos laborales</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="form-control">
          <label className="label" htmlFor="tipoEmpleo">
            <span className="label-text font-medium">Tipo de Empleo</span>
          </label>
          <select
            id="tipoEmpleo"
            name="tipoEmpleo"
            value={formData.tipoEmpleo || ''}
            onChange={handleChange}
            className={`select select-bordered w-full ${errors.tipoEmpleo ? 'select-error' : ''}`}
          >
            <option value="">Seleccione tipo de empleo</option>
            <option value="empleado">Empleado</option>
            <option value="independiente">Independiente</option>
            <option value="empresario">Empresario</option>
            <option value="otro">Otro</option>
          </select>
          {errors.tipoEmpleo && (
            <label className="label">
              <span className="label-text-alt text-error flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                </svg>
                {errors.tipoEmpleo}
              </span>
            </label>
          )}
        </div>

        <div className="form-control">
          <label className="label" htmlFor="ingresosMensuales">
            <span className="label-text font-medium">Ingresos Mensuales (USD)</span>
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/50">$</span>
            <input
              type="number"
              id="ingresosMensuales"
              name="ingresosMensuales"
              value={formData.ingresosMensuales || ''}
              onChange={handleChange}
              className={`input input-bordered w-full pl-7 ${errors.ingresosMensuales ? 'input-error' : ''}`}
              placeholder="0.00"
              min="0"
              step="0.01"
            />
          </div>
          {errors.ingresosMensuales && (
            <label className="label">
              <span className="label-text-alt text-error flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                </svg>
                {errors.ingresosMensuales}
              </span>
            </label>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfessionalInfo;