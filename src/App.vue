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
import useRouterAuthentication from '@/composables/auth/useRouterAuthentication';
import FullScreenLoading from '@/components/FullScreenLoading.vue';
import Navbar from '@/components/Navbar.vue';

export default {
  components: { FullScreenLoading, Navbar },
  setup() {
    useRouterAuthentication();
    return {};
  },
};
</script>
