import { v4 as uuidv4 } from 'uuid';
import { useStore } from 'vuex';
import useUploadToStorage from '@/composables/useUploadToStorage';

export default function useUploadPlaylistImage(isLoading, error) {
  const { uploadFile } = useUploadToStorage(isLoading, error);
  const store = useStore();

  const uploadImage = (file) => {
    const user = store.state.user.currentUser;
    const storagePath = `covers/${user.uid}/${uuidv4()}`;
    return uploadFile(file, storagePath);
  };

  return { uploadImage };
}
