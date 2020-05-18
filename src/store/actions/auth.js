import axios from 'axios';

import { AUTH_SUCCESS, AUTH_FAIL, AUTH_LOGOUT } from './actionTypes';


const API_KEY = process.env.REACT_APP_API_KEY;

export function authSuccess(token) {
  return {
    type: AUTH_SUCCESS,
    token,
  };
}

export function authFail() {
  return {
    type: AUTH_FAIL,
  };
}

export function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('userId');
  localStorage.removeItem('expirationDate');

  return {
    type: AUTH_LOGOUT,
  };
}


export function autoLogout(time) {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, time * 1000);
  };
}

export function auth(email, password, isLogin) {
  return async (dispatch) => {
    const authData = {
      email,
      password,
      returnSecureToken: true,
    };

    let url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`;

    if (isLogin) {
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`;
    }

    try {
      const { data } = await axios.post(url, authData);

      const { expiresIn, idToken, localId } = data;
      const expirationDate = new Date(Date.now() + +expiresIn * 1000);

      localStorage.setItem('token', idToken);
      localStorage.setItem('userId', localId);
      localStorage.setItem('expirationDate', expirationDate);

      dispatch(authSuccess(idToken));
      dispatch(autoLogout(expiresIn));
    } catch (e) {
      dispatch({ type: 'ERRORO!!', message: e.message });
    }
  };
}

export function autoLogin() {
  return (dispatch) => {
    const token = localStorage.getItem('token');

    if (!token) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem('expirationDate'));

      if (expirationDate <= new Date()) {
        dispatch(logout());
      } else {
        dispatch(authSuccess(token));

        const newExpiration = (expirationDate.getTime() - new Date().getTime()) / 1000;
        dispatch(autoLogout(newExpiration));
      }
    }
  };
}
