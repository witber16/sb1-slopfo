import React from 'react';
import { Upload } from 'lucide-react';

interface UploadButtonProps {
  onClick: () => void;
}

export default function UploadButton({ onClick }: UploadButtonProps) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 bg-primary-500 text-secondary-900 rounded-full p-4 shadow-lg hover:bg-primary-600 transition-colors duration-300 flex items-center gap-2"
      title="Share an ironic job description"
    >
      <Upload className="h-6 w-6" />
    </button>
  );
}
