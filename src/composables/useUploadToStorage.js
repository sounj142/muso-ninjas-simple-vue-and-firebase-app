import { projectStorage } from '@/firebase/config';
import { tryCatch } from './helper';

export default function useUploadToStorage(isLoading, error) {
  const uploadFile = (file, storagePath) => {
    return tryCatch(isLoading, error, async () => {
      const dataResource = projectStorage.ref(storagePath);
      const res = await dataResource.put(file);
      return await res.ref.getDownloadURL();
    });
  };

  return { uploadFile };
}
