<template>
  <div class="home">
    <div class="error" v-if="error">{{ error }}</div>

    <PlaylistList v-else :playlists="playlists" />
  </div>
</template>

<script>
import { ref } from 'vue';
import PlaylistList from '@/components/PlaylistList.vue';
import useGetRealtimePlaylists from '@/composables/playlists/useGetRealtimePlaylists';

export default {
  components: { PlaylistList },
  setup() {
    const error = ref(null);
    const { playlists } = useGetRealtimePlaylists(error);

    return { playlists, error };
  },
};
</script>
