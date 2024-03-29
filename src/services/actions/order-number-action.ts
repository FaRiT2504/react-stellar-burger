// import { getOrderRequest } from "../../utils/api";
import { getOrderFeedRequest } from "../../utils/api"
import { GET_ORDER_REQUEST, GET_ORDER_SUCCESS, GET_ORDER_FAILED } from '../constants/constants'
import { useDispatch } from "../../utils/hooks/useDispatch";
import { AppThunk } from "../types";
import { TOrdersInfo, TOrderNumber } from "../types/data";
// import { TMakeOrder, TLogOut, TRefreshOption, TRefresh, TRegistration, TGetIngredients, TGetUser, TResetPassword, TOrderNumber } from "../services/types/data";
// export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST';
// export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
// export const GET_ORDER_FAILED = 'GET_ORDER_FAILED';
export interface ISetNumberOrderRequest {
  readonly type: typeof GET_ORDER_REQUEST
}
export interface ISetNumberOrderSuccess {
  readonly type: typeof GET_ORDER_SUCCESS
  readonly payload: TOrdersInfo | null
}
export interface ISetNumberOrderFailed {
  readonly type: typeof GET_ORDER_FAILED
}

export type TNumberOrderAction =
  | ISetNumberOrderRequest
  | ISetNumberOrderSuccess
  | ISetNumberOrderFailed


export const getFeedOrder: AppThunk = (number: string | number) => {
  return function (dispatch) {
    dispatch({
      type: GET_ORDER_REQUEST
    });
    getOrderFeedRequest(number)
      .then(res => {
        const dispatch = useDispatch()
        dispatch({
          type: GET_ORDER_SUCCESS,
          payload: res
        })

      })
      .catch(err => {
        dispatch({
          type: GET_ORDER_FAILED
        })
      })
  }
}

export const getProfileOrder: AppThunk = (number: string | number) => {
  return function (dispatch) {
    dispatch({
      type: GET_ORDER_REQUEST
    });
    getOrderFeedRequest(number)
      .then(res => {
        const dispatch = useDispatch()
        dispatch({
          type: GET_ORDER_SUCCESS,
          payload: res
        })

      })
      .catch(err => {
        dispatch({
          type: GET_ORDER_FAILED
        })
      })
  }
}