import { getResponse } from "../../utils/api.js"

export const SET_NUMBER_ORDER_REQUEST = "SET_NUMBER_ORDER_REQUEST";
export const SET_NUMBER_ORDER_SUCCESS = "SET_NUMBER_ORDER_SUCCESS";
export const SET_NUMBER_ORDER_ERROR = "SET_NUMBER_ORDER_ERROR";

export const makeOrder = (ingredients) => {
  return function (dispatch) {
    dispatch({
      type: SET_NUMBER_ORDER_REQUEST,
    });

    getResponse("/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ingredients: ingredients }),
    })
      .then((res) => {
        dispatch({
          type: SET_NUMBER_ORDER_SUCCESS,
          payload: {
            name: res.name,
            number: res.order.number,
          },
        });
      })
      .catch((error) => {
        dispatch({
          type: SET_NUMBER_ORDER_ERROR,
          payload: error,
        });
      });
  };
};