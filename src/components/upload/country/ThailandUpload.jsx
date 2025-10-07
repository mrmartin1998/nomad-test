'use client';

import React, { useState } from 'react';
import BaseUpload from '../BaseUpload';

export default function ThailandUpload({ onFileSelect, onUploadComplete, error, documentType = "pasaporte" }) {
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

  const isPassport = documentType === "pasaporte";
  const isPhoto = documentType === "foto";
  const isTicket = documentType === "billete";
  const isHotel = documentType === "hotel";

  const getDocumentInfo = () => {
    if (isPhoto) {
      return {
        title: "Fotografía Tipo Carnet",
        description: "Fotografía reciente tamaño pasaporte (fondo blanco, sin gafas, sin sombrero)",
        accept: ".jpg,.jpeg,.png"
      };
    } else if (isPassport) {
      return {
        title: "Pasaporte Escaneado",
        description: "Copia escaneada de su pasaporte válido (páginas con foto y datos personales)",
        accept: ".pdf,.jpg,.jpeg,.png"
      };
    } else if (isTicket) {
      return {
        title: "Boleto de Salida",
        description: "Copia de su boleto de salida de Tailandia",
        accept: ".pdf,.jpg,.jpeg,.png"
      };
    } else if (isHotel) {
      return {
        title: "Reserva de Hotel",
        description: "Confirmación de reserva de hotel o carta de invitación",
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
          onFileSelect={(file) => onFileSelect && onFileSelect(file, documentType)}
          onUploadComplete={(file) => onUploadComplete && onUploadComplete(file, documentType)}
          error={error}
          country="Tailandia"
          countryCode="TH"
          flag="🇹🇭"
          themeColors={{ primary: 'bg-red-600', secondary: 'bg-blue-600' }}
          processingTime="5-7 días hábiles"
          validity="6 meses"
          accept={documentInfo.accept}
          documentRequirements={[documentInfo.description]}
        />
      </div>
    </div>
  );
}
