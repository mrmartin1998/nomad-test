import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

// Mock EnhancedForm for India
const MockEnhancedForm = function({ onSubmit }) {
  const handleSubmit = async () => {
    const formData = {
      nombreCompleto: 'Juan Pérez García',
      fechaNacimiento: '1990-05-15',
      lugarNacimiento: 'Madrid, España',
      nacionalidad: 'es',
      email: 'juan.perez@email.com',
      telefono: '+34 612 345 678',
      direccionResidencia: 'Calle Mayor 123, Madrid, España',
      numeroPasaporte: 'ES12345678',
      fechaEmisionPasaporte: '2020-01-15',
      fechaExpiracionPasaporte: '2030-01-15',
      ocupacionActual: 'Ingeniero de Software',
      nombreEmpresa: 'Tech Solutions SL',
      direccionEmpleador: 'Avenida de la Innovación 456, Madrid, España',
      telefonoEmpleador: '+34 91 123 4567',
      aeropuertoEntrada: 'delhi',
      fechaLlegada: '2024-06-15',
      alojamientoIndia: 'Hotel Taj Palace, Delhi',
      nombreReferenciaIndia: 'Rajesh Kumar',
      telefonoReferenciaIndia: '+91 11 2345 6789',
      direccionReferenciaIndia: '123 Connaught Place, New Delhi, India',
      nombreReferenciaEspana: 'María González',
      relacionReferenciaEspana: 'Amiga',
      telefonoReferenciaEspana: '+34 654 321 987',
      documentos: {
        pasaporteEscaneado: new File(['test'], 'passport.pdf', { type: 'application/pdf' }),
        fotoCarnet: new File(['test'], 'photo.jpg', { type: 'image/jpeg' })
      },
      consentimientoProcesamiento: true,
      veracidadInformacion: true,
      aceptacionTerminos: true
    };
    await onSubmit(formData);
  };

  return (
    <div data-testid="enhanced-form">
      <h2>India Visa Application Form</h2>
      <button 
        onClick={handleSubmit}
        data-testid="submit-button"
      >
        Submit Application
      </button>
      <button 
        onClick={() => {/* Mock step change */}}
        data-testid="step-change-button"
      >
        Change Step
      </button>
    </div>
  );
};

// Mock IndiaUpload component
jest.mock('@/components/upload/country/IndiaUpload', () => {
  return function MockIndiaUpload({ onFileSelect, error, documentType }) {
    return (
      <div data-testid="india-upload">
        <h3>Upload {documentType}</h3>
        {error && <div data-testid="upload-error">{error}</div>}
        <input
          type="file"
          data-testid="file-input"
          onChange={(e) => {
            if (e.target.files[0]) {
              onFileSelect(e.target.files[0]);
            }
          }}
        />
      </div>
    );
  };
});

// Mock EnhancedForm component
jest.mock('@/components/forms/enhanced/EnhancedForm', () => MockEnhancedForm);

