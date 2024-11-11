import React from 'react';
import { X, Copy, Twitter, Facebook } from 'lucide-react';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  postTitle: string;
  postUrl: string;
}

export default function ShareModal({ isOpen, onClose, postTitle, postUrl }: ShareModalProps) {
  if (!isOpen) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(postUrl);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const shareOnTwitter = () => {
    const text = encodeURIComponent(`Check out this ironic job description: ${postTitle}`);
    const url = encodeURIComponent(postUrl);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
  };

  const shareOnFacebook = () => {
    const url = encodeURIComponent(postUrl);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white rounded-lg w-full max-w-md p-6">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="h-6 w-6" />
        </button>

        <h2 className="text-xl font-semibold mb-4">Share this post</h2>
        
        <div className="space-y-4">
          <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
            <input
              type="text"
              value={postUrl}
              readOnly
              className="flex-1 bg-transparent border-none focus:outline-none text-gray-600"
            />
            <button
              onClick={handleCopy}
              className="p-2 text-gray-600 hover:text-red-500 transition-colors"
            >
              <Copy className="h-5 w-5" />
            </button>
          </div>

          <div className="flex justify-center gap-4">
            <button
              onClick={shareOnTwitter}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#1DA1F2] text-white hover:bg-[#1a8cd8] transition-colors"
            >
              <Twitter className="h-5 w-5" />
              Twitter
            </button>
            <button
              onClick={shareOnFacebook}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#4267B2] text-white hover:bg-[#365899] transition-colors"
            >
              <Facebook className="h-5 w-5" />
              Facebook
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}