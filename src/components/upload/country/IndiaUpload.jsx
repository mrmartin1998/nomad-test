'use client';

import React, { useState } from 'react';
import BaseUpload from '../BaseUpload';

const IndiaUpload = ({ onFileSelect, onUploadComplete, error, documentType = "pasaporte" }) => {
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
      {/* India-specific branding and information */}
      <div className="mb-8 p-6 bg-gradient-to-r from-orange-50 to-green-50 rounded-xl border border-orange-200">
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🇮🇳</span>
            <h3 className="text-xl font-bold text-orange-800">India Visa Application</h3>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6 text-sm">
          <div>
            <h4 className="font-semibold text-orange-700 mb-2">📋 Required Documents:</h4>
            <ul className="space-y-1 text-orange-600">
              <li>• Valid passport (6+ months validity)</li>
              <li>• Recent passport photo (2x2 inches)</li>
              <li>• Employment letter or invitation</li>
              <li>• Travel itinerary and hotel booking</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-orange-700 mb-2">⏱️ Processing Info:</h4>
            <ul className="space-y-1 text-orange-600">
              <li>• Processing time: 5-7 business days</li>
              <li>• Visa validity: 6 months</li>
              <li>• Multiple entry allowed</li>
              <li>• Tourist visa category</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Document upload section */}
      <div className="space-y-6">
        {isPassport && (
          <div className="card bg-base-200 shadow-lg">
            <div className="card-body">
              <h3 className="card-title text-lg mb-4 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-orange-500">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0z" />
                </svg>
                Passport Document
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
                countryTheme="india"
              />
            </div>
          </div>
        )}

        {isPhoto && (
          <div className="card bg-base-200 shadow-lg">
            <div className="card-body">
              <h3 className="card-title text-lg mb-4 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-orange-500">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
                </svg>
                Passport Photo
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
                countryTheme="india"
              />
            </div>
          </div>
        )}
      </div>

      {/* Additional information */}
      <div className="mt-6 p-4 bg-orange-50 rounded-lg border border-orange-200">
        <h4 className="font-semibold text-orange-800 mb-2">💡 Important Notes:</h4>
        <ul className="text-sm text-orange-700 space-y-1">
          <li>• All documents must be in PDF or image format (JPG, JPEG, PNG)</li>
          <li>• Documents should be clear and readable</li>
          <li>• Passport must be valid for at least 6 months from travel date</li>
          <li>• Photo must meet India visa photo requirements</li>
        </ul>
      </div>
    </div>
  );
};

export default IndiaUpload;
