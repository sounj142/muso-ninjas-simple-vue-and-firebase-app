import { projectFirestore, serverTimestamp } from '@/firebase/config';

export default function useCreateCollectionItem(isLoading, error, collectionName) {
  const createItem = async (data) => {
    isLoading.value = true;
    error.value = null;
    try {
      const newData = {
        ...data,
        createdAt: serverTimestamp(),
      };
      const dataResource = projectFirestore.collection(collectionName);
      const res = await dataResource.add(newData);
      return res.id;
    } catch (err) {
      console.log(err);
      error.value = err.message;
    } finally {
      isLoading.value = false;
    }
  };

  return { createItem };
}
