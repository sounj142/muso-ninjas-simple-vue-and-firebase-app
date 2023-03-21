import useRealtimeSubscribeCollection from '../useRealtimeSubscribeCollection';

export default function useGetRealtimePlaylist(error, userId = undefined) {
  const whereFunc = userId
    ? (collections) => collections.where('uid', '==', userId)
    : undefined;
  const { items } = useRealtimeSubscribeCollection(
    error,
    'playlists',
    whereFunc
  );

  return { playlists: items };
}
