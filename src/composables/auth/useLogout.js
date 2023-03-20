import { projectAuth } from '@/firebase/config';

export default function useLogout() {
  const logOut = () => projectAuth.signOut();

  return { logOut };
}
