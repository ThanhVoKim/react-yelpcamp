import { firebase, facebookProvider, twitterProvider, googleProvider } from '../firebase/firebase';

export const facebookLogin = () => async (dispatch) => {
  await firebase.auth().signInWithPopup(facebookProvider).then((result) => {
    const data = result.user;
    const user = {
      uid: data.uid,
      displayName: data.displayName,
      avatar: data.photoURL
    };
    dispatch({
      type: 'USER_LOGIN',
      user
    });
  });
};

export const twitterLogin = () => async (dispatch) => {
  await firebase.auth().signInWithPopup(twitterProvider).then((result) => {
    const data = result.user;
    console.log(data);
    const user = {
      uid: data.uid,
      displayName: data.displayName,
      avatar: data.photoURL
    };
    dispatch({
      type: 'USER_LOGIN',
      user
    });
  });
};

export const googleLogin = () => async (dispatch) => {
  await firebase.auth().signInWithPopup(googleProvider).then((result) => {
    const data = result.user;
    dispatch({
      type: 'USER_LOGIN',
      user: {
        uid: data.uid,
        displayName: data.displayName,
        avatar: data.photoURL
      }
    });
  });
};

export const logout = () => (dispatch) => {
  firebase.auth().signOut().then(() => {
    localStorage.removeItem('firebase:authUser:AIzaSyDv_p41BBFlWdFcQutYQfNFH33xf3ITnPA:[DEFAULT]');
    dispatch({
      type: 'USER_LOGOUT'
    });
  });
};
