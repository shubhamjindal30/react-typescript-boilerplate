export const SET_USER = 'SET_USER';

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

export type AuthActionTypes = SetUserAction;
