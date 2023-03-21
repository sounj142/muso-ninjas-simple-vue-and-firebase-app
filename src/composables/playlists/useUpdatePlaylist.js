import useUpdateCollectionItem from '../useUpdateCollectionItem';

export default function useUpdatePlaylist(isLoading, error) {
  const { updateItem } = useUpdateCollectionItem(isLoading, error, 'playlists');

  return { updatePlaylist: updateItem };
}
