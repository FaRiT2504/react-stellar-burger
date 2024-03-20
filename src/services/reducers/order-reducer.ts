import { SET_NUMBER_ORDER_SUCCESS, SET_NUMBER_ORDER_REQUEST, SET_NUMBER_ORDER_ERROR } from "../constants/constants";
import { TOrderAction } from "../actions/order-action";

type TInitialState = {
  number: null | number,
  name: null | string,
  isLoading: boolean,
  error: null | string,
};

const initialState: TInitialState = {
  number: null,
  name: null,
  isLoading: false,
  error: null,
};
export const orderReducer = (state = initialState, action: TOrderAction): TInitialState => {
  switch (action.type) {
    case SET_NUMBER_ORDER_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        name: action.payload.name,
        number: action.payload.number,
      };
    }
    case SET_NUMBER_ORDER_REQUEST: {
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    }
    case SET_NUMBER_ORDER_ERROR: {
      return {
        isLoading: false,
        number: null,
        name: null,
        error: "Error",
      };
    }
    default: {
      return state;
    }
  }
};

