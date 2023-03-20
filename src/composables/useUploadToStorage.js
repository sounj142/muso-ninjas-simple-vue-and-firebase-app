import { projectStorage } from '@/firebase/config';

export default function useUploadToStorage(isLoading, error) {
  const uploadFile = async (file, storagePath) => {
    isLoading.value = true;
    error.value = null;
    try {
      const dataResource = projectStorage.ref(storagePath);
      const res = await dataResource.put(file);
      return await res.ref.getDownloadURL();
    } catch (err) {
      console.log(err);
      error.value = err.message;
    } finally {
      isLoading.value = false;
    }
  };

  return { uploadFile };
}
