import { LOGIN, SIGNUP_ERROR, IS_LOGGED_IN, LOGIN_ERROR, LOGOUT, FETCH_USERS } from './types';
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
      /* dispatch LOGIN: logs-in user  */
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