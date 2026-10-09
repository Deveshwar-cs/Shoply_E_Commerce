import { auth, googleAuthProvider } from '../../firebase';

import {
  EmailAuthProvider,
  getIdTokenResult,
  reauthenticateWithCredential,
  sendPasswordResetEmail,
  sendSignInLinkToEmail,
  signInWithEmailAndPassword,
  signInWithEmailLink,
  signInWithPopup,
  signOut,
  updatePassword as updateFirebasePassword,
  onAuthStateChanged,
} from 'firebase/auth';

import { getCartAction, clearCart } from './cartActions';

import { notification } from 'antd';

import * as actionTypes from '../actions/types';

import { createOrUpdateUser, currentUser } from '../../functions/authFunctions';

export const authInfoInRequest = () => ({
  type: actionTypes.AUTH_INFO_REQUEST,
});

export const authInfoSuccess = (user) => ({
  type: actionTypes.AUTH_INFO_SUCCESS,
  payload: user,
});

export const authInfoError = (e) => ({
  type: actionTypes.AUTH_INFO_ERROR,
  payload: e,
});

export const sendEmailInRequest = () => ({
  type: actionTypes.SEND_EMAIL_REQUEST,
});

export const sendEmailSuccess = () => ({
  type: actionTypes.SEND_EMAIL_SUCCESS,
});

export const sendEmailError = (e) => ({
  type: actionTypes.SEND_EMAIL_ERROR,
  payload: e,
});

export const sendForgotPasswordEmailInRequest = () => ({
  type: actionTypes.SEND_FORGOT_PASSWORD_EMAIL_REQUEST,
});

export const sendForgotPasswordEmailSuccess = () => ({
  type: actionTypes.SEND_FORGOT_PASSWORD_EMAIL_SUCCESS,
});

export const sendForgotPasswordEmailError = (e) => ({
  type: actionTypes.SEND_FORGOT_PASSWORD_EMAIL_ERROR,
  payload: e,
});

export const updatePasswordRequest = () => ({
  type: actionTypes.UPDATE_PASSWORD_REQUEST,
});

export const updatePasswordSuccess = () => ({
  type: actionTypes.UPDATE_PASSWORD_SUCCESS,
});

export const updatePasswordError = (e) => ({
  type: actionTypes.UPDATE_PASSWORD_ERROR,
  payload: e,
});

export const loginRequest = () => ({
  type: actionTypes.LOGIN_REQUEST,
});

export const loginSuccess = (user) => ({
  type: actionTypes.LOGIN_SUCCESS,
  payload: user,
});

export const loginError = (e) => ({
  type: actionTypes.LOGIN_ERROR,
  payload: e,
});

export const loginGoogleRequest = () => ({
  type: actionTypes.LOGIN_GOOGLE_REQUEST,
});

export const loginGoogleSuccess = (user) => ({
  type: actionTypes.LOGIN_GOOGLE_SUCCESS,
  payload: user,
});

export const loginGoogleError = (e) => ({
  type: actionTypes.LOGIN_GOOGLE_ERROR,
  payload: e,
});

export const signupRequest = () => ({
  type: actionTypes.SIGNUP_REQUEST,
});

export const signupSuccess = (user) => ({
  type: actionTypes.SIGNUP_SUCCESS,
  payload: user,
});

export const signupError = (e) => ({
  type: actionTypes.SIGNUP_ERROR,
  payload: e,
});

export const logoutRequest = () => ({
  type: actionTypes.LOGOUT_REQUEST,
});

export const logoutSuccess = () => ({
  type: actionTypes.LOGOUT_SUCCESS,
});

export const logoutError = (e) => ({
  type: actionTypes.LOGOUT_ERROR,
  payload: e,
});

// ERROR HANDLING -- START

const LINK_ALREADY_USED = 'auth/invalid-action-code';
const LINK_IS_BROKEN = 'auth/argument-error';

const displayErrorMessage = (error) => {
  switch (error.code) {
    case LINK_ALREADY_USED:
      return 'Registration link has already been used! Please send a new registration link to your email!';

    case LINK_IS_BROKEN:
      return 'Registration link is broken. Please send a new registration link to your email!';

    default:
      return 'Something went wrong. Try again';
  }
};

// ERROR HANDLING -- FINISH

// Send Email link for signup

export const sendEmail = (email) => async (dispatch) => {
  const redirectUrl = process.env.REACT_APP_REGISTER_REDIRECT_URL;

  console.log('========== SEND EMAIL START ==========');
  console.log('EMAIL:', email);
  console.log('REDIRECT URL:', redirectUrl);

  const config = {
    url: redirectUrl,
    handleCodeInApp: true,
  };

  try {
    dispatch(sendEmailInRequest());

    console.log('Calling Firebase sendSignInLinkToEmail...');

    const response = await sendSignInLinkToEmail(auth, email, config);

    console.log('Firebase response:', response);
    console.log('Email link sent successfully!');

    notification.success({
      message: `Email is sent to ${email}.`,
    });

    window.localStorage.setItem('emailForRegistration', email);

    dispatch(sendEmailSuccess());

    console.log('========== SEND EMAIL SUCCESS ==========');
  } catch (error) {
    console.log('========== SEND EMAIL ERROR ==========');
    console.error('Full error:', error);
    console.error('Error code:', error.code);
    console.error('Error message:', error.message);
    console.error('Error name:', error.name);
    console.log('======================================');

    dispatch(sendEmailError(error.message));

    notification.error({
      message: error.message,
    });
  }
};

