import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
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

  test('renders Egypt form component', () => {
    render(<EgyptForm />);
    expect(screen.getByText('🚀 Solicitud de Visa Egipto')).toBeInTheDocument();
  });

  test('renders first step by default', () => {
    render(<EgyptForm />);
    // Use getAllByText to handle multiple elements with same text
    const personalInfoElements = screen.getAllByText('Información Personal');
    expect(personalInfoElements.length).toBeGreaterThan(0);
  });

  test('renders personal info fields', () => {
    render(<EgyptForm />);
    expect(screen.getByLabelText('Nombre Completo')).toBeInTheDocument();
    expect(screen.getByLabelText('Fecha de Nacimiento')).toBeInTheDocument();
    // Check for placeholder text to verify specific fields
    expect(screen.getByPlaceholderText('Ingrese su nombre completo')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('su.email@ejemplo.com')).toBeInTheDocument();
  });
});