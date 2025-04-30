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
          <h2 className="text-2xl font-bold">Información Personal</h2>
          <p className="text-base-content/70">Ingrese sus datos personales como aparecen en su pasaporte</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="form-control">
          <label className="label" htmlFor="nombreCompleto">
            <span className="label-text font-medium">Nombre Completo</span>
          </label>
          <input
            type="text"
            id="nombreCompleto"
            name="nombreCompleto"
            value={formData.nombreCompleto || ''}
            onChange={handleChange}
            className={`input input-bordered w-full ${errors.nombreCompleto ? 'input-error' : ''}`}
            placeholder="Ingrese su nombre completo"
          />
          {errors.nombreCompleto && (
            <label className="label">
              <span className="label-text-alt text-error">{errors.nombreCompleto}</span>
            </label>
          )}
        </div>

        <div className="form-control">
          <label className="label" htmlFor="fechaNacimiento">
            <span className="label-text font-medium">Fecha de Nacimiento</span>
          </label>
          <input
            type="date"
            id="fechaNacimiento"
            name="fechaNacimiento"
            value={formData.fechaNacimiento || ''}
            onChange={handleChange}
            className={`input input-bordered w-full ${errors.fechaNacimiento ? 'input-error' : ''}`}
          />
          {errors.fechaNacimiento && (
            <label className="label">
              <span className="label-text-alt text-error">{errors.fechaNacimiento}</span>
            </label>
          )}
        </div>

        <div className="form-control">
          <label className="label" htmlFor="lugarNacimiento">
            <span className="label-text font-medium">Lugar de Nacimiento</span>
          </label>
          <input
            type="text"
            id="lugarNacimiento"
            name="lugarNacimiento"
            value={formData.lugarNacimiento || ''}
            onChange={handleChange}
            className={`input input-bordered w-full ${errors.lugarNacimiento ? 'input-error' : ''}`}
            placeholder="Ingrese su lugar de nacimiento"
          />
          {errors.lugarNacimiento && (
            <label className="label">
              <span className="label-text-alt text-error">{errors.lugarNacimiento}</span>
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
              <span className="label-text-alt text-error">{errors.nacionalidad}</span>
            </label>
          )}
        </div>

        <div className="form-control">
          <label className="label" htmlFor="email">
            <span className="label-text font-medium">Correo Electrónico</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email || ''}
            onChange={handleChange}
            className={`input input-bordered w-full ${errors.email ? 'input-error' : ''}`}
            placeholder="Ingrese su correo electrónico"
          />
          {errors.email && (
            <label className="label">
              <span className="label-text-alt text-error">{errors.email}</span>
            </label>
          )}
        </div>

        <div className="form-control">
          <label className="label" htmlFor="telefono">
            <span className="label-text font-medium">Teléfono</span>
          </label>
          <input
            type="tel"
            id="telefono"
            name="telefono"
            value={formData.telefono || ''}
            onChange={handleChange}
            className={`input input-bordered w-full ${errors.telefono ? 'input-error' : ''}`}
            placeholder="Ingrese su número de teléfono"
          />
          {errors.telefono && (
            <label className="label">
              <span className="label-text-alt text-error">{errors.telefono}</span>
            </label>
          )}
        </div>

        <div className="form-control">
          <label className="label" htmlFor="direccionResidencia">
            <span className="label-text font-medium">Dirección de Residencia</span>
          </label>
          <input
            type="text"
            id="direccionResidencia"
            name="direccionResidencia"
            value={formData.direccionResidencia || ''}
            onChange={handleChange}
            className={`input input-bordered w-full ${errors.direccionResidencia ? 'input-error' : ''}`}
            placeholder="Ingrese su dirección de residencia"
          />
          {errors.direccionResidencia && (
            <label className="label">
              <span className="label-text-alt text-error">{errors.direccionResidencia}</span>
            </label>
          )}
        </div>

        <div className="form-control">
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
              <span className="label-text-alt text-error">{errors.numeroPasaporte}</span>
            </label>
          )}
        </div>

        <div className="form-control">
          <label className="label" htmlFor="fechaEmisionPasaporte">
            <span className="label-text font-medium">Fecha de Emisión del Pasaporte</span>
          </label>
          <input
            type="date"
            id="fechaEmisionPasaporte"
            name="fechaEmisionPasaporte"
            value={formData.fechaEmisionPasaporte || ''}
            onChange={handleChange}
            className={`input input-bordered w-full ${errors.fechaEmisionPasaporte ? 'input-error' : ''}`}
          />
          {errors.fechaEmisionPasaporte && (
            <label className="label">
              <span className="label-text-alt text-error">{errors.fechaEmisionPasaporte}</span>
            </label>
          )}
        </div>

        <div className="form-control">
          <label className="label" htmlFor="fechaExpiracionPasaporte">
            <span className="label-text font-medium">Fecha de Expiración del Pasaporte</span>
          </label>
          <input
            type="date"
            id="fechaExpiracionPasaporte"
            name="fechaExpiracionPasaporte"
            value={formData.fechaExpiracionPasaporte || ''}
            onChange={handleChange}
            className={`input input-bordered w-full ${errors.fechaExpiracionPasaporte ? 'input-error' : ''}`}
          />
          {errors.fechaExpiracionPasaporte && (
            <label className="label">
              <span className="label-text-alt text-error">{errors.fechaExpiracionPasaporte}</span>
            </label>
          )}
        </div>

        <div className="form-control">
          <label className="label" htmlFor="direccionAlojamientoCuba">
            <span className="label-text font-medium">Dirección de Alojamiento en Cuba</span>
          </label>
          <input
            type="text"
            id="direccionAlojamientoCuba"
            name="direccionAlojamientoCuba"
            value={formData.direccionAlojamientoCuba || ''}
            onChange={handleChange}
            className={`input input-bordered w-full ${errors.direccionAlojamientoCuba ? 'input-error' : ''}`}
            placeholder="Ingrese su dirección de alojamiento en Cuba"
          />
          {errors.direccionAlojamientoCuba && (
            <label className="label">
              <span className="label-text-alt text-error">{errors.direccionAlojamientoCuba}</span>
            </label>
          )}
        </div>

        <div className="form-control">
          <label className="label" htmlFor="vueloEntrada">
            <span className="label-text font-medium">Número de Vuelo de Entrada</span>
          </label>
          <input
            type="text"
            id="vueloEntrada"
            name="vueloEntrada"
            value={formData.vueloEntrada || ''}
            onChange={handleChange}
            className={`input input-bordered w-full ${errors.vueloEntrada ? 'input-error' : ''}`}
            placeholder="Ingrese su número de vuelo"
          />
          {errors.vueloEntrada && (
            <label className="label">
              <span className="label-text-alt text-error">{errors.vueloEntrada}</span>
            </label>
          )}
        </div>

        {/* Delivery Method */}
        <div className="form-control">
          <label className="label" htmlFor="metodoEntrega">
            <span className="label-text font-medium">Método de Entrega</span>
          </label>
          <select
            id="metodoEntrega"
            name="metodoEntrega"
            value={formData.metodoEntrega || ''}
            onChange={handleChange}
            className={`select select-bordered w-full ${errors.metodoEntrega ? 'select-error' : ''}`}
          >
            <option value="">Seleccione un método</option>
            <option value="correo">Correo</option>
            <option value="recogida">Recogida</option>
          </select>
          {errors.metodoEntrega && (
            <label className="label">
              <span className="label-text-alt text-error">{errors.metodoEntrega}</span>
            </label>
          )}
        </div>

        {formData.metodoEntrega === 'correo' && (
          <div className="form-control">
            <label className="label" htmlFor="direccionEnvio">
              <span className="label-text font-medium">Dirección de Envío</span>
            </label>
            <input
              type="text"
              id="direccionEnvio"
              name="direccionEnvio"
              value={formData.direccionEnvio || ''}
              onChange={handleChange}
              className={`input input-bordered w-full ${errors.direccionEnvio ? 'input-error' : ''}`}
              placeholder="Ingrese su dirección de envío"
            />
            {errors.direccionEnvio && (
              <label className="label">
                <span className="label-text-alt text-error">{errors.direccionEnvio}</span>
              </label>
            )}
          </div>
        )}

        {/* Consent */}
        <div className="form-control md:col-span-2">
          <label className="label cursor-pointer justify-start gap-4">
            <input
              type="checkbox"
              name="consentimientoProcesamiento"
              checked={formData.consentimientoProcesamiento || false}
              onChange={(e) => handleChange({ target: { name: 'consentimientoProcesamiento', value: e.target.checked } })}
              className="checkbox checkbox-primary"
            />
            <span className="label-text">Acepto el procesamiento de mis datos personales</span>
          </label>
          {errors.consentimientoProcesamiento && (
            <label className="label">
              <span className="label-text-alt text-error">{errors.consentimientoProcesamiento}</span>
            </label>
          )}
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo; 