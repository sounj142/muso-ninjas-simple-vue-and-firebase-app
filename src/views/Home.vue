<template>
  <div class="home">
    <div class="error" v-if="error">{{ error }}</div>

    <PlaylistList v-else :playlists="playlists" />
  </div>
</template>

<script>
import { ref } from 'vue';
import PlaylistList from '@/components/PlaylistList.vue';
import useGetRealtimePlaylist from '@/composables/playlists/useGetRealtimePlaylist';

export default {
  components: { PlaylistList },
  setup() {
    const error = ref(null);
    const { playlists } = useGetRealtimePlaylist(error);

    return { playlists, error };
  },
};
</script>
