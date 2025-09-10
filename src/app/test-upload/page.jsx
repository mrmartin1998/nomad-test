'use client';

import React, { useState } from 'react';
import USAUpload from '@/components/upload/country/USAUpload';

export default function TestUploadPage() {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [error, setError] = useState(null);

  const handleFileSelect = (file) => {
    console.log('File selected:', file);
    setError(null);
  };

  const handleUploadComplete = (file) => {
    console.log('Upload completed:', file);
    setUploadedFile(file);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-base-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-secondary text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center">
            🚀 New Document Upload System
          </h1>
          <p className="text-xl text-center mt-4 opacity-90">
            Testing the enhanced USA ESTA upload component
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          
          {/* Status Display */}
          {uploadedFile && (
            <div className="alert alert-success mb-8">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <div>
                <h3 className="font-bold">File uploaded successfully!</h3>
                <div className="text-xs">
                  <p>Name: {uploadedFile.name}</p>
                  <p>Size: {Math.round(uploadedFile.size / 1024)} KB</p>
                  <p>Type: {uploadedFile.type}</p>
                </div>
              </div>
            </div>
          )}

          {/* Upload Component */}
          <USAUpload
            onFileSelect={handleFileSelect}
            onUploadComplete={handleUploadComplete}
            error={error}
          />

          {/* Test Controls */}
          <div className="mt-12 p-6 bg-base-200 rounded-xl">
            <h3 className="text-lg font-bold mb-4">🧪 Test Controls</h3>
            <div className="flex flex-wrap gap-4">
              <button 
                className="btn btn-outline btn-error btn-sm"
                onClick={() => setError('Test error: File too large')}
              >
                Simulate Error
              </button>
              <button 
                className="btn btn-outline btn-success btn-sm"
                onClick={() => setError(null)}
              >
                Clear Error
              </button>
              <button 
                className="btn btn-outline btn-warning btn-sm"
                onClick={() => {
                  setUploadedFile(null);
                  setError(null);
                }}
              >
                Reset Upload
              </button>
            </div>
          </div>

          {/* Feature Showcase */}
          <div className="mt-12 grid md:grid-cols-2 gap-8">
            <div className="bg-base-200 rounded-xl p-6">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                ✨ Enhanced Features
              </h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <span className="text-success">✓</span>
                  Drag & drop functionality
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-success">✓</span>
                  Real-time progress tracking
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-success">✓</span>
                  File size & type validation
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-success">✓</span>
                  Success/error states
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-success">✓</span>
                  Country-specific styling
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-success">✓</span>
                  Processing time display
                </li>
              </ul>
            </div>

            <div className="bg-base-200 rounded-xl p-6">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                🎯 USA ESTA Specific
              </h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <span className="text-info">🇺🇸</span>
                  USA flag and branding
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-success">⚡</span>
                  1-day processing highlight
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-info">📅</span>
                  2-year validity period
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-warning">📋</span>
                  Clear document requirements
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-success">🔒</span>
                  Security information
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-primary">💡</span>
                  Processing tips
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 