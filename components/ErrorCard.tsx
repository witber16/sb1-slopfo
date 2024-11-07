import React, { useState } from 'react';
import { Share2, ThumbsUp } from 'lucide-react';
import { doc, updateDoc, increment } from 'firebase/firestore';
import { db } from '../lib/firebase';

interface ErrorCardProps {
  id?: string;
  image: string;
  title: string;
  description: string;
  date: string;
  likes: number;
  comments: number;
}

export default function ErrorCard({ id, image, title, description, date, likes }: ErrorCardProps) {
  const [isLiking, setIsLiking] = useState(false);
  const [localLikes, setLocalLikes] = useState(likes);

  const handleLike = async () => {
    if (!id || isLiking) return;

    setIsLiking(true);
    try {
      const postRef = doc(db, 'posts', id);
      await updateDoc(postRef, {
        likes: increment(1)
      });
      setLocalLikes(prev => prev + 1);
    } catch (error) {
      console.error('Error updating likes:', error);
    } finally {
      setIsLiking(false);
    }
  };

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
              onClick={handleLike}
              disabled={isLiking}
              className={`flex items-center space-x-1 ${
                isLiking ? 'text-gray-400' : 'text-gray-600 hover:text-red-500'
              } transition-colors duration-200`}
            >
              <ThumbsUp className={`h-4 w-4 ${isLiking ? 'animate-pulse' : ''}`} />
              <span>{localLikes}</span>
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