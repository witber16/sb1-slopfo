import React, { useState } from 'react';
import ErrorCard from '../components/ErrorCard';
import UploadButton from '../components/UploadButton';
import UploadModal from '../components/UploadModal';
import ConnectionStatus from '../components/ConnectionStatus';
import { usePosts } from '../hooks/usePosts';
import { useLikes } from '../hooks/useLikes';
import { AlertTriangle, TrendingUp } from 'lucide-react';

export default function Home() {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const { posts, loading, error } = usePosts();
  const { likedPosts, toggleLike, isUpdating } = useLikes();

  // Get the latest post for the featured section
  const latestPost = posts[0];

  return (
    <>
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-white">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Welcome to Ironic JD
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
                A website dedicated to sharing funny or frustrating job description errors. Bringing humor, transparency, and realism to the job market. 
              </p>
        
            </div>
            <div className="space-x-4">
              <button 
                onClick={() => setIsUploadModalOpen(true)}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Share Your Find
              </button>
              <a 
                href="#posts"
                className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                View Posts
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Reality Check Card */}
      <section className="w-full py-12 bg-gray-50">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-sm p-8">
            <div className="flex items-center space-x-2 mb-4">
              <AlertTriangle className="h-6 w-6 text-yellow-500" />
              <h2 className="text-xl font-semibold">Reality Check</h2>
            </div>
            <div className="space-y-4">
              <div className="aspect-video relative overflow-hidden rounded-lg bg-gray-100">
                <img
                  src="https://png.pngtree.com/png-clipart/20240621/original/pngtree-cat-with-glasses-meme-sticker-tshirt-illustration-png-image_15380701.png"
                  alt="A cat with glassess meme about to reveal the irony"
                  className="object-cover w-full h-full"
                />
              </div>
              <h3 className="text-lg font-semibold">Warning: Brutal Honesty Ahead</h3>
              <p className="text-gray-600">
                Our content may contain traces of sarcasm, unfiltered truths, and the 
                occasional existential crisis. Proceed with a sense of humor.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Irony Section */}
      <section className="w-full py-12 bg-white">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center space-x-2 mb-8">
              <TrendingUp className="h-6 w-6 text-red-500" />
              <h2 className="text-2xl font-bold">Spotlight</h2>
            </div>
            
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500" />
              </div>
            ) : error ? (
              <div className="text-center text-red-500">{error}</div>
            ) : latestPost ? (
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <img
                  src={latestPost.image}
                  alt={latestPost.title}
                  className="w-full h-96 object-cover"
                />
                <div className="p-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{latestPost.title}</h3>
                  <p className="text-gray-600 mb-4">{latestPost.description}</p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">{latestPost.date}</span>
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() => latestPost.id && toggleLike(latestPost.id)}
                        disabled={isUpdating}
                        className={`flex items-center space-x-1 ${
                          latestPost.id && likedPosts.has(latestPost.id)
                            ? 'text-red-500'
                            : 'text-gray-600 hover:text-red-500'
                        } transition-colors duration-200`}
                      >
                        <span>{latestPost.likes}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-500">No posts yet. Be the first to share!</div>
            )}
          </div>
        </div>
      </section>

      {/* All Ironic Section */}
      <main id="posts" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-2xl font-bold mb-8">All Ironic Find</h2>
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
      <ConnectionStatus />
    </>
  );
}
