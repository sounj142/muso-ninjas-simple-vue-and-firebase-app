import { useStore } from 'vuex';
import useCreateCollectionItem from '../useCreateCollectionItem';

export default function useCreatePlaylist(isLoading, error) {
  const { createItem } = useCreateCollectionItem(isLoading, error, 'playlists');
  const store = useStore();

  const createPlaylist = (data) => {
    const user = store.state.user.currentUser;
    const newData = {
      ...data,
      uid: user.uid,
      displayName: user.displayName,
      songs: [],
    };
    return createItem(newData);
  };

  return { createPlaylist };
}
