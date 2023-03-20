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

    <!-- songs list -->
    <div class="song-list">
      <div v-if="!playlist.songs.length">
        No songs have been added to this playlist yet.
      </div>
      <div v-for="song in playlist.songs" :key="song.id" class="single-song">
        <div class="details">
          <h3>{{ song.title }}</h3>
          <p>{{ song.artist }}</p>
        </div>
        <button v-if="isOwnership" @click="deleteSongHandler(song.id)">
          Delete
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import useGetRealtimePlaylistById from '@/composables/playlists/useGetRealtimePlaylistById';
import useDeletePlaylist from '@/composables/playlists/useDeletePlaylist';

export default {
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
    const deleteSongHandler = async () => {};

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
      deleteSongHandler,
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
.single-song {
  padding: 10px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px dashed var(--secondary);
  margin-bottom: 20px;
}
</style>
