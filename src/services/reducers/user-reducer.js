import {
  SET_AUTH_CHECKED,
  SET_USER,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_ERROR,
  UPDATE_USER_AUTH,
  USER_LOGOUT_REQUEST,
  USER_LOGOUT_SUCCESS,
  USER_LOGOUT_ERROR,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_ERROR,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_ERROR,
} from "../actions/user-action";

const initialState = {
  getUserRequest: false,
  getUserError: null,
  isAuthChecked: false,
  user: null,
  userUpdateRequest: false,
  userUpdateError: null,
  userLoginRequest: false,
  userLoginError: null,
  userLogoutRequest: false,
  userLogoutError: null,
  userRegisterRequest: false,
  userRegisterError: null,

}

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTH_CHECKED: {
      return {
        // ...state,
        // isAuthChecked: true,
        ...state,
        isAuthChecked: action.payload
      };
    }
    case SET_USER: {
      return {
        ...state,
        user: action.payload,
      };
    }
    case USER_UPDATE_REQUEST: {
      return {
        ...state,
        userUpdateRequest: true,
        userUpdateError: false,
      };
    }
    case USER_UPDATE_SUCCESS: {
      return {
        ...state,
        userUpdateRequest: false,
        user: action.payload,
      };
    }
    case USER_UPDATE_ERROR: {
      return {
        ...state,
        userUpdateRequest: false,
        userUpdateError: action.payload,

      };
    }
    case UPDATE_USER_AUTH: {
      return {
        ...state,
        isAuthChecked: false,
        user: action.payload,
      };
    }
    case USER_LOGOUT_REQUEST: {
      return {
        ...state,
        isAuthChecked: false,
        userLogoutRequest: true,
      };
    }
    case USER_LOGOUT_SUCCESS: {
      return {
        ...state,
        user: action.payload,
        // isAuthChecked: false,
        userLogoutRequest: false
      };
    }
    case USER_LOGOUT_ERROR: {
      return {
        ...state,
        isAuthChecked: false,
        userLogoutError: action.payload,
        userLogoutRequest: false
      };
    }
    case USER_LOGIN_REQUEST: {
      return {
        ...state,
        isAuthChecked: true,
        userLoginRequest: true,
      };
    }
    case USER_LOGIN_SUCCESS: {
      return {
        ...state,
        user: action.payload,
        userLoginRequest: false
      };
    }
    case USER_LOGIN_ERROR: {
      return {
        ...state,
        isAuthChecked: false,
        userLoginError: action.payload,
        userLoginRequest: false
      };
    }
    case USER_REGISTER_REQUEST: {
      return {
        ...state,
        userRegisterRequest: true,
        isAuthChecked: true,
      };
    }
    case USER_REGISTER_SUCCESS: {
      return {
        ...state,
        user: action.payload,
        userRegisterRequest: false
      };
    }
    case USER_REGISTER_ERROR: {
      return {
        ...state,
        isAuthChecked: false,
        userRegisterRequest: false,
        userRegisterError: action.payload

      };
    }
    default: {
      return state;
    }
  }
};


