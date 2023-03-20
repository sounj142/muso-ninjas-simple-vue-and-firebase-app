import { projectAuth } from '@/firebase/config';

export default function useLogout() {
  const logOut = async () => {
    await projectAuth.signOut();
  };

  return { logOut };
}
