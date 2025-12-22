'use client';

import { useState, useEffect } from 'react';
import ImageUploader from './ImageUploader';

export default function MediaLibrary({ onSelect, selectedImage }) {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState('grid'); // 'grid' or 'upload'

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/media');
      const data = await response.json();
      
      if (response.ok) {
        setImages(data.images || []);
      }
    } catch (error) {
      console.error('Error fetching images:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = (uploadedImage) => {
    // Add the new image to the list
    setImages(prev => [uploadedImage, ...prev]);
    
    // Select the newly uploaded image
    if (onSelect) {
      onSelect(uploadedImage);
    }
    
    // Switch back to grid view
    setView('grid');
  };

  const handleImageSelect = (image) => {
    if (onSelect) {
      onSelect(image);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="loading loading-spinner loading-lg"></div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* View Toggle */}
      <div className="flex gap-2">
        <button
          onClick={() => setView('grid')}
          className={`btn btn-sm ${view === 'grid' ? 'btn-primary' : 'btn-outline'}`}
        >
          Media Library
        </button>
        <button
          onClick={() => setView('upload')}
          className={`btn btn-sm ${view === 'upload' ? 'btn-primary' : 'btn-outline'}`}
        >
          Upload New
        </button>
      </div>

      {/* Content */}
      {view === 'upload' ? (
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Upload New Image</h3>
          <ImageUploader onUpload={handleImageUpload} />
        </div>
      ) : (
        <div className="space-y-4">
          <h3 className="text-lg font-medium">
            Select Image ({images.length} available)
          </h3>
          
          {images.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-base-content/70 mb-4">No images uploaded yet</p>
              <button
                onClick={() => setView('upload')}
                className="btn btn-primary"
              >
                Upload Your First Image
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-h-96 overflow-y-auto">
              {images.map((image, index) => (
                <div
                  key={image.url || index}
                  className={`relative aspect-square rounded-lg overflow-hidden cursor-pointer border-2 transition-all
                    ${selectedImage?.url === image.url 
                      ? 'border-primary ring-2 ring-primary/20' 
                      : 'border-base-300 hover:border-primary/50'
                    }`}
                  onClick={() => handleImageSelect(image)}
                >
                  <img
                    src={image.url}
                    alt={image.filename || 'Uploaded image'}
                    className="w-full h-full object-cover"
                  />
                  {selectedImage?.url === image.url && (
                    <div className="absolute top-2 right-2">
                      <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                        <span className="text-white text-sm">✓</span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
