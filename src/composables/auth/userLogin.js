import { projectAuth } from '@/firebase/config';

export default function userLogin(isLoading, error) {
  const logIn = async ({ email, password }) => {
    try {
      isLoading.value = true;
      error.value = null;
      await projectAuth.signInWithEmailAndPassword(email, password);
    } catch (err) {
      console.log(err);
      error.value = err.message;
    } finally {
      isLoading.value = false;
    }
  };

  return { logIn };
}
