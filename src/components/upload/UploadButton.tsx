import React from 'react';
import { Upload } from 'lucide-react';

interface UploadButtonProps {
  onClick: () => void;
}

export default function UploadButton({ onClick }: UploadButtonProps) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 bg-red-500 text-white rounded-full p-4 shadow-lg hover:bg-red-600 transition-colors duration-300 flex items-center gap-2"
    >
      <Upload className="h-6 w-6" />
    </button>
  );
}