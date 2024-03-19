import {
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_ORDERS
} from "../constants/constants";
import { TOrdersInfo } from '../types/data'
import { TWsAction } from "../actions/ws-action";

type TInitialState = {
  wsConnected: boolean,
  wsRequest: boolean,
  wsError: boolean,
  ordersInfo: TOrdersInfo | null,
};

const initialState: TInitialState = {
  wsConnected: false,
  wsRequest: false,
  wsError: false,
  ordersInfo: null,
};



export const wsReducer = (state = initialState, action: TWsAction): TInitialState => {
  switch (action.type) {
    case WS_CONNECTION_START: {
      return {
        ...state,
        wsRequest: true
      }
    }
    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        wsConnected: true
      };
    case WS_GET_ORDERS: {
      return {
        ...state,
        ordersInfo: action.payload
      }
    }
    case WS_CONNECTION_ERROR:
      return {
        ...state,
        wsConnected: false,
        wsError: true,
      };

    case WS_CONNECTION_CLOSED:
      return {
        ...state,
        wsConnected: false
      };

    default:
      return state;
  }
};






