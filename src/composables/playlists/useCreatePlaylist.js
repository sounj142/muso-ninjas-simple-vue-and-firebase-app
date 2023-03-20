import { useStore } from 'vuex';
import useCreateCollectionItem from '@/composables/useCreateCollectionItem';
import useUploadPlaylistImage from '@/composables/playlists/useUploadPlaylistImage';

export default function useCreatePlaylist(isLoading, error) {
  const { uploadImage } = useUploadPlaylistImage(isLoading, error);
  const { createItem } = useCreateCollectionItem(isLoading, error, 'playlists');
  const store = useStore();

  const createPlaylist = async (data) => {
    const coverImageUrl = await uploadImage(data.image);
    if (error.value) return;

    const user = store.state.user.currentUser;
    const newData = {
      title: data.title,
      description: data.description,
      coverImageUrl: coverImageUrl,
      uid: user.uid,
      displayName: user.displayName,
      songs: [],
    };
    return await createItem(newData);
  };

  return { createPlaylist };
}
