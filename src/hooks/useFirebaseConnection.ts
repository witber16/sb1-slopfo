import { useState, useEffect } from 'react';
import { getFirestore, onSnapshotsInSync } from 'firebase/firestore';
import { db } from '../lib/firebase';

export function useFirebaseConnection() {
  const [isOnline, setIsOnline] = useState(true);
  const [isSynced, setIsSynced] = useState(false);

  useEffect(() => {
    // Listen for online/offline status
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Listen for Firestore sync status
    const unsubscribe = onSnapshotsInSync(() => {
      setIsSynced(true);
    });

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      unsubscribe();
    };
  }, []);

  return { isOnline, isSynced };
}