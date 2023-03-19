export default {
  namespaced: true,
  state: {
    currentUser: undefined, // undefined: never load from firebase
  },
  mutations: {
    setCurrentUser(state, user) {
      state.currentUser = user;
    },
  },
  actions: {},
};
