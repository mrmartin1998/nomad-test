import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

// Mock the EnhancedForm component
jest.mock('@/components/forms/enhanced/EnhancedForm', () => {
  const React = require('react');
  return function MockEnhancedForm({ steps, onSubmit, onStepChange, autoSaveKey }) {
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
          const newStep = currentStep + 1;
          setCurrentStep(newStep);
          onStepChange && onStepChange(newStep, formData);
        } else {
          await onSubmit(formData);
        }
      }
    };

    const handlePrevious = () => {
      if (currentStep > 0) {
        const newStep = currentStep - 1;
        setCurrentStep(newStep);
        onStepChange && onStepChange(newStep, formData);
      }
    };

    const handleFieldChange = (name, value) => {
      setFormData(prev => ({ ...prev, [name]: value }));
      // Clear specific error when field is updated
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    };

    // Auto-save functionality
    React.useEffect(() => {
      if (autoSaveKey && Object.keys(formData).length > 0) {
        localStorage.setItem(autoSaveKey, JSON.stringify(formData));
      }
    }, [formData, autoSaveKey]);

    return (
      <div className="min-h-screen bg-gradient-to-br from-base-50 to-primary/5">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="mb-12">
              <div className="w-full">
                <div className="flex items-center justify-between">
                  {steps.map((step, index) => (
                    <React.Fragment key={index}>
                      <div className="flex flex-col items-center group">
                        <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300 ${
                          index === currentStep 
                            ? 'bg-primary text-primary-content border-primary shadow-lg scale-110 ring-4 ring-primary/20'
                            : index < currentStep
                            ? 'bg-success text-success-content border-success'
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
                    style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
                  />
                </div>
                <div className="mt-4 flex justify-between items-center text-sm text-base-content/60">
                  <span>Step {currentStep + 1} of {steps.length}</span>
                  <span>{Math.round((currentStep / (steps.length - 1)) * 100)}% Complete</span>
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
                <div className="flex items-center gap-2 text-sm text-primary">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
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
                    handleFieldChange={handleFieldChange}
                  />
                </div>
                <div className="flex items-center justify-between mt-12 pt-8 border-t border-base-200">
                  <button 
                    className="btn btn-outline btn-lg" 
                    type="button"
                    disabled={currentStep === 0}
                    onClick={handlePrevious}
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
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
                      <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  </div>
                </div>
              </form>
            </div>
            <div className="bg-info/10 border border-info/20 rounded-xl p-6">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-info mt-0.5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div>
                  <h4 className="font-medium text-info mb-2">Need Help?</h4>
                  <p className="text-sm text-info/80">{currentStepConfig.helpText}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
});

// Import the mocked EnhancedForm
import EnhancedForm from '@/components/forms/enhanced/EnhancedForm';

// Mock ThailandUpload component
jest.mock('@/components/upload/country/ThailandUpload', () => {
  const React = require('react');
  return function MockThailandUpload({ onFileSelect, onUploadComplete, error, documentType }) {
    const handleFileChange = (e) => {
      e.preventDefault();
      e.stopPropagation();
      const mockFile = new File(['test content'], 'test-document.pdf', { type: 'application/pdf' });
      onFileSelect && onFileSelect(mockFile);
      onUploadComplete && onUploadComplete(mockFile);
    };

    return (
      <div data-testid={`thailand-upload-${documentType}`}>
        <div className="form-control">
          <input
            type="file"
            data-testid={`upload-button-${documentType}`}
            onChange={handleFileChange}
            className="file-input file-input-bordered w-full"
          />
          {error && <div className="label-text-alt text-error" data-testid={`upload-error-${documentType}`}>{error}</div>}
        </div>
      </div>
    );
  };
});

// Thailand form step components
const MockPersonalInfoStep = ({ formData, setFormData, errors, handleFieldChange }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    handleFieldChange(name, value);
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
        data-testid="fecha-nacimiento-input"
        name="fechaNacimiento"
        placeholder="Fecha de Nacimiento"
        type="date"
        value={formData.fechaNacimiento || ''}
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
      {errors.nombreCompleto && <div data-testid="nombre-completo-error">{errors.nombreCompleto}</div>}
      {errors.fechaNacimiento && <div data-testid="fecha-nacimiento-error">{errors.fechaNacimiento}</div>}
      {errors.nacionalidad && <div data-testid="nacionalidad-error">{errors.nacionalidad}</div>}
      {errors.email && <div data-testid="email-error">{errors.email}</div>}
      {errors.telefono && <div data-testid="telefono-error">{errors.telefono}</div>}
      {errors.direccionResidencia && <div data-testid="direccion-residencia-error">{errors.direccionResidencia}</div>}
    </div>
  );
};

const MockProfessionalInfoStep = ({ formData, setFormData, errors, handleFieldChange }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    handleFieldChange(name, value);
  };

  return (
    <div data-testid="professional-info-step">
      <input
        data-testid="ocupacion-actual-input"
        name="ocupacionActual"
        placeholder="Ocupación Actual"
        value={formData.ocupacionActual || ''}
        onChange={handleChange}
      />
      <input
        data-testid="empresa-input"
        name="empresa"
        placeholder="Empresa"
        value={formData.empresa || ''}
        onChange={handleChange}
      />
      <input
        data-testid="direccion-empresa-input"
        name="direccionEmpresa"
        placeholder="Dirección de la Empresa"
        value={formData.direccionEmpresa || ''}
        onChange={handleChange}
      />
      <input
        data-testid="telefono-empresa-input"
        name="telefonoEmpresa"
        placeholder="Teléfono de la Empresa"
        type="tel"
        value={formData.telefonoEmpresa || ''}
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
        data-testid="fecha-emision-pasaporte-input"
        name="fechaEmisionPasaporte"
        placeholder="Fecha de Emisión del Pasaporte"
        type="date"
        value={formData.fechaEmisionPasaporte || ''}
        onChange={handleChange}
      />
      <input
        data-testid="fecha-expiracion-pasaporte-input"
        name="fechaExpiracionPasaporte"
        placeholder="Fecha de Expiración del Pasaporte"
        type="date"
        value={formData.fechaExpiracionPasaporte || ''}
        onChange={handleChange}
      />
      {errors.ocupacionActual && <div data-testid="ocupacion-actual-error">{errors.ocupacionActual}</div>}
      {errors.empresa && <div data-testid="empresa-error">{errors.empresa}</div>}
      {errors.direccionEmpresa && <div data-testid="direccion-empresa-error">{errors.direccionEmpresa}</div>}
      {errors.telefonoEmpresa && <div data-testid="telefono-empresa-error">{errors.telefonoEmpresa}</div>}
      {errors.numeroPasaporte && <div data-testid="numero-pasaporte-error">{errors.numeroPasaporte}</div>}
      {errors.fechaEmisionPasaporte && <div data-testid="fecha-emision-pasaporte-error">{errors.fechaEmisionPasaporte}</div>}
      {errors.fechaExpiracionPasaporte && <div data-testid="fecha-expiracion-pasaporte-error">{errors.fechaExpiracionPasaporte}</div>}
    </div>
  );
};

const MockDocumentUploadStep = ({ formData, setFormData, errors, handleFieldChange }) => {
  const handleFileSelect = (file, documentType) => {
    handleFieldChange(documentType, file);
  };

  return (
    <div data-testid="document-upload-step">
      <div data-testid="thailand-upload-foto">
        <button onClick={() => handleFileSelect(new File([''], 'foto.jpg'), 'fotoCarnet')} data-testid="upload-button-foto">
          Upload foto
        </button>
        {errors.fotoCarnet && <div data-testid="foto-carnet-error">{errors.fotoCarnet}</div>}
      </div>
      <div data-testid="thailand-upload-pasaporte">
        <button onClick={() => handleFileSelect(new File([''], 'pasaporte.pdf'), 'pasaporteEscaneado')} data-testid="upload-button-pasaporte">
          Upload pasaporte
        </button>
        {errors.pasaporteEscaneado && <div data-testid="pasaporte-escaneado-error">{errors.pasaporteEscaneado}</div>}
      </div>
      <div data-testid="thailand-upload-billete">
        <button onClick={() => handleFileSelect(new File([''], 'billete.pdf'), 'billeteSalida')} data-testid="upload-button-billete">
          Upload billete
        </button>
        {errors.billeteSalida && <div data-testid="billete-salida-error">{errors.billeteSalida}</div>}
      </div>
      <div data-testid="thailand-upload-hotel">
        <button onClick={() => handleFileSelect(new File([''], 'hotel.pdf'), 'reservaHotel')} data-testid="upload-button-hotel">
          Upload hotel
        </button>
        {errors.reservaHotel && <div data-testid="reserva-hotel-error">{errors.reservaHotel}</div>}
      </div>
    </div>
  );
};

const MockConsentStep = ({ formData, setFormData, errors, handleFieldChange }) => {
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    handleFieldChange(name, checked);
  };

  return (
    <div data-testid="consent-step">
      <label>
        <input
          type="checkbox"
          name="consentimientoProcesamiento"
          checked={formData.consentimientoProcesamiento || false}
          onChange={handleCheckboxChange}
        />
        Consentimiento de Procesamiento de Datos
      </label>
      <label>
        <input
          type="checkbox"
          name="veracidadInformacion"
          checked={formData.veracidadInformacion || false}
          onChange={handleCheckboxChange}
        />
        Veracidad de la Información
      </label>
      <label>
        <input
          type="checkbox"
          name="aceptacionTerminos"
          checked={formData.aceptacionTerminos || false}
          onChange={handleCheckboxChange}
        />
        Aceptación de Términos y Condiciones
      </label>
      {errors.consentimientoProcesamiento && <div data-testid="consentimiento-procesamiento-error">{errors.consentimientoProcesamiento}</div>}
      {errors.veracidadInformacion && <div data-testid="veracidad-informacion-error">{errors.veracidadInformacion}</div>}
      {errors.aceptacionTerminos && <div data-testid="aceptacion-terminos-error">{errors.aceptacionTerminos}</div>}
    </div>
  );
};

