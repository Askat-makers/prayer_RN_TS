import {AnyAction} from 'redux';
import {IUser} from '../../types';

interface IInitState {
  user: null | IUser;
  isSignedIn: boolean;
  isSignInFailed: boolean;
  isSignInFailedMessage: string;
}

const initState: IInitState = {
  user: null,
  isSignedIn: false,
  isSignInFailed: false,
  isSignInFailedMessage: '',
};

export const AuthReducer = (state = initState, action: AnyAction) => {
  switch (action.type) {
    case 'SIGN_IN_SUCCESS':
      return {
        ...state,
        user: action.payload,
        isSignedIn: true,
      };
    case 'SIGN_IN_ERROR':
      return {
        ...state,
        isSignInFailed: true,
        isSignInFailedMessage: action.payload,
      };
    case 'SIGN_UP_SUCCESS':
      return {
        ...state,
        user: action.payload,
        isSignedIn: true,
      };
    default:
      return state;
  }
};
