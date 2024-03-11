import {
  GET_ORDER_SUCCESS,
  GET_ORDER_FAILED,
  GET_ORDER_REQUEST
} from "../constants/constants";
import { TNumberOrderAction } from "../actions/order-number-action";
import { TOrdersInfo } from "../types/data";
type TInitialState = {
  orderRequest: boolean,
  orderFailed: boolean,
  data: null | TOrdersInfo,
};
const initialState: TInitialState = {
  orderRequest: false,
  orderFailed: false,
  data: null
}

export const orderNumberReducer = (state = initialState, action: TNumberOrderAction): TInitialState => {
  switch (action.type) {
    case GET_ORDER_REQUEST: {
      return {
        ...state,
        orderRequest: true,
        orderFailed: false,
      };
    }

    case GET_ORDER_SUCCESS: {
      return {
        ...state,
        orderRequest: false,
        data: action.payload,
      };
    }

    case GET_ORDER_FAILED: {
      return {
        ...state,
        orderRequest: false,
        orderFailed: true,
      };
    }


    default: {
      return state;
    }
  }
}