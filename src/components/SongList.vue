<template>
  <div class="song-list">
    <div v-if="!playlist.songs.length">
      No songs have been added to this playlist yet.
    </div>

    <div v-for="song in playlist.songs" :key="song.id" class="single-song">
      <div class="details">
        <h3>{{ song.title }}</h3>
        <p>{{ song.artist }}</p>
      </div>

      <div class="error" v-show="deletingId === song.id && error">
        {{ error }}
      </div>
      <button
        v-if="isOwnership"
        @click="deleteSongHandler(song.id)"
        :disabled="deletingId === song.id && isDeletingSong"
      >
        <i
          class="fa fa-spinner fa-spin"
          v-show="deletingId === song.id && isDeletingSong"
        ></i>
        Delete
      </button>
    </div>

    <AddSong :playlist="playlist" v-if="isOwnership" />
  </div>
</template>

<script>
import { ref } from 'vue';
import AddSong from '@/components/AddSong.vue';
import useUpdatePlaylist from '@/composables/playlists/useUpdatePlaylist';

export default {
  components: { AddSong },
  props: ['playlist', 'isOwnership'],
  setup(props) {
    const isDeletingSong = ref(false);
    const error = ref(null);
    const deletingId = ref(null);

    const { updatePlaylist } = useUpdatePlaylist(isDeletingSong, error);

    const deleteSongHandler = async (id) => {
      deletingId.value = id;
      await updatePlaylist(props.playlist.id, {
        songs: props.playlist.songs.filter((s) => s.id !== id),
      });
      if (!error.value) {
        deletingId.value = null;
      }
    };

    return {
      isDeletingSong,
      error,
      deletingId,
      deleteSongHandler,
    };
  },
};
</script>

<style scoped>
.single-song {
  padding: 10px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px dashed var(--secondary);
  margin-bottom: 20px;
}
</style>
