import { getIngredientsRequest } from "../../utils/api"
// import { v4 as uuid } from "uuid";
import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_ERROR,
} from '../constants/constants';
import { TIngredient } from '../types/data';
import { AppThunk } from "../types";
// export const GET_INGREDIENTS_SUCCESS = "GET_INGREDIENTS_SUCCESS";
// export const GET_INGREDIENTS_REQUEST = "GET_INGREDIENTS_REQUEST";
// export const GET_INGREDIENTS_ERROR = "GET_INGREDIENTS_ERROR";

export interface IGetIngredientsRequest {
  readonly type: typeof GET_INGREDIENTS_REQUEST;
}

export interface IGetIngredientsSuccess {
  readonly type: typeof GET_INGREDIENTS_SUCCESS;
  readonly payload: TIngredient[] | null;
}

export interface IGetIngredientsError {
  readonly type: typeof GET_INGREDIENTS_ERROR;
  readonly payload: string;
}

export type TIngredientsActions =
  | IGetIngredientsRequest
  | IGetIngredientsSuccess
  | IGetIngredientsError



export const getIngredients: AppThunk = () => {
  return (dispatch) => {
    dispatch({ type: GET_INGREDIENTS_REQUEST });
    getIngredientsRequest()
      .then((res) => {

        dispatch({
          type: GET_INGREDIENTS_SUCCESS,
          payload: res.data,
        })

      })
      .catch((error) => {
        dispatch({
          type: GET_INGREDIENTS_ERROR,
          payload: error
        })
      })

  }
}