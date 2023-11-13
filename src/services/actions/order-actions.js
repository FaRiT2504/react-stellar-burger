export const SET_NUMBER_ORDER_REQUEST = "SET_NUMBER_ORDER_REQUEST";
export const SET_NUMBER_ORDER_SUCCESS = "SET_NUMBER_ORDER_SUCCESS";
export const SET_NUMBER_ORDER_ERROR = "SET_NUMBER_ORDER_ERROR";



export function orderSuccess(data) {
  return {
    type: SET_NUMBER_ORDER_SUCCESS,
    payload: {
      number: data.order.number,
      name: data.name
    }
  };
}
