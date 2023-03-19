import { useStore } from 'vuex';
import { projectAuth } from '@/firebase/config';
import { Mutations } from '@/store';

export default function userSignup(isLoading, error) {
  const store = useStore();

  const signUp = async ({ email, password, displayName }) => {
    try {
      isLoading.value = true;
      error.value = null;

      const userCredential = await projectAuth.createUserWithEmailAndPassword(
        email,
        password
      );
      await userCredential.user.updateProfile({ displayName });
      const user = userCredential.user;

      // because onAuthStateChanged() always returns displayName=null after creating account
      // we must call store mutation manually https://stackoverflow.com/questions/64184341/displayname-always-returns-null-after-creating-account
      store.commit(Mutations.user.setCurrentUser, {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
      });
    } catch (err) {
      console.log(err);
      error.value = err.message;
    } finally {
      isLoading.value = false;
    }
  };

  return { signUp };
}
