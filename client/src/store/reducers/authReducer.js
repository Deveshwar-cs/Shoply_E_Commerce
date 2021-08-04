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

const initialState = {
  isAuthenticated: false,

  authInfoInProgress: false,
  authInfoError: null,

  sendEmailInProgress: false,
  sendEmailError: null,

  sendForgotPasswordEmailInProgress: false,
  sendForgotPasswordEmailError: null,

  updatePasswordInProgress: false,
  updatePasswordError: null,

  loginInProgress: false,
  loginError: null,

  loginGoogleInProgress: false,
  loginGoogleError: null,

  signupInProgress: false,
  signupError: null,

  logoutInProgress: false,
  logoutError: null,

  user: null,
};

export const authReducer = (state = initialState, action = {}) => {
  const { type, payload } = action;
  switch (type) {
    case AUTH_INFO_REQUEST:
      return { ...state, authInfoInProgress: true, authInfoError: null };
    case AUTH_INFO_SUCCESS:
      return {
        ...state,
        authInfoInProgress: false,
        isAuthenticated: !!payload,
        user: payload,
      };
    case AUTH_INFO_ERROR:
      return { ...state, authInfoInProgress: false, authInfoError: payload };

    case SEND_EMAIL_REQUEST:
      return { ...state, sendEmailInProgress: true, sendEmailError: null };
    case SEND_EMAIL_SUCCESS:
      return { ...state, sendEmailInProgress: false, isAuthenticated: true };
    case SEND_EMAIL_ERROR:
      return { ...state, sendEmailInProgress: false, sendEmailError: payload };

    case SEND_FORGOT_PASSWORD_EMAIL_REQUEST:
      return {
        ...state,
        sendForgotPasswordEmailInProgress: true,
        sendForgotPasswordEmailError: null,
      };
    case SEND_FORGOT_PASSWORD_EMAIL_SUCCESS:
      return {
        ...state,
        sendForgotPasswordEmailInProgress: false,
        isAuthenticated: true,
      };
    case SEND_FORGOT_PASSWORD_EMAIL_ERROR:
      return {
        ...state,
        sendForgotPasswordEmailInProgress: false,
        sendForgotPasswordEmailError: payload,
      };

    case UPDATE_PASSWORD_REQUEST:
      return {
        ...state,
        updatePasswordInProgress: true,
        updatePasswordError: null,
      };
    case UPDATE_PASSWORD_SUCCESS:
      return {
        ...state,
        updatePasswordInProgress: false,
        isAuthenticated: true,
      };
    case UPDATE_PASSWORD_ERROR:
      return {
        ...state,
        updatePasswordInProgress: false,
        updatePasswordError: payload,
      };

    case LOGIN_REQUEST:
      return { ...state, loginInProgress: true, loginError: null };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loginInProgress: false,
        isAuthenticated: true,
        user: payload,
      };
    case LOGIN_ERROR:
      return { ...state, loginInProgress: false, loginError: payload };

    case LOGIN_GOOGLE_REQUEST:
      return { ...state, loginGoogleInProgress: true, loginGoogleError: null };
    case LOGIN_GOOGLE_SUCCESS:
      return {
        ...state,
        loginGoogleInProgress: false,
        isAuthenticated: true,
        user: payload,
      };
    case LOGIN_GOOGLE_ERROR:
      return {
        ...state,
        loginGoogleInProgress: false,
        loginGoogleError: payload,
      };

    case SIGNUP_REQUEST:
      return { ...state, signupInProgress: true, signupError: null };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        signupInProgress: false,
        isAuthenticated: true,
        user: payload,
      };
    case SIGNUP_ERROR:
      return { ...state, signupInProgress: false, signupError: payload };

    case LOGOUT_REQUEST:
      return { ...state, logoutInProgress: true, logoutError: null };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        logoutInProgress: false,
        isAuthenticated: false,
        user: null,
      };
    case LOGOUT_ERROR:
      return { ...state, logoutInProgress: false, logoutError: payload };
    default:
      return state;
  }
};

export default authReducer;
