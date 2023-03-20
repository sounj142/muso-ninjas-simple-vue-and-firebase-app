import { projectAuth } from '@/firebase/config';
import { tryCatch } from '@/composables/helper';

export default function useLogin(isLoading, error) {
  const logIn = ({ email, password }) => {
    return tryCatch(isLoading, error, () => {
      return projectAuth.signInWithEmailAndPassword(email, password);
    });
  };

  return { logIn };
}