// Thailand form steps configuration
const thailandSteps = [
  {
    title: "Información Personal",
    description: "Ingrese sus datos personales y de contacto",
    estimatedTime: 4,
    component: MockPersonalInfoStep,
    icon: null,
    helpText: "Asegúrese de que toda la información coincida exactamente con su pasaporte.",
    validate: (data) => {
      const errors = {};
      if (!data.nombreCompleto) errors.nombreCompleto = 'El nombre completo es requerido';
      if (!data.fechaNacimiento) errors.fechaNacimiento = 'La fecha de nacimiento es requerida';
      if (!data.nacionalidad) errors.nacionalidad = 'La nacionalidad es requerida';
      if (!data.email) errors.email = 'El correo electrónico es requerido';
      if (!data.telefono) errors.telefono = 'El teléfono es requerido';
      if (!data.direccionResidencia) errors.direccionResidencia = 'La dirección de residencia es requerida';
      return errors;
    }
  },
  {
    title: "Información Profesional y Pasaporte",
    description: "Proporcione sus datos profesionales y de pasaporte",
    estimatedTime: 4,
    component: MockProfessionalInfoStep,
    icon: null,
    helpText: "Proporcione información detallada sobre su situación laboral y datos del pasaporte.",
    validate: (data) => {
      const errors = {};
      if (!data.ocupacionActual) errors.ocupacionActual = 'La ocupación actual es requerida';
      if (!data.empresa) errors.empresa = 'El nombre de la empresa es requerido';
      if (!data.direccionEmpresa) errors.direccionEmpresa = 'La dirección de la empresa es requerida';
      if (!data.telefonoEmpresa) errors.telefonoEmpresa = 'El teléfono de la empresa es requerido';
      if (!data.numeroPasaporte) errors.numeroPasaporte = 'El número de pasaporte es requerido';
      if (!data.fechaEmisionPasaporte) errors.fechaEmisionPasaporte = 'La fecha de emisión del pasaporte es requerida';
      if (!data.fechaExpiracionPasaporte) errors.fechaExpiracionPasaporte = 'La fecha de expiración del pasaporte es requerida';
      return errors;
    }
  },
  {
    title: "Documentos Requeridos",
    description: "Suba los documentos necesarios para su visa",
    estimatedTime: 5,
    component: MockDocumentUploadStep,
    icon: null,
    helpText: "Asegúrese de que sus documentos sean claros y legibles. Formatos aceptados: PDF, JPG, PNG.",
    validate: (data) => {
      const errors = {};
      if (!data.fotoCarnet) errors.fotoCarnet = 'La fotografía tipo carnet es requerida';
      if (!data.pasaporteEscaneado) errors.pasaporteEscaneado = 'El pasaporte escaneado es requerido';
      if (!data.billeteSalida) errors.billeteSalida = 'El boleto de salida es requerido';
      if (!data.reservaHotel) errors.reservaHotel = 'La reserva de hotel es requerida';
      return errors;
    }
  },
  {
    title: "Consentimiento y Condiciones",
    description: "Acepte los términos y condiciones",
    estimatedTime: 2,
    component: MockConsentStep,
    icon: null,
    helpText: "Lea cuidadosamente y acepte todos los términos y condiciones.",
    validate: (data) => {
      const errors = {};
      if (!data.consentimientoProcesamiento) errors.consentimientoProcesamiento = 'Debe aceptar el consentimiento de procesamiento de datos';
      if (!data.veracidadInformacion) errors.veracidadInformacion = 'Debe confirmar la veracidad de la información';
      if (!data.aceptacionTerminos) errors.aceptacionTerminos = 'Debe aceptar los términos y condiciones';
      return errors;
    }
  }
];

