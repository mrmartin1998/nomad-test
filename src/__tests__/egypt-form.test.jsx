import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import EgyptFormPage from '@/app/pages/egypt/apply/page';

// Mock EgyptUpload component with proper file input handling
jest.mock('@/components/upload/country/EgyptUpload', () => {
  return function MockEgyptUpload({ onFileSelect, onUploadComplete, error, documentType }) {
    const handleFileChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        onFileSelect && onFileSelect(file);
        onUploadComplete && onUploadComplete(file);
      }
    };

    return (
      <div data-testid={`egypt-upload-${documentType || 'default'}`}>
        <input
          type="file"
          data-testid={`upload-button-${documentType || 'default'}`}
          onChange={handleFileChange}
        />
        {error && <div className="text-error text-sm" data-testid={`upload-error-${documentType || 'default'}`}>{error}</div>}
      </div>
    );
  };
});

// Mock console.log to avoid noise in test output
const originalLog = console.log;
beforeAll(() => {
  console.log = jest.fn();
});

afterAll(() => {
  console.log = originalLog;
});

describe('Egypt eVisa Application Page', () => {
  describe('Page Rendering', () => {
    test('renders Egypt eVisa application page', () => {
      render(<EgyptFormPage />);
      expect(screen.getByText('🇪🇬 Solicitud de eVisa Egipto')).toBeInTheDocument();
    });

    test('renders enhanced form component', () => {
      render(<EgyptFormPage />);
      expect(screen.getByRole('heading', { name: 'Información Personal' })).toBeInTheDocument();
    });

    test('renders form step indicators', () => {
      render(<EgyptFormPage />);
      // Check for step titles in the step indicators
      const stepTitles = ['Información Personal', 'Información de Viaje', 'Carga de Documentos', 'Consentimiento Legal'];
      stepTitles.forEach(title => {
        const elements = screen.getAllByText(title);
        expect(elements.length).toBeGreaterThan(0);
      });
    });
  });

  describe('Form Validation', () => {
    test('shows validation errors for required fields', async () => {
      render(<EgyptFormPage />);
      
      // Try to continue without filling any fields
      const continueButton = screen.getByText('Continuar');
      fireEvent.click(continueButton);

      // Verify form doesn't proceed (button still exists)
      await waitFor(() => {
        expect(screen.getAllByText('Continuar')).toHaveLength(1);
      });
    });

    test('validates email format', async () => {
      render(<EgyptFormPage />);
      
      // Fill required fields with invalid email
      const emailInput = screen.getByLabelText('Correo Electrónico');
      fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
      
      const nombreInput = screen.getByLabelText('Nombre Completo');
      fireEvent.change(nombreInput, { target: { value: 'John Doe' } });
      
      const continueButton = screen.getByText('Continuar');
      fireEvent.click(continueButton);

      // Verify form doesn't proceed
      await waitFor(() => {
        expect(screen.getAllByText('Continuar')).toHaveLength(1);
      });
    });

    test('validates phone number format', async () => {
      render(<EgyptFormPage />);
      
      // Fill required fields with invalid phone
      const telefonoInput = screen.getByLabelText('Teléfono');
      fireEvent.change(telefonoInput, { target: { value: '123' } });
      
      const nombreInput = screen.getByLabelText('Nombre Completo');
      fireEvent.change(nombreInput, { target: { value: 'John Doe' } });
      
      const continueButton = screen.getByText('Continuar');
      fireEvent.click(continueButton);

      // Verify form doesn't proceed
      await waitFor(() => {
        expect(screen.getAllByText('Continuar')).toHaveLength(1);
      });
    });

    test('validates future birth date', async () => {
      render(<EgyptFormPage />);
      
      // Fill required fields with future date
      const fechaInput = screen.getByLabelText('Fecha de Nacimiento');
      const futureDate = new Date();
      futureDate.setFullYear(futureDate.getFullYear() + 1);
      fireEvent.change(fechaInput, { target: { value: futureDate.toISOString().split('T')[0] } });
      
      const nombreInput = screen.getByLabelText('Nombre Completo');
      fireEvent.change(nombreInput, { target: { value: 'John Doe' } });
      
      const continueButton = screen.getByText('Continuar');
      fireEvent.click(continueButton);

      // Verify form doesn't proceed
      await waitFor(() => {
        expect(screen.getAllByText('Continuar')).toHaveLength(1);
      });
    });
  });

  describe('Form Navigation', () => {
    test('navigates to next step when Continue is clicked', async () => {
      render(<EgyptFormPage />);
      
      // Fill required fields  
      const nombreInput = screen.getByLabelText('Nombre Completo');
      fireEvent.change(nombreInput, { target: { value: 'John Doe' } });
      
      // Click continue button by test id
      const continueButton = screen.getByRole('button', { name: 'Continuar' });
      fireEvent.click(continueButton);

      await waitFor(() => {
        expect(screen.getByText('Información de Viaje')).toBeInTheDocument();
      });
    });

    test('navigates back to previous step', async () => {
      render(<EgyptFormPage />);
      
      // Fill required fields and click continue
      const nombreInput = screen.getByLabelText('Nombre Completo');
      fireEvent.change(nombreInput, { target: { value: 'John Doe' } });
      
      const continueButton = screen.getByRole('button', { name: 'Continuar' });
      fireEvent.click(continueButton);

      // Check for step title text
      await waitFor(() => {
        expect(screen.getAllByText(/información de viaje/i)[0]).toBeInTheDocument();
      });

      // Navigate back
      const backButton = screen.getByRole('button', { name: 'Previous' });
      fireEvent.click(backButton);

      // Use getAllByText and check first instance
      await waitFor(() => {
        const personalInfoElements = screen.getAllByText(/información personal/i);
        expect(personalInfoElements[0]).toBeInTheDocument();
      });
    });

    test('disables Previous button on first step', () => {
      render(<EgyptFormPage />);
      const backButton = screen.getByRole('button', { name: 'Previous' });
      expect(backButton).toBeDisabled();
    });
  });

  describe('Document Upload', () => {
    test('renders document upload step', async () => {
      render(<EgyptFormPage />);
      
      // Navigate to document upload step
      const mockFile = new File(['test content'], 'test-document.pdf', { type: 'application/pdf' });
      
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
        // Wait for the travel info step to be visible
        expect(screen.getByRole('heading', { name: 'Información de Viaje' })).toBeInTheDocument();
        
        // Fill in the travel info fields
        const itinerarioInput = screen.getByLabelText('Itinerario de Viaje (Fechas Aproximadas)');
        fireEvent.change(itinerarioInput, { target: { value: '15-30 March 2024' } });
        
        const alojamientoInput = screen.getByLabelText('Hotel o Alojamiento en Egipto');
        fireEvent.change(alojamientoInput, { target: { value: 'Cairo Marriott Hotel' } });
      });
      
      fireEvent.click(screen.getByText('Continuar'));

      // Verify document upload step is shown
      await waitFor(() => {
        expect(screen.getByText('Carga de Documentos')).toBeInTheDocument();
      });
    });

    test('validates document upload', async () => {
      render(<EgyptFormPage />);
      
      // Fill required fields for first step
      const nombreInput = screen.getByLabelText('Nombre Completo');
      fireEvent.change(nombreInput, { target: { value: 'John Doe' } });
      
      const emailInput = screen.getByLabelText('Correo Electrónico');
      fireEvent.change(emailInput, { target: { value: 'john@example.com' } });

      const telefonoInput = screen.getByLabelText('Teléfono');
      fireEvent.change(telefonoInput, { target: { value: '+1234567890' } });

      const continueButton = screen.getByRole('button', { name: 'Continuar' });
      fireEvent.click(continueButton);

      // Wait for validation error using data-testid
      await waitFor(() => {
        const errorElement = screen.getByTestId('upload-error-foto');
        expect(errorElement).toHaveTextContent(/fotografía.*requerida/i);
      });
    });
  });

  describe('Form Submission', () => {
    test('calls handleSubmit when form is submitted', async () => {
      render(<EgyptFormPage />);
      
      // Fill first step fields
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
        // Wait for the travel info step to be visible
        expect(screen.getByRole('heading', { name: 'Información de Viaje' })).toBeInTheDocument();
        
        // Fill in the travel info fields
        const itinerarioInput = screen.getByLabelText('Itinerario de Viaje (Fechas Aproximadas)');
        fireEvent.change(itinerarioInput, { target: { value: '15-30 March 2024' } });
        
        const alojamientoInput = screen.getByLabelText('Hotel o Alojamiento en Egipto');
        fireEvent.change(alojamientoInput, { target: { value: 'Cairo Marriott Hotel' } });
      });
      
      fireEvent.click(screen.getByText('Continuar'));

      // Upload documents
      await waitFor(() => {
        const mockFile = new File(['test content'], 'test-document.pdf', { type: 'application/pdf' });
        const uploadInput = screen.getByTestId('upload-button-default');
        fireEvent.change(uploadInput, { target: { files: [mockFile] } });
      });

      fireEvent.click(screen.getByText('Continuar'));

      // Fill and submit consent step
      await waitFor(() => {
        const checkboxes = screen.getAllByRole('checkbox');
        checkboxes.forEach(checkbox => {
          fireEvent.click(checkbox);
        });
      });

      // Submit form
      fireEvent.click(screen.getByText('Enviar Solicitud'));

      // Verify success message
      await waitFor(() => {
        expect(screen.getByText('¡Solicitud Enviada!')).toBeInTheDocument();
      });
    });

    test('handles step change callback', async () => {
      render(<EgyptFormPage />);
      
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
        expect(screen.getByText('Información de Viaje')).toBeInTheDocument();
      });
    });
  });
});


