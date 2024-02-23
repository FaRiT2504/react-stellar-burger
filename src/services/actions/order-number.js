// import { getOrderRequest } from "../../utils/api";
import { getOrderFeedRequest } from "../../utils/api"

export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST';
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
export const GET_ORDER_FAILED = 'GET_ORDER_FAILED';


export function getFeedOrder(number) {
  return (dispatch) => {
    dispatch({
      type: GET_ORDER_REQUEST
    });
    getOrderFeedRequest(number)
      .then(res => {

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

export function getProfileOrder(number) {
  return (dispatch) => {
    dispatch({
      type: GET_ORDER_REQUEST
    });
    getOrderFeedRequest(number)
      .then(res => {

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