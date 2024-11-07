import React from 'react';
import { Share2, ThumbsUp } from 'lucide-react';

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
  return (
    <article className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300">
      <img
        src={image}
        alt={title}
        className="w-full h-64 object-cover"
      />
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
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
            <button className="text-gray-600 hover:text-red-500 transition-colors duration-200">
              <Share2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}