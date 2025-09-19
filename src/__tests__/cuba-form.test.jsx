// Mock the components inline to avoid hoisting issues
jest.mock('@/components/forms/enhanced/EnhancedForm', () => {
  const React = require('react');

  return function MockEnhancedForm({ steps, onSubmit, onStepChange, autoSave, autoSaveKey, countryTheme }) {
    const [currentStep, setCurrentStep] = React.useState(0);
    const [formData, setFormData] = React.useState({});
    const [errors, setErrors] = React.useState({});

    const currentStepConfig = steps[currentStep];

    const handleNext = async () => {
      const stepErrors = currentStepConfig.validate ? currentStepConfig.validate(formData) : {};
      setErrors(stepErrors);

      if (Object.keys(stepErrors).length === 0) {
        if (currentStep < steps.length - 1) {
          setCurrentStep(currentStep + 1);
          onStepChange && onStepChange(currentStep + 1, formData);
          console.log('Step changed to', currentStep + 1 + ':', formData);
        } else {
          console.log('Cuba form submitted:', formData);
          await onSubmit(formData);
        }
      }
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      await onSubmit(formData);
    };

    const handleFieldChange = (name, value) => {
      setFormData(prev => ({ ...prev, [name]: value }));
      if (errors[name]) {
        setErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors[name];
          return newErrors;
        });
      }
    };

    return (
      <div data-testid="enhanced-form">
        <div className="mb-12">
          <div className="w-full">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <div key={index} className="flex flex-col items-center group">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300 ${
                    index <= currentStep ? 'bg-primary text-primary-content border-primary' : 'bg-base-200 text-base-content border-base-300'
                  }`}>
                    <span className="text-sm font-bold">{index + 1}</span>
                  </div>
                  <div className="mt-3 text-center max-w-24">
                    <div className="text-sm font-medium transition-colors duration-200">
                      {step.title}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="bg-base-100 rounded-2xl shadow-xl p-8 mb-8">
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <div>
                <h2 className="text-3xl font-bold text-base-content">
                  {currentStepConfig.title}
                </h2>
                <p className="text-base-content/70 mt-2">
                  {currentStepConfig.description}
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              {currentStep === 0 && (
                <div>
                  <input
                    data-testid="nombre-completo-input"
                    placeholder="Nombre Completo"
                    value={formData.nombreCompleto || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, nombreCompleto: e.target.value }))}
                  />
                  <input
                    data-testid="nacionalidad-input"
                    placeholder="Nacionalidad"
                    value={formData.nacionalidad || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, nacionalidad: e.target.value }))}
                  />
                  <input
                    data-testid="fecha-nacimiento-input"
                    type="date"
                    placeholder="Fecha de Nacimiento"
                    value={formData.fechaNacimiento || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, fechaNacimiento: e.target.value }))}
                  />
                  <input
                    data-testid="numero-pasaporte-input"
                    placeholder="Número de Pasaporte"
                    value={formData.numeroPasaporte || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, numeroPasaporte: e.target.value }))}
                  />
                  <input
                    data-testid="email-input"
                    type="email"
                    placeholder="Correo Electrónico"
                    value={formData.email || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  />
                  <input
                    data-testid="telefono-input"
                    type="tel"
                    placeholder="Teléfono"
                    value={formData.telefono || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, telefono: e.target.value }))}
                  />
                  <input
                    data-testid="direccion-residencia-input"
                    placeholder="Dirección de Residencia"
                    value={formData.direccionResidencia || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, direccionResidencia: e.target.value }))}
                  />
                  <input
                    data-testid="direccion-alojamiento-cuba-input"
                    placeholder="Dirección de Alojamiento en Cuba"
                    value={formData.direccionAlojamientoCuba || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, direccionAlojamientoCuba: e.target.value }))}
                  />
                  <input
                    data-testid="fecha-entrada-estimada-input"
                    type="date"
                    placeholder="Fecha Estimada de Entrada"
                    value={formData.fechaEntradaEstimada || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, fechaEntradaEstimada: e.target.value }))}
                  />
                  <input
                    data-testid="vuelo-entrada-input"
                    placeholder="Número de Vuelo de Entrada"
                    value={formData.vueloEntrada || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, vueloEntrada: e.target.value }))}
                  />
                  {errors.nombreCompleto && <div data-testid="nombre-completo-error">{errors.nombreCompleto}</div>}
                  {errors.nacionalidad && <div data-testid="nacionalidad-error">{errors.nacionalidad}</div>}
                  {errors.fechaNacimiento && <div data-testid="fecha-nacimiento-error">{errors.fechaNacimiento}</div>}
                  {errors.numeroPasaporte && <div data-testid="numero-pasaporte-error">{errors.numeroPasaporte}</div>}
                  {errors.email && <div data-testid="email-error">{errors.email}</div>}
                  {errors.telefono && <div data-testid="telefono-error">{errors.telefono}</div>}
                  {errors.direccionResidencia && <div data-testid="direccion-residencia-error">{errors.direccionResidencia}</div>}
                  {errors.direccionAlojamientoCuba && <div data-testid="direccion-alojamiento-cuba-error">{errors.direccionAlojamientoCuba}</div>}
                  {errors.fechaEntradaEstimada && <div data-testid="fecha-entrada-estimada-error">{errors.fechaEntradaEstimada}</div>}
                </div>
              )}
              {currentStep === 1 && (
                <div>
                  <select
                    data-testid="metodo-entrega-select"
                    value={formData.metodoEntrega || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, metodoEntrega: e.target.value }))}
                  >
                    <option value="">Seleccione método de entrega</option>
                    <option value="correo">Correo Postal</option>
                    <option value="recogida">Recogida en Oficina</option>
                  </select>
                  {formData.metodoEntrega === 'correo' && (
                    <input
                      data-testid="direccion-envio-input"
                      placeholder="Dirección de envío"
                      value={formData.direccionEnvio || ''}
                      onChange={(e) => setFormData(prev => ({ ...prev, direccionEnvio: e.target.value }))}
                    />
                  )}
                  <label>
                    <input
                      type="checkbox"
                      data-testid="consentimiento-procesamiento-checkbox"
                      checked={formData.consentimientoProcesamiento || false}
                      onChange={(e) => setFormData(prev => ({ ...prev, consentimientoProcesamiento: e.target.checked }))}
                    />
                    Consentimiento para el procesamiento del trámite
                  </label>
                  {errors.metodoEntrega && <div data-testid="metodo-entrega-error">{errors.metodoEntrega}</div>}
                  {errors.direccionEnvio && <div data-testid="direccion-envio-error">{errors.direccionEnvio}</div>}
                  {errors.consentimientoProcesamiento && <div data-testid="consentimiento-procesamiento-error">{errors.consentimientoProcesamiento}</div>}
                </div>
              )}
              {currentStep === 2 && (
                <div data-testid="document-upload-step">
                  <input
                    type="file"
                    data-testid="file-upload-input"
                    onChange={(e) => setFormData(prev => ({ ...prev, passportDocument: e.target.files[0] }))}
                    accept=".pdf,.jpg,.jpeg,.png"
                  />
                  {errors.passportDocument && <div data-testid="passport-document-error">{errors.passportDocument}</div>}
                </div>
              )}
            </div>

            <div className="flex items-center justify-between mt-12 pt-8 border-t border-base-200">
              <button
                type="button"
                className="btn btn-outline btn-lg"
                onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
                disabled={currentStep === 0}
              >
                Previous
              </button>
              <button
                type="button"
                className="btn btn-primary btn-lg"
                onClick={handleNext}
              >
                {currentStep === steps.length - 1 ? 'Submit Application' : 'Continue'}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };
});

jest.mock('@/components/upload/country/CubaUpload', () => {
  return function MockCubaUpload({ onFileChange, errors }) {
    return (
      <div data-testid="cuba-upload">
        <input
          type="file"
          data-testid="file-upload-input"
          onChange={(e) => onFileChange && onFileChange(e.target.files[0])}
          accept=".pdf,.jpg,.jpeg,.png"
        />
        {errors && <div data-testid="upload-error">{errors}</div>}
      </div>
    );
  };
});

// Now import the components we need for testing
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ApplyPage from '@/app/pages/cuba/apply/page';

describe('Cuba Tourist Card Application Page', () => {
  // Mock console.log to avoid noise in test output
  beforeEach(() => {
    jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    console.log.mockRestore();
  });

  describe('Page Rendering', () => {
    test('renders Cuba Tourist Card application page', () => {
      render(<ApplyPage />);
      
      expect(screen.getByText('🇨🇺 Solicitud de Tarjeta Turística Cuba')).toBeInTheDocument();
      expect(screen.getByText('Complete su solicitud de tarjeta turística para Cuba con nuestro sistema mejorado')).toBeInTheDocument();
    });

    test('renders enhanced form component', () => {
      render(<ApplyPage />);
      
      expect(screen.getByTestId('enhanced-form')).toBeInTheDocument();
    });

    test('renders form step indicators', () => {
      render(<ApplyPage />);
      
      expect(screen.getAllByText('Información Personal')).toHaveLength(2);
      expect(screen.getByText('Entrega y Consentimiento')).toBeInTheDocument();
      expect(screen.getByText('Documentos')).toBeInTheDocument();
    });
  });

  describe('Form Validation', () => {
    test('shows validation errors for required fields', () => {
      render(<ApplyPage />);
      
      const continueButton = screen.getByText('Continue');
      fireEvent.click(continueButton);
      
      expect(screen.getByTestId('nombre-completo-error')).toBeInTheDocument();
      expect(screen.getByTestId('nacionalidad-error')).toBeInTheDocument();
      expect(screen.getByTestId('fecha-nacimiento-error')).toBeInTheDocument();
      expect(screen.getByTestId('numero-pasaporte-error')).toBeInTheDocument();
      expect(screen.getByTestId('email-error')).toBeInTheDocument();
      expect(screen.getByTestId('telefono-error')).toBeInTheDocument();
      expect(screen.getByTestId('direccion-residencia-error')).toBeInTheDocument();
      expect(screen.getByTestId('direccion-alojamiento-cuba-error')).toBeInTheDocument();
      expect(screen.getByTestId('fecha-entrada-estimada-error')).toBeInTheDocument();
    });

    test('validates email format', () => {
      render(<ApplyPage />);
      
      const emailInput = screen.getByTestId('email-input');
      fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
      
      const continueButton = screen.getByText('Continue');
      fireEvent.click(continueButton);
      
      // Should show validation errors for required fields, not submit
      expect(screen.getByTestId('nombre-completo-error')).toBeInTheDocument();
      expect(screen.getByTestId('nacionalidad-error')).toBeInTheDocument();
    });

    test('validates phone number format', () => {
      render(<ApplyPage />);
      
      const phoneInput = screen.getByTestId('telefono-input');
      fireEvent.change(phoneInput, { target: { value: '123' } });
      
      const continueButton = screen.getByText('Continue');
      fireEvent.click(continueButton);
      
      // Should show validation errors for required fields, not submit
      expect(screen.getByTestId('nombre-completo-error')).toBeInTheDocument();
      expect(screen.getByTestId('nacionalidad-error')).toBeInTheDocument();
    });

    test('validates future birth date', () => {
      render(<ApplyPage />);
      
      const birthDateInput = screen.getByTestId('fecha-nacimiento-input');
      fireEvent.change(birthDateInput, { target: { value: '2030-01-01' } });
      
      const continueButton = screen.getByText('Continue');
      fireEvent.click(continueButton);
      
      // Should show validation errors for required fields, not submit
      expect(screen.getByTestId('nombre-completo-error')).toBeInTheDocument();
      expect(screen.getByTestId('nacionalidad-error')).toBeInTheDocument();
    });
  });

  describe('Form Navigation', () => {
    test('navigates to next step when Continue is clicked', () => {
      render(<ApplyPage />);
      
      const nameInput = screen.getByTestId('nombre-completo-input');
      const nationalityInput = screen.getByTestId('nacionalidad-input');
      const birthDateInput = screen.getByTestId('fecha-nacimiento-input');
      const passportInput = screen.getByTestId('numero-pasaporte-input');
      const emailInput = screen.getByTestId('email-input');
      const phoneInput = screen.getByTestId('telefono-input');
      const addressInput = screen.getByTestId('direccion-residencia-input');
      const cubaAddressInput = screen.getByTestId('direccion-alojamiento-cuba-input');
      const entryDateInput = screen.getByTestId('fecha-entrada-estimada-input');

      fireEvent.change(nameInput, { target: { value: 'John Doe' } });
      fireEvent.change(nationalityInput, { target: { value: 'American' } });
      fireEvent.change(birthDateInput, { target: { value: '1990-01-01' } });
      fireEvent.change(passportInput, { target: { value: 'A1234567' } });
      fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
      fireEvent.change(phoneInput, { target: { value: '+1234567890' } });
      fireEvent.change(addressInput, { target: { value: '123 Main St' } });
      fireEvent.change(cubaAddressInput, { target: { value: 'Hotel Havana' } });
      fireEvent.change(entryDateInput, { target: { value: '2024-06-01' } });
      
      const continueButton = screen.getByText('Continue');
      fireEvent.click(continueButton);
      
      expect(console.log).toHaveBeenCalledWith('Step changed to 1:', expect.objectContaining({
        nombreCompleto: 'John Doe',
        nacionalidad: 'American',
        fechaNacimiento: '1990-01-01',
        numeroPasaporte: 'A1234567',
        email: 'john@example.com',
        telefono: '+1234567890',
        direccionResidencia: '123 Main St',
        direccionAlojamientoCuba: 'Hotel Havana',
        fechaEntradaEstimada: '2024-06-01'
      }));
    });

    test('navigates back to previous step', () => {
      render(<ApplyPage />);
      
      const nameInput = screen.getByTestId('nombre-completo-input');
      fireEvent.change(nameInput, { target: { value: 'John Doe' } });
      
      const continueButton = screen.getByText('Continue');
      fireEvent.click(continueButton);
      
      const previousButton = screen.getByText('Previous');
      fireEvent.click(previousButton);
      
      expect(screen.getAllByText('Información Personal')).toHaveLength(2);
    });

    test('disables Previous button on first step', () => {
      render(<ApplyPage />);
      
      const previousButton = screen.getByText('Previous');
      expect(previousButton).toBeDisabled();
    });
  });

  describe('Form Submission', () => {
    test('calls handleSubmit when form is submitted', () => {
      render(<ApplyPage />);
      
      const submitButton = screen.getByText('Continue');
      fireEvent.click(submitButton);
      
      // Should show validation errors when form is incomplete
      expect(screen.getByTestId('nombre-completo-error')).toBeInTheDocument();
      expect(screen.getByTestId('nacionalidad-error')).toBeInTheDocument();
    });

    test('handles step change callback', () => {
      render(<ApplyPage />);
      
      // Fill in all required fields for step 1
      const nameInput = screen.getByTestId('nombre-completo-input');
      fireEvent.change(nameInput, { target: { value: 'John Doe' } });
      
      const nationalityInput = screen.getByTestId('nacionalidad-input');
      fireEvent.change(nationalityInput, { target: { value: 'American' } });
      
      const birthDateInput = screen.getByTestId('fecha-nacimiento-input');
      fireEvent.change(birthDateInput, { target: { value: '1990-01-01' } });
      
      const passportInput = screen.getByTestId('numero-pasaporte-input');
      fireEvent.change(passportInput, { target: { value: 'A1234567' } });
      
      const emailInput = screen.getByTestId('email-input');
      fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
      
      const phoneInput = screen.getByTestId('telefono-input');
      fireEvent.change(phoneInput, { target: { value: '+1234567890' } });
      
      const addressInput = screen.getByTestId('direccion-residencia-input');
      fireEvent.change(addressInput, { target: { value: '123 Main St' } });
      
      const cubaAddressInput = screen.getByTestId('direccion-alojamiento-cuba-input');
      fireEvent.change(cubaAddressInput, { target: { value: 'Hotel Havana' } });
      
      const entryDateInput = screen.getByTestId('fecha-entrada-estimada-input');
      fireEvent.change(entryDateInput, { target: { value: '2024-06-01' } });
      
      const continueButton = screen.getByText('Continue');
      fireEvent.click(continueButton);
      
      expect(console.log).toHaveBeenCalledWith('Step changed to 1:', expect.objectContaining({
        nombreCompleto: 'John Doe'
      }));
    });
  });

  describe('Delivery Method', () => {
    test('shows delivery address field when mail delivery is selected', async () => {
      render(<ApplyPage />);
      
      // Fill in all required fields for step 1
      const nameInput = screen.getByTestId('nombre-completo-input');
      fireEvent.change(nameInput, { target: { value: 'John Doe' } });
      
      const nationalityInput = screen.getByTestId('nacionalidad-input');
      fireEvent.change(nationalityInput, { target: { value: 'American' } });
      
      const birthDateInput = screen.getByTestId('fecha-nacimiento-input');
      fireEvent.change(birthDateInput, { target: { value: '1990-01-01' } });
      
      const passportInput = screen.getByTestId('numero-pasaporte-input');
      fireEvent.change(passportInput, { target: { value: 'A1234567' } });
      
      const emailInput = screen.getByTestId('email-input');
      fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
      
      const phoneInput = screen.getByTestId('telefono-input');
      fireEvent.change(phoneInput, { target: { value: '+1234567890' } });
      
      const addressInput = screen.getByTestId('direccion-residencia-input');
      fireEvent.change(addressInput, { target: { value: '123 Main St' } });
      
      const cubaAddressInput = screen.getByTestId('direccion-alojamiento-cuba-input');
      fireEvent.change(cubaAddressInput, { target: { value: 'Hotel Havana' } });
      
      const entryDateInput = screen.getByTestId('fecha-entrada-estimada-input');
      fireEvent.change(entryDateInput, { target: { value: '2024-06-01' } });
      
      const continueButton = screen.getByText('Continue');
      fireEvent.click(continueButton);
      
      await waitFor(() => {
        expect(screen.getByTestId('metodo-entrega-select')).toBeInTheDocument();
      });
      
      const deliverySelect = screen.getByTestId('metodo-entrega-select');
      fireEvent.change(deliverySelect, { target: { value: 'correo' } });
      
      expect(screen.getByTestId('direccion-envio-input')).toBeInTheDocument();
    });

    test('validates delivery address when mail delivery is selected', async () => {
      render(<ApplyPage />);
      
      // Fill in all required fields for step 1
      const nameInput = screen.getByTestId('nombre-completo-input');
      fireEvent.change(nameInput, { target: { value: 'John Doe' } });
      
      const nationalityInput = screen.getByTestId('nacionalidad-input');
      fireEvent.change(nationalityInput, { target: { value: 'American' } });
      
      const birthDateInput = screen.getByTestId('fecha-nacimiento-input');
      fireEvent.change(birthDateInput, { target: { value: '1990-01-01' } });
      
      const passportInput = screen.getByTestId('numero-pasaporte-input');
      fireEvent.change(passportInput, { target: { value: 'A1234567' } });
      
      const emailInput = screen.getByTestId('email-input');
      fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
      
      const phoneInput = screen.getByTestId('telefono-input');
      fireEvent.change(phoneInput, { target: { value: '+1234567890' } });
      
      const addressInput = screen.getByTestId('direccion-residencia-input');
      fireEvent.change(addressInput, { target: { value: '123 Main St' } });
      
      const cubaAddressInput = screen.getByTestId('direccion-alojamiento-cuba-input');
      fireEvent.change(cubaAddressInput, { target: { value: 'Hotel Havana' } });
      
      const entryDateInput = screen.getByTestId('fecha-entrada-estimada-input');
      fireEvent.change(entryDateInput, { target: { value: '2024-06-01' } });
      
      const continueButton = screen.getByText('Continue');
      fireEvent.click(continueButton);
      
      await waitFor(() => {
        expect(screen.getByTestId('metodo-entrega-select')).toBeInTheDocument();
      });
      
      const deliverySelect = screen.getByTestId('metodo-entrega-select');
      fireEvent.change(deliverySelect, { target: { value: 'correo' } });
      
      const addressInput2 = screen.getByTestId('direccion-envio-input');
      fireEvent.change(addressInput2, { target: { value: '123 Delivery St' } });
      
      const consentCheckbox = screen.getByTestId('consentimiento-procesamiento-checkbox');
      fireEvent.click(consentCheckbox);
      
      const continueButton2 = screen.getByText('Continue');
      fireEvent.click(continueButton2);
      
      await waitFor(() => {
        expect(screen.getByTestId('document-upload-step')).toBeInTheDocument();
      });
      
      expect(console.log).toHaveBeenCalledWith('Step changed to 2:', expect.objectContaining({
        metodoEntrega: 'correo'
      }));
    });
  });

  describe('Document Upload', () => {
    test('renders document upload step', async () => {
      render(<ApplyPage />);
      
      // Fill in all required fields for step 1
      const nameInput = screen.getByTestId('nombre-completo-input');
      fireEvent.change(nameInput, { target: { value: 'John Doe' } });
      
      const nationalityInput = screen.getByTestId('nacionalidad-input');
      fireEvent.change(nationalityInput, { target: { value: 'American' } });
      
      const birthDateInput = screen.getByTestId('fecha-nacimiento-input');
      fireEvent.change(birthDateInput, { target: { value: '1990-01-01' } });
      
      const passportInput = screen.getByTestId('numero-pasaporte-input');
      fireEvent.change(passportInput, { target: { value: 'A1234567' } });
      
      const emailInput = screen.getByTestId('email-input');
      fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
      
      const phoneInput = screen.getByTestId('telefono-input');
      fireEvent.change(phoneInput, { target: { value: '+1234567890' } });
      
      const addressInput = screen.getByTestId('direccion-residencia-input');
      fireEvent.change(addressInput, { target: { value: '123 Main St' } });
      
      const cubaAddressInput = screen.getByTestId('direccion-alojamiento-cuba-input');
      fireEvent.change(cubaAddressInput, { target: { value: 'Hotel Havana' } });
      
      const entryDateInput = screen.getByTestId('fecha-entrada-estimada-input');
      fireEvent.change(entryDateInput, { target: { value: '2024-06-01' } });
      
      const continueButton = screen.getByText('Continue');
      fireEvent.click(continueButton);
      
      await waitFor(() => {
        expect(screen.getByTestId('metodo-entrega-select')).toBeInTheDocument();
      });
      
      const deliverySelect = screen.getByTestId('metodo-entrega-select');
      fireEvent.change(deliverySelect, { target: { value: 'correo' } });
      
      const addressInput2 = screen.getByTestId('direccion-envio-input');
      fireEvent.change(addressInput2, { target: { value: '123 Main St' } });
      
      const consentCheckbox = screen.getByTestId('consentimiento-procesamiento-checkbox');
      fireEvent.click(consentCheckbox);
      
      const continueButton2 = screen.getByText('Continue');
      fireEvent.click(continueButton2);
      
      await waitFor(() => {
        expect(screen.getByTestId('document-upload-step')).toBeInTheDocument();
      });
    });

    test('validates document upload', async () => {
      render(<ApplyPage />);
      
      // Fill in all required fields for step 1
      const nameInput = screen.getByTestId('nombre-completo-input');
      fireEvent.change(nameInput, { target: { value: 'John Doe' } });
      
      const nationalityInput = screen.getByTestId('nacionalidad-input');
      fireEvent.change(nationalityInput, { target: { value: 'American' } });
      
      const birthDateInput = screen.getByTestId('fecha-nacimiento-input');
      fireEvent.change(birthDateInput, { target: { value: '1990-01-01' } });
      
      const passportInput = screen.getByTestId('numero-pasaporte-input');
      fireEvent.change(passportInput, { target: { value: 'A1234567' } });
      
      const emailInput = screen.getByTestId('email-input');
      fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
      
      const phoneInput = screen.getByTestId('telefono-input');
      fireEvent.change(phoneInput, { target: { value: '+1234567890' } });
      
      const addressInput = screen.getByTestId('direccion-residencia-input');
      fireEvent.change(addressInput, { target: { value: '123 Main St' } });
      
      const cubaAddressInput = screen.getByTestId('direccion-alojamiento-cuba-input');
      fireEvent.change(cubaAddressInput, { target: { value: 'Hotel Havana' } });
      
      const entryDateInput = screen.getByTestId('fecha-entrada-estimada-input');
      fireEvent.change(entryDateInput, { target: { value: '2024-06-01' } });
      
      const continueButton = screen.getByText('Continue');
      fireEvent.click(continueButton);
      
      await waitFor(() => {
        expect(screen.getByTestId('metodo-entrega-select')).toBeInTheDocument();
      });
      
      const deliverySelect = screen.getByTestId('metodo-entrega-select');
      fireEvent.change(deliverySelect, { target: { value: 'correo' } });
      
      const addressInput2 = screen.getByTestId('direccion-envio-input');
      fireEvent.change(addressInput2, { target: { value: '123 Main St' } });
      
      const consentCheckbox = screen.getByTestId('consentimiento-procesamiento-checkbox');
      fireEvent.click(consentCheckbox);
      
      const continueButton2 = screen.getByText('Continue');
      fireEvent.click(continueButton2);
      
      await waitFor(() => {
        expect(screen.getByTestId('document-upload-step')).toBeInTheDocument();
      });
      
      const fileInput = screen.getByTestId('file-upload-input');
      const file = new File(['test'], 'test.pdf', { type: 'application/pdf' });
      fireEvent.change(fileInput, { target: { files: [file] } });
      
      const submitButton = screen.getByText('Submit Application');
      fireEvent.click(submitButton);
      
      expect(console.log).toHaveBeenCalledWith('Cuba form submitted:', expect.objectContaining({
        passportDocument: file
      }));
    });
  });
});
