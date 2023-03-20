import useDeleteCollectionItem from '../useDeleteCollectionItem';
import useDeleteFileFromStorage from '../useDeleteFileFromStorage';

export default function useDeletePlaylist(isLoading, error) {
  const { deleteItem } = useDeleteCollectionItem(isLoading, error, 'playlists');
  const { deleteFile } = useDeleteFileFromStorage(isLoading, error);

  const deletePlaylist = async (playlist) => {
    await deleteItem(playlist.id);

    if (!error.value) {
      await deleteFile(playlist.coverImageUrl);
    }
  };

  return { deletePlaylist };
}
