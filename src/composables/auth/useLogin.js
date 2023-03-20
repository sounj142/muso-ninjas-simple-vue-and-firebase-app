import { projectAuth } from '@/firebase/config';

export default function useLogin(isLoading, error) {
  const logIn = async ({ email, password }) => {
    isLoading.value = true;
    error.value = null;
    try {
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
