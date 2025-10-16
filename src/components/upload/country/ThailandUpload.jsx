'use client';

import React, { useState, useEffect } from 'react';
import BaseUpload from '../BaseUpload';

const ThailandUpload = ({ 
  documentType = '',  // Provide default value
  onFileSelect,
  onUploadComplete,
  error
}) => {
  const [fileName, setFileName] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  
  // Document type configurations with default titles and descriptions
  const documentConfig = {
    fotoCarnet: {
      title: "Foto de Carnet",
      description: "Suba una foto tipo carnet con fondo blanco",
      formats: "JPG, PNG"
    },
    pasaporteEscaneado: {
      title: "Pasaporte Escaneado",
      description: "Suba una copia escaneada clara de todas las páginas de su pasaporte",
      formats: "PDF, JPG, PNG"
    },
    billeteSalida: {
      title: "Billete de Salida",
      description: "Suba una copia de su billete de salida de Tailandia",
      formats: "PDF, JPG, PNG"
    },
    reservaHotel: {
      title: "Reserva de Hotel",
      description: "Suba una confirmación de su reserva de alojamiento en Tailandia",
      formats: "PDF, JPG, PNG"
    },
    default: {
      title: "Documento",
      description: "Suba el documento requerido",
      formats: "PDF, JPG, PNG"
    }
  };
  
  // Get config based on document type or use default if not found
  const getConfig = () => {
    return documentConfig[documentType] || documentConfig.default;
  };
  
  const handleFileSelect = (file) => {
    if (file) {
      setFileName(file.name);
      if (onFileSelect) {
        onFileSelect(file, documentType);
      }
    }
  };
  
  const handleUploadStart = () => {
    setIsUploading(true);
  };
  
  const handleUploadComplete = (file) => {
    setIsUploading(false);
    if (onUploadComplete) {
      onUploadComplete(file, documentType);
    }
  };
  
  const handleError = (error) => {
    setIsUploading(false);
    console.error('Upload error:', error);
  };
  
  const config = getConfig();
  
  return (
    <div className="card bg-base-200 shadow-sm">
      <div className="card-body">
        <h3 className="card-title text-lg mb-2 flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
            {documentType === 'fotoCarnet' && (
              <span className="text-primary text-lg">📷</span>
            )}
            {documentType === 'pasaporteEscaneado' && (
              <span className="text-primary text-lg">🪪</span>
            )}
            {documentType === 'billeteSalida' && (
              <span className="text-primary text-lg">✈️</span>
            )}
            {documentType === 'reservaHotel' && (
              <span className="text-primary text-lg">🏨</span>
            )}
            {!['fotoCarnet', 'pasaporteEscaneado', 'billeteSalida', 'reservaHotel'].includes(documentType) && (
              <span className="text-primary text-lg">📄</span>
            )}
          </div>
          {config.title}
        </h3>
        
        <p className="text-sm text-base-content/70 mb-4">
          {config.description}
        </p>
        
        <BaseUpload
          title={config.title}
          description="Arrastre y suelte o haga clic para seleccionar"
          allowedFormats={config.formats}
          onFileSelect={handleFileSelect}
          onUploadStart={handleUploadStart}
          onUploadComplete={handleUploadComplete}
          onError={handleError}
          error={error}
          showProgress={true}
          accept={documentType === 'fotoCarnet' ? ".jpg,.jpeg,.png" : ".pdf,.jpg,.jpeg,.png"}
        />
      </div>
    </div>
  );
};

export default ThailandUpload;
