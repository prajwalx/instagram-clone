import { LOGIN, SIGNUP_ERROR, IS_LOGGED_IN, LOGIN_ERROR, LOGOUT, 
  FETCH_USERS, FETCH_SENT_FRIEND_REQUESTS, FETCH_RECEIVED_FRIEND_REQUESTS,
  UPDATE_USER,FETCH_NEWSFEED,FETCH_PROFILE_POSTS
 } from './types';
import history from '../components/history';

/**
 * Action to create user on signup
*/ 
export const createUser = userData => dispatch => {
  /* post user data to server */
  fetch('http://0.0.0.0:9000/users', {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(userData)
  })
    .then(async(res)=>{
      /*throw error on fail */
      if(res.ok)
        return res.json()
      else
        throw await (res.json())
    })
    .then((res) =>{
        /* Success request */
        
        /*set jwt token local storage */
        localStorage.setItem('access_token',res.token)
        localStorage.setItem('user',JSON.stringify(res.user))

        /* dispatch LOGIN: logs-in user  */
        dispatch({
          type: LOGIN,
          payload: res
        })

        /* redirect to home page */
        history.push('/');
    })
    .catch((err) =>{
      /* dispatch Signup-Error  */
      dispatch({
        type: SIGNUP_ERROR,
        payload:{ message: err.message || 'Invalid Request' }
      })
    })
};


/**
 * Action to login user
*/ 
export const logIn = postData => dispatch => {
  /* post user credentials to server */
  fetch('http://0.0.0.0:9000/auth', {
    method: 'POST',
    headers: {
      'Authorization': 'Basic '+btoa(`${postData.email}:${postData.password}`),
      'content-type': 'application/json'
    },
    body: JSON.stringify({access_token:postData.access_token})
  })
  .then(async(res)=>{
    /*throw error on fail */
    if(res.ok)
      return res.json()
    else
      throw  (res)
  })
  .then((res) =>{
    /* Success request */

      /*set jwt token local storage */
      localStorage.setItem('access_token',res.token)
      localStorage.setItem('user',JSON.stringify(res.user))

      /* dispatch LOGIN: logs-in user  */
      dispatch({
        type: LOGIN,
        payload: res
      })

      /* redirect to home page */
      history.push('/');
  })
  .catch((err) =>{
    /* Login Error */
    dispatch({
      type: LOGIN_ERROR,
      payload:{ message: err.statusText || ' Invalid Emaid Or Password' }
    })
  })
};

/**
 * Action to check login status
*/ 
export const isLoggedIn = () => dispatch => {
  const token = localStorage.getItem('access_token');
  if(token){
    const user = JSON.parse(localStorage.getItem('user'));
    return dispatch({
      type: IS_LOGGED_IN,
      payload:{
        auth:true,
        token,
        user
      }
    });
  }
  else{
    return dispatch({
      type: IS_LOGGED_IN,
      payload:{
        auth:false
      }
    });
  }
};

/* Action to perform Logout */
export const logOut = postData => dispatch => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('user')
  dispatch({
    type: LOGOUT,
    payload:{
      auth:false,
      user:null,
      token:null,
      error:null
    }
  })
};

export const fetchUsers = ({query,history}) => dispatch => {
  const token = localStorage.getItem('access_token');
  fetch(`http://0.0.0.0:9000/users?q=${query}`, {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer '+ token,
      'content-type': 'application/json'
    }
  })
  .then(async(res)=>{
    /*throw error on fail */
    if(res.ok)
      return res.json()
    else
      throw  (res)
  })
  .then((res) =>{
    /* Success request */
      console.log(res)
      /* dispatch FETCH_USERS: Fetch users for the querystring search  */
      dispatch({
        type: FETCH_USERS,
        payload: {users:res}
      })

      /* redirect to home page */
      history.push('/users');
  })
  .catch((err) =>{
    /* Login Error */
    console.error(err);
  })
};

/* Fetch Friend Requests Sent by logged in user  */
export const fetchSentFriendRequests = () => dispatch => {
  const token = localStorage.getItem('access_token');
  if(!token){ return  }
  const user = JSON.parse(localStorage.getItem('user'));

  fetch(`http://0.0.0.0:9000/friendRequests?fromUser=${user.id}`, {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer '+ token,
      'content-type': 'application/json'
    }
  })
  .then((res)=>{
    /*throw error on fail */
    if(res.ok)
      return res.json()
    else
      throw  (res)
  })
  .then((res) =>{
    /* Success request */
      // console.log(res)
      /* dispatch FETCH_USERS: Fetch users for the querystring search  */
      dispatch({
        type: FETCH_SENT_FRIEND_REQUESTS,
        payload: {sentFriendRequests:res}
      })

  })
  .catch((err) =>{
    /* Log Error */
    console.error(err);
  })
};

/* Fetch Friend Requests Received by logged in user  */
export const fetchReceivedFriendRequests = () => dispatch => {
  const token = localStorage.getItem('access_token');
  if(!token){ return  }
  const user = JSON.parse(localStorage.getItem('user'));

  fetch(`http://0.0.0.0:9000/friendRequests?toUser=${user.id}`, {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer '+ token,
      'content-type': 'application/json'
    }
  })
  .then((res)=>{
    /*throw error on fail */
    if(res.ok)
      return res.json()
    else
      throw  (res)
  })
  .then((res) =>{
    /* Success request */
      // console.log(res)
      /* dispatch FETCH_USERS: Fetch users for the querystring search  */
      dispatch({
        type: FETCH_RECEIVED_FRIEND_REQUESTS,
        payload: {receivedFriendRequests:res}
      })

  })
  .catch((err) =>{
    /* Log Error */
    console.error(err);
  })
};


/**
 * Action to Send Friend Request
 * userData{toUser:user-id}
*/ 
export const sendFriendRequest = userData => dispatch => {
  /* post user data to server */
  const token = localStorage.getItem("access_token");
  if(!token) {return }

  fetch('http://0.0.0.0:9000/friendRequests', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer '+ token,
      'content-type': 'application/json'
    },
    body: JSON.stringify(userData)
  })
    .then((res)=>{
      /*throw error on fail */
      if(res.ok)
        return res.json()
      else
        throw res
    })
    .then((res) =>{
        /* Success request */
        // Update State of sent friend requests
        dispatch(fetchSentFriendRequests())
        
    })
    .catch((err) =>{
      /* dispatch Signup-Error  */
      console.error(err);
    })
};

/**
 * Respond to Friend Request (ACCEPTED/REJECTED)
*/ 
export const respondToFriendRequest = ({requestId, status, fromUser}) => dispatch => {
  /* post user data to server */
  const token = localStorage.getItem("access_token");
  if(!token) {return }

  fetch(`http://0.0.0.0:9000/friendRequests/${requestId}`, {
    method: 'PUT',
    headers: {
      'Authorization': 'Bearer '+ token,
      'content-type': 'application/json'
    },
    body: JSON.stringify({status})
  })
    .then((res)=>{
      /*throw error on fail */
      if(res.ok)
        return res.json()
      else
        throw res
    })
    .then((res) =>{
        /* Success request */
        if(status==="ACCEPTED"){
            const user = JSON.parse(localStorage.getItem("user"));
            user.friends.push(fromUser);
          dispatch({
            type: UPDATE_USER,
            payload: {user:Object.assign(user)}
          })
          localStorage.setItem(JSON.stringify(user))
        }
        else{
          dispatch(fetchReceivedFriendRequests())
        }
        
    })
    .catch((err) =>{
      /* dispatch Signup-Error  */
      console.error(err);
    })
};

/* Fetch NewsFeed  */
export const fetchNewsFeed = () => dispatch => {
  const token = localStorage.getItem('access_token');
  if(!token){ return  }
  // const user = JSON.parse(localStorage.getItem('user'));

  fetch(`http://0.0.0.0:9000/posts/newsfeed`, {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer '+ token,
      'content-type': 'application/json'
    }
  })
  .then((res)=>{
    /*throw error on fail */
    if(res.ok)
      return res.json()
    else
      throw  (res)
  })
  .then((res) =>{
    /* Success request */
      dispatch({
        type: FETCH_NEWSFEED,
        payload: {newsfeed:res}
      })

  })
  .catch((err) =>{
    /* Log Error */
    console.error(err);
  })
};

/* Fetch Profile Posts  */
export const fetchProfilePosts = (user) => dispatch => {
  const token = localStorage.getItem('access_token');
  if(!token){ return  }
  // const user = JSON.parse(localStorage.getItem('user'));

  fetch(`http://0.0.0.0:9000/posts?user=${user.id}`, {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer '+ token,
      'content-type': 'application/json'
    }
  })
  .then((res)=>{
    /*throw error on fail */
    if(res.ok)
      return res.json()
    else
      throw  (res)
  })
  .then((res) =>{
    /* Success request */
      dispatch({
        type: FETCH_PROFILE_POSTS,
        payload: {profilePosts:res}
      })

  })
  .catch((err) =>{
    /* Log Error */
    console.error(err);
  })
};

/* Create post  */
export const createPost = (postFormData) => dispatch => {
  const token = localStorage.getItem('access_token');
  if(!token){ return  }
  // const user = JSON.parse(localStorage.getItem('user'));

  fetch(`http://0.0.0.0:9000/posts`, {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer '+ token
    },
    body: postFormData
  })
  .then((res)=>{
    /*throw error on fail */
    if(res.ok)
      return res.json()
    else
      throw  (res)
  })
  .then((res) =>{
    /* Success request */
      dispatch(fetchNewsFeed())
  })
  .catch((err) =>{
    /* Log Error */
    console.error(err);
  })
};


/* like post  */
export const likePost = (postId) => dispatch => {
  const token = localStorage.getItem('access_token');
  if(!token){ return  }
  const user = JSON.parse(localStorage.getItem('user'));

  fetch(`http://0.0.0.0:9000/posts/like/${postId}`, {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer '+ token
    }
  })
  .then((res)=>{
    /*throw error on fail */
    if(res.ok)
      return res.json()
    else
      throw  (res)
  })
  .then((res) =>{
    /* Success request */
      dispatch(fetchNewsFeed())
  })
  .catch((err) =>{
    /* Log Error */
    console.error(err);
  })
};


/* dislike post  */
export const dislikePost = (postId) => dispatch => {
  const token = localStorage.getItem('access_token');
  if(!token){ return  }
  const user = JSON.parse(localStorage.getItem('user'));

  fetch(`http://0.0.0.0:9000/posts/dislike/${postId}`, {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer '+ token
    }
  })
  .then((res)=>{
    /*throw error on fail */
    if(res.ok)
      return res.json()
    else
      throw  (res)
  })
  .then((res) =>{
    /* Success request */
      dispatch(fetchNewsFeed())
  })
  .catch((err) =>{
    /* Log Error */
    console.error(err);
  })
};


