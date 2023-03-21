import { ref, onUnmounted } from 'vue';
import { projectFirestore } from '@/firebase/config';

export default function useRealtimeSubscribeItem(
  error,
  collectionName,
  id,
  notFoundMessage,
  isKeepDataFunc = (item) => item.createdAt
) {
  const item = ref(null);

  const dataResource = projectFirestore.collection(collectionName).doc(id);

  const unsubscribe = dataResource.onSnapshot(
    (res) => {
      if (res.exists) {
        const result = res.data();
        result.id = res.id;
        if (!isKeepDataFunc || isKeepDataFunc(result)) {
          item.value = result;
          error.value = null;
        }
      } else {
        item.value = null;
        error.value = notFoundMessage;
      }
    },
    (err) => {
      error.value = err.message;
      console.log(err);
    }
  );

  onUnmounted(unsubscribe);

  return { item: item };
}
