import { AUTH_NEED_VERIFICATION, AUTH_SET_ERROR, AUTH_SET_LOADING, AUTH_SET_SUCCESS, AUTH_SET_USER, AUTH_SIGN_OUT } from '../types/authTypes';

const initialState = {
    usuario: null,
    authenticated: false,
    loading: false,
    error: '',
    needVerification: false,
    success: '',
  };

  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case AUTH_SET_USER:
        return {
          ...state,
          user: action.payload,
          authenticated: true,
        };
      case AUTH_SET_LOADING:
        return {
          ...state,
          loading: action.payload,
        };
      case AUTH_SIGN_OUT:
        return {
          ...state,
          user: null,
          authenticated: false,
          loading: false,
        };
      case AUTH_SET_ERROR:
        return {
          ...state,
          error: action.payload,
        };
      case AUTH_NEED_VERIFICATION:
        return {
          ...state,
          needVerification: true,
        };
      case AUTH_SET_SUCCESS:
        return {
          ...state,
          success: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default authReducer;
  