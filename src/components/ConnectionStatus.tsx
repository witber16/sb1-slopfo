import React, { useState, useEffect } from 'react';
import { enableNetwork, disableNetwork } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Wifi, WifiOff } from 'lucide-react';

export default function ConnectionStatus() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showStatus, setShowStatus] = useState(false);
  const [isReconnecting, setIsReconnecting] = useState(false);

  useEffect(() => {
    const handleOnline = async () => {
      setIsReconnecting(true);
      try {
        await enableNetwork(db);
        setIsOnline(true);
        setShowStatus(true);
        setTimeout(() => {
          setShowStatus(false);
          setIsReconnecting(false);
        }, 3000);
      } catch (error) {
        console.error('Failed to enable network:', error);
        setIsReconnecting(false);
      }
    };

    const handleOffline = async () => {
      try {
        await disableNetwork(db);
        setIsOnline(false);
        setShowStatus(true);
      } catch (error) {
        console.error('Failed to disable network:', error);
      }
    };

    // Initial check
    setIsOnline(navigator.onLine);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (!showStatus) return null;

  return (
    <div 
      className={`fixed bottom-24 right-6 p-4 rounded-lg shadow-lg transition-all duration-300 ${
        isOnline ? 'bg-green-500' : 'bg-red-500'
      }`}
    >
      <div className="flex items-center space-x-2 text-white">
        {isOnline ? (
          <>
            <Wifi className={`h-5 w-5 ${isReconnecting ? 'animate-pulse' : ''}`} />
            <span>{isReconnecting ? 'Reconnecting...' : 'Back online'}</span>
          </>
        ) : (
          <>
            <WifiOff className="h-5 w-5" />
            <span>You're offline</span>
          </>
        )}
      </div>
    </div>
  );
}