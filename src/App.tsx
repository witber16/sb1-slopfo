import React from 'react';
import Header from './components/Header';
import ErrorCard from './components/ErrorCard';
import UploadButton from './components/UploadButton';
import UploadModal from './components/UploadModal';
import { usePosts } from './hooks/usePosts';
import { useLikes } from './hooks/useLikes';

function App() {
  const [isUploadModalOpen, setIsUploadModalOpen] = React.useState(false);
  const { posts, loading, error } = usePosts();
  const { likedPosts, toggleLike, isUpdating } = useLikes();

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500" />
          </div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <ErrorCard
                key={post.id}
                {...post}
                isLiked={likedPosts.has(post.id!)}
                onLike={toggleLike}
                isUpdating={isUpdating}
              />
            ))}
          </div>
        )}
      </main>

      <UploadButton onClick={() => setIsUploadModalOpen(true)} />
      <UploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
      />
    </div>
  );
}

export default App;