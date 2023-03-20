import { projectFirestore } from '@/firebase/config';
import { tryCatch } from './helper';

export default function useDeleteCollectionItem(
  isLoading,
  error,
  collectionName
) {
  const deleteItem = (id) => {
    return tryCatch(isLoading, error, async () => {
      const dataResource = projectFirestore.collection(collectionName).doc(id);
      await dataResource.delete();
    });
  };

  return { deleteItem };
}
