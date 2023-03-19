import { projectAuth } from '@/firebase/config';

export default function userLogout() {
  const logOut = async () => {
    await projectAuth.signOut();
  };

  return { logOut };
}
