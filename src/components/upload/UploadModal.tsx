import React, { useState } from 'react';
import { X } from 'lucide-react';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../../lib/firebase';
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

  const resetForm = () => {
    setSelectedFile(null);
    setPreview('');
    setTitle('');
    setDescription('');
    setError('');
    setIsSuccess(false);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile || !title.trim() || !description.trim()) {
      setError('Please fill in all fields');
      return;
    }

    setIsUploading(true);
    setError('');

    try {
      const fileExtension = selectedFile.name.split('.').pop();
      const filename = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExtension}`;
      const storageRef = ref(storage, `posts/${filename}`);

      await uploadBytes(storageRef, selectedFile, {
        contentType: selectedFile.type,
        customMetadata: {
          originalName: selectedFile.name
        }
      });

      const imageUrl = await getDownloadURL(storageRef);

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
        comments: 0,
        createdAt: Date.now()
      };

      await addDoc(collection(db, 'posts'), newPost);
      setIsSuccess(true);
      
      setTimeout(() => {
        handleClose();
      }, 1500);
    } catch (err) {
      console.error('Upload error:', err);
      setError('Failed to upload. Please ensure you have proper permissions and try again.');
    } finally {
      setIsUploading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={handleClose} />
      <div className="relative bg-white rounded-lg w-full max-w-md p-6 overflow-y-auto max-h-[90vh]">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="h-6 w-6" />
        </button>

        <h2 className="text-xl font-semibold mb-2">Share the Irony</h2>
        <p className="text-gray-600 text-sm mb-6">
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