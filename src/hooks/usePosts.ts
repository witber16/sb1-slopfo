import { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot, DocumentData } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Post } from '../types/Post';

export function usePosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    try {
      const q = query(
        collection(db, 'posts'),
        orderBy('createdAt', 'desc')
      );

      const unsubscribe = onSnapshot(
        q,
        { includeMetadataChanges: true },
        (snapshot) => {
          try {
            // Check if the snapshot is from cache
            const source = snapshot.metadata.fromCache ? 'cache' : 'server';
            console.log(`Data came from ${source}`);

            const newPosts = snapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data()
            })) as Post[];

            setPosts(newPosts);
            setLoading(false);
            setError(null);
          } catch (err) {
            console.error('Error processing posts:', err);
            setError('Error processing data');
            setLoading(false);
          }
        },
        (err) => {
          console.error('Firestore subscription error:', err);
          setError('Unable to load posts. Please check your connection.');
          setLoading(false);
        }
      );

      return () => unsubscribe();
    } catch (err) {
      console.error('Error setting up posts subscription:', err);
      setError('Failed to initialize posts feed');
      setLoading(false);
    }
  }, []);

  return { posts, loading, error };
}