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
import { useRouter } from 'vue-router';
import useCreatePlaylist from '@/composables/playlists/useCreatePlaylist';

export default {
  setup() {
    const router = useRouter();

    const formData = ref({
      title: '',
      description: '',
      image: null,
    });
    const isLoading = ref(false);
    const error = ref(null);

    const handleFileSelected = (e) => {
      const selectedFile = e.target.files && e.target.files[0];
      formData.value.image = selectedFile || null;
    };

    const { createPlaylist } = useCreatePlaylist(isLoading, error);

    const submitHandler = async () => {
      if (!formData.value.image) return;

      const id = await createPlaylist(formData.value);
      if (!error.value) {
        router.push({ name: 'PlaylistDetail', params: { id: id } });
      }
    };

    return { formData, isLoading, error, submitHandler, handleFileSelected };
  },
};
</script>
