import { useStore } from 'vuex';
import { projectAuth } from '@/firebase/config';
import { Mutations } from '@/store';
import { tryCatch } from '../helper';

export default function useSignup(isLoading, error) {
  const store = useStore();

  const signUp = ({ email, password, displayName }) => {
    return tryCatch(isLoading, error, async () => {
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
    });
  };

  return { signUp };
}
