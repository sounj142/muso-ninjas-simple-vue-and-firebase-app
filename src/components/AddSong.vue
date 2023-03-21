<template>
  <div class="add-song">
    <button type="button" @click="showForm = true" v-show="!showForm">
      Add Songs
    </button>

    <form @submit.prevent="submitHandler" v-show="showForm">
      <h4>Add a New Song</h4>

      <input
        type="text"
        required
        placeholder="Artist"
        v-model="formData.artist"
      />

      <input
        type="text"
        required
        placeholder="Song title"
        v-model="formData.title"
      />

      <div class="error" v-show="error">{{ error }}</div>

      <button :disabled="isLoading">
        <i class="fa fa-spinner fa-spin" v-show="isLoading"></i>
        Add
      </button>
    </form>
  </div>
</template>

<script>
import { v4 as uuidv4 } from 'uuid';
import { ref } from 'vue';
import useUpdatePlaylist from '@/composables/playlists/useUpdatePlaylist';

export default {
  props: ['playlist'],
  setup(props) {
    const formData = ref({
      title: '',
      artist: '',
    });
    const showForm = ref(false);
    const isLoading = ref(false);
    const error = ref(null);

    const { updatePlaylist } = useUpdatePlaylist(isLoading, error);

    const submitHandler = async () => {
      const newSong = {
        title: formData.value.title,
        artist: formData.value.artist,
        id: uuidv4(),
      };

      await updatePlaylist(props.playlist.id, {
        songs: [...props.playlist.songs, newSong],
      });
      if (!error.value) {
        formData.value.title = '';
        formData.value.artist = '';
        // showForm.value = false;
      }
    };

    return { formData, isLoading, error, showForm, submitHandler };
  },
};
</script>

<style scoped>
.add-song {
  text-align: center;
  margin-top: 40px;
}
form {
  max-width: 100%;
  text-align: left;
}
</style>
