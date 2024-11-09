import React, { useState } from 'react';
import { Share2, ThumbsUp } from 'lucide-react';
import ShareModal from './ShareModal';

interface ErrorCardProps {
  id: string;
  image: string;
  title: string;
  description: string;
  date: string;
  likes: number;
  comments: number;
  isLiked: boolean;
  onLike: (id: string) => void;
  isUpdating: boolean;
}

export default function ErrorCard({
  id,
  image,
  title,
  description,
  date,
  likes,
  comments,
  isLiked,
  onLike,
  isUpdating
}: ErrorCardProps) {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Capitalize first letter of each word only for display
  const capitalizeTitle = (text: string) => {
    return text
      .split(' ')
      .map(word => {
        // Only capitalize if the word isn't already capitalized
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join(' ');
  };

  const postUrl = `${window.location.origin}/post/${id}`;
  const formattedTitle = capitalizeTitle(title);

  return (
    <>
      <article className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300">
        {/* Image Container with Fixed Aspect Ratio */}
        <div className="relative pt-[56.25%]"> {/* 16:9 Aspect Ratio */}
          <img
            src={image}
            alt={formattedTitle}
            onError={() => setImageError(true)}
            className={`absolute inset-0 w-full h-full object-contain bg-gray-50 ${
              imageError ? 'opacity-50' : ''
            }`}
          />
          {imageError && (
            <div className="absolute inset-0 flex items-center justify-center text-gray-400">
              Failed to load image
            </div>
          )}
        </div>

        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{formattedTitle}</h3>
          <p className="text-gray-600 text-sm mb-4">{description}</p>
          
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">{date}</span>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => onLike(id)}
                disabled={isUpdating}
                className={`flex items-center space-x-1 ${
                  isLiked
                    ? 'text-red-500'
                    : 'text-gray-600 hover:text-red-500'
                } transition-colors duration-200 ${
                  isUpdating ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                <ThumbsUp className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
                <span>{likes}</span>
              </button>
              <button 
                onClick={() => setIsShareModalOpen(true)}
                className="text-gray-600 hover:text-red-500 transition-colors duration-200"
              >
                <Share2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </article>

      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        postTitle={formattedTitle}
        postUrl={postUrl}
      />
    </>
  );
}