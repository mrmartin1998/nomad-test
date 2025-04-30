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
          <p className="text-base-content/70">Ingrese sus datos profesionales y de empleo</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="form-control">
          <label className="label" htmlFor="ocupacionActual">
            <span className="label-text font-medium">Ocupación Actual</span>
          </label>
          <input
            type="text"
            id="ocupacionActual"
            name="ocupacionActual"
            value={formData.ocupacionActual || ''}
            onChange={handleChange}
            className={`input input-bordered w-full ${errors.ocupacionActual ? 'input-error' : ''}`}
            placeholder="Ingrese su ocupación actual"
          />
          {errors.ocupacionActual && (
            <label className="label">
              <span className="label-text-alt text-error">{errors.ocupacionActual}</span>
            </label>
          )}
        </div>

        <div className="form-control">
          <label className="label" htmlFor="nombreEmpresa">
            <span className="label-text font-medium">Nombre de la Empresa</span>
          </label>
          <input
            type="text"
            id="nombreEmpresa"
            name="nombreEmpresa"
            value={formData.nombreEmpresa || ''}
            onChange={handleChange}
            className={`input input-bordered w-full ${errors.nombreEmpresa ? 'input-error' : ''}`}
            placeholder="Ingrese el nombre de su empresa"
          />
          {errors.nombreEmpresa && (
            <label className="label">
              <span className="label-text-alt text-error">{errors.nombreEmpresa}</span>
            </label>
          )}
        </div>

        <div className="form-control">
          <label className="label" htmlFor="direccionEmpleador">
            <span className="label-text font-medium">Dirección del Empleador</span>
          </label>
          <input
            type="text"
            id="direccionEmpleador"
            name="direccionEmpleador"
            value={formData.direccionEmpleador || ''}
            onChange={handleChange}
            className={`input input-bordered w-full ${errors.direccionEmpleador ? 'input-error' : ''}`}
            placeholder="Ingrese la dirección de su empleador"
          />
          {errors.direccionEmpleador && (
            <label className="label">
              <span className="label-text-alt text-error">{errors.direccionEmpleador}</span>
            </label>
          )}
        </div>

        <div className="form-control">
          <label className="label" htmlFor="telefonoEmpleador">
            <span className="label-text font-medium">Teléfono del Empleador</span>
          </label>
          <input
            type="tel"
            id="telefonoEmpleador"
            name="telefonoEmpleador"
            value={formData.telefonoEmpleador || ''}
            onChange={handleChange}
            className={`input input-bordered w-full ${errors.telefonoEmpleador ? 'input-error' : ''}`}
            placeholder="Ingrese el teléfono de su empleador"
          />
          {errors.telefonoEmpleador && (
            <label className="label">
              <span className="label-text-alt text-error">{errors.telefonoEmpleador}</span>
            </label>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfessionalInfo; 