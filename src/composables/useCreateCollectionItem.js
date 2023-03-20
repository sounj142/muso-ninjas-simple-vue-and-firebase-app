import { projectFirestore, serverTimestamp } from '@/firebase/config';
import { tryCatch } from './helper';

export default function useCreateCollectionItem(
  isLoading,
  error,
  collectionName
) {
  const createItem = (data) => {
    return tryCatch(isLoading, error, async () => {
      const newData = {
        ...data,
        createdAt: serverTimestamp(),
      };
      const dataResource = projectFirestore.collection(collectionName);
      const res = await dataResource.add(newData);
      return res.id;
    });
  };

  return { createItem };
}
