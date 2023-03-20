import { ref, onUnmounted } from 'vue';
import { projectFirestore } from '@/firebase/config';

export default function useRealtimeSubscribeCollection(
  error,
  collectionName,
  orderBy = 'createdAt',
  orderDirection = 'desc',
  ignoreLocalData = true
) {
  const items = ref(null);

  const dataResource = projectFirestore
    .collection(collectionName)
    .orderBy(orderBy, orderDirection);

  const unsubscribe = dataResource.onSnapshot(
    (res) => {
      if (ignoreLocalData && res.metadata.hasPendingWrites) {
        // ignore if data is local
        return;
      }
      items.value = [];
      if (res.docs?.length) {
        items.value = res.docs.map((p) => {
          const item = p.data();
          item.id = p.id;
          return item;
        });
      }
      error.value = null;
    },
    (err) => {
      error.value = err.message;
      console.log(err);
    }
  );

  onUnmounted(unsubscribe);

  return { items: items };
}
