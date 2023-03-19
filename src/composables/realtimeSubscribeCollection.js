import { ref, onUnmounted } from 'vue';
import { projectFirestore } from '@/firebase/config';

export default function realtimeSubscribeCollection(
  error,
  collectionName,
  orderBy = 'createdAt',
  orderDirection = 'asc',
  localDataFilterFunc = (item) => item.createdAt
) {
  const items = ref(null);

  const dataResource = projectFirestore
    .collection(collectionName)
    .orderBy(orderBy, orderDirection);

  const unsubscribe = dataResource.onSnapshot(
    (res) => {
      const result = [];
      if (res.docs?.length) {
        res.docs.forEach((p) => {
          const item = p.data();
          item.id = p.id;
          if (!localDataFilterFunc || localDataFilterFunc(item)) {
            result.push(item);
          }
        });
      }
      error.value = null;
      items.value = result;
    },
    (err) => {
      error.value = err.message;
      console.log(err);
    }
  );

  onUnmounted(unsubscribe);

  return { items: items };
}
