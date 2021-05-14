import { ThunkAction } from 'redux-thunk';

import firebase from '../../firebase';
import { RootState } from '..';
import { User, AuthActionType, SET_USER, SIGN_OUT } from '../types/auth';

type AuthThunk = ThunkAction<void, RootState, null, AuthActionType>;

export const signUp =
  (
    data: {
      firstName: string;
      lastName: string;
      email: string;
      password: string;
    },
    errorCallback: (errorMsg: string) => void
  ): AuthThunk =>
  async (dispatch) => {
    try {
      const res = await firebase.auth().createUserWithEmailAndPassword(data.email, data.password);
      const currentUser = res.user;
      if (currentUser) {
        const userData: User = {
          id: currentUser.uid,
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
          createdAt: firebase.firestore.FieldValue.serverTimestamp()
        };

        const db = firebase.firestore();
        await db.collection('users').doc(currentUser.uid).set(userData);
        await currentUser.sendEmailVerification();
        dispatch({
          type: SET_USER,
          payload: userData
        });
      }
    } catch (err) {
      console.log(err);
      errorCallback(err.message);
    }
  };

export const signIn =
  (
    data: {
      email: string;
      password: string;
    },
    errorCallback: (errorMsg: string) => void
  ): AuthThunk =>
  async () => {
    try {
      await firebase.auth().signInWithEmailAndPassword(data.email, data.password);
    } catch (err) {
      console.log(err);
      errorCallback(err.message);
    }
  };

export const getUserData =
  (id: string): AuthThunk =>
  async (dispatch) => {
    try {
      const db = firebase.firestore();
      const currentUser = await db.collection('users').doc(id).get();
      if (currentUser.exists)
        dispatch({
          type: SET_USER,
          payload: currentUser.data() as User
        });
    } catch (err) {
      console.log(err);
    }
  };

export const signOut = (): AuthThunk => {
  return async (dispatch) => {
    try {
      await firebase.auth().signOut();
      dispatch({
        type: SIGN_OUT
      });
    } catch (err) {
      console.log(err);
    }
  };
};
