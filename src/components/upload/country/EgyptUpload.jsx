'use client';

import React, { useState } from 'react';
import BaseUpload from '../BaseUpload';

export default function EgyptUpload({ onFileSelect, onUploadComplete, error }) {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (file) => {
    if (file) {
      setIsUploading(true);
      setUploadedFiles([file]);
      
      // Simulate upload progress
      setTimeout(() => {
        setIsUploading(false);
        onFileSelect(file);
        onUploadComplete(file);
      }, 1500);
    }
  };

  const handleDrop = (files) => {
    if (files && files.length > 0) {
      handleFileChange(files[0]);
    }
  };

  return (
    <BaseUpload
      onFileSelect={onFileSelect}
      onUploadComplete={onUploadComplete}
      error={error}
      country="Egipto"
      countryCode="EG"
      flag="🇪🇬"
      themeColors={{ primary: 'bg-red-600', secondary: 'bg-yellow-500' }}
      processingTime="7-10 días hábiles"
      validity="6 meses"
      documentRequirements={[
        "Copia escaneada de su pasaporte válido (páginas con foto y datos personales)",
        "Fotografía reciente tamaño pasaporte (fondo blanco, 2x2 pulgadas)",
        "Comprobante de empleo o carta de trabajo",
        "Reserva de hotel o carta de invitación"
      ]}
    />
  );
}
