import { projectFirestore, serverTimestamp } from '@/firebase/config';

export default function createCollectionItem(isLoading, error, collectionName) {
  const createItem = async (data) => {
    try {
      isLoading.value = true;
      error.value = null;

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
