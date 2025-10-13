import React, { useState } from 'react';
import BaseUpload from '../BaseUpload';

const USAUpload = ({ 
  onFileSelect, 
  onUploadComplete,
  error,
  className = "" 
}) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setUploadSuccess(false);
      
      // Call the parent's onFileSelect handler if provided
      if (onFileSelect) {
        onFileSelect(file);
      }
      
      // Simulate upload process
      simulateUpload(file);
    }
  };
  
  const simulateUpload = (file) => {
    setIsUploading(true);
    setUploadProgress(0);
    
    // Simulate progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        const newProgress = prev + 10;
        if (newProgress >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          setUploadSuccess(true);
          
          // In a real implementation, you'd get a URL back from your server
          // For now, we'll just return the file name as a simple string
          if (onUploadComplete) {
            onUploadComplete(file.name);
          }
          
          return 100;
        }
        return newProgress;
      });
    }, 300);
  };
  
  return (
    <div className={`space-y-6 ${className}`}>
      {/* Processing Info Banner */}
      <div className="bg-gradient-to-r from-blue-50 to-red-50 border border-blue-200 rounded-xl p-6">
        <div className="flex items-center gap-4">
          <div className="text-4xl">🇺🇸</div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-blue-900">USA ESTA Application</h3>
            <div className="flex items-center gap-4 mt-2">
              <div className="badge badge-success badge-lg">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                1-Day Processing
              </div>
              <div className="badge badge-info badge-lg">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Valid for 2 Years
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Document Requirements */}
      <div className="bg-base-100 border border-base-200 rounded-xl p-6">
        <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-primary">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c-.621 0-1.125-.504-1.125-1.125V11.25a9 9 0 00-9-9z" />
          </svg>
          Required Document
        </h4>
        
        <div className="space-y-3">
          <div className="flex items-start gap-3 p-3 bg-primary/5 rounded-lg">
            <div className="text-primary mt-1">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="font-medium">Valid Passport</p>
              <p className="text-sm text-base-content/70">
                Clear, high-quality scan or photo of your passport&apos;s main page. 
                Must be valid for at least 6 months from your travel date.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Upload Component */}
      <BaseUpload
        onFileSelect={onFileSelect}
        onUploadComplete={onUploadComplete}
        accept=".pdf,.jpg,.jpeg,.png"
        maxSize={10 * 1024 * 1024} // 10MB
        error={error}
        title="Upload Passport"
        description="Drag and drop your passport or click to select"
        allowedFormats="PDF, JPG, PNG"
        className="border-2 border-dashed border-blue-200 hover:border-blue-400"
      >
        {/* Additional USA-specific content */}
        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
          <div className="flex items-center gap-2 text-blue-700">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
            </svg>
            <span className="text-sm font-medium">ESTA Processing Info</span>
          </div>
          <p className="text-xs text-blue-600 mt-1">
            Your ESTA will be processed within 24 hours and will be valid for multiple entries over 2 years.
          </p>
        </div>
      </BaseUpload>

      {/* Additional Information */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center gap-2 text-green-700 mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="font-medium text-sm">Fast Processing</span>
          </div>
          <p className="text-xs text-green-600">
            Most ESTA applications are approved within minutes, with a maximum processing time of 72 hours.
          </p>
        </div>

        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
          <div className="flex items-center gap-2 text-purple-700 mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
            </svg>
            <span className="font-medium text-sm">Secure Process</span>
          </div>
          <p className="text-xs text-purple-600">
            Your documents are encrypted and processed securely through official government channels.
          </p>
        </div>
      </div>
    </div>
  );
};

export default USAUpload;