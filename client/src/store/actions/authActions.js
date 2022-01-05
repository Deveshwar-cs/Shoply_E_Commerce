import { auth, googleAuthProvider } from '../../firebase';
// need use firebase import. Credential it's a static method in a static class that's why you need the namespace
import firebase from 'firebase';
import { notification } from 'antd';

import {
  AUTH_INFO_REQUEST,
  AUTH_INFO_SUCCESS,
  AUTH_INFO_ERROR,
  SEND_EMAIL_REQUEST,
  SEND_EMAIL_SUCCESS,
  SEND_EMAIL_ERROR,
  SEND_FORGOT_PASSWORD_EMAIL_REQUEST,
  SEND_FORGOT_PASSWORD_EMAIL_SUCCESS,
  SEND_FORGOT_PASSWORD_EMAIL_ERROR,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_ERROR,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGIN_GOOGLE_REQUEST,
  LOGIN_GOOGLE_SUCCESS,
  LOGIN_GOOGLE_ERROR,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_ERROR,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_ERROR,
} from '../actions/types';

import { createOrUpdateUser } from '../../functions/authFunctions';

export const authInfoInRequest = () => ({ type: AUTH_INFO_REQUEST });
export const authInfoSuccess = (user) => ({
  type: AUTH_INFO_SUCCESS,
  payload: user,
});
export const authInfoError = (e) => ({ type: AUTH_INFO_ERROR, payload: e });

export const sendEmailInRequest = () => ({ type: SEND_EMAIL_REQUEST });
export const sendEmailSuccess = () => ({ type: SEND_EMAIL_SUCCESS });
export const sendEmailError = (e) => ({ type: SEND_EMAIL_ERROR, payload: e });

export const sendForgotPasswordEmailInRequest = () => ({
  type: SEND_FORGOT_PASSWORD_EMAIL_REQUEST,
});
export const sendForgotPasswordEmailSuccess = () => ({
  type: SEND_FORGOT_PASSWORD_EMAIL_SUCCESS,
});
export const sendForgotPasswordEmailError = (e) => ({
  type: SEND_FORGOT_PASSWORD_EMAIL_ERROR,
  payload: e,
});

export const updatePasswordRequest = () => ({ type: UPDATE_PASSWORD_REQUEST });
export const updatePasswordSuccess = () => ({ type: UPDATE_PASSWORD_SUCCESS });
export const updatePasswordError = (e) => ({
  type: UPDATE_PASSWORD_ERROR,
  payload: e,
});

export const loginRequest = () => ({ type: LOGIN_REQUEST });
export const loginSuccess = (user) => ({ type: LOGIN_SUCCESS, payload: user });
export const loginError = (e) => ({ type: LOGIN_ERROR, payload: e });

export const loginGoogleRequest = () => ({ type: LOGIN_GOOGLE_REQUEST });
export const loginGoogleSuccess = (user) => ({
  type: LOGIN_GOOGLE_SUCCESS,
  payload: user,
});
export const loginGoogleError = (e) => ({
  type: LOGIN_GOOGLE_ERROR,
  payload: e,
});

export const signupRequest = () => ({ type: SIGNUP_REQUEST });
export const signupSuccess = (user) => ({
  type: SIGNUP_SUCCESS,
  payload: user,
});
export const signupError = (e) => ({ type: SIGNUP_ERROR, payload: e });

export const logoutRequest = () => ({ type: LOGOUT_REQUEST });
export const logoutSuccess = () => ({ type: LOGOUT_SUCCESS });
export const logoutError = (e) => ({ type: LOGOUT_ERROR, payload: e });

// ERROR HANDLING -- START
// Error Codes
const LINK_ALREADY_USED = 'auth/invalid-action-code';
const LINK_IS_BROKEN = 'auth/argument-error';

// Error message handler
const displayErrorMessage = (error) => {
  switch (error.code) {
    case LINK_ALREADY_USED:
      return `Registration link has already been used! Please send a new registration link to your email!`;
    case LINK_IS_BROKEN:
      return `Registration link is broken. Please send a new registration link to your email!`;
    default:
      return 'Something went wrong. Try again';
  }
};
// ERROR HANDLING -- FINISH

// Send Email link for signup
export const sendEmail = (email) => async (dispatch) => {
  const config = {
    url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
    handleCodeInApp: true,
  };

  try {
    dispatch(sendEmailInRequest());

    await auth.sendSignInLinkToEmail(email, config);

    notification.success({
      message: `Email is sent to ${email}. Click the link to complete your registration.`,
    });

    // Save user email in localStorage
    window.localStorage.setItem('emailForRegistration', email);

    dispatch(sendEmailSuccess());
  } catch (error) {
    dispatch(sendEmailError(error.message));
    console.log(error.message);
  }
};

// Signup new user
export const signUp = (email, password) => async (dispatch) => {
  try {
    dispatch(signupRequest());

    const result = await auth.signInWithEmailLink(email, window.location.href); // in case with broken "email link" get Uncought errror in console

    if (result.user.emailVerified) {
      // delete user email from localStorage
      window.localStorage.removeItem('emailForRegistration');

      // get current user
      let user = auth.currentUser;

      // set password for current user
      await user.updatePassword(password);

      // id token
      const idTokenResult = await user.getIdTokenResult();

      // redux store
      createOrUpdateUser(idTokenResult.token)
        .then((res) => {
          dispatch(
            signupSuccess({
              email: res.data.email,
              token: idTokenResult.token, // token from client
              name: res.data.name,
              role: res.data.role,
              _id: res.data._id,
            })
          );
        })
        .catch((error) => dispatch(signupError(error.message)));

      // notification
      notification.success({
        message: `Сongratulations, your account ${email} has been created!`,
      });
    }
  } catch (error) {
    //console.log('AuthActions -- SIGNUP ERROR CODE', error.code);

    dispatch(signupError(error));

    notification.error({
      message: displayErrorMessage(error),
    });
  }
};

// Login user

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch(loginRequest());

    const result = await auth.signInWithEmailAndPassword(email, password);

    // id token
    const idTokenResult = await result.user.getIdTokenResult();

    createOrUpdateUser(idTokenResult.token)
      .then((res) => {
        dispatch(
          loginSuccess({
            email: res.data.email,
            token: idTokenResult.token, // token from client
            name: res.data.name,
            role: res.data.role,
            _id: res.data._id,
          })
        );
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

export const googleLogin = (email, password) => async (dispatch) => {
  try {
    dispatch(loginGoogleRequest());

    const result = await auth.signInWithPopup(googleAuthProvider);

    const { user } = result;

    const idTokenResult = await user.getIdTokenResult();

    // console.log('authActions--login =>', user);
    console.log('authActions--login idTokenResult =>', idTokenResult.token);

    createOrUpdateUser(idTokenResult.token)
      .then((res) => {
        dispatch(
          loginGoogleSuccess({
            email: res.data.email,
            token: idTokenResult.token, // token from client
            name: res.data.name,
            role: res.data.role,
            _id: res.data._id,
          })
        );
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

// Logot user
export const logout = () => async (dispatch) => {
  try {
    dispatch(logoutRequest());

    await auth.signOut();

    dispatch(logoutSuccess());

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

    await auth.sendPasswordResetEmail(email, config).then(() => {
      dispatch(sendForgotPasswordEmailSuccess());

      notification.success({
        message: 'Please check your email for password reset link!',
      });
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
    const reauthenticate = (currentPassword) => {
      const user = auth.currentUser;
      // need use firebase import. Credential it's a static method in a static class that's why you need the namespace
      const credential = firebase.auth.EmailAuthProvider.credential(
        user.email,
        currentPassword
      );
      return user.reauthenticateWithCredential(credential);
    };

    // ASYNC/AWAIT IMPLEMENTATION
    try {
      dispatch(updatePasswordRequest());

      await reauthenticate(currentPassword);

      const user = auth.currentUser;

      await user.updatePassword(newPassword);

      dispatch(updatePasswordSuccess());

      notification.success({
        message: 'Password successfully updated!',
      });
    } catch (error) {
      dispatch(updatePasswordError());
      notification.error({
        message: error.message,
      });
    }

    // PROMISE IMPLEMENTATION

    // dispatch(updatePasswordRequest());

    // reauthenticate(currentPassword)
    //   .then(() => {
    //     const user = auth.currentUser;

    //     user
    //       .updatePassword(newPassword)
    //       .then(() => {
    //         //success
    //         dispatch(updatePasswordSuccess());

    //         notification.success({
    //           message: 'Password successfully updated!',
    //         });
    //       })
    //       .catch((error) => {
    //         //error
    //         dispatch(updatePasswordError());
    //         notification.error({
    //           message: error.message,
    //         });
    //       });
    //   })
    //   .catch((error) => {
    //     dispatch(updatePasswordError());
    //     notification.error({
    //       message: error.message,
    //     });
    //   });
  };
