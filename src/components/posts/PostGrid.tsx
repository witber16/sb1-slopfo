import React from 'react';
import ErrorCard from './ErrorCard';
import { Post } from '../../types/Post';

interface PostGridProps {
  posts: Post[];
  likedPosts: Set<string>;
  onLike: (id: string) => void;
  isUpdating: boolean;
}

export default function PostGrid({ posts, likedPosts, onLike, isUpdating }: PostGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post) => (
        <div
          key={post.id}
          className="h-full transform transition-transform duration-200 hover:-translate-y-1"
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
        </div>
      ))}
    </div>
  );
}
