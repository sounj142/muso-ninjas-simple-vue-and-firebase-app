import useRealtimeSubscribeCollection from '../useRealtimeSubscribeCollection';

export default function useGetRealtimePlaylist(error) {
  const { items } = useRealtimeSubscribeCollection(error, 'playlists');

  return { playlists: items };
}
