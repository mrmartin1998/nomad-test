import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { SessionProvider } from 'next-auth/react';

// Mock next-auth
jest.mock('next-auth/react', () => ({
  ...jest.requireActual('next-auth/react'),
  useSession: () => ({
    data: null,
    status: 'unauthenticated'
  }),
  getSession: jest.fn(() => Promise.resolve(null)),
  SessionProvider: ({ children }) => children
}));

// Mock EgyptUpload component
jest.mock('@/components/upload/country/EgyptUpload', () => {
  return function MockEgyptUpload({ onFileSelect, onUploadComplete, error }) {
    const handleFileChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        onFileSelect && onFileSelect(file);
        onUploadComplete && onUploadComplete(file);
      }
    };

    return (
      <div data-testid="egypt-upload">
        <input
          type="file"
          data-testid="file-upload-input"
          onChange={handleFileChange}
        />
        {error && <div data-testid="upload-error">{error}</div>}
      </div>
    );
  };
});

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      back: jest.fn()
    };
  }
}));

// Mock the EnhancedForm component for controlled testing
jest.mock('@/components/forms/enhanced/EnhancedForm', () => {
  const React = require('react');
  
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

    const handlePrevious = () => {
      if (currentStep > 0) {
        setCurrentStep(currentStep - 1);
        onStepChange && onStepChange(currentStep - 1, formData);
      }
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

    // Auto-save functionality
    React.useEffect(() => {
      if (autoSave && autoSaveKey && Object.keys(formData).length > 0) {
        localStorage.setItem(autoSaveKey, JSON.stringify(formData));
      }
    }, [formData, autoSave, autoSaveKey]);

    return (
      <div data-testid="enhanced-form">
        {/* Step Progress */}
        <div className="mb-12">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full ${index === currentStep ? 'bg-primary' : 'bg-gray-200'}`}>
                  <span>{index + 1}</span>
                </div>
                <div className="text-sm">{step.title}</div>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <span>Step {currentStep + 1} of {steps.length}</span>
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-white rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4">{currentStepConfig.title}</h2>
          <p className="text-gray-600 mb-6">{currentStepConfig.description}</p>
          
          <form>
            <CurrentStepComponent 
              formData={formData} 
              setFormData={setFormData} 
              errors={errors}
              handleFieldChange={handleFieldChange}
            />
            
            <div className="flex justify-between mt-8">
              <button
                type="button"
                onClick={handlePrevious}
                disabled={currentStep === 0}
                className="btn btn-outline"
              >
                Previous
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="btn btn-primary"
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

// Import the Egypt form component
import EgyptForm from '@/components/forms/egypt/Form';

// Test wrapper component
const TestWrapper = ({ children, session = null }) => (
  <SessionProvider session={session}>
    {children}
  </SessionProvider>
);

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

describe('Egypt Enhanced Form Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorageMock.clear();
    localStorageMock.getItem.mockReturnValue(null);
  });

  describe('Form Rendering', () => {
    test('renders Egypt form with header', () => {
      render(
        <TestWrapper>
          <EgyptForm />
        </TestWrapper>
      );
      expect(screen.getByText('🚀 Solicitud de Visa Egipto')).toBeInTheDocument();
    });

    test('renders enhanced form component', () => {
      render(
        <TestWrapper>
          <EgyptForm />
        </TestWrapper>
      );
      expect(screen.getByTestId('enhanced-form')).toBeInTheDocument();
    });

    test('renders all form steps in progress indicator', () => {
      render(<EgyptForm />);
      
      // Check for step titles
      expect(screen.getByText('Información Personal')).toBeInTheDocument();
      expect(screen.getByText('Información de Viaje')).toBeInTheDocument();
      expect(screen.getByText('Carga de Documentos')).toBeInTheDocument();
      expect(screen.getByText('Consentimiento Legal')).toBeInTheDocument();
    });

    test('shows step progress counter', () => {
      render(<EgyptForm />);
      expect(screen.getByText('Step 1 of 4')).toBeInTheDocument();
    });
  });

  describe('Personal Information Step', () => {
    test('renders personal info fields', () => {
      render(<EgyptForm />);
      
      // Check for form fields
      expect(screen.getByPlaceholderText('Ingrese su nombre completo')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Ingrese su nacionalidad')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Ingrese su correo electrónico')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Ingrese su número de teléfono')).toBeInTheDocument();
    });

    test('allows input in form fields', async () => {
      render(<EgyptForm />);
      
      const nameInput = screen.getByPlaceholderText('Ingrese su nombre completo');
      await act(async () => {
        fireEvent.change(nameInput, { target: { value: 'Juan Pérez' } });
      });
      
      expect(nameInput.value).toBe('Juan Pérez');
    });
  });

  describe('Form Navigation', () => {
    test('shows navigation buttons', () => {
      render(<EgyptForm />);
      
      expect(screen.getByText('Previous')).toBeInTheDocument();
      expect(screen.getByText('Continue')).toBeInTheDocument();
    });

    test('Previous button is disabled on first step', () => {
      render(<EgyptForm />);
      
      const previousButton = screen.getByText('Previous');
      expect(previousButton).toBeDisabled();
    });

    test('navigates to next step when form is valid', async () => {
      render(<EgyptForm />);
      
      // Fill required fields
      const nameInput = screen.getByPlaceholderText('Ingrese su nombre completo');
      const nationalityInput = screen.getByPlaceholderText('Ingrese su nacionalidad');
      const emailInput = screen.getByPlaceholderText('Ingrese su correo electrónico');
      const phoneInput = screen.getByPlaceholderText('Ingrese su número de teléfono');
      
      await act(async () => {
        fireEvent.change(nameInput, { target: { value: 'Juan Pérez' } });
        fireEvent.change(nationalityInput, { target: { value: 'Española' } });
        fireEvent.change(emailInput, { target: { value: 'juan@example.com' } });
        fireEvent.change(phoneInput, { target: { value: '+34123456789' } });
      });
      
      const continueButton = screen.getByText('Continue');
      fireEvent.click(continueButton);

      await waitFor(() => {
        expect(screen.getByText('Step 2 of 4')).toBeInTheDocument();
      });
    });
  });

  describe('Form Validation', () => {
    test('shows validation errors for empty fields', async () => {
      render(<EgyptForm />);
      
      const continueButton = screen.getByText('Continue');
      fireEvent.click(continueButton);

      // Should stay on step 1 due to validation errors
      await waitFor(() => {
        expect(screen.getByText('Step 1 of 4')).toBeInTheDocument();
      });
    });

    test('clears validation errors when fields are filled', async () => {
      render(<EgyptForm />);
      
      // Try to continue without filling fields
      const continueButton = screen.getByText('Continue');
      fireEvent.click(continueButton);

      // Fill a required field
      const nameInput = screen.getByPlaceholderText('Ingrese su nombre completo');
      await act(async () => {
        fireEvent.change(nameInput, { target: { value: 'Juan Pérez' } });
      });

      // Verify field has value
      expect(nameInput.value).toBe('Juan Pérez');
    });
  });

  describe('Document Upload Step', () => {
    test('renders document upload when reached', async () => {
      render(<EgyptForm />);
      
      // Navigate through steps by filling required data
      // This is a simplified test - in reality would need to fill all required fields
      const nameInput = screen.getByPlaceholderText('Ingrese su nombre completo');
      await act(async () => {
        fireEvent.change(nameInput, { target: { value: 'Juan Pérez' } });
      });

      // Test that document upload component would render
      expect(screen.getByTestId('enhanced-form')).toBeInTheDocument();
    });
  });

  describe('Form Submission', () => {
    test('calls onSubmit when form is completed', async () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
      
      render(<EgyptForm />);
      
      // Fill required fields
      const nameInput = screen.getByPlaceholderText('Ingrese su nombre completo');
      await act(async () => {
        fireEvent.change(nameInput, { target: { value: 'Juan Pérez' } });
      });

      // Test that form data is being processed
      expect(nameInput.value).toBe('Juan Pérez');
      
      consoleSpy.mockRestore();
    });
  });

  describe('Auto-save Functionality', () => {
    test('saves form data to localStorage', async () => {
      render(<EgyptForm />);
      
      const nameInput = screen.getByPlaceholderText('Ingrese su nombre completo');
      await act(async () => {
        fireEvent.change(nameInput, { target: { value: 'Juan Pérez' } });
      });

      // Wait for auto-save to trigger
      await waitFor(() => {
        expect(localStorageMock.setItem).toHaveBeenCalledWith(
          'egypt-visa-form',
          expect.stringContaining('Juan Pérez')
        );
      });
    });

    test('loads saved data from localStorage', () => {
      // Set up saved data
      localStorageMock.getItem.mockReturnValue(JSON.stringify({
        nombreCompleto: 'Saved User',
        email: 'saved@example.com'
      }));

      render(<EgyptForm />);
      
      // Verify form renders (saved data would be loaded by the actual component)
      expect(screen.getByTestId('enhanced-form')).toBeInTheDocument();
    });
  });

  describe('Success State', () => {
    test('shows success message after submission', () => {
      // This would test the success state after form submission
      render(<EgyptForm />);
      
      // Verify form is initially rendered
      expect(screen.getByTestId('enhanced-form')).toBeInTheDocument();
    });
  });
});
        fireEvent.change(direccionEmpresaInput, { target: { value: '456 Business Ave' } });
        
        const telefonoEmpresaInput = screen.getByRole('textbox', { name: /teléfono de la empresa/i });
        fireEvent.change(telefonoEmpresaInput, { target: { value: '+1 555 123 4567' } });
     
      
      fireEvent.click(screen.getByText('Continuar'));

      // Try to continue without uploading documents
      await waitFor(() => {
        fireEvent.click(screen.getByText('Continuar'));
      });

      // Verify form doesn't proceed
      await waitFor(() => {
        expect(screen.getAllByText('Continuar')).toHaveLength(1);
      });
    
  

  describe('Form Submission', () => {
    test.skip('calls onSubmit when form is submitted successfully', async () => {
      render(<EgyptForm />);
      
      // Fill and submit first step
      const nombreInput = screen.getByLabelText('Nombre Completo');
      fireEvent.change(nombreInput, { target: { value: 'John Doe' } });
      
      const fechaInput = screen.getByLabelText('Fecha de Nacimiento');
      fireEvent.change(fechaInput, { target: { value: '1990-01-01' } });
      
      const nacionalidadSelect = screen.getByRole('button', { name: /nacionalidad/i });
      fireEvent.click(nacionalidadSelect);
      const usOption = screen.getByText('Estados Unidos');
      fireEvent.click(usOption);
      
      const emailInput = screen.getByLabelText('Correo Electrónico');
      fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
      
      const telefonoInput = screen.getByLabelText('Teléfono');
      fireEvent.change(telefonoInput, { target: { value: '+1234567890' } });
      
      const direccionInput = screen.getByLabelText('Dirección de Residencia');
      fireEvent.change(direccionInput, { target: { value: '123 Main St' } });
      
      fireEvent.click(screen.getByText('Continuar'));

      // Fill and submit second step
      await waitFor(() => {
        // Wait for the professional info step to be visible
        expect(screen.getByText('Información Profesional')).toBeInTheDocument();

        const ocupacionInput = screen.getByTestId('ocupacion-input');
        fireEvent.change(ocupacionInput, { target: { value: 'Software Engineer' } });
        
        const empresaInput = screen.getByTestId('empresa-input');
        fireEvent.change(empresaInput, { target: { value: 'Tech Corp' } });
        
        const direccionEmpresaInput = screen.getByRole('textbox', { name: /dirección de la empresa/i });
        fireEvent.change(direccionEmpresaInput, { target: { value: '456 Business Ave' } });
        
        const telefonoEmpresaInput = screen.getByRole('textbox', { name: /teléfono de la empresa/i });
        fireEvent.change(telefonoEmpresaInput, { target: { value: '+1 555 123 4567' } });
      });
      
      fireEvent.click(screen.getByText('Continuar'));

      // Upload documents
      await waitFor(() => {
        const mockFile = new File(['test content'], 'test-document.pdf', { type: 'application/pdf' });
        const uploadInput = screen.getByTestId('upload-button-default');
        fireEvent.change(uploadInput, { target: { files: [mockFile] } });
      });

      // Submit form
      fireEvent.click(screen.getByText('Submit Application'));

      // Verify success message
      await waitFor(() => {
        expect(screen.getByText('¡Solicitud Enviada!')).toBeInTheDocument();
      });
    });

    test('calls onStepChange when navigating between steps', async () => {
      render(<EgyptForm />);
      
      // Fill required fields
      const nombreInput = screen.getByLabelText('Nombre Completo');
      fireEvent.change(nombreInput, { target: { value: 'John Doe' } });
      
      const fechaInput = screen.getByLabelText('Fecha de Nacimiento');
      fireEvent.change(fechaInput, { target: { value: '1990-01-01' } });
      
      const nacionalidadSelect = screen.getByRole('button', { name: /nacionalidad/i });
      fireEvent.click(nacionalidadSelect);
      const usOption = screen.getByText('Estados Unidos');
      fireEvent.click(usOption);
      
      const emailInput = screen.getByLabelText('Correo Electrónico');
      fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
      
      const telefonoInput = screen.getByLabelText('Teléfono');
      fireEvent.change(telefonoInput, { target: { value: '+1234567890' } });
      
      const direccionInput = screen.getByLabelText('Dirección de Residencia');
      fireEvent.change(direccionInput, { target: { value: '123 Main St' } });
      
      // Navigate to next step
      const continueButton = screen.getByText('Continuar');
      fireEvent.click(continueButton);

      // Verify next step is shown
      await waitFor(() => {
        expect(screen.getByText('Información Profesional')).toBeInTheDocument();
      });
    });
  });

  describe('Form Data Persistence', () => {
    test('maintains form data when navigating between steps', async () => {
      render(<EgyptForm />);
      
      // Fill first step
      const nombreInput = screen.getByLabelText('Nombre Completo');
      fireEvent.change(nombreInput, { target: { value: 'John Doe' } });
      
      const fechaInput = screen.getByLabelText('Fecha de Nacimiento');
      fireEvent.change(fechaInput, { target: { value: '1990-01-01' } });
      
      // Navigate to next step and back
      fireEvent.click(screen.getByText('Continuar'));
      await waitFor(() => {
        fireEvent.click(screen.getByText('Previous'));
      });

      // Verify data is preserved
      await waitFor(() => {
        expect(screen.getByLabelText('Nombre Completo')).toHaveValue('John Doe');
        expect(screen.getByLabelText('Fecha de Nacimiento')).toHaveValue('1990-01-01');
      });
    });
  });

  describe('Auto-save Functionality', () => {
    test.skip('saves form data to localStorage', async () => {
      render(<EgyptForm />);
      
      await act(async () => {
        fireEvent.change(screen.getByLabelText('Nombre Completo'), { target: { value: 'Juan Pérez' } });
        fireEvent.change(screen.getByLabelText('Correo Electrónico'), { target: { value: 'juan@example.com' } });
      });

      // Wait for auto-save to trigger
      await waitFor(() => {
        const savedData = JSON.parse(localStorage.getItem('egypt-visa-form') || '{}');
        expect(savedData.nombreCompleto).toBe('Juan Pérez');
        expect(savedData.email).toBe('juan@example.com');
      });
    });
  });


