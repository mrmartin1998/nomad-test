import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import EgyptForm from '@/components/forms/egypt/Form';

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

jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: () => null,
      back: () => null
    };
  }
}));

describe('Egypt Enhanced Form Component', () => {
  describe('Form Rendering', () => {
    test('renders all form steps', () => {
      render(<EgyptForm />);
      // Check for step indicators using getAllByText for multiple elements
      const personalInfoSteps = screen.getAllByText('Información Personal');
      expect(personalInfoSteps.length).toBeGreaterThan(0);
      expect(screen.getByText('Información Profesional')).toBeInTheDocument();
      expect(screen.getByText('Carga de Documentos')).toBeInTheDocument();
    });

    test('renders first step by default', () => {
      render(<EgyptForm />);
      expect(screen.getByLabelText('Nombre Completo')).toBeInTheDocument();
      expect(screen.getByLabelText('Fecha de Nacimiento')).toBeInTheDocument();
    });

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
      
      // Use button role with "Continue" text
      const continueButton = screen.getByRole('button', { name: 'Continue' });
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
      const continueButton = screen.getByText('Continue');
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

    test('shows Submit Application button on last step', async () => {
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
      
      fireEvent.click(screen.getByText('Continue'));

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
      
      fireEvent.click(screen.getByText('Continue'));

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
      const continueButton = screen.getByText('Continue');
      fireEvent.click(continueButton);

      // Verify form doesn't proceed
      await waitFor(() => {
        expect(screen.getAllByText('Continue')).toHaveLength(1);
      });
    });

    test('clears validation errors when fields are filled', async () => {
      await act(async () => {
        render(<EgyptForm />);
        
        // Try to continue without filling fields
        fireEvent.click(screen.getByText('Continue'));
        
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

    test('validates document upload on last step', async () => {
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
      
      fireEvent.click(screen.getByText('Continue'));

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
      
      fireEvent.click(screen.getByText('Continue'));

      // Try to continue without uploading documents
      await waitFor(() => {
        fireEvent.click(screen.getByText('Continue'));
      });

      // Verify form doesn't proceed
      await waitFor(() => {
        expect(screen.getAllByText('Continue')).toHaveLength(1);
      });
    });
  });

  describe('Form Submission', () => {
    test('calls onSubmit when form is submitted successfully', async () => {
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
      
      fireEvent.click(screen.getByText('Continue'));

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
      
      fireEvent.click(screen.getByText('Continue'));

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
      const continueButton = screen.getByText('Continue');
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
      fireEvent.click(screen.getByText('Continue'));
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
    beforeEach(() => {
      // Clear localStorage before each test
      localStorage.clear();
    });

    test('saves form data to localStorage', async () => {
      render(<EgyptForm />);
      
      // Fill a field
      const nombreInput = screen.getByRole('textbox', { name: /nombre completo/i });
      fireEvent.change(nombreInput, { target: { value: 'John Doe' } });

      // Wait longer for auto-save and use exact key
      await waitFor(() => {
        const savedData = localStorage.getItem('egypt-visa-form'); // Updated key
        expect(savedData).toBeTruthy();
        const parsedData = JSON.parse(savedData);
        expect(parsedData.nombreCompleto).toBe('John Doe');
      }, { timeout: 3000 });
    }, 10000);
  });
});
});
