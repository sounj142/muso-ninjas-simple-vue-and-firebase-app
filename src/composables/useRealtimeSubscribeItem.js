import { ref, onUnmounted } from 'vue';
import { projectFirestore } from '@/firebase/config';

export default function useRealtimeSubscribeItem(
  error,
  collectionName,
  id,
  notFoundMessage,
  ignoreLocalData = true
) {
  const item = ref(null);

  const dataResource = projectFirestore.collection(collectionName).doc(id);

  const unsubscribe = dataResource.onSnapshot(
    (res) => {
      if (ignoreLocalData && res.metadata.hasPendingWrites) {
        // ignore if data is local
        return;
      }

      if (res.exists) {
        item.value = res.data();
        item.value.id = res.id;
        error.value = null;
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
