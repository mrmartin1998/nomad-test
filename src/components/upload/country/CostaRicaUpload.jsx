'use client';

import React from 'react';
import BaseUpload from '../BaseUpload';

const CostaRicaUpload = ({ onFileSelect, onUploadComplete, error }) => {
  return (
    <div className="space-y-8">
      {/* Costa Rica Visa Information */}
      <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl p-8 border border-blue-200">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-green-500 rounded-2xl flex items-center justify-center">
            <span className="text-2xl font-bold text-white">🇨🇷</span>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Visa Costa Rica</h2>
            <p className="text-gray-600">Documentos requeridos para su solicitud</p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-blue-600">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-800">Procesamiento</h3>
            <p className="text-sm text-gray-600">5-10 días hábiles</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-green-600">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-800">Validez</h3>
            <p className="text-sm text-gray-600">90 días</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-purple-600">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m-3 0a3 3 0 00-3 3m3-3v6l-3-3m0 0l-3 3m3-3H9a3 3 0 00-3 3v1.5" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-800">Entradas</h3>
            <p className="text-sm text-gray-600">Múltiples</p>
          </div>
        </div>
      </div>

      {/* Document Requirements */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-blue-600">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0z" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-800">Pasaporte</h3>
          </div>
          <p className="text-sm text-gray-600 mb-3">Copia escaneada de su pasaporte vigente</p>
          <ul className="text-xs text-gray-500 space-y-1">
            <li>• Válido por al menos 6 meses</li>
            <li>• Páginas principales</li>
            <li>• Formato: PDF, JPG, PNG</li>
          </ul>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-green-600">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-800">Comprobante de Ingresos</h3>
          </div>
          <p className="text-sm text-gray-600 mb-3">Estados de cuenta bancarios o documentos que demuestren sus ingresos</p>
          <ul className="text-xs text-gray-500 space-y-1">
            <li>• Últimos 3 meses</li>
            <li>• Mínimo $1000 USD</li>
            <li>• Formato: PDF</li>
          </ul>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-purple-600">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-800">Antecedentes Penales</h3>
          </div>
          <p className="text-sm text-gray-600 mb-3">Certificado de antecedentes penales de su país de origen</p>
          <ul className="text-xs text-gray-500 space-y-1">
            <li>• Emitido recientemente</li>
            <li>• Apostillado</li>
            <li>• Formato: PDF</li>
          </ul>
        </div>
      </div>

      {/* Upload Component */}
      <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
        <div className="text-center mb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Subir Documentos</h3>
          <p className="text-gray-600">Arrastre y suelte sus archivos o haga clic para seleccionar</p>
        </div>
        
        <BaseUpload
          onFileSelect={onFileSelect}
          onUploadComplete={onUploadComplete}
          error={error}
          accept=".pdf,.jpg,.jpeg,.png"
          maxSize={10 * 1024 * 1024} // 10MB
          multiple={true}
        />
      </div>

      {/* Security Information */}
      <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
        <div className="flex items-start gap-4">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-blue-600">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m5.121-9.75a9 9 0 00-1.5 0 9 9 0 001.5 0z" />
            </svg>
          </div>
          <div>
            <h4 className="font-semibold text-blue-800 mb-2">Información de Seguridad</h4>
            <p className="text-sm text-blue-700">
              Todos los documentos son procesados de forma segura y encriptada. 
              Sus datos personales están protegidos según las regulaciones internacionales de privacidad.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CostaRicaUpload;
