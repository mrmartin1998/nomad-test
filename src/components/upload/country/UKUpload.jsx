'use client';

import React, { useState } from 'react';
import BaseUpload from '../BaseUpload';

export default function UKUpload({ onFileSelect, onUploadComplete, error }) {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (file) => {
    if (file) {
      setIsUploading(true);
      setUploadProgress(0);
      
      // Simulate upload progress
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsUploading(false);
            onUploadComplete(file);
            return 100;
          }
          return prev + 10;
        });
      }, 200);
      
      onFileSelect(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileChange(files[0]);
    }
  };

  return (
    <BaseUpload
      onFileSelect={onFileSelect}
      onUploadComplete={onUploadComplete}
      error={error}
      country="Reino Unido"
      countryCode="GB"
      flag="🇬🇧"
      themeColors={{ primary: 'bg-blue-600', secondary: 'bg-red-600' }}
      processingTime="15 días hábiles"
      validity="6 meses"
      documentRequirements={[
        "Copia escaneada de su pasaporte válido (páginas con foto y datos personales)",
        "Fotografía reciente tamaño pasaporte (fondo blanco, sin gafas, sin sombrero)",
        "Comprobante de empleo o carta de invitación (si aplica)",
        "Itinerario de viaje y reserva de hotel (si aplica)"
      ]}
    />
  );
}
