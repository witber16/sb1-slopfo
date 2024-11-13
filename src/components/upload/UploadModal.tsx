import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { uploadAsset } from '../../services/assetService';
import UploadForm from './UploadForm';
import { Post } from '../../types/Post';

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function UploadModal({ isOpen, onClose }: UploadModalProps) {
  const [error, setError] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setSelectedFile(null);
      setPreview('');
      setTitle('');
      setDescription('');
      setError('');
      setIsSuccess(false);
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile || !title.trim() || !description.trim()) {
      setError('Please fill in all fields');
      return;
    }

    setIsUploading(true);
    setError('');

    try {
      const filename = `posts/${Date.now()}-${Math.random().toString(36).substring(2)}.${selectedFile.name.split('.').pop()}`;
      const imageUrl = await uploadAsset(selectedFile, filename);

      const newPost: Omit<Post, 'id'> = {
        image: imageUrl,
        title: title.trim(),
        description: description.trim(),
        date: new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }),
        likes: 0,
        createdAt: Date.now()
      };

      await addDoc(collection(db, 'posts'), newPost);
      setIsSuccess(true);
      
      setTimeout(() => {
        onClose();
      }, 1500);
    } catch (err) {
      console.error('Upload error:', err);
      setError('Failed to upload. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white rounded-lg w-full max-w-md p-6 overflow-y-auto max-h-[90vh]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-secondary-400 hover:text-secondary-600"
        >
          <X className="h-6 w-6" />
        </button>

        <h2 className="text-xl font-semibold mb-2 text-secondary-900">Share the Irony</h2>
        <p className="text-secondary-600 text-sm mb-6">
          Found a job description that's unintentionally hilarious? Share it with us!
        </p>
        
        <UploadForm
          preview={preview}
          title={title}
          description={description}
          error={error}
          isUploading={isUploading}
          isSuccess={isSuccess}
          onTitleChange={setTitle}
          onDescriptionChange={setDescription}
          onSubmit={handleSubmit}
          onFileSelect={handleFileSelect}
        />
      </div>
    </div>
  );
}
