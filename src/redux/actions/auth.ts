/* eslint-disable @typescript-eslint/ban-ts-comment */
import { ThunkAction } from 'redux-thunk';
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword
} from 'firebase/auth';

import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';

import { db } from '../../firebase';
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
      const auth = getAuth();
      const res = await createUserWithEmailAndPassword(auth, data.email, data.password);
      const currentUser = res.user;
      if (currentUser) {
        const userData: User = {
          id: currentUser.uid,
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
          createdAt: serverTimestamp()
        };

        await setDoc(doc(db, 'users', currentUser?.uid), userData);
        await sendEmailVerification(currentUser);
        dispatch({
          type: SET_USER,
          payload: userData
        });
      }
    } catch (err) {
      console.log(err);
      // @ts-ignore
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
      const auth = getAuth();
      await signInWithEmailAndPassword(auth, data.email, data.password);
    } catch (err) {
      console.log(err);
      // @ts-ignore
      errorCallback(err.message);
    }
  };

export const getUserData =
  (id: string): AuthThunk =>
  async (dispatch) => {
    try {
      const currentUser = await getDoc(doc(db, 'users', id));
      if (currentUser.exists())
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
      const auth = getAuth();
      await auth.signOut();
      dispatch({
        type: SIGN_OUT
      });
    } catch (err) {
      console.log(err);
    }
  };
};
