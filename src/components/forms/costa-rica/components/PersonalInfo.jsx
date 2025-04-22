import React from 'react';

const PersonalInfo = ({ formData, setFormData, errors }) => {
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
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
          </svg>
        </div>
        <div>
          <h2 className="text-2xl font-bold">Información Personal</h2>
          <p className="text-base-content/70">Ingrese sus datos personales</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="form-control">
          <label className="label" htmlFor="nombre">
            <span className="label-text font-medium">Nombre</span>
          </label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre || ''}
            onChange={handleChange}
            className={`input input-bordered w-full ${errors.nombre ? 'input-error' : ''}`}
            placeholder="Ingrese su nombre"
          />
          {errors.nombre && (
            <label className="label">
              <span className="label-text-alt text-error flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                </svg>
                {errors.nombre}
              </span>
            </label>
          )}
        </div>

        <div className="form-control">
          <label className="label" htmlFor="apellidos">
            <span className="label-text font-medium">Apellidos</span>
          </label>
          <input
            type="text"
            id="apellidos"
            name="apellidos"
            value={formData.apellidos || ''}
            onChange={handleChange}
            className={`input input-bordered w-full ${errors.apellidos ? 'input-error' : ''}`}
            placeholder="Ingrese sus apellidos"
          />
          {errors.apellidos && (
            <label className="label">
              <span className="label-text-alt text-error flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                </svg>
                {errors.apellidos}
              </span>
            </label>
          )}
        </div>

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
            placeholder="ejemplo@correo.com"
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
          <label className="label" htmlFor="nacionalidad">
            <span className="label-text font-medium">Nacionalidad</span>
          </label>
          <input
            type="text"
            id="nacionalidad"
            name="nacionalidad"
            value={formData.nacionalidad || ''}
            onChange={handleChange}
            className={`input input-bordered w-full ${errors.nacionalidad ? 'input-error' : ''}`}
            placeholder="Ingrese su nacionalidad"
          />
          {errors.nacionalidad && (
            <label className="label">
              <span className="label-text-alt text-error flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                </svg>
                {errors.nacionalidad}
              </span>
            </label>
          )}
        </div>

        <div className="form-control md:col-span-2">
          <label className="label" htmlFor="numeroPasaporte">
            <span className="label-text font-medium">Número de Pasaporte</span>
          </label>
          <input
            type="text"
            id="numeroPasaporte"
            name="numeroPasaporte"
            value={formData.numeroPasaporte || ''}
            onChange={handleChange}
            className={`input input-bordered w-full ${errors.numeroPasaporte ? 'input-error' : ''}`}
            placeholder="Ingrese su número de pasaporte"
          />
          {errors.numeroPasaporte && (
            <label className="label">
              <span className="label-text-alt text-error flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                </svg>
                {errors.numeroPasaporte}
              </span>
            </label>
          )}
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo; 