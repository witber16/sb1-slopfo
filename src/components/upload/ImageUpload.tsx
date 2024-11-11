import React, { useCallback, useState } from 'react';
import { Upload, Image as ImageIcon, AlertCircle } from 'lucide-react';

interface ImageUploadProps {
  preview: string;
  error: string;
  onFileSelect: (file: File) => void;
}

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB in bytes
const SUPPORTED_TYPES = ['image/png', 'image/jpeg', 'image/jpg'];

export default function ImageUpload({ preview, error, onFileSelect }: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false);

  const validateFile = (file: File): boolean => {
    if (file.size > MAX_FILE_SIZE) {
      return false;
    }
    
    if (!SUPPORTED_TYPES.includes(file.type.toLowerCase())) {
      return false;
    }
    
    return true;
  };

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && validateFile(file)) {
      onFileSelect(file);
    }
  }, [onFileSelect]);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && validateFile(file)) {
      onFileSelect(file);
    }
  }, [onFileSelect]);

  return (
    <div className="space-y-4">
      {!preview ? (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            isDragging 
              ? 'border-red-500 bg-red-50' 
              : 'border-gray-300 hover:border-red-500 hover:bg-red-50'
          }`}
        >
          <div className="flex flex-col items-center gap-4">
            <div className="p-4 bg-red-50 rounded-full">
              <ImageIcon className="h-8 w-8 text-red-500" />
            </div>
            <div>
              <p className="font-medium text-gray-900">Drop your screenshot here</p>
              <p className="text-sm text-gray-500 mt-1">or click to browse</p>
              <div className="mt-2 space-y-1">
                <p className="text-xs text-gray-400">Maximum size: 10MB</p>
                <p className="text-xs text-gray-400">Supported formats: PNG, JPG, JPEG</p>
              </div>
            </div>
            <input
              type="file"
              accept=".png,.jpg,.jpeg"
              className="hidden"
              id="file-upload"
              onChange={handleFileChange}
            />
            <label
              htmlFor="file-upload"
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 cursor-pointer flex items-center gap-2"
            >
              <Upload className="h-4 w-4" />
              Choose File
            </label>
          </div>
        </div>
      ) : (
        <div className="relative group">
          <img
            src={preview}
            alt="Preview"
            className="w-full h-64 object-cover rounded-lg"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <label
              htmlFor="file-upload"
              className="px-4 py-2 bg-white text-gray-900 rounded-lg cursor-pointer"
            >
              Change Image
            </label>
            <input
              type="file"
              accept=".png,.jpg,.jpeg"
              className="hidden"
              id="file-upload"
              onChange={handleFileChange}
            />
          </div>
        </div>
      )}

      {error && (
        <div className="p-3 bg-red-50 text-red-600 rounded-lg flex items-center gap-2">
          <AlertCircle className="h-5 w-5 flex-shrink-0" />
          <span className="text-sm">{error}</span>
        </div>
      )}
    </div>
  );
}