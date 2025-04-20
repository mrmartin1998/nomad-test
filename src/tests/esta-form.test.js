import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ESTAForm from '../app/esta-form/page';
import { testUsers, fillFormWithTestData } from './esta-test-data';

// Mock fetch function
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ success: true }),
  })
);

describe('ESTA Form', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  test('renders all form fields', () => {
    render(<ESTAForm />);
    
    // Check for main sections
    expect(screen.getByText('Información Personal')).toBeInTheDocument();
    expect(screen.getByText('Información de Padres')).toBeInTheDocument();
    expect(screen.getByText('Información del Pasaporte')).toBeInTheDocument();
    expect(screen.getByText('Información de Viaje')).toBeInTheDocument();
    expect(screen.getByText('Información Laboral')).toBeInTheDocument();
    
    // Check for key form fields
    expect(screen.getByLabelText('Nombre Completo')).toBeInTheDocument();
    expect(screen.getByLabelText('Fecha de Nacimiento')).toBeInTheDocument();
    expect(screen.getByLabelText('Número de Pasaporte')).toBeInTheDocument();
  });

  test('validates required fields', async () => {
    render(<ESTAForm />);
    
    // Try to submit empty form
    fireEvent.click(screen.getByText('Enviar Solicitud'));
    
    // Check for error messages
    await waitFor(() => {
      expect(screen.getByText('El nombre completo es requerido')).toBeInTheDocument();
      expect(screen.getByText('La fecha de nacimiento es requerida')).toBeInTheDocument();
      expect(screen.getByText('El número de pasaporte es requerido')).toBeInTheDocument();
    });
  });

  test('submits form successfully with valid data', async () => {
    render(<ESTAForm />);
    
    // Fill form with first test user data
    fillFormWithTestData(testUsers[0]);
    
    // Submit form
    fireEvent.click(screen.getByText('Enviar Solicitud'));
    
    // Check if fetch was called with correct data
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith('/api/esta-applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(testUsers[0]),
      });
    });
  });

  test('handles API error gracefully', async () => {
    // Mock fetch to return error
    global.fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ error: 'Error al enviar la solicitud' }),
      })
    );

    render(<ESTAForm />);
    
    // Fill form with test data
    fillFormWithTestData(testUsers[0]);
    
    // Submit form
    fireEvent.click(screen.getByText('Enviar Solicitud'));
    
    // Check for error message
    await waitFor(() => {
      expect(screen.getByText('Error al enviar el formulario. Por favor intente nuevamente.')).toBeInTheDocument();
    });
  });

  // Test each user profile
  testUsers.forEach((userData, index) => {
    test(`submits form successfully with test user ${index + 1}`, async () => {
      render(<ESTAForm />);
      
      // Fill form with test data
      fillFormWithTestData(userData);
      
      // Submit form
      fireEvent.click(screen.getByText('Enviar Solicitud'));
      
      // Check if fetch was called with correct data
      await waitFor(() => {
        expect(fetch).toHaveBeenCalledWith('/api/esta-applications', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        });
      });
    });
  });

  test('toggles checkbox fields correctly', () => {
    render(<ESTAForm />);
    
    const previousUSTravelCheckbox = screen.getByLabelText('¿Has viajado anteriormente a EE.UU.?');
    const criminalRecordCheckbox = screen.getByLabelText('¿Tienes antecedentes penales o problemas migratorios?');
    const termsCheckbox = screen.getByLabelText('Acepto los términos y condiciones');
    
    // Test each checkbox
    fireEvent.click(previousUSTravelCheckbox);
    expect(previousUSTravelCheckbox).toBeChecked();
    
    fireEvent.click(criminalRecordCheckbox);
    expect(criminalRecordCheckbox).toBeChecked();
    
    fireEvent.click(termsCheckbox);
    expect(termsCheckbox).toBeChecked();
  });

  test('clears form after successful submission', async () => {
    render(<ESTAForm />);
    
    // Fill form with test data
    fillFormWithTestData(testUsers[0]);
    
    // Submit form
    fireEvent.click(screen.getByText('Enviar Solicitud'));
    
    // Check if form was cleared
    await waitFor(() => {
      expect(screen.getByLabelText('Nombre Completo')).toHaveValue('');
      expect(screen.getByLabelText('Email')).toHaveValue('');
      expect(screen.getByLabelText('Número de Pasaporte')).toHaveValue('');
    });
  });
}); 