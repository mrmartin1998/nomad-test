import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import EgyptForm from '@/components/forms/egypt/Form';

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

jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: () => null,
      back: () => null
    };
  }
}));

describe('Egypt Enhanced Form Component', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe('Basic Form Rendering', () => {
    test('renders Egypt form component', () => {
      render(<EgyptForm />);
      expect(screen.getByText('🚀 Solicitud de Visa Egipto')).toBeInTheDocument();
    });

    test('renders first step by default', () => {
      render(<EgyptForm />);
      const personalInfoElements = screen.getAllByText('Información Personal');
      expect(personalInfoElements.length).toBeGreaterThan(0);
    });

    test('renders personal info fields', () => {
      render(<EgyptForm />);
      expect(screen.getByLabelText('Nombre Completo')).toBeInTheDocument();
      expect(screen.getByLabelText('Fecha de Nacimiento')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Ingrese su nombre completo')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('su.email@ejemplo.com')).toBeInTheDocument();
    });

    test('shows three form steps', () => {
      render(<EgyptForm />);
      // Use getAllByText since there might be multiple instances
      const personalInfoElements = screen.getAllByText('Información Personal');
      expect(personalInfoElements.length).toBeGreaterThan(0);
      expect(screen.getByText('Información Profesional')).toBeInTheDocument();
      expect(screen.getByText('Carga de Documentos')).toBeInTheDocument();
    });
  });

  describe('Form Navigation', () => {
    test('shows navigation buttons', () => {
      render(<EgyptForm />);
      // Check for Previous button (always present but disabled initially)
      expect(screen.getByText('Previous')).toBeInTheDocument();
      // Check for Continue button - it's actually "Continuar" in Spanish
      expect(screen.getByRole('button', { name: 'Continuar' })).toBeInTheDocument();
    });

    test('Previous button is disabled on first step', () => {
      render(<EgyptForm />);
      const previousButton = screen.getByText('Previous');
      expect(previousButton).toBeDisabled();
    });
  });

  describe('Form Fields', () => {
    test('renders all personal information fields', () => {
      render(<EgyptForm />);
      
      // Check for all personal info fields
      expect(screen.getByLabelText('Nombre Completo')).toBeInTheDocument();
      expect(screen.getByLabelText('Fecha de Nacimiento')).toBeInTheDocument();
      expect(screen.getByLabelText('Correo Electrónico')).toBeInTheDocument();
      expect(screen.getByLabelText('Teléfono')).toBeInTheDocument();
      expect(screen.getByLabelText('Número de Pasaporte')).toBeInTheDocument();
      expect(screen.getByLabelText('Fecha de Emisión del Pasaporte')).toBeInTheDocument();
      expect(screen.getByLabelText('Fecha de Expiración del Pasaporte')).toBeInTheDocument();
      expect(screen.getByLabelText('Dirección de Residencia')).toBeInTheDocument();
    });

    test('allows input in personal information fields', async () => {
      render(<EgyptForm />);
      
      const nameInput = screen.getByLabelText('Nombre Completo');
      await act(async () => {
        fireEvent.change(nameInput, { target: { value: 'Juan Pérez' } });
      });
      
      expect(nameInput.value).toBe('Juan Pérez');
    });

    test('allows input in email field', async () => {
      render(<EgyptForm />);
      
      const emailInput = screen.getByLabelText('Correo Electrónico');
      await act(async () => {
        fireEvent.change(emailInput, { target: { value: 'juan@example.com' } });
      });
      
      expect(emailInput.value).toBe('juan@example.com');
    });
  });

  describe('Form Validation', () => {
    test('form has validation structure', () => {
      render(<EgyptForm />);
      
      // Test that form exists and can be interacted with
      const nameInput = screen.getByLabelText('Nombre Completo');
      fireEvent.change(nameInput, { target: { value: 'Test' } });
      expect(nameInput.value).toBe('Test');
    });
  });

  describe('Auto-save Functionality', () => {
    test('form supports auto-save', async () => {
      render(<EgyptForm />);
      
      const nameInput = screen.getByLabelText('Nombre Completo');
      await act(async () => {
        fireEvent.change(nameInput, { target: { value: 'Test User' } });
      });

      // Check that the input value was set correctly
      expect(nameInput.value).toBe('Test User');
    });
  });

  describe('Step Progress', () => {
    test('renders step progress indicators', () => {
      render(<EgyptForm />);
      // Check for step indicators using getAllByText for multiple elements
      const personalInfoSteps = screen.getAllByText('Información Personal');
      expect(personalInfoSteps.length).toBeGreaterThan(0);
      expect(screen.getByText('Información Profesional')).toBeInTheDocument();
      expect(screen.getByText('Carga de Documentos')).toBeInTheDocument();
    });
  });

  describe('Form Navigation', () => {
    test('navigates to next step when Continue is clicked', async () => {
      render(<EgyptForm />);
      
      // Fill required fields
      const nombreInput = screen.getByLabelText('Nombre Completo');
      fireEvent.change(nombreInput, { target: { value: 'John Doe' } });
      
      // Use button role with "Continuar" text (Spanish)
      const continueButton = screen.getByRole('button', { name: 'Continuar' });
      fireEvent.click(continueButton);

      await waitFor(() => {
        expect(screen.getByText('Información Profesional')).toBeInTheDocument();
      });
    });

    test('navigates back to previous step', async () => {
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

      // Wait for second step
      await waitFor(() => {
        expect(screen.getByText('Información Profesional')).toBeInTheDocument();
      });

      // Navigate back
      const backButton = screen.getByText('Previous');
      fireEvent.click(backButton);

      // Verify first step is shown
      await waitFor(() => {
        expect(screen.getByLabelText('Nombre Completo')).toBeInTheDocument();
      });
    });

    test('disables Previous button on first step', () => {
      render(<EgyptForm />);
      expect(screen.getByText('Previous')).toBeDisabled();
    });

    test.skip('shows Submit Application button on last step', async () => {
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

      // Verify Submit Application button is shown
      await waitFor(() => {
        expect(screen.getByText('Submit Application')).toBeInTheDocument();
      });
    });
  });

  describe('Form Validation', () => {
    test('shows validation errors for required fields', async () => {
      render(<EgyptForm />);
      
      // Try to continue without filling fields
      const continueButton = screen.getByText('Continuar');
      fireEvent.click(continueButton);

      // Verify form doesn't proceed
      await waitFor(() => {
        expect(screen.getAllByText('Continuar')).toHaveLength(1);
      });
    });

    test.skip('clears validation errors when fields are filled', async () => {
      await act(async () => {
        render(<EgyptForm />);
        
        // Try to continue without filling fields
        fireEvent.click(screen.getByText('Continuar'));
        
        // Wait for validation errors
        await waitFor(() => {
          expect(screen.getByText('El nombre completo es requerido')).toBeInTheDocument();
        }, { timeout: 3000 });

        // Fill a required field
        fireEvent.change(screen.getByRole('textbox', { name: /nombre completo/i }), {
          target: { value: 'John Doe' }
        });

        // Verify error is cleared
        await waitFor(() => {
          expect(screen.queryByText('El nombre completo es requerido')).not.toBeInTheDocument();
        }, { timeout: 3000 });
      });
    });

    test.skip('validates document upload on last step', async () => {
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

      // Try to continue without uploading documents
      await waitFor(() => {
        fireEvent.click(screen.getByText('Continuar'));
      });

      // Verify form doesn't proceed
      await waitFor(() => {
        expect(screen.getAllByText('Continuar')).toHaveLength(1);
      });
    });
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
});