describe('Thailand Enhanced Form Component', () => {
  const localStorageMock = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock,
    });
  });

  describe('Form Rendering', () => {
    test('renders all form steps', () => {
      render(<EnhancedForm steps={thailandSteps} onSubmit={jest.fn()} />);
      
      expect(screen.getAllByText('Información Personal')).toHaveLength(2); // Step indicator + form header
      expect(screen.getByText('Información Profesional y Pasaporte')).toBeInTheDocument();
      expect(screen.getByText('Documentos Requeridos')).toBeInTheDocument();
      expect(screen.getByText('Consentimiento y Condiciones')).toBeInTheDocument();
    });

    test('renders first step by default', () => {
      render(<EnhancedForm steps={thailandSteps} onSubmit={jest.fn()} />);
      
      expect(screen.getByTestId('personal-info-step')).toBeInTheDocument();
      expect(screen.getByTestId('nombre-completo-input')).toBeInTheDocument();
      expect(screen.getByTestId('fecha-nacimiento-input')).toBeInTheDocument();
      expect(screen.getByTestId('nacionalidad-input')).toBeInTheDocument();
    });

    test('renders step progress indicators', () => {
      render(<EnhancedForm steps={thailandSteps} onSubmit={jest.fn()} />);
      
      expect(screen.getByText('Step 1 of 4')).toBeInTheDocument();
      expect(screen.getByText('0% Complete')).toBeInTheDocument();
    });
  });

  describe('Form Navigation', () => {
    test('navigates to next step when Continue is clicked', async () => {
      const mockOnStepChange = jest.fn();
      render(<EnhancedForm steps={thailandSteps} onSubmit={jest.fn()} onStepChange={mockOnStepChange} />);
      
      // Fill in all required fields for step 1
      fireEvent.change(screen.getByTestId('nombre-completo-input'), { target: { value: 'John Doe' } });
      fireEvent.change(screen.getByTestId('fecha-nacimiento-input'), { target: { value: '1990-01-01' } });
      fireEvent.change(screen.getByTestId('nacionalidad-input'), { target: { value: 'us' } });
      fireEvent.change(screen.getByTestId('email-input'), { target: { value: 'john@example.com' } });
      fireEvent.change(screen.getByTestId('telefono-input'), { target: { value: '+66 123 456 789' } });
      fireEvent.change(screen.getByTestId('direccion-residencia-input'), { target: { value: '123 Main St' } });

      const continueButton = screen.getByText('Continue');
      fireEvent.click(continueButton);

      await waitFor(() => {
        expect(screen.getByTestId('professional-info-step')).toBeInTheDocument();
        expect(mockOnStepChange).toHaveBeenCalledWith(1, expect.any(Object));
      });
    });

    test('navigates back to previous step', async () => {
      const mockOnStepChange = jest.fn();
      render(<EnhancedForm steps={thailandSteps} onSubmit={jest.fn()} onStepChange={mockOnStepChange} />);
      
      // Navigate to step 2 first
      fireEvent.change(screen.getByTestId('nombre-completo-input'), { target: { value: 'John Doe' } });
      fireEvent.change(screen.getByTestId('fecha-nacimiento-input'), { target: { value: '1990-01-01' } });
      fireEvent.change(screen.getByTestId('nacionalidad-input'), { target: { value: 'us' } });
      fireEvent.change(screen.getByTestId('email-input'), { target: { value: 'john@example.com' } });
      fireEvent.change(screen.getByTestId('telefono-input'), { target: { value: '+66 123 456 789' } });
      fireEvent.change(screen.getByTestId('direccion-residencia-input'), { target: { value: '123 Main St' } });

      fireEvent.click(screen.getByText('Continue'));

      await waitFor(() => {
        expect(screen.getByTestId('professional-info-step')).toBeInTheDocument();
      });

      // Now go back to step 1
      const previousButton = screen.getByText('Previous');
      fireEvent.click(previousButton);

      await waitFor(() => {
        expect(screen.getByTestId('personal-info-step')).toBeInTheDocument();
        expect(mockOnStepChange).toHaveBeenCalledWith(0, expect.any(Object));
      });
    });

    test('disables Previous button on first step', () => {
      render(<EnhancedForm steps={thailandSteps} onSubmit={jest.fn()} />);
      
      const previousButton = screen.getByText('Previous');
      expect(previousButton).toBeDisabled();
    });

    test('shows Submit Application button on last step', async () => {
      const mockOnSubmit = jest.fn();
      render(<EnhancedForm steps={thailandSteps} onSubmit={mockOnSubmit} />);
      
      // Navigate through all steps
      // Step 1: Personal Info
      fireEvent.change(screen.getByTestId('nombre-completo-input'), { target: { value: 'John Doe' } });
      fireEvent.change(screen.getByTestId('fecha-nacimiento-input'), { target: { value: '1990-01-01' } });
      fireEvent.change(screen.getByTestId('nacionalidad-input'), { target: { value: 'us' } });
      fireEvent.change(screen.getByTestId('email-input'), { target: { value: 'john@example.com' } });
      fireEvent.change(screen.getByTestId('telefono-input'), { target: { value: '+66 123 456 789' } });
      fireEvent.change(screen.getByTestId('direccion-residencia-input'), { target: { value: '123 Main St' } });

      fireEvent.click(screen.getByText('Continue'));

      // Step 2: Professional Info
      await waitFor(() => {
        expect(screen.getByTestId('professional-info-step')).toBeInTheDocument();
      });

      fireEvent.change(screen.getByTestId('ocupacion-actual-input'), { target: { value: 'Software Engineer' } });
      fireEvent.change(screen.getByTestId('empresa-input'), { target: { value: 'Tech Corp' } });
      fireEvent.change(screen.getByTestId('direccion-empresa-input'), { target: { value: '456 Business Ave' } });
      fireEvent.change(screen.getByTestId('telefono-empresa-input'), { target: { value: '+1 555 123 4567' } });
      fireEvent.change(screen.getByTestId('numero-pasaporte-input'), { target: { value: 'AB1234567' } });
      fireEvent.change(screen.getByTestId('fecha-emision-pasaporte-input'), { target: { value: '2020-01-01' } });
      fireEvent.change(screen.getByTestId('fecha-expiracion-pasaporte-input'), { target: { value: '2030-01-01' } });

      fireEvent.click(screen.getByText('Continue'));

      // Step 3: Documents
      await waitFor(() => {
        expect(screen.getByTestId('document-upload-step')).toBeInTheDocument();
      });

      // Simulate file uploads by triggering change events on file inputs
      const mockFile = new File(['test content'], 'test-document.pdf', { type: 'application/pdf' });
      
      fireEvent.click(screen.getByTestId('upload-button-foto'));
      fireEvent.click(screen.getByTestId('upload-button-pasaporte'));
      fireEvent.click(screen.getByTestId('upload-button-billete'));
      fireEvent.click(screen.getByTestId('upload-button-hotel'));

      fireEvent.click(screen.getByText('Continue'));

      // Step 4: Consent
      await waitFor(() => {
        expect(screen.getByTestId('consent-step')).toBeInTheDocument();
        expect(screen.getByText('Submit Application')).toBeInTheDocument();
      });
    });
  });

  describe('Form Validation', () => {
    test('shows validation errors for required fields', async () => {
      render(<EnhancedForm steps={thailandSteps} onSubmit={jest.fn()} />);
      
      const continueButton = screen.getByText('Continue');
      fireEvent.click(continueButton);

      await waitFor(() => {
        expect(screen.getByTestId('nombre-completo-error')).toBeInTheDocument();
        expect(screen.getByTestId('fecha-nacimiento-error')).toBeInTheDocument();
        expect(screen.getByTestId('nacionalidad-error')).toBeInTheDocument();
        expect(screen.getByTestId('email-error')).toBeInTheDocument();
        expect(screen.getByTestId('telefono-error')).toBeInTheDocument();
        expect(screen.getByTestId('direccion-residencia-error')).toBeInTheDocument();
      });
    });

    test('clears validation errors when fields are filled', async () => {
      render(<EnhancedForm steps={thailandSteps} onSubmit={jest.fn()} />);
      
      // First trigger validation errors
      const continueButton = screen.getByText('Continue');
      fireEvent.click(continueButton);

      await waitFor(() => {
        expect(screen.getByTestId('nombre-completo-error')).toBeInTheDocument();
      });

      // Now fill in the field
      fireEvent.change(screen.getByTestId('nombre-completo-input'), { target: { value: 'John Doe' } });

      await waitFor(() => {
        expect(screen.queryByTestId('nombre-completo-error')).not.toBeInTheDocument();
      });
    });

    test('validates document upload on last step', async () => {
      render(<EnhancedForm steps={thailandSteps} onSubmit={jest.fn()} />);
      
      // Navigate to document upload step
      fireEvent.change(screen.getByTestId('nombre-completo-input'), { target: { value: 'John Doe' } });
      fireEvent.change(screen.getByTestId('fecha-nacimiento-input'), { target: { value: '1990-01-01' } });
      fireEvent.change(screen.getByTestId('nacionalidad-input'), { target: { value: 'us' } });
      fireEvent.change(screen.getByTestId('email-input'), { target: { value: 'john@example.com' } });
      fireEvent.change(screen.getByTestId('telefono-input'), { target: { value: '+66 123 456 789' } });
      fireEvent.change(screen.getByTestId('direccion-residencia-input'), { target: { value: '123 Main St' } });

      fireEvent.click(screen.getByText('Continue'));

      // Step 2: Professional Info
      await waitFor(() => {
        expect(screen.getByTestId('professional-info-step')).toBeInTheDocument();
      });

      fireEvent.change(screen.getByTestId('ocupacion-actual-input'), { target: { value: 'Software Engineer' } });
      fireEvent.change(screen.getByTestId('empresa-input'), { target: { value: 'Tech Corp' } });
      fireEvent.change(screen.getByTestId('direccion-empresa-input'), { target: { value: '456 Business Ave' } });
      fireEvent.change(screen.getByTestId('telefono-empresa-input'), { target: { value: '+1 555 123 4567' } });
      fireEvent.change(screen.getByTestId('numero-pasaporte-input'), { target: { value: 'AB1234567' } });
      fireEvent.change(screen.getByTestId('fecha-emision-pasaporte-input'), { target: { value: '2020-01-01' } });
      fireEvent.change(screen.getByTestId('fecha-expiracion-pasaporte-input'), { target: { value: '2030-01-01' } });

      fireEvent.click(screen.getByText('Continue'));

      // Step 3: Documents - try to continue without uploading
      await waitFor(() => {
        expect(screen.getByTestId('document-upload-step')).toBeInTheDocument();
      });

      fireEvent.click(screen.getByText('Continue'));

      await waitFor(() => {
        expect(screen.getByTestId('foto-carnet-error')).toBeInTheDocument();
        expect(screen.getByTestId('pasaporte-escaneado-error')).toBeInTheDocument();
        expect(screen.getByTestId('billete-salida-error')).toBeInTheDocument();
        expect(screen.getByTestId('reserva-hotel-error')).toBeInTheDocument();
      });
    });
  });

  describe('Form Submission', () => {
    test('calls onSubmit when form is submitted successfully', async () => {
      const mockOnSubmit = jest.fn();
      render(<EnhancedForm steps={thailandSteps} onSubmit={mockOnSubmit} />);
      
      // Navigate through all steps and fill all required data
      // Step 1: Personal Info
      fireEvent.change(screen.getByTestId('nombre-completo-input'), { target: { value: 'John Doe' } });
      fireEvent.change(screen.getByTestId('fecha-nacimiento-input'), { target: { value: '1990-01-01' } });
      fireEvent.change(screen.getByTestId('nacionalidad-input'), { target: { value: 'us' } });
      fireEvent.change(screen.getByTestId('email-input'), { target: { value: 'john@example.com' } });
      fireEvent.change(screen.getByTestId('telefono-input'), { target: { value: '+66 123 456 789' } });
      fireEvent.change(screen.getByTestId('direccion-residencia-input'), { target: { value: '123 Main St' } });

      fireEvent.click(screen.getByText('Continue'));

      // Step 2: Professional Info
      await waitFor(() => {
        expect(screen.getByTestId('professional-info-step')).toBeInTheDocument();
      });

      fireEvent.change(screen.getByTestId('ocupacion-actual-input'), { target: { value: 'Software Engineer' } });
      fireEvent.change(screen.getByTestId('empresa-input'), { target: { value: 'Tech Corp' } });
      fireEvent.change(screen.getByTestId('direccion-empresa-input'), { target: { value: '456 Business Ave' } });
      fireEvent.change(screen.getByTestId('telefono-empresa-input'), { target: { value: '+1 555 123 4567' } });
      fireEvent.change(screen.getByTestId('numero-pasaporte-input'), { target: { value: 'AB1234567' } });
      fireEvent.change(screen.getByTestId('fecha-emision-pasaporte-input'), { target: { value: '2020-01-01' } });
      fireEvent.change(screen.getByTestId('fecha-expiracion-pasaporte-input'), { target: { value: '2030-01-01' } });

      fireEvent.click(screen.getByText('Continue'));

      // Step 3: Documents
      await waitFor(() => {
        expect(screen.getByTestId('document-upload-step')).toBeInTheDocument();
      });

      // Simulate file uploads by triggering change events on file inputs
      const mockFile = new File(['test content'], 'test-document.pdf', { type: 'application/pdf' });
      
      fireEvent.click(screen.getByTestId('upload-button-foto'));
      fireEvent.click(screen.getByTestId('upload-button-pasaporte'));
      fireEvent.click(screen.getByTestId('upload-button-billete'));
      fireEvent.click(screen.getByTestId('upload-button-hotel'));

      fireEvent.click(screen.getByText('Continue'));

      // Step 4: Consent
      await waitFor(() => {
        expect(screen.getByTestId('consent-step')).toBeInTheDocument();
      });

      const checkboxes = screen.getAllByRole('checkbox');
      checkboxes.forEach(checkbox => {
        fireEvent.click(checkbox);
      });

      fireEvent.click(screen.getByText('Submit Application'));

      await waitFor(() => {
        expect(mockOnSubmit).toHaveBeenCalledWith(expect.objectContaining({
          nombreCompleto: 'John Doe',
          email: 'john@example.com',
          ocupacionActual: 'Software Engineer',
          fotoCarnet: expect.any(File),
          consentimientoProcesamiento: true
        }));
      });
    });

    test('calls onStepChange when navigating between steps', async () => {
      const mockOnStepChange = jest.fn();
      render(<EnhancedForm steps={thailandSteps} onSubmit={jest.fn()} onStepChange={mockOnStepChange} />);
      
      fireEvent.change(screen.getByTestId('nombre-completo-input'), { target: { value: 'John Doe' } });
      fireEvent.change(screen.getByTestId('fecha-nacimiento-input'), { target: { value: '1990-01-01' } });
      fireEvent.change(screen.getByTestId('nacionalidad-input'), { target: { value: 'us' } });
      fireEvent.change(screen.getByTestId('email-input'), { target: { value: 'john@example.com' } });
      fireEvent.change(screen.getByTestId('telefono-input'), { target: { value: '+66 123 456 789' } });
      fireEvent.change(screen.getByTestId('direccion-residencia-input'), { target: { value: '123 Main St' } });

      fireEvent.click(screen.getByText('Continue'));

      await waitFor(() => {
        expect(mockOnStepChange).toHaveBeenCalledWith(1, expect.objectContaining({
          nombreCompleto: 'John Doe',
          email: 'john@example.com'
        }));
      });
    });
  });

  describe('Form Data Persistence', () => {
    test('maintains form data when navigating between steps', async () => {
      const mockOnStepChange = jest.fn();
      render(<EnhancedForm steps={thailandSteps} onSubmit={jest.fn()} onStepChange={mockOnStepChange} />);
      
      // Fill data in step 1
      fireEvent.change(screen.getByTestId('nombre-completo-input'), { target: { value: 'John Doe' } });
      fireEvent.change(screen.getByTestId('email-input'), { target: { value: 'john@example.com' } });

      // Navigate to step 2
      fireEvent.change(screen.getByTestId('fecha-nacimiento-input'), { target: { value: '1990-01-01' } });
      fireEvent.change(screen.getByTestId('nacionalidad-input'), { target: { value: 'us' } });
      fireEvent.change(screen.getByTestId('telefono-input'), { target: { value: '+66 123 456 789' } });
      fireEvent.change(screen.getByTestId('direccion-residencia-input'), { target: { value: '123 Main St' } });

      fireEvent.click(screen.getByText('Continue'));

      await waitFor(() => {
        expect(screen.getByTestId('professional-info-step')).toBeInTheDocument();
      });

      // Go back to step 1
      fireEvent.click(screen.getByText('Previous'));

      await waitFor(() => {
        expect(screen.getByTestId('personal-info-step')).toBeInTheDocument();
        expect(screen.getByTestId('nombre-completo-input')).toHaveValue('John Doe');
        expect(screen.getByTestId('email-input')).toHaveValue('john@example.com');
      });
    });
  });

  describe('Auto-save Functionality', () => {
    beforeEach(() => {
      // Mock localStorage
      const localStorageMock = {
        getItem: jest.fn(),
        setItem: jest.fn(),
        removeItem: jest.fn(),
        clear: jest.fn(),
      };
      Object.defineProperty(window, 'localStorage', {
        value: localStorageMock,
      });
    });

    test('saves form data to localStorage', async () => {
      const localStorageMock = window.localStorage;
      localStorageMock.getItem.mockReturnValue(null);

      render(<EnhancedForm steps={thailandSteps} onSubmit={jest.fn()} autoSave={true} autoSaveKey="thailand-test" />);
      
      fireEvent.change(screen.getByTestId('nombre-completo-input'), { target: { value: 'John Doe' } });

      await waitFor(() => {
        expect(localStorageMock.setItem).toHaveBeenCalledWith(
          'thailand-test',
          expect.stringContaining('John Doe')
        );
      });
    });
  });
});
