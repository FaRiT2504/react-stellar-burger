import { SET_NUMBER_ORDER_SUCCESS, SET_NUMBER_ORDER_REQUEST, SET_NUMBER_ORDER_ERROR } from "../actions/order-actions";

const initialState = {
  number: null,
  name: null,
  isLoading: false,
  error: null,
};
export const orderReducer = (state = initialState, action) => {
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
        order: null,
        error: "Error",
      };
    }
    default: {
      return state;
    }
  }
};

