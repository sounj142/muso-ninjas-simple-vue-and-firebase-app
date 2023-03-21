import { watchEffect } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';

export default function useRouterAuthentication() {
  const store = useStore();
  const route = useRoute();
  const router = useRouter();

  watchEffect(() => {
    // console.log('Welcome vue watchEffect ran');
    const currentUser = store.state.user.currentUser;
    if (currentUser === undefined) {
      return;
    }
    if (route.matched.some((record) => record.meta.requiresAuth)) {
      if (!currentUser) {
        router.push({ name: 'Login' });
      }
    } else if (route.matched.some((record) => record.meta.requiresGuest)) {
      if (currentUser) {
        router.push({ name: 'UserPlaylist' });
      }
    }
  });
}
