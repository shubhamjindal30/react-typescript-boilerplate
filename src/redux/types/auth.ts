export const SET_USER = 'SET_USER';
export const SIGN_OUT = 'SIGN_OUT';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  createdAt: unknown;
}

interface SetUserAction {
  type: typeof SET_USER;
  payload: User;
}

interface SignOutAction {
  type: typeof SIGN_OUT;
}

export type AuthActionType = SetUserAction | SignOutAction;
