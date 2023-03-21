<template>
  <div class="user-playlists">
    <h2>My Playlists</h2>

    <div class="error" v-if="error">{{ error }}</div>

    <PlaylistList v-else :playlists="playlists" />
  </div>
</template>

<script>
import { ref } from 'vue';
import PlaylistList from '@/components/PlaylistList.vue';
import useGetRealtimePlaylists from '@/composables/playlists/useGetRealtimePlaylists';
import { useStore } from 'vuex';

export default {
  components: { PlaylistList },
  setup() {
    const store = useStore();
    const error = ref(null);

    const { playlists } = useGetRealtimePlaylists(
      error,
      store.state.user.currentUser.uid
    );

    return { playlists, error };
  },
};
</script>
