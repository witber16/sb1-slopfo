// Simplifying to only handle uploads functionality
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../lib/firebase';

export async function uploadAsset(file: File, path: string): Promise<string> {
  const storageRef = ref(storage, path);
  
  const metadata = {
    contentType: file.type,
    customMetadata: {
      originalName: file.name
    }
  };
  
  await uploadBytes(storageRef, file, metadata);
  return getDownloadURL(storageRef);
}
