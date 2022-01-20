import * as actionTypes from '../actions/types';

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
    case actionTypes.AUTH_INFO_REQUEST:
      return { ...state, authInfoInProgress: true, authInfoError: null };
    case actionTypes.AUTH_INFO_SUCCESS:
      return {
        ...state,
        authInfoInProgress: false,
        isAuthenticated: !!payload,
        user: payload,
      };
    case actionTypes.AUTH_INFO_ERROR:
      return { ...state, authInfoInProgress: false, authInfoError: payload };

    case actionTypes.SEND_EMAIL_REQUEST:
      return { ...state, sendEmailInProgress: true, sendEmailError: null };
    case actionTypes.SEND_EMAIL_SUCCESS:
      return { ...state, sendEmailInProgress: false, isAuthenticated: true };
    case actionTypes.SEND_EMAIL_ERROR:
      return { ...state, sendEmailInProgress: false, sendEmailError: payload };

    case actionTypes.SEND_FORGOT_PASSWORD_EMAIL_REQUEST:
      return {
        ...state,
        sendForgotPasswordEmailInProgress: true,
        sendForgotPasswordEmailError: null,
      };
    case actionTypes.SEND_FORGOT_PASSWORD_EMAIL_SUCCESS:
      return {
        ...state,
        sendForgotPasswordEmailInProgress: false,
        isAuthenticated: true,
      };
    case actionTypes.SEND_FORGOT_PASSWORD_EMAIL_ERROR:
      return {
        ...state,
        sendForgotPasswordEmailInProgress: false,
        sendForgotPasswordEmailError: payload,
      };

    case actionTypes.UPDATE_PASSWORD_REQUEST:
      return {
        ...state,
        updatePasswordInProgress: true,
        updatePasswordError: null,
      };
    case actionTypes.UPDATE_PASSWORD_SUCCESS:
      return {
        ...state,
        updatePasswordInProgress: false,
        isAuthenticated: true,
      };
    case actionTypes.UPDATE_PASSWORD_ERROR:
      return {
        ...state,
        updatePasswordInProgress: false,
        updatePasswordError: payload,
      };

    case actionTypes.LOGIN_REQUEST:
      return { ...state, loginInProgress: true, loginError: null };
    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        loginInProgress: false,
        isAuthenticated: true,
        user: payload,
      };
    case actionTypes.LOGIN_ERROR:
      return { ...state, loginInProgress: false, loginError: payload };

    case actionTypes.LOGIN_GOOGLE_REQUEST:
      return { ...state, loginGoogleInProgress: true, loginGoogleError: null };
    case actionTypes.LOGIN_GOOGLE_SUCCESS:
      return {
        ...state,
        loginGoogleInProgress: false,
        isAuthenticated: true,
        user: payload,
      };
    case actionTypes.LOGIN_GOOGLE_ERROR:
      return {
        ...state,
        loginGoogleInProgress: false,
        loginGoogleError: payload,
      };

    case actionTypes.SIGNUP_REQUEST:
      return { ...state, signupInProgress: true, signupError: null };
    case actionTypes.SIGNUP_SUCCESS:
      return {
        ...state,
        signupInProgress: false,
        isAuthenticated: true,
        user: payload,
      };
    case actionTypes.SIGNUP_ERROR:
      return { ...state, signupInProgress: false, signupError: payload };

    case actionTypes.LOGOUT_REQUEST:
      return { ...state, logoutInProgress: true, logoutError: null };
    case actionTypes.LOGOUT_SUCCESS:
      return {
        ...state,
        logoutInProgress: false,
        isAuthenticated: false,
        user: null,
      };
    case actionTypes.LOGOUT_ERROR:
      return { ...state, logoutInProgress: false, logoutError: payload };
    default:
      return state;
  }
};

export default authReducer;
