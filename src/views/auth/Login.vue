<template>
  <form @submit.prevent="submitHandler">
    <h3>Log In</h3>
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
      Log in
    </button>
  </form>
</template>

<script>
import { ref } from 'vue';
import useLogin from '@/composables/auth/useLogin';

export default {
  setup() {
    const formData = ref({
      email: '',
      password: '',
    });
    const isLoading = ref(false);
    const error = ref(null);

    const { logIn } = useLogin(isLoading, error);
    const submitHandler = () => logIn(formData.value);

    return { formData, isLoading, error, submitHandler };
  },
};
</script>
