import useRealtimeSubscribeItem from '../useRealtimeSubscribeItem';

export default function useGetRealtimePlaylistById(error, id) {
  const { item } = useRealtimeSubscribeItem(
    error,
    'playlists',
    id,
    'Playlist not found.'
  );

  return { playlist: item };
}
