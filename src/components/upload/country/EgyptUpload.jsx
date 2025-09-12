'use client';

import React, { useState } from 'react';
import BaseUpload from '../BaseUpload';

export default function EgyptUpload({ onFileSelect, onUploadComplete, error, documentType = "pasaporte" }) {
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

  const isPassport = documentType === "pasaporte";
  const isPhoto = documentType === "foto";

  const getDocumentInfo = () => {
    if (isPhoto) {
      return {
        title: "Fotografía Tipo Carnet",
        description: "Fotografía reciente tamaño pasaporte (fondo blanco, sin gafas, sin sombrero)",
        accept: ".jpg,.jpeg,.png"
      };
    } else {
      return {
        title: "Pasaporte Escaneado",
        description: "Copia escaneada de su pasaporte válido (páginas con foto y datos personales)",
        accept: ".pdf,.jpg,.jpeg,.png"
      };
    }
  };

  const documentInfo = getDocumentInfo();

  return (
    <div className="card bg-base-200">
      <div className="card-body">
        <h3 className="card-title text-lg mb-2">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-primary">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5a2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0z" />
          </svg>
          {documentInfo.title}
        </h3>
        <p className="text-sm text-base-content/70 mb-4">
          {documentInfo.description}
        </p>
        
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
          accept={documentInfo.accept}
          documentRequirements={[documentInfo.description]}
        />
      </div>
    </div>
  );
}
