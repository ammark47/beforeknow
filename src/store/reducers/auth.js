import { PURGE } from 'redux-persist';
import { POSTGRES_PROFILE_LOADED, USER_PROFILE_LOADED } from '../actions/auth';

const initialState = {
  user: {},
  loggedIn: false
};

export const authReducer = (state = initialState, action) => {
    switch (action.type) {  
      case USER_PROFILE_LOADED:
        return {
          ...state,
          user: action.user,
          loggedIn: true
        };
      case POSTGRES_PROFILE_LOADED:
        return {
          ...state,
          postgres_user: action.userInfoPostgres
        }
      case PURGE:
        return initialState
      default:
        return state;
    }
  }


