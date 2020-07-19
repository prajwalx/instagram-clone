import { LOGIN, SIGNUP_ERROR, IS_LOGGED_IN, LOGIN_ERROR, LOGOUT, FETCH_USERS } from '../actions/types';

const initialState = {
  items: [],
  item: {},
  user: {},
  users: [],
  auth: false,
  token: null,
  error: null
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
        token: action.payload.token,
        user: action.payload.user
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
    case FETCH_USERS:
      return {
        ...state,
        users: action.payload.users
      };  
    default:
      return state;
  }
}
