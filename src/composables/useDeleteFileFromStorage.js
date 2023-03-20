import { projectStorage } from '@/firebase/config';
import { tryCatch } from './helper';

export default function useDeleteFileFromStorage(isLoading, error) {
  const deleteFile = (fileUri) => {
    return tryCatch(isLoading, error, async () => {
      const dataResource = projectStorage.refFromURL(fileUri);
      await dataResource.delete();
    });
  };

  return { deleteFile };
}
