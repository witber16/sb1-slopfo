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
            onChange={(e) => onTitleChange(e.target.value)}
            placeholder="Add a title..."
            className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description of Irony
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => onDescriptionChange(e.target.value)}
            placeholder="Explain the irony or paste the relevant part of the job description..."
            className="w-full p-2 border border-gray-200 rounded-lg h-24 resize-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <button
          type="submit"
          disabled={isUploading || isSuccess}
          className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
            isSuccess
              ? 'bg-green-500 hover:bg-green-600'
              : 'bg-red-500 hover:bg-red-600'
          } text-white transition-colors`}
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