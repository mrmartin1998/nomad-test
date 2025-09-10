import React, { useState, useCallback } from 'react';

const BaseUpload = ({ 
  onFileSelect, 
  onUploadComplete,
  accept = ".pdf,.jpg,.jpeg,.png", 
  maxSize = 10 * 1024 * 1024, // 10MB
  error,
  className = "",
  children,
  // Customization props
  title = "Upload Document",
  description = "Drag and drop or click to select file",
  allowedFormats = "PDF, JPG, PNG",
  showProgress = true,
  showPreview = true
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [uploadError, setUploadError] = useState(null);

  // File validation
  const validateFile = useCallback((file) => {
    const errors = [];
    
    // Check file size
    if (file.size > maxSize) {
      errors.push(`File size must be less than ${Math.round(maxSize / (1024 * 1024))}MB`);
    }
    
    // Check file type
    const allowedTypes = accept.split(',').map(type => type.trim());
    const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
    const fileMimeType = file.type;
    
    const isValidExtension = allowedTypes.some(type => 
      type.toLowerCase() === fileExtension || 
      type.toLowerCase() === fileMimeType
    );
    
    if (!isValidExtension) {
      errors.push(`File type not allowed. Please use: ${allowedFormats}`);
    }
    
    return errors;
  }, [accept, maxSize, allowedFormats]);

  // Simulate upload progress (replace with actual upload logic)
  const simulateUpload = useCallback((file) => {
    setIsUploading(true);
    setUploadProgress(0);
    setUploadError(null);
    
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          setUploadedFile({
            name: file.name,
            size: file.size,
            type: file.type,
            lastModified: file.lastModified
          });
          if (onUploadComplete) {
            onUploadComplete(file);
          }
          return 100;
        }
        return prev + 10;
      });
    }, 200);
    
    return interval;
  }, [onUploadComplete]);

  const handleFileSelect = useCallback((file) => {
    if (!file) return;
    
    // Validate file
    const validationErrors = validateFile(file);
    if (validationErrors.length > 0) {
      setUploadError(validationErrors[0]);
      return;
    }
    
    // Clear previous errors
    setUploadError(null);
    
    // Call parent handler
    if (onFileSelect) {
      onFileSelect(file);
    }
    
    // Start upload simulation
    simulateUpload(file);
  }, [validateFile, onFileSelect, simulateUpload]);

  const handleFileChange = useCallback((e) => {
    const file = e.target.files[0];
    handleFileSelect(file);
  }, [handleFileSelect]);

  const handleDragEnter = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    handleFileSelect(file);
  }, [handleFileSelect]);

  const handleReplace = useCallback(() => {
    setUploadedFile(null);
    setUploadProgress(0);
    setUploadError(null);
  }, []);

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className={`form-control w-full ${className}`}>
      <div
        className={`relative border-2 border-dashed rounded-xl p-8 transition-all duration-300 cursor-pointer
          ${isDragging ? 'border-primary bg-primary/5 scale-105' : 'border-base-content/20 hover:border-primary/50 hover:bg-base-50'}
          ${error || uploadError ? 'border-error/50 bg-error/5' : ''}
          ${uploadedFile ? 'border-success/50 bg-success/5' : ''}
          ${isUploading ? 'border-info/50 bg-info/5' : ''}`}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type="file"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          onChange={handleFileChange}
          accept={accept}
          disabled={isUploading}
        />
        
        <div className="text-center">
          {/* Upload States */}
          {isUploading ? (
            <div className="space-y-4">
              <div className="flex items-center justify-center">
                <div className="loading loading-spinner loading-lg text-primary"></div>
              </div>
              <div>
                <p className="text-lg font-medium text-primary">Uploading...</p>
                {showProgress && (
                  <div className="w-full bg-base-200 rounded-full h-2 mt-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                )}
                <p className="text-sm text-base-content/60 mt-1">{uploadProgress}% complete</p>
              </div>
            </div>
          ) : uploadedFile ? (
            <div className="space-y-4">
              <div className="flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-success">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-lg font-medium text-success">Upload Successful!</p>
                <p className="text-sm font-medium text-base-content mt-1">{uploadedFile.name}</p>
                <p className="text-xs text-base-content/60">{formatFileSize(uploadedFile.size)}</p>
                <button 
                  onClick={handleReplace}
                  className="btn btn-sm btn-outline btn-primary mt-2"
                >
                  Replace File
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-primary">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
                </svg>
              </div>
              <div>
                <p className="text-lg font-medium">{title}</p>
                <p className="text-sm text-base-content/60 mt-1">{description}</p>
                <p className="text-xs text-base-content/50 mt-2">
                  Supported formats: {allowedFormats} • Max size: {Math.round(maxSize / (1024 * 1024))}MB
                </p>
              </div>
            </div>
          )}
          
          {/* Custom children content */}
          {children}
        </div>
      </div>

      {/* Error Display */}
      {(error || uploadError) && (
        <div className="label">
          <span className="label-text-alt text-error flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
            </svg>
            {error || uploadError}
          </span>
        </div>
      )}
    </div>
  );
};

export default BaseUpload; 