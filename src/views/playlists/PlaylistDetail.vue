<template>
  <div class="error" v-if="error">{{ error }}</div>

  <div v-if="!error && playlist" class="playlist-details">
    <!-- playlist information -->
    <div class="playlist-info">
      <div class="cover">
        <img :src="playlist.coverImageUrl" alt="Cover image" />
      </div>

      <h2>{{ playlist.title }}</h2>
      <p class="username">Created by {{ playlist.displayName }}</p>
      <p class="description">{{ playlist.description }}</p>

      <div class="error" v-show="deleteError">{{ deleteError }}</div>
      <button
        :disabled="isDeletingPlaylist"
        type="button"
        v-if="isOwnership"
        @click="deletePlayListHandler"
      >
        <i class="fa fa-spinner fa-spin" v-show="isDeletingPlaylist"></i>
        Delete Playlist
      </button>
    </div>

    <SongList :playlist="playlist" :isOwnership="isOwnership" />
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import useGetRealtimePlaylistById from '@/composables/playlists/useGetRealtimePlaylistById';
import useDeletePlaylist from '@/composables/playlists/useDeletePlaylist';
import SongList from '@/components/SongList.vue';

export default {
  components: { SongList },
  props: ['id'],
  setup(props) {
    const router = useRouter();
    const store = useStore();
    const loadingError = ref(null);

    const isDeletingPlaylist = ref(false);
    const deleteError = ref(null);

    const { playlist } = useGetRealtimePlaylistById(loadingError, props.id);
    const { deletePlaylist } = useDeletePlaylist(
      isDeletingPlaylist,
      deleteError
    );

    const deletePlayListHandler = async () => {
      await deletePlaylist(playlist.value);
      if (!deleteError.value) {
        router.push({ name: 'Home' });
      }
    };

    const isOwnership = computed(
      () =>
        playlist.value &&
        store.state.user.currentUser?.uid === playlist.value.uid
    );

    return {
      playlist,
      error: loadingError,
      isOwnership,
      deleteError,
      isDeletingPlaylist,
      deletePlayListHandler,
    };
  },
};
</script>

<style scoped>
.playlist-details {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 80px;
}
.cover {
  overflow: hidden;
  border-radius: 20px;
  position: relative;
  padding: 160px;
}
.cover img {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  min-width: 100%;
  min-height: 100%;
  max-width: 200%;
  max-height: 200%;
}
.playlist-info {
  text-align: center;
}
.playlist-info h2 {
  text-transform: capitalize;
  font-size: 28px;
  margin-top: 20px;
}
.playlist-info p {
  margin-bottom: 20px;
}
.username {
  color: #999;
}
.description {
  text-align: left;
}
</style>
