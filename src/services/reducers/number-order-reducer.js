import { SET_NUMBER_ORDER_SUCCESS, SET_NUMBER_ORDER_REQUEST, SET_NUMBER_ORDER_ERROR } from "../actions/number-order-actions";

const initialState = {
  order: null,
  isLoading: false,
  error: null,
};
export const numberOrderReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_NUMBER_ORDER_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        order: action.orderNumber,
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
        order: null,
        error: "Error",
      };
    }
    default: {
      return state;
    }
  }
};

