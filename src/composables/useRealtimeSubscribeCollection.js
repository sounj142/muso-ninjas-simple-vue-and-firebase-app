import { ref, onUnmounted } from 'vue';
import { projectFirestore } from '@/firebase/config';

export default function useRealtimeSubscribeCollection(
  error,
  collectionName,
  orderBy = 'createdAt',
  orderDirection = 'desc',
  isKeepDataFunc = (item) => item.createdAt
) {
  const items = ref(null);

  const dataResource = projectFirestore
    .collection(collectionName)
    .orderBy(orderBy, orderDirection);

  const unsubscribe = dataResource.onSnapshot(
    (res) => {
      items.value = [];
      if (res.docs?.length) {
        const result = [];
        res.docs.forEach((p) => {
          const obj = p.data();
          obj.id = p.id;
          if (!isKeepDataFunc || isKeepDataFunc(obj)) {
            result.push(obj);
          }
        });
        items.value = result;
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
