import React from 'react';
import ErrorCard from './ErrorCard';
import { Post } from '../../types/Post';
import { motion } from 'framer-motion';

interface PostGridProps {
  posts: Post[];
  likedPosts: Set<string>;
  onLike: (id: string) => void;
  isUpdating: boolean;
}

export default function PostGrid({ posts, likedPosts, onLike, isUpdating }: PostGridProps) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {posts.map((post, index) => (
        <motion.div
          key={post.id}
          variants={item}
          className="h-full"
          style={{ 
            viewTransitionName: `post-${post.id}`,
          }}
        >
          <ErrorCard
            {...post}
            isLiked={likedPosts.has(post.id!)}
            onLike={onLike}
            isUpdating={isUpdating}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}
