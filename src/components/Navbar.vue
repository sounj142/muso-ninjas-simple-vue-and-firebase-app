<template>
  <div class="navbar">
    <nav>
      <img src="@/assets/ninja.png" alt="Ninjas" />

      <h1>
        <router-link :to="{ name: 'Home' }">Muso Ninjas</router-link>
      </h1>

      <div class="links">
        <template v-if="currentUser">
          <router-link :to="{ name: 'CreatePlaylist' }"
            >Create playlist</router-link
          >
          <router-link :to="{ name: 'UserPlaylist' }">My playlists</router-link>

          <span>Hi, {{ currentUser.displayName }}</span>
          <button @click="logOut" type="button">Logout</button>
        </template>

        <template v-else>
          <router-link :to="{ name: 'Signup' }" class="btn"
            >Sign up</router-link
          >
          <router-link :to="{ name: 'Login' }" class="btn">Log in</router-link>
        </template>
      </div>
    </nav>
  </div>
</template>

<script>
import useLogout from '@/composables/auth/useLogout';
import { computed } from 'vue';
import { useStore } from 'vuex';

export default {
  setup() {
    const store = useStore();

    const currentUser = computed(() => store.state.user.currentUser);

    const { logOut } = useLogout();

    return {
      currentUser,
      logOut,
    };
  },
};
</script>

<style scoped>
.navbar {
  padding: 16px 10px;
  margin-bottom: 60px;
  background: white;
}
nav {
  display: flex;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
}
nav img {
  max-height: 60px;
}
nav h1 {
  margin-left: 20px;
}
nav .links {
  margin-left: auto;
}
nav .links a,
button {
  margin-left: 16px;
  font-size: 14px;
}
span {
  font-size: 14px;
  display: inline-block;
  margin-left: 16px;
  padding-left: 16px;
  border-left: 1px solid #eee;
}
</style>
