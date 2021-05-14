import { AuthActionTypes, User } from '../types/auth';

interface AuthState {
  user: User | null;
  authenticated: boolean;
  needsVerification: boolean;
}

const initialState: AuthState = {
  user: null,
  authenticated: false,
  needsVerification: false
};

export default (state = initialState, action: AuthActionTypes): AuthState => {
  switch (action.type) {
    default:
      return state;
  }
};
