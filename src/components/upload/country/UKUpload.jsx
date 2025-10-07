'use client';

import React, { useState } from 'react';
import BaseUpload from '../BaseUpload';

export default function UKUpload({ onFileSelect, onUploadComplete, error, documentType = "pasaporte" }) {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const isPassport = documentType === "pasaporte";
  const isPhoto = documentType === "foto";

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
    <div className="w-full">
      {/* UK-specific branding and information */}
      <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-red-50 rounded-lg border border-blue-200">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-2xl">🇬🇧</span>
          <div>
            <h3 className="font-bold text-lg text-blue-900">ETA Reino Unido</h3>
            <p className="text-sm text-blue-700">Electronic Travel Authorization</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-blue-600">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-blue-800">Procesamiento: 15 días hábiles</span>
          </div>
          <div className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-blue-600">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-blue-800">Validez: 6 meses</span>
          </div>
          <div className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-blue-600">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>
            <span className="text-blue-800">Múltiples entradas</span>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {isPassport && (
          <div className="card bg-base-200 shadow-lg">
            <div className="card-body">
              <h3 className="card-title text-lg mb-4 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-primary">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5a2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0z" />
                </svg>
                Pasaporte Escaneado
              </h3>
              <p className="text-sm text-base-content/70 mb-4">
                Upload a clear scan of your passport (photo page and personal details)
              </p>
              <BaseUpload
                onFileSelect={onFileSelect}
                onUploadComplete={onUploadComplete}
                error={error}
                accept=".pdf,.jpg,.jpeg,.png"
                maxSize={5 * 1024 * 1024} // 5MB
                countryTheme="uk"
              />
            </div>
          </div>
        )}

        {isPhoto && (
          <div className="card bg-base-200 shadow-lg">
            <div className="card-body">
              <h3 className="card-title text-lg mb-4 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-primary">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
                </svg>
                Fotografía Tipo Carnet
              </h3>
              <p className="text-sm text-base-content/70 mb-4">
                Recent passport-sized photo (2x2 inches, white background, no glasses/hat)
              </p>
              <BaseUpload
                onFileSelect={onFileSelect}
                onUploadComplete={onUploadComplete}
                error={error}
                accept=".jpg,.jpeg,.png"
                maxSize={2 * 1024 * 1024} // 2MB
                countryTheme="uk"
              />
            </div>
          </div>
        )}
      </div>

      {/* Additional information */}
      <div className="mt-6 p-4 bg-info/10 rounded-lg">
        <div className="flex items-start gap-3">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-5 h-5 mt-0.5">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <div>
            <h4 className="font-bold text-sm">Requisitos de Documentos</h4>
            <ul className="text-xs text-base-content/70 mt-1 space-y-1">
              <li>• Formatos aceptados: PDF, JPG, JPEG, PNG</li>
              <li>• Máximo 5MB por archivo</li>
              <li>• Documentos deben ser claros y legibles</li>
              <li>• No se aceptan documentos escaneados de baja calidad</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
