<template>
  <FullScreenLoading v-if="$store.state.user.currentUser === undefined" />
  <div class="content" v-else>
    <router-view />
  </div>
</template>

<script>
import routerAuthentication from '@/composables/auth/routerAuthentication';
import FullScreenLoading from './components/FullScreenLoading.vue';

export default {
  components: { FullScreenLoading },
  setup() {
    routerAuthentication();
    return {};
  },
};
</script>
