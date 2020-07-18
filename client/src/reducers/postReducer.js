import { LOGIN, SIGNUP_ERROR, IS_LOGGED_IN, LOGIN_ERROR, LOGOUT } from '../actions/types';

const initialState = {
  items: [],
  item: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.user,
        auth: true
      };
    case SIGNUP_ERROR:
      return {
        ...state,
        error: action.payload.message,
        auth: false
      };

    case IS_LOGGED_IN:
      return {
        ...state,
        auth: action.payload.auth,
        token: action.payload.token
      };
    case LOGIN_ERROR:
      return {
        ...state,
        error: action.payload.message,
        auth: false
      };
    case LOGOUT:
      return {
        ...state,
        auth: action.payload.auth,
        user: action.payload.user,
        token: action.payload.token,
        error: action.payload.error
      };  
    default:
      return state;
  }
}
