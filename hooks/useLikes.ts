import { useState } from 'react';
import { doc, updateDoc, increment } from 'firebase/firestore';
import { db } from '../lib/firebase';

export function useLikes() {
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());
  const [isUpdating, setIsUpdating] = useState(false);

  const toggleLike = async (postId: string) => {
    if (isUpdating) return;
    
    setIsUpdating(true);
    const isLiked = likedPosts.has(postId);
    
    try {
      const postRef = doc(db, 'posts', postId);
      await updateDoc(postRef, {
        likes: increment(isLiked ? -1 : 1)
      });
      
      setLikedPosts(prev => {
        const newSet = new Set(prev);
        if (isLiked) {
          newSet.delete(postId);
        } else {
          newSet.add(postId);
        }
        return newSet;
      });
    } catch (error) {
      console.error('Error updating like:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  return {
    likedPosts,
    toggleLike,
    isUpdating
  };
}