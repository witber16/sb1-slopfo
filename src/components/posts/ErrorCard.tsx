import React, { useState } from 'react';
import { Share2, ThumbsUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import ShareModal from './ShareModal';

interface ErrorCardProps {
  id: string;
  image: string;
  title: string;
  description: string;
  date: string;
  likes: number;
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
  isLiked,
  onLike,
  isUpdating
}: ErrorCardProps) {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [imageError, setImageError] = useState(false);

  const formattedTitle = title
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  const postUrl = `${window.location.origin}/post/${id}`;

  return (
    <>
      <article className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all duration-300 h-full flex flex-col">
        <Link to={`/post/${id}`} className="block relative pt-[56.25%] overflow-hidden bg-gray-100">
          <img
            src={image}
            alt={formattedTitle}
            onError={() => setImageError(true)}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            style={{ opacity: imageError ? 0.5 : 1 }}
          />
          {imageError && (
            <div className="absolute inset-0 flex items-center justify-center text-secondary-400">
              Failed to load image
            </div>
          )}
        </Link>

        <div className="p-6 flex-1 flex flex-col">
          <Link to={`/post/${id}`}>
            <h3 className="text-lg font-semibold text-secondary-900 mb-2 hover:text-primary-500 transition-colors">
              {formattedTitle}
            </h3>
          </Link>
          <p className="text-secondary-600 text-sm mb-4 flex-1">{description}</p>
          
          <div className="flex items-center justify-between text-sm mt-auto pt-4 border-t border-secondary-100">
            <span className="text-secondary-500">{date}</span>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => onLike(id)}
                disabled={isUpdating}
                className={`flex items-center space-x-1 ${
                  isLiked
                    ? 'text-primary-500'
                    : 'text-secondary-500 hover:text-primary-500'
                } transition-colors duration-200 ${
                  isUpdating ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                <ThumbsUp className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
                <span>{likes}</span>
              </button>
              <button 
                onClick={() => setIsShareModalOpen(true)}
                className="text-secondary-500 hover:text-primary-500 transition-colors duration-200"
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