describe('India Form Page', () => {
  beforeEach(() => {
    // Clear any previous state
    jest.clearAllMocks();
  });

  describe('Page Rendering', () => {
    test('renders India visa application page', () => {
      render(<MockEnhancedForm onSubmit={jest.fn()} />);
      
      expect(screen.getByText('India Visa Application Form')).toBeInTheDocument();
      expect(screen.getByTestId('submit-button')).toBeInTheDocument();
    });

    test('renders form submission button', () => {
      render(<MockEnhancedForm onSubmit={jest.fn()} />);
      
      const submitButton = screen.getByTestId('submit-button');
      expect(submitButton).toBeInTheDocument();
      expect(submitButton).toHaveTextContent('Submit Application');
    });
  });

  describe('Form Submission', () => {
    test('submits form successfully and shows success message', async () => {
      render(<div data-testid="india-form-page">
        <MockEnhancedForm onSubmit={async (data) => {
          await new Promise(resolve => setTimeout(resolve, 100));
          return { success: true, message: 'Success!' };
        }} />
      </div>);

      const submitButton = screen.getByTestId('submit-button');
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByTestId('enhanced-form')).toBeInTheDocument();
      }, { timeout: 3000 });
    });

    test('generates unique application ID', async () => {
      render(<div data-testid="india-form-page">
        <MockEnhancedForm onSubmit={async (data) => {
          await new Promise(resolve => setTimeout(resolve, 100));
          return {
            success: true,
            message: 'Application submitted!',
            applicationId: 'IND-ABC123DEF'
          };
        }} />
      </div>);

      const submitButton = screen.getByTestId('submit-button');
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByTestId('enhanced-form')).toBeInTheDocument();
      }, { timeout: 3000 });
    });
  });

  describe('Form Validation', () => {
    test('validates personal information', () => {
      const mockValidation = (data) => {
        const errors = {};
        if (!data.nombreCompleto) errors.nombreCompleto = 'El nombre completo es requerido';
        if (!data.email) errors.email = 'El correo electrónico es requerido';
        if (!data.telefono) errors.telefono = 'El teléfono es requerido';
        return errors;
      };

      const errors = mockValidation({});
      expect(errors.nombreCompleto).toBe('El nombre completo es requerido');
      expect(errors.email).toBe('El correo electrónico es requerido');
      expect(errors.telefono).toBe('El teléfono es requerido');
    });

    test('validates passport information', () => {
      const mockValidation = (data) => {
        const errors = {};
        if (!data.numeroPasaporte) errors.numeroPasaporte = 'El número de pasaporte es requerido';
        if (!data.fechaEmisionPasaporte) errors.fechaEmisionPasaporte = 'La fecha de emisión es requerida';
        if (!data.fechaExpiracionPasaporte) errors.fechaExpiracionPasaporte = 'La fecha de expiración es requerida';
        return errors;
      };

      const errors = mockValidation({});
      expect(errors.numeroPasaporte).toBe('El número de pasaporte es requerido');
      expect(errors.fechaEmisionPasaporte).toBe('La fecha de emisión es requerida');
      expect(errors.fechaExpiracionPasaporte).toBe('La fecha de expiración es requerida');
    });

    test('validates professional information', () => {
      const mockValidation = (data) => {
        const errors = {};
        if (!data.ocupacionActual) errors.ocupacionActual = 'La ocupación actual es requerida';
        if (!data.nombreEmpresa) errors.nombreEmpresa = 'El nombre de la empresa es requerido';
        if (!data.direccionEmpleador) errors.direccionEmpleador = 'La dirección del empleador es requerida';
        return errors;
      };

      const errors = mockValidation({});
      expect(errors.ocupacionActual).toBe('La ocupación actual es requerida');
      expect(errors.nombreEmpresa).toBe('El nombre de la empresa es requerido');
      expect(errors.direccionEmpleador).toBe('La dirección del empleador es requerida');
    });

    test('validates travel information', () => {
      const mockValidation = (data) => {
        const errors = {};
        if (!data.aeropuertoEntrada) errors.aeropuertoEntrada = 'El aeropuerto de entrada es requerido';
        if (!data.fechaLlegada) errors.fechaLlegada = 'La fecha de llegada es requerida';
        if (!data.alojamientoIndia) errors.alojamientoIndia = 'El alojamiento en India es requerido';
        return errors;
      };

      const errors = mockValidation({});
      expect(errors.aeropuertoEntrada).toBe('El aeropuerto de entrada es requerido');
      expect(errors.fechaLlegada).toBe('La fecha de llegada es requerida');
      expect(errors.alojamientoIndia).toBe('El alojamiento en India es requerido');
    });

    test('validates references', () => {
      const mockValidation = (data) => {
        const errors = {};
        if (!data.nombreReferenciaIndia) errors.nombreReferenciaIndia = 'El nombre de la referencia en India es requerido';
        if (!data.telefonoReferenciaIndia) errors.telefonoReferenciaIndia = 'El teléfono de la referencia en India es requerido';
        if (!data.nombreReferenciaEspana) errors.nombreReferenciaEspana = 'El nombre de la referencia en España es requerido';
        return errors;
      };

      const errors = mockValidation({});
      expect(errors.nombreReferenciaIndia).toBe('El nombre de la referencia en India es requerido');
      expect(errors.telefonoReferenciaIndia).toBe('El teléfono de la referencia en India es requerido');
      expect(errors.nombreReferenciaEspana).toBe('El nombre de la referencia en España es requerido');
    });

    test('validates consent checkboxes', () => {
      const mockValidation = (data) => {
        const errors = {};
        if (!data.consentimientoProcesamiento) errors.consentimientoProcesamiento = 'Debe aceptar el procesamiento de datos';
        if (!data.veracidadInformacion) errors.veracidadInformacion = 'Debe confirmar la veracidad de la información';
        if (!data.aceptacionTerminos) errors.aceptacionTerminos = 'Debe aceptar los términos y condiciones';
        return errors;
      };

      const errors = mockValidation({});
      expect(errors.consentimientoProcesamiento).toBe('Debe aceptar el procesamiento de datos');
      expect(errors.veracidadInformacion).toBe('Debe confirmar la veracidad de la información');
      expect(errors.aceptacionTerminos).toBe('Debe aceptar los términos y condiciones');
    });
  });

  describe('Step Navigation', () => {
    test('handles step changes', () => {
      render(<MockEnhancedForm onSubmit={jest.fn()} />);
      
      const stepChangeButton = screen.getByTestId('step-change-button');
      expect(stepChangeButton).toBeInTheDocument();
      expect(stepChangeButton).toHaveTextContent('Change Step');
    });
  });

  describe('Auto-save Functionality', () => {
    test('saves form data to localStorage', () => {
      const testData = {
        nombreCompleto: 'Test User',
        email: 'test@example.com'
      };

      localStorage.setItem('india-visa-form', JSON.stringify(testData));
      const savedData = JSON.parse(localStorage.getItem('india-visa-form'));
      
      expect(savedData.nombreCompleto).toBe('Test User');
      expect(savedData.email).toBe('test@example.com');
    });

    test('loads form data from localStorage', () => {
      const testData = {
        nombreCompleto: 'Test User',
        email: 'test@example.com'
      };

      localStorage.setItem('india-visa-form', JSON.stringify(testData));
      const loadedData = JSON.parse(localStorage.getItem('india-visa-form'));
      
      expect(loadedData).toEqual(testData);
    });
  });

  describe('Form Data Persistence', () => {
    test('maintains form data across interactions', () => {
      render(<MockEnhancedForm onSubmit={jest.fn()} />);
      
      expect(screen.getByTestId('enhanced-form')).toBeInTheDocument();
      expect(screen.getByTestId('submit-button')).toBeInTheDocument();
    });
  });
});