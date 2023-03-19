<template>
  <form @submit.prevent="submitHandler">
    <input
      type="text"
      required
      placeholder="Display name"
      v-model="formData.displayName"
    />

    <input type="email" required placeholder="Email" v-model="formData.email" />

    <input
      type="password"
      required
      placeholder="Password"
      v-model="formData.password"
    />

    <div class="error" v-show="error">{{ error }}</div>

    <button :disabled="isLoading">
      <i class="fa fa-spinner fa-spin" v-show="isLoading"></i>
      Sign Up
    </button>
  </form>
</template>

<script>
import { ref } from 'vue';
import userSignup from '@/composables/auth/userSignup';

export default {
  setup() {
    const formData = ref({
      displayName: '',
      email: '',
      password: '',
    });
    const isLoading = ref(false);
    const error = ref(null);

    const { signUp } = userSignup(isLoading, error);

    const submitHandler = () => signUp(formData.value);

    return { formData, isLoading, error, submitHandler };
  },
};
</script>
