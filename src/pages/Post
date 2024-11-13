import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import ErrorCard from '../components/posts/ErrorCard';
import { usePost } from '../hooks/usePost';
import { useLikes } from '../hooks/useLikes';

export default function Post() {
  const { id } = useParams();
  const { post, loading, error } = usePost(id!);
  const { likedPosts, toggleLike, isUpdating } = useLikes();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500" />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-gray-100 p-4">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-sm p-8 text-center">
          <h1 className="text-2xl font-bold text-secondary-900 mb-4">Post Not Found</h1>
          <p className="text-secondary-600 mb-6">
            The post you're looking for might have been removed or doesn't exist.
          </p>
          <Link 
            to="/"
            className="inline-flex items-center space-x-2 text-primary-500 hover:text-primary-600"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Home</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-2xl mx-auto">
        <Link 
          to="/"
          className="inline-flex items-center space-x-2 text-secondary-500 hover:text-primary-500 mb-8"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back to Home</span>
        </Link>

        <ErrorCard
          {...post}
          isLiked={likedPosts.has(post.id!)}
          onLike={toggleLike}
          isUpdating={isUpdating}
        />
      </div>
    </main>
  );
}
