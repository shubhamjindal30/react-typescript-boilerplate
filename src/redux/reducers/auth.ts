import { AuthActionType, User, SET_USER, SIGN_OUT } from '../types/auth';

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

export default (state = initialState, action: AuthActionType): AuthState => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload,
        authenticated: true
      };
    case SIGN_OUT:
      return {
        ...state,
        user: null,
        authenticated: false
      };
    default:
      return state;
  }
};
