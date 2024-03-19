import { getResponse } from "../../utils/api"
import {
  SET_NUMBER_ORDER_REQUEST,
  SET_NUMBER_ORDER_SUCCESS,
  SET_NUMBER_ORDER_ERROR
} from '../constants/constants';
import { AppThunk } from "../types";
import { TMakeOrder } from '../types/data';
import { useDispatch } from "../../utils/hooks/useDispatch";
// export const SET_NUMBER_ORDER_REQUEST = "SET_NUMBER_ORDER_REQUEST";
// export const SET_NUMBER_ORDER_SUCCESS = "SET_NUMBER_ORDER_SUCCESS";
// export const SET_NUMBER_ORDER_ERROR = "SET_NUMBER_ORDER_ERROR";

export interface ISetNumberOrderRequest {
  readonly type: typeof SET_NUMBER_ORDER_REQUEST
}
export interface ISetNumberOrderSuccess {
  readonly type: typeof SET_NUMBER_ORDER_SUCCESS
  readonly payload: {
    name: string,
    number: number
  }
}
export interface ISetNumberOrderError {
  readonly type: typeof SET_NUMBER_ORDER_ERROR
}

export type TOrderAction =
  | ISetNumberOrderRequest
  | ISetNumberOrderSuccess
  | ISetNumberOrderError


export const makeOrder: AppThunk = (ingredients: string) => {
  return function (dispatch) {
    dispatch({
      type: SET_NUMBER_ORDER_REQUEST,
    });

    getResponse<TMakeOrder>("/orders", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: localStorage.getItem('accessToken')
      },
      body: JSON.stringify({
        ingredients: ingredients,
      }),
    })
      .then((data) => {
        const dispatch = useDispatch()
        dispatch({
          type: SET_NUMBER_ORDER_SUCCESS,
          payload: {
            name: data.name,
            number: data.order.number,
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


