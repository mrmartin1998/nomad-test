'use client';

import React, { useState } from 'react';
import BaseUpload from '../BaseUpload';

export default function ThailandUpload({ onFileSelect, onUploadComplete, error }) {
  const [uploadedFiles, setUploadedFiles] = useState({});
  const [uploadProgress, setUploadProgress] = useState({});

  const handleFileChange = (file, documentType) => {
    if (file) {
      setUploadProgress({ [documentType]: 0 });
      
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          const newProgress = prev[documentType] + 10;
          if (newProgress >= 100) {
            clearInterval(progressInterval);
            setUploadedFiles(prev => ({ ...prev, [documentType]: file }));
            onUploadComplete && onUploadComplete(file, documentType);
            return { ...prev, [documentType]: 100 };
          }
          return { ...prev, [documentType]: newProgress };
        });
      }, 100);

      onFileSelect && onFileSelect(file, documentType);
    }
  };

  const handleDrop = (files, documentType) => {
    if (files.length > 0) {
      handleFileChange(files[0], documentType);
    }
  };

  return (
    <BaseUpload
      onFileSelect={onFileSelect}
      onUploadComplete={onUploadComplete}
      error={error}
      country="Tailandia"
      countryCode="TH"
      flag="🇹🇭"
      themeColors={{ primary: 'bg-red-600', secondary: 'bg-blue-600' }}
      processingTime="5-7 días hábiles"
      validity="6 meses"
      documentRequirements={[
        "Copia escaneada de su pasaporte válido (páginas con foto y datos personales)",
        "Fotografía reciente tamaño pasaporte (fondo blanco, sin gafas, sin sombrero)",
        "Boleto de salida de Tailandia (reserva de vuelo de regreso)",
        "Reserva de hotel o carta de invitación de alojamiento"
      ]}
    />
  );
}
