<template>
  <FullScreenLoading v-if="$store.state.user.currentUser === undefined" />
  <template v-else>
    <Navbar />

    <div class="content">
      <router-view />
    </div>
  </template>
</template>

<script>
import routerAuthentication from '@/composables/auth/routerAuthentication';
import FullScreenLoading from '@/components/FullScreenLoading.vue';
import Navbar from '@/components/Navbar.vue';

export default {
  components: { FullScreenLoading, Navbar },
  setup() {
    routerAuthentication();
    return {};
  },
};
</script>
