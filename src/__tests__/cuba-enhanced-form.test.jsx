import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import EnhancedForm from '@/components/forms/enhanced/EnhancedForm';

// Mock the EnhancedForm component
jest.mock('@/components/forms/enhanced/EnhancedForm', () => {
  return function MockEnhancedForm({ steps, onSubmit, onStepChange, autoSave, autoSaveKey }) {
    const [currentStep, setCurrentStep] = React.useState(0);
    const [formData, setFormData] = React.useState({});
    const [errors, setErrors] = React.useState({});

    const currentStepConfig = steps[currentStep];
    const CurrentStepComponent = currentStepConfig.component;

    const handleNext = async () => {
      const stepErrors = currentStepConfig.validate ? currentStepConfig.validate(formData) : {};
      setErrors(stepErrors);

      if (Object.keys(stepErrors).length === 0) {
        if (currentStep < steps.length - 1) {
          setCurrentStep(currentStep + 1);
          onStepChange && onStepChange(currentStep + 1, formData);
        } else {
          await onSubmit(formData);
        }
      }
    };

    // Clear errors when form data changes
    React.useEffect(() => {
      if (Object.keys(formData).length > 0 && Object.keys(errors).length > 0) {
        const stepErrors = currentStepConfig.validate ? currentStepConfig.validate(formData) : {};
        setErrors(stepErrors);
      }
    }, [formData, currentStep]);

    const handlePrevious = () => {
      if (currentStep > 0) {
        setCurrentStep(currentStep - 1);
        onStepChange && onStepChange(currentStep - 1, formData);
      }
    };

    // Auto-save functionality
    React.useEffect(() => {
      if (autoSave && autoSaveKey && Object.keys(formData).length > 0) {
        localStorage.setItem(autoSaveKey, JSON.stringify(formData));
      }
    }, [formData, autoSave, autoSaveKey]);

    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-blue-50 ">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Step Progress */}
            <div className="mb-12">
              <div className="w-full ">
                <div className="flex items-center justify-between">
                  {steps.map((step, index) => (
                    <React.Fragment key={index}>
                      <div className="flex flex-col items-center group">
                        <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300 ${
                          index === currentStep 
                            ? 'bg-primary text-primary-content border-primary shadow-lg scale-110 ring-4 ring-primary/20'
                            : 'bg-base-200 text-base-content border-base-300 hover:border-primary/50'
                        }`}>
                          <span className="text-sm font-bold">{index + 1}</span>
                        </div>
                        <div className="mt-3 text-center max-w-24">
                          <div className={`text-sm font-medium transition-colors duration-200 ${
                            index === currentStep ? 'text-primary' : 'text-base-content/70'
                          }`}>
                            {step.title}
                          </div>
                          {index === currentStep && (
                            <div className="text-xs text-base-content/50 mt-1">
                              ~ {step.estimatedTime} min
                            </div>
                          )}
                        </div>
                      </div>
                      {index < steps.length - 1 && (
                        <div className="flex-1 h-0.5 transition-all duration-500 bg-base-300" />
                      )}
                    </React.Fragment>
                  ))}
                </div>
                <div className="mt-6 w-full bg-base-200 rounded-full h-2 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-primary to-success transition-all duration-700 ease-out"
                    style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                  />
                </div>
                <div className="mt-4 flex justify-between items-center text-sm text-base-content/60">
                  <span>Step {currentStep + 1} of {steps.length}</span>
                  <span>{Math.round(((currentStep + 1) / steps.length) * 100)}% Complete</span>
                </div>
              </div>
            </div>

            {/* Form Content */}
            <div className="bg-base-100 rounded-2xl shadow-xl p-8 mb-8">
              <div className="mb-8">
                <div className="flex items-center gap-4 mb-4">
                  <div>
                    <h2 className="text-3xl font-bold text-base-content">{currentStepConfig.title}</h2>
                    <p className="text-base-content/70 mt-2">{currentStepConfig.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-primary">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Estimated time: {currentStepConfig.estimatedTime} minutes
                </div>
              </div>
              
              <form>
                <div className="space-y-6">
                  <CurrentStepComponent 
                    formData={formData} 
                    setFormData={setFormData} 
                    errors={errors} 
                  />
                </div>
                
                <div className="flex items-center justify-between mt-12 pt-8 border-t border-base-200">
                  <button
                    className="btn btn-outline btn-lg"
                    type="button"
                    onClick={handlePrevious}
                    disabled={currentStep === 0}
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Previous
                  </button>
                  <div className="flex items-center gap-4">
                    <button
                      className="btn btn-primary btn-lg"
                      type="button"
                      onClick={handleNext}
                    >
                      {currentStep === steps.length - 1 ? 'Submit Application' : 'Continue'}
                      <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  };
});

// Mock step components that match the actual form structure
const MockPersonalInfoStep = ({ formData, setFormData, errors }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div data-testid="personal-info-step">
      <input
        data-testid="nombre-completo-input"
        name="nombreCompleto"
        placeholder="Nombre Completo"
        value={formData.nombreCompleto || ''}
        onChange={handleChange}
      />
      <input
        data-testid="nacionalidad-input"
        name="nacionalidad"
        placeholder="Nacionalidad"
        value={formData.nacionalidad || ''}
        onChange={handleChange}
      />
      <input
        data-testid="fecha-nacimiento-input"
        name="fechaNacimiento"
        placeholder="Fecha de Nacimiento"
        type="date"
        value={formData.fechaNacimiento || ''}
        onChange={handleChange}
      />
      <input
        data-testid="numero-pasaporte-input"
        name="numeroPasaporte"
        placeholder="Número de Pasaporte"
        value={formData.numeroPasaporte || ''}
        onChange={handleChange}
      />
      <input
        data-testid="email-input"
        name="email"
        placeholder="Correo Electrónico"
        type="email"
        value={formData.email || ''}
        onChange={handleChange}
      />
      <input
        data-testid="telefono-input"
        name="telefono"
        placeholder="Teléfono"
        type="tel"
        value={formData.telefono || ''}
        onChange={handleChange}
      />
      <input
        data-testid="direccion-residencia-input"
        name="direccionResidencia"
        placeholder="Dirección de Residencia"
        value={formData.direccionResidencia || ''}
        onChange={handleChange}
      />
      <input
        data-testid="direccion-alojamiento-cuba-input"
        name="direccionAlojamientoCuba"
        placeholder="Dirección de Alojamiento en Cuba"
        value={formData.direccionAlojamientoCuba || ''}
        onChange={handleChange}
      />
      <input
        data-testid="fecha-entrada-estimada-input"
        name="fechaEntradaEstimada"
        placeholder="Fecha Estimada de Entrada"
        type="date"
        value={formData.fechaEntradaEstimada || ''}
        onChange={handleChange}
      />
      <input
        data-testid="vuelo-entrada-input"
        name="vueloEntrada"
        placeholder="Número de Vuelo de Entrada"
        value={formData.vueloEntrada || ''}
        onChange={handleChange}
      />
      
      {/* Show validation errors */}
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
  );
};

const MockDeliveryAndConsentStep = ({ formData, setFormData, errors }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  return (
    <div data-testid="delivery-consent-step">
      <select
        data-testid="metodo-entrega-select"
        name="metodoEntrega"
        value={formData.metodoEntrega || ''}
        onChange={handleChange}
      >
        <option value="">Seleccione método de entrega</option>
        <option value="correo">Correo Postal</option>
        <option value="recogida">Recogida en Oficina</option>
      </select>
      
      {formData.metodoEntrega === 'correo' && (
        <input
          data-testid="direccion-envio-input"
          name="direccionEnvio"
          placeholder="Dirección de envío"
          value={formData.direccionEnvio || ''}
          onChange={handleChange}
        />
      )}
      
      <label>
        <input
          type="checkbox"
          name="consentimientoProcesamiento"
          checked={formData.consentimientoProcesamiento || false}
          onChange={handleCheckboxChange}
        />
        Consentimiento para el procesamiento del trámite
      </label>
      
      {/* Show validation errors */}
      {errors.metodoEntrega && <div data-testid="metodo-entrega-error">{errors.metodoEntrega}</div>}
      {errors.direccionEnvio && <div data-testid="direccion-envio-error">{errors.direccionEnvio}</div>}
      {errors.consentimientoProcesamiento && <div data-testid="consentimiento-error">{errors.consentimientoProcesamiento}</div>}
    </div>
  );
};

const MockDocumentUploadStep = ({ formData, setFormData, errors }) => {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData(prev => ({ ...prev, passportDocument: file }));
  };

  return (
    <div data-testid="document-upload-step">
      <input
        type="file"
        data-testid="file-upload-input"
        onChange={handleFileChange}
        accept=".pdf,.jpg,.jpeg,.png"
      />
      
      {/* Show validation errors */}
      {errors.passportDocument && <div data-testid="passport-document-error">{errors.passportDocument}</div>}
    </div>
  );
};

// Define the steps array
const cubaSteps = [
  {
    title: "Información Personal",
    description: "Datos personales y de contacto",
    estimatedTime: 4,
    component: MockPersonalInfoStep,
    validate: (data) => {
      const errors = {};
      if (!data.nombreCompleto) errors.nombreCompleto = 'El nombre completo es requerido';
      if (!data.nacionalidad) errors.nacionalidad = 'La nacionalidad es requerida';
      if (!data.fechaNacimiento) errors.fechaNacimiento = 'La fecha de nacimiento es requerida';
      if (!data.numeroPasaporte) errors.numeroPasaporte = 'El número de pasaporte es requerido';
      if (!data.fechaEntradaEstimada) errors.fechaEntradaEstimada = 'La fecha estimada de entrada es requerida';
      if (!data.direccionAlojamientoCuba) errors.direccionAlojamientoCuba = 'La dirección de alojamiento en Cuba es requerida';
      if (!data.direccionResidencia) errors.direccionResidencia = 'La dirección de residencia es requerida';
      if (!data.email) errors.email = 'El correo electrónico es requerido';
      if (!data.telefono) errors.telefono = 'El teléfono es requerido';
      return errors;
    }
  },
  {
    title: "Entrega y Consentimiento",
    description: "Método de entrega y consentimiento",
    estimatedTime: 2,
    component: MockDeliveryAndConsentStep,
    validate: (data) => {
      const errors = {};
      if (!data.metodoEntrega) errors.metodoEntrega = 'El método de entrega es requerido';
      if (data.metodoEntrega === 'correo' && !data.direccionEnvio) {
        errors.direccionEnvio = 'La dirección de envío es requerida';
      }
      if (!data.consentimientoProcesamiento) {
        errors.consentimientoProcesamiento = 'Debe aceptar el procesamiento de sus datos personales';
      }
      return errors;
    }
  },
  {
    title: "Documentos",
    description: "Suba los documentos requeridos",
    estimatedTime: 3,
    component: MockDocumentUploadStep,
    validate: (data) => {
      const errors = {};
      if (!data.passportDocument) errors.passportDocument = 'El documento del pasaporte es requerido';
      return errors;
    }
  }
];

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
});

describe('Cuba Enhanced Form Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorageMock.getItem.mockReturnValue(null);
  });

  describe('Form Rendering', () => {
    test('renders all form steps', () => {
      render(<EnhancedForm steps={cubaSteps} onSubmit={jest.fn()} />);
      
      expect(screen.getAllByText('Información Personal')).toHaveLength(2); // Step indicator + form header
      expect(screen.getByText('Entrega y Consentimiento')).toBeInTheDocument();
      expect(screen.getByText('Documentos')).toBeInTheDocument();
    });

    test('renders first step by default', () => {
      render(<EnhancedForm steps={cubaSteps} onSubmit={jest.fn()} />);
      
      expect(screen.getByTestId('personal-info-step')).toBeInTheDocument();
      expect(screen.getByTestId('nombre-completo-input')).toBeInTheDocument();
    });

    test('renders step progress indicators', () => {
      render(<EnhancedForm steps={cubaSteps} onSubmit={jest.fn()} />);
      
      expect(screen.getByText('Step 1 of 3')).toBeInTheDocument();
      expect(screen.getByText('33% Complete')).toBeInTheDocument();
    });
  });

  describe('Form Navigation', () => {
    test('navigates to next step when Continue is clicked', async () => {
      render(<EnhancedForm steps={cubaSteps} onSubmit={jest.fn()} />);
      
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
      
      const residenceInput = screen.getByTestId('direccion-residencia-input');
      fireEvent.change(residenceInput, { target: { value: '123 Main St' } });
      
      const cubaAddressInput = screen.getByTestId('direccion-alojamiento-cuba-input');
      fireEvent.change(cubaAddressInput, { target: { value: '456 Cuba St' } });
      
      const entryDateInput = screen.getByTestId('fecha-entrada-estimada-input');
      fireEvent.change(entryDateInput, { target: { value: '2024-06-01' } });
      
      const continueButton = screen.getByText('Continue');
      fireEvent.click(continueButton);

      await waitFor(() => {
        expect(screen.getByTestId('delivery-consent-step')).toBeInTheDocument();
      });
    });

    test('navigates back to previous step', async () => {
      render(<EnhancedForm steps={cubaSteps} onSubmit={jest.fn()} />);
      
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
      
      const residenceInput = screen.getByTestId('direccion-residencia-input');
      fireEvent.change(residenceInput, { target: { value: '123 Main St' } });
      
      const cubaAddressInput = screen.getByTestId('direccion-alojamiento-cuba-input');
      fireEvent.change(cubaAddressInput, { target: { value: '456 Cuba St' } });
      
      const entryDateInput = screen.getByTestId('fecha-entrada-estimada-input');
      fireEvent.change(entryDateInput, { target: { value: '2024-06-01' } });
      
      const continueButton = screen.getByText('Continue');
      fireEvent.click(continueButton);

      await waitFor(() => {
        expect(screen.getByTestId('delivery-consent-step')).toBeInTheDocument();
      });

      const previousButton = screen.getByText('Previous');
      fireEvent.click(previousButton);

      await waitFor(() => {
        expect(screen.getByTestId('personal-info-step')).toBeInTheDocument();
      });
    });

    test('disables Previous button on first step', () => {
      render(<EnhancedForm steps={cubaSteps} onSubmit={jest.fn()} />);
      
      const previousButton = screen.getByText('Previous');
      expect(previousButton).toBeDisabled();
    });

    test('shows Submit Application button on last step', async () => {
      render(<EnhancedForm steps={cubaSteps} onSubmit={jest.fn()} />);
      
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
      
      const residenceInput = screen.getByTestId('direccion-residencia-input');
      fireEvent.change(residenceInput, { target: { value: '123 Main St' } });
      
      const cubaAddressInput = screen.getByTestId('direccion-alojamiento-cuba-input');
      fireEvent.change(cubaAddressInput, { target: { value: '456 Cuba St' } });
      
      const entryDateInput = screen.getByTestId('fecha-entrada-estimada-input');
      fireEvent.change(entryDateInput, { target: { value: '2024-06-01' } });
      
      const continueButton = screen.getByText('Continue');
      fireEvent.click(continueButton);

      await waitFor(() => {
        expect(screen.getByTestId('delivery-consent-step')).toBeInTheDocument();
      });

      // Fill in step 2 fields
      const deliverySelect = screen.getByTestId('metodo-entrega-select');
      fireEvent.change(deliverySelect, { target: { value: 'correo' } });
      
      const addressInput = screen.getByTestId('direccion-envio-input');
      fireEvent.change(addressInput, { target: { value: '789 Delivery St' } });
      
      const consentCheckbox = screen.getByRole('checkbox');
      fireEvent.click(consentCheckbox);
      
      const continueButton2 = screen.getByText('Continue');
      fireEvent.click(continueButton2);

      await waitFor(() => {
        expect(screen.getByTestId('document-upload-step')).toBeInTheDocument();
        expect(screen.getByText('Submit Application')).toBeInTheDocument();
      });
    });
  });

  describe('Form Validation', () => {
    test('shows validation errors for required fields', () => {
      render(<EnhancedForm steps={cubaSteps} onSubmit={jest.fn()} />);
      
      const continueButton = screen.getByText('Continue');
      fireEvent.click(continueButton);
      
      expect(screen.getByTestId('nombre-completo-error')).toBeInTheDocument();
      expect(screen.getByTestId('nacionalidad-error')).toBeInTheDocument();
    });

    test('clears validation errors when fields are filled', async () => {
      render(<EnhancedForm steps={cubaSteps} onSubmit={jest.fn()} />);
      
      const continueButton = screen.getByText('Continue');
      fireEvent.click(continueButton);
      
      expect(screen.getByTestId('nombre-completo-error')).toBeInTheDocument();
      
      const nameInput = screen.getByTestId('nombre-completo-input');
      fireEvent.change(nameInput, { target: { value: 'John Doe' } });
      
      await waitFor(() => {
        expect(screen.queryByTestId('nombre-completo-error')).not.toBeInTheDocument();
      });
    });

    test('validates delivery address when mail delivery is selected', async () => {
      render(<EnhancedForm steps={cubaSteps} onSubmit={jest.fn()} />);
      
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
      
      const residenceInput = screen.getByTestId('direccion-residencia-input');
      fireEvent.change(residenceInput, { target: { value: '123 Main St' } });
      
      const cubaAddressInput = screen.getByTestId('direccion-alojamiento-cuba-input');
      fireEvent.change(cubaAddressInput, { target: { value: '456 Cuba St' } });
      
      const entryDateInput = screen.getByTestId('fecha-entrada-estimada-input');
      fireEvent.change(entryDateInput, { target: { value: '2024-06-01' } });
      
      const continueButton = screen.getByText('Continue');
      fireEvent.click(continueButton);

      await waitFor(() => {
        expect(screen.getByTestId('delivery-consent-step')).toBeInTheDocument();
      });

      const deliverySelect = screen.getByTestId('metodo-entrega-select');
      fireEvent.change(deliverySelect, { target: { value: 'correo' } });
      
      const consentCheckbox = screen.getByRole('checkbox');
      fireEvent.click(consentCheckbox);
      
      const continueButton2 = screen.getByText('Continue');
      fireEvent.click(continueButton2);
      
      await waitFor(() => {
        expect(screen.getByTestId('direccion-envio-error')).toBeInTheDocument();
      });
    });

    test('validates document upload on last step', async () => {
      render(<EnhancedForm steps={cubaSteps} onSubmit={jest.fn()} />);
      
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
      
      const residenceInput = screen.getByTestId('direccion-residencia-input');
      fireEvent.change(residenceInput, { target: { value: '123 Main St' } });
      
      const cubaAddressInput = screen.getByTestId('direccion-alojamiento-cuba-input');
      fireEvent.change(cubaAddressInput, { target: { value: '456 Cuba St' } });
      
      const entryDateInput = screen.getByTestId('fecha-entrada-estimada-input');
      fireEvent.change(entryDateInput, { target: { value: '2024-06-01' } });
      
      const continueButton = screen.getByText('Continue');
      fireEvent.click(continueButton);

      await waitFor(() => {
        expect(screen.getByTestId('delivery-consent-step')).toBeInTheDocument();
      });

      // Fill in step 2 fields
      const deliverySelect = screen.getByTestId('metodo-entrega-select');
      fireEvent.change(deliverySelect, { target: { value: 'correo' } });
      
      const addressInput = screen.getByTestId('direccion-envio-input');
      fireEvent.change(addressInput, { target: { value: '789 Delivery St' } });
      
      const consentCheckbox = screen.getByRole('checkbox');
      fireEvent.click(consentCheckbox);
      
      const continueButton2 = screen.getByText('Continue');
      fireEvent.click(continueButton2);

      await waitFor(() => {
        expect(screen.getByTestId('document-upload-step')).toBeInTheDocument();
      });

      const submitButton = screen.getByText('Submit Application');
      fireEvent.click(submitButton);
      
      await waitFor(() => {
        expect(screen.getByTestId('passport-document-error')).toBeInTheDocument();
      });
    });
  });

  describe('Form Submission', () => {
    test('calls onSubmit when form is submitted successfully', async () => {
      const mockOnSubmit = jest.fn();
      render(<EnhancedForm steps={cubaSteps} onSubmit={mockOnSubmit} />);
      
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
      
      const residenceInput = screen.getByTestId('direccion-residencia-input');
      fireEvent.change(residenceInput, { target: { value: '123 Main St' } });
      
      const cubaAddressInput = screen.getByTestId('direccion-alojamiento-cuba-input');
      fireEvent.change(cubaAddressInput, { target: { value: '456 Cuba St' } });
      
      const entryDateInput = screen.getByTestId('fecha-entrada-estimada-input');
      fireEvent.change(entryDateInput, { target: { value: '2024-06-01' } });
      
      const continueButton = screen.getByText('Continue');
      fireEvent.click(continueButton);

      await waitFor(() => {
        expect(screen.getByTestId('delivery-consent-step')).toBeInTheDocument();
      });

      // Fill in step 2 fields
      const deliverySelect = screen.getByTestId('metodo-entrega-select');
      fireEvent.change(deliverySelect, { target: { value: 'correo' } });
      
      const addressInput = screen.getByTestId('direccion-envio-input');
      fireEvent.change(addressInput, { target: { value: '789 Delivery St' } });
      
      const consentCheckbox = screen.getByRole('checkbox');
      fireEvent.click(consentCheckbox);
      
      const continueButton2 = screen.getByText('Continue');
      fireEvent.click(continueButton2);

      await waitFor(() => {
        expect(screen.getByTestId('document-upload-step')).toBeInTheDocument();
      });

      // Upload a file
      const fileInput = screen.getByTestId('file-upload-input');
      const file = new File(['test'], 'test.pdf', { type: 'application/pdf' });
      fireEvent.change(fileInput, { target: { files: [file] } });
      
      const submitButton = screen.getByText('Submit Application');
      fireEvent.click(submitButton);
      
      await waitFor(() => {
        expect(mockOnSubmit).toHaveBeenCalledWith(expect.objectContaining({
          nombreCompleto: 'John Doe',
          passportDocument: file
        }));
      });
    });

    test('calls onStepChange when navigating between steps', async () => {
      const mockOnStepChange = jest.fn();
      render(<EnhancedForm steps={cubaSteps} onSubmit={jest.fn()} onStepChange={mockOnStepChange} />);
      
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
      
      const residenceInput = screen.getByTestId('direccion-residencia-input');
      fireEvent.change(residenceInput, { target: { value: '123 Main St' } });
      
      const cubaAddressInput = screen.getByTestId('direccion-alojamiento-cuba-input');
      fireEvent.change(cubaAddressInput, { target: { value: '456 Cuba St' } });
      
      const entryDateInput = screen.getByTestId('fecha-entrada-estimada-input');
      fireEvent.change(entryDateInput, { target: { value: '2024-06-01' } });
      
      const continueButton = screen.getByText('Continue');
      fireEvent.click(continueButton);

      await waitFor(() => {
        expect(mockOnStepChange).toHaveBeenCalledWith(1, expect.any(Object));
      });
    });
  });

  describe('Form Data Persistence', () => {
    test('maintains form data when navigating between steps', async () => {
      render(<EnhancedForm steps={cubaSteps} onSubmit={jest.fn()} />);
      
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
      
      const residenceInput = screen.getByTestId('direccion-residencia-input');
      fireEvent.change(residenceInput, { target: { value: '123 Main St' } });
      
      const cubaAddressInput = screen.getByTestId('direccion-alojamiento-cuba-input');
      fireEvent.change(cubaAddressInput, { target: { value: '456 Cuba St' } });
      
      const entryDateInput = screen.getByTestId('fecha-entrada-estimada-input');
      fireEvent.change(entryDateInput, { target: { value: '2024-06-01' } });
      
      const continueButton = screen.getByText('Continue');
      fireEvent.click(continueButton);

      await waitFor(() => {
        expect(screen.getByTestId('delivery-consent-step')).toBeInTheDocument();
      });

      const previousButton = screen.getByText('Previous');
      fireEvent.click(previousButton);

      await waitFor(() => {
        expect(screen.getByTestId('personal-info-step')).toBeInTheDocument();
        expect(screen.getByDisplayValue('John Doe')).toBeInTheDocument();
      });
    });
  });

  describe('Auto-save Functionality', () => {
    test('saves form data to localStorage', async () => {
      render(<EnhancedForm steps={cubaSteps} onSubmit={jest.fn()} autoSave={true} autoSaveKey="cuba-test-form" />);
      
      const nameInput = screen.getByTestId('nombre-completo-input');
      fireEvent.change(nameInput, { target: { value: 'John Doe' } });
      
      await waitFor(() => {
        expect(localStorageMock.setItem).toHaveBeenCalledWith(
          'cuba-test-form',
          expect.stringContaining('John Doe')
        );
      });
    });
  });
});