<template>
  <form @submit.prevent="submitHandler" class="playlist-form">
    <h4>Create new Playlist</h4>

    <input type="text" required placeholder="Title" v-model="formData.title" />

    <textarea
      required
      placeholder="Description..."
      v-model="formData.description"
    ></textarea>

    <label>Upload playlist cover image</label>
    <input
      type="file"
      accept="image/png, image/jpeg"
      @change="handleFileSelected"
    />

    <div class="error" v-show="error">{{ error }}</div>

    <button :disabled="isLoading">
      <i class="fa fa-spinner fa-spin" v-show="isLoading"></i>
      Create
    </button>
  </form>
</template>

<script>
import { ref } from 'vue';
import useUploadPlaylistImage from '@/composables/playlists/useUploadPlaylistImage';
import useCreatePlaylist from '@/composables/playlists/useCreatePlaylist';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const router = useRouter();

    const formData = ref({
      title: '',
      description: '',
    });
    const file = ref(null);
    const isLoading = ref(false);
    const error = ref(null);

    const handleFileSelected = (e) => {
      const selectedFile = e.target.files && e.target.files[0];
      file.value = selectedFile || null;
    };

    const { uploadImage } = useUploadPlaylistImage(isLoading, error);
    const { createPlaylist } = useCreatePlaylist(isLoading, error);

    const submitHandler = async () => {
      if (!file.value) return;

      const coverImageUrl = await uploadImage(file.value);
      if (error.value) return;

      await createPlaylist({
        ...formData.value,
        coverImageUrl: coverImageUrl,
      });
      if (!error.value) {
        router.push({ name: 'Home' });
      }
    };

    return { formData, isLoading, error, submitHandler, handleFileSelected };
  },
};
</script>