// Signup new user

export const signUp = (email, password) => async (dispatch) => {
  try {
    dispatch(signupRequest());

    const result = await signInWithEmailLink(auth, email, window.location.href);

    if (!result.user.emailVerified) {
      throw new Error('Please verify your email before continuing.');
    }

    window.localStorage.removeItem('emailForRegistration');

    const user = result.user;

    await updateFirebasePassword(user, password);

    const idTokenResult = await getIdTokenResult(user);
    const token = idTokenResult.token;

    // Wait until the MongoDB user has been created.
    const res = await createOrUpdateUser(token);

    // Update Redux only after MongoDB confirms creation.
    dispatch(
      signupSuccess({
        email: res.data.email,
        token,
        name: res.data.name,
        role: res.data.role,
        _id: res.data._id,
      })
    );

    // Fetch the cart after the account has been created.
    dispatch(getCartAction(token));

    notification.success({
      message: `Congratulations, your account ${email} has been created!`,
    });
  } catch (error) {
    dispatch(signupError(error.message || error));

    notification.error({
      message: displayErrorMessage(error),
    });
  }
};

// Login user

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch(loginRequest());

    const result = await signInWithEmailAndPassword(auth, email, password);

    const idTokenResult = await getIdTokenResult(result.user);

    createOrUpdateUser(idTokenResult.token)
      .then((res) => {
        dispatch(
          loginSuccess({
            email: res.data.email,
            token: idTokenResult.token,
            name: res.data.name,
            role: res.data.role,
            _id: res.data._id,
          })
        );
        dispatch(getCartAction(idTokenResult.token));
      })
      .catch((error) => dispatch(loginError(error.message)));
  } catch (error) {
    console.log(error);

    dispatch(loginError(error.message));

    notification.error({
      message: error.message,
    });
  }
};

// Login with Google

export const googleLogin = (email) => async (dispatch) => {
  try {
    dispatch(loginGoogleRequest());
    console.log('working fine till here');

    const result = await signInWithPopup(auth, googleAuthProvider);

    const { user } = result;

    const idTokenResult = await getIdTokenResult(user);
    createOrUpdateUser(idTokenResult.token)
      .then((res) => {
        dispatch(
          loginGoogleSuccess({
            email: res.data.email,
            token: idTokenResult.token,
            name: res.data.name,
            role: res.data.role,
            _id: res.data._id,
          })
        );
        dispatch(getCartAction(idTokenResult.token));
      })
      .catch((error) => dispatch(loginGoogleError(error.message)));
  } catch (error) {
    console.log(error);

    dispatch(loginGoogleError(error.message));

    notification.error({
      message: error.message,
    });
  }
};

// Logout user

export const logout = () => async (dispatch) => {
  try {
    dispatch(logoutRequest());

    await signOut(auth);

    dispatch(logoutSuccess());
    dispatch(clearCart());
    notification.info({
      message: 'You are succeccfuly logged out!',
    });
  } catch (error) {
    console.log(error);

    dispatch(logoutError(error));

    notification.error({
      message: error.message,
    });
  }
};

// Forgot Password

export const forgotPassword = (email) => async (dispatch) => {
  try {
    dispatch(sendForgotPasswordEmailInRequest());

    const config = {
      url: process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT_URL,
      handleCodeInApp: true,
    };

    await sendPasswordResetEmail(auth, email, config);

    dispatch(sendForgotPasswordEmailSuccess());

    notification.success({
      message: 'Please check your email for password reset link!',
    });
  } catch (error) {
    dispatch(sendForgotPasswordEmailError(error));

    notification.error({
      message: error.message,
    });
  }
};

// Update password

export const updatePassword =
  (currentPassword, newPassword) => async (dispatch) => {
    const reauthenticate = async (currentPassword) => {
      const user = auth.currentUser;

      const credential = EmailAuthProvider.credential(
        user.email,
        currentPassword
      );

      return reauthenticateWithCredential(user, credential);
    };

    try {
      dispatch(updatePasswordRequest());

      await reauthenticate(currentPassword);

      const user = auth.currentUser;

      await updateFirebasePassword(user, newPassword);

      dispatch(updatePasswordSuccess());

      notification.success({
        message: 'Password successfully updated!',
      });
    } catch (error) {
      dispatch(updatePasswordError(error));

      notification.error({
        message: error.message,
      });
    }
  };

export const getUser = () => async (dispatch) => {
  dispatch(authInfoInRequest());

  onAuthStateChanged(auth, async (user) => {
    if (!user) {
      dispatch(authInfoError(null));
      return;
    }

    try {
      const token = await user.getIdToken();

      // Ensure the MongoDB document exists before fetching it.
      await createOrUpdateUser(token);

      const res = await currentUser(token);

      // Support either an array or a single object response.
      const userData = Array.isArray(res.data) ? res.data[0] : res.data;

      if (!userData) {
        throw new Error('User record was not returned by the server.');
      }

      dispatch(
        authInfoSuccess({
          email: userData.email,
          token,
          name: userData.name,
          role: userData.role,
          _id: userData._id,
        })
      );

      dispatch(getCartAction(token));
    } catch (error) {
      console.error('Failed to load current user:', error);

      dispatch(authInfoError(error.message || error));

      notification.error({
        message: 'Unable to load your account. Please try again.',
      });
    }
  });
};
