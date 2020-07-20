import { LOGIN, SIGNUP_ERROR, IS_LOGGED_IN, LOGIN_ERROR, LOGOUT, 
  FETCH_USERS, FETCH_SENT_FRIEND_REQUESTS, FETCH_RECEIVED_FRIEND_REQUESTS, 
  UPDATE_USER, FETCH_NEWSFEED, FETCH_PROFILE_POSTS } from '../actions/types';

const initialState = {
  items: [],
  item: {},
  user: {},
  users: [],
  sentFriendRequests: [],
  receivedFriendRequests: [],
  newsfeed: [],
  profilePosts: [],
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
    case FETCH_SENT_FRIEND_REQUESTS:
      return {
        ...state,
        sentFriendRequests: action.payload.sentFriendRequests
      }
    case FETCH_RECEIVED_FRIEND_REQUESTS:
      return {
        ...state,
        receivedFriendRequests: action.payload.receivedFriendRequests
      }
    case UPDATE_USER:
      return {
        ...state,
        user: action.payload.user
      }
    case FETCH_NEWSFEED:
      return {
        ...state,
        newsfeed: action.payload.newsfeed
      }
    case FETCH_PROFILE_POSTS:
      return {
        ...state,
        profilePosts: action.payload.profilePosts
      }
    default:
      return state;
  }
}
