import { projectAuth } from './config';
import { Mutations } from '@/store';

export function monitorAuthStateChanged(store) {
  return projectAuth.onAuthStateChanged((user) => {
    // console.log('onAuthStateChanged', user);
    if (user) {
      if (user.displayName) {
        // only set current user if displayName is not empty, otherwise
        // that's the register case, we'll manually assign it on sign up logic
        store.commit(Mutations.user.setCurrentUser, {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
        });
      }
    } else {
      store.commit(Mutations.user.setCurrentUser, null);
    }
  });
}
