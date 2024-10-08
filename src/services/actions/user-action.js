import { api } from "../../utils/api"
import { getResponse } from "../../utils/api"


export const SET_AUTH_CHECKED = "SET_AUTH_CHECKED";
export const SET_USER = "SET_USER";

export const USER_UPDATE_REQUEST = "USER_UPDATE_REQUEST";
export const USER_UPDATE_SUCCESS = "USER_UPDATE_SUCCESS";
export const USER_UPDATE_ERROR = " USER_UPDATE_ERROR";
export const UPDATE_USER_AUTH = "UPDATE_USER_AUTH";

export const USER_LOGIN_REQUEST = "USER_LOGIN_REQUEST";
export const USER_LOGIN_SUCCESS = "USER_LOGIN_SUCCESS";
export const USER_LOGIN_ERROR = "USER_LOGIN_ERROR";

export const USER_REGISTER_REQUEST = "USER_REGISTER_REQUEST";
export const USER_REGISTER_SUCCESS = "USER_REGISTER_SUCCESS";
export const USER_REGISTER_ERROR = "USER_REGISTER_ERROR";

export const USER_LOGOUT_REQUEST = "USER_LOGOUT_REQUEST";
export const USER_LOGOUT_SUCCESS = "USER_LOGOUT_SUCCESS";
export const USER_LOGOUT_ERROR = "USER_LOGOUT_ERROR";

export const setAuthChecked = (value) => ({
  type: SET_AUTH_CHECKED,
  payload: value,
});

export const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});

export const getUser = () => {
  return (dispatch) => {
    return api.getUser().then((res) => {
      dispatch(setUser(res.user));
    });
  };
};

export const checkUserAuth = () => {
  return (dispatch) => {
    if (localStorage.getItem("accessToken")) {
      dispatch(getUser())
        .catch(() => {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          dispatch(setUser(null));
        })
        .finally(() => dispatch(setAuthChecked(true)));
    } else {
      dispatch(setAuthChecked(true));
    }
  };
};

export const login = (email, password) => {
  return function (dispatch) {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });
    return api.login(email, password)
      .then((res) => {
        localStorage.setItem("accessToken", res.accessToken);
        localStorage.setItem("refreshToken", res.refreshToken);
        dispatch(setUser(res.user));
        dispatch(setAuthChecked(true));

        dispatch({
          type: USER_LOGIN_SUCCESS,
          payload: res.user
        });
      })
      .catch((error) => {
        dispatch({
          type: USER_LOGIN_ERROR,
          payload: error
        });
      });
  }
}

export const registrationAction = (name, email, password) => {
  return function (dispatch) {
    dispatch({
      type: USER_REGISTER_REQUEST,
    });
    return api.registration(name, email, password)
      .then((res) => {
        localStorage.setItem('accessToken', res.accessToken);
        localStorage.setItem('refreshToken', res.refreshToken);
        dispatch({
          type: USER_REGISTER_SUCCESS,
          payload: res.user
        });
      })
      .catch((error) => {
        dispatch({
          type: USER_REGISTER_ERROR,
          payload: error
        })
      });
  }
}

export const logout = () => {
  return function (dispatch) {
    dispatch({
      type: USER_LOGOUT_REQUEST,
    });
    return api.logout()
      .then((res) => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        dispatch({
          type: USER_LOGOUT_SUCCESS,
          payload: res.user
        });
      })
      .catch((error) => {
        dispatch({
          type: USER_LOGOUT_ERROR,
          payload: error
        });
      });
  }
}

export const getUserData = () => {
  return function (dispatch) {
    dispatch({
      type: USER_UPDATE_REQUEST,
    });

    getResponse(`/auth/user`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
    })
      .then((res) => {
        dispatch({
          type: USER_UPDATE_SUCCESS,
          payload: res.user,
        });
      })
      .catch((error) => {
        dispatch({
          type: USER_UPDATE_ERROR,
          payload: error,
        });
      });
  };
};


