'use client';

import React, { useState } from 'react';
import BaseUpload from '../BaseUpload';

export default function CubaUpload({ onFileSelect, onUploadComplete, error }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileChange = (file) => {
    setSelectedFile(file);
    onFileSelect(file);
    
    // Simulate upload progress
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          onUploadComplete(file);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const handleDrop = (files) => {
    if (files.length > 0) {
      handleFileChange(files[0]);
    }
  };

  return (
    <BaseUpload
      onFileSelect={onFileSelect}
      onUploadComplete={onUploadComplete}
      error={error}
      country="Cuba"
      countryCode="CU"
      flag="🇨🇺"
      themeColors={{ primary: 'bg-blue-600', secondary: 'bg-red-500' }}
      processingTime="15 días hábiles"
      validity="30 días"
      documentRequirements={[
        "Copia escaneada de su pasaporte válido (páginas con foto y datos personales)",
        "Fotografía reciente tamaño pasaporte (fondo blanco, sin gafas, sin sombrero)",
        "Comprobante de empleo o estados de cuenta bancarios de los últimos 3 meses",
        "Comprobante de alojamiento en Cuba (reserva de hotel o carta de invitación)",
        "Itinerario de viaje (boletos de avión de ida y vuelta)"
      ]}
    />
  );
}
