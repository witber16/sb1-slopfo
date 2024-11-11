import React from 'react';
import { Upload, Check, Loader2 } from 'lucide-react';
import ImageUpload from './ImageUpload';

interface UploadFormProps {
  preview: string;
  title: string;
  description: string;
  error: string;
  isUploading: boolean;
  isSuccess: boolean;
  onTitleChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onFileSelect: (file: File) => void;
}

const sanitizeInput = (input: string): string => {
  return input.replace(/[^a-zA-Z0-9\s.,!?()-]/g, '');
};

export default function UploadForm({
  preview,
  title,
  description,
  error,
  isUploading,
  isSuccess,
  onTitleChange,
  onDescriptionChange,
  onSubmit,
  onFileSelect,
}: UploadFormProps) {
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const sanitizedValue = sanitizeInput(e.target.value);
    onTitleChange(sanitizedValue);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const sanitizedValue = sanitizeInput(e.target.value);
    onDescriptionChange(sanitizedValue);
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <ImageUpload
        preview={preview}
        onFileSelect={onFileSelect}
        error={error}
      />

      <div className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={handleTitleChange}
            placeholder="Add a title..."
            maxLength={100}
            aria-describedby="titleHelp"
            className="w-full p-2 border border-gray-200 rounded-lg transition-all duration-200
              focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent
              hover:border-red-200
              placeholder:text-gray-400"
          />
          <p id="titleHelp" className="mt-1 text-xs text-gray-500">
            Only letters, numbers, and basic punctuation allowed
          </p>
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description of Irony
          </label>
          <textarea
            id="description"
            value={description}
            onChange={handleDescriptionChange}
            placeholder="Explain the irony or paste the relevant part of the job description..."
            maxLength={500}
            aria-describedby="descriptionHelp"
            className="w-full p-2 border border-gray-200 rounded-lg h-24 resize-none transition-all duration-200
              focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent
              hover:border-red-200
              placeholder:text-gray-400"
          />
          <p id="descriptionHelp" className="mt-1 text-xs text-gray-500">
            Only letters, numbers, and basic punctuation allowed
          </p>
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <button
          type="submit"
          disabled={isUploading || isSuccess || !title.trim() || !description.trim()}
          className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all duration-200
            ${isSuccess
              ? 'bg-green-500 hover:bg-green-600'
              : !title.trim() || !description.trim()
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-red-500 hover:bg-red-600 focus:ring-2 focus:ring-red-500 focus:ring-offset-2'
            } text-white`}
        >
          {isUploading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Uploading...
            </>
          ) : isSuccess ? (
            <>
              <Check className="h-4 w-4" />
              Uploaded!
            </>
          ) : (
            <>
              <Upload className="h-4 w-4" />
              Upload
            </>
          )}
        </button>
      </div>
    </form>
  );
}