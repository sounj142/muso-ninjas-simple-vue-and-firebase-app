import { projectFirestore } from '@/firebase/config';
import { tryCatch } from './helper';

export default function useUpdateCollectionItem(
  isLoading,
  error,
  collectionName
) {
  const updateItem = (id, data) => {
    return tryCatch(isLoading, error, async () => {
      const dataResource = projectFirestore.collection(collectionName).doc(id);
      await dataResource.update(data);
    });
  };

  return { updateItem };
}
