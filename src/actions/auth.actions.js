import axiosInstance from "../helpers/axios";
import { authConstants } from "./constants";

export const signup = (user) => {
  return async (dispatch) => {
    let res;
    try {
      dispatch({ type: authConstants.SIGNUP_REQUEST });
      res = await axiosInstance.post(`/signup`, user);
      if (res.status === 201) {
        dispatch({ type: authConstants.SIGNUP_SUCCESS });
        const { token, user } = res.data;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        dispatch({
          type: authConstants.LOGIN_SUCCESS,
          payload: {
            token,
            user,
          },
        });
      } else {
        const { error } = res.data;
        dispatch({ type: authConstants.SIGNUP_FAILURE, payload: { error } });
      }
    } catch (error) {
      const { data } = error.response;
      dispatch({
        type: authConstants.SIGNUP_FAILURE,
        payload: { error: data.error },
      });
    }
  };
};
export const login = (user) => {
  return async (dispatch) => {
    dispatch({
      type: authConstants.LOGIN_REQUEST,
    });
    const res = await axiosInstance.post(`/signin`, {
      ...user,
    });
    if (res.status === 201) {
      const { token, user, message } = res.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      dispatch({
        type: authConstants.LOGIN_SUCCESS,
        payload: {
          token,
          user,
          message,
        },
      });
    }

    if (res.status === 400) {
      const { message } = res.data;
      dispatch({
        type: authConstants.LOGIN_FAILURE,
        payload: {
          message,
        },
      });
    }
  };
};
export const isUserLoggedIn = () => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = JSON.parse(localStorage.getItem("user"));
      dispatch({
        type: authConstants.LOGIN_SUCCESS,
        payload: {
          token,
          user,
        },
      });
    } else {
      dispatch({
        type: authConstants.LOGIN_FAILURE,
        payload: {
          error: "Failed to logedin",
        },
      });
    }
  };
};

export const signout = () => {
  return async (dispatch) => {
    dispatch({ type: authConstants.LOGOUT_REQUEST });


    localStorage.clear();
    dispatch({
        type: authConstants.LOGOUT_SUCCESS
    });



    // const res = await axiosInstance.post('/signout');

    // if (res.status === 200) {
    //   localStorage.clear();
    //   dispatch({
    //     type: authConstants.LOGOUT_SUCCESS,
    //   });
    // } else {
    //   if (res.status === 400) {
    //     dispatch({
    //       type: authConstants.LOGIN_FAILURE,
    //     });
    //   }
    // }
  };
};
