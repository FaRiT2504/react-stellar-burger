import {
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_ORDERS,
} from '../constants/constants'
import { TOrdersData } from '../types/data'
// export const WS_CONNECTION_START = 'WS_CONNECTION_START';
// export const WS_CONNECTION_SUCCESS = 'WS_CONNECTION_SUCCESS';
// export const WS_CONNECTION_ERROR = 'WS_CONNECTION_ERROR';
// export const WS_CONNECTION_CLOSED = 'WS_CONNECTION_CLOSED';
// export const WS_GET_ORDERS = 'WS_GET_ORDERS';

export interface IWsConnectionStart {
  readonly type: typeof WS_CONNECTION_START
  readonly payload: string
}
export interface IWsConnectionSuccess {
  readonly type: typeof WS_CONNECTION_SUCCESS
}
export interface IWsConnectionError {
  readonly type: typeof WS_CONNECTION_ERROR
}
export interface IWsConnectionClosed {
  readonly type: typeof WS_CONNECTION_CLOSED
}
export interface IWsGetOrders {
  readonly type: typeof WS_GET_ORDERS
  readonly payload: TOrdersData | null
}

export type TWsAction =
  | IWsConnectionStart
  | IWsConnectionSuccess
  | IWsConnectionError
  | IWsConnectionClosed
  | IWsGetOrders

export const wsConnectionStart = (url: string): IWsConnectionStart => {
  return {
    type: WS_CONNECTION_START,
    payload: url,
  };
};

export const wsConnectionSuccess = (): IWsConnectionSuccess => {
  return {
    type: WS_CONNECTION_SUCCESS
  };
};

export const wsConnectionError = (): IWsConnectionError => {
  return {
    type: WS_CONNECTION_ERROR
  };
};

export const wsConnectionClosed = (): IWsConnectionClosed => {
  return {
    type: WS_CONNECTION_CLOSED
  };
};

export const wsGetOrders = (orders: TOrdersData | null): IWsGetOrders => {
  return {
    type: WS_GET_ORDERS,
    payload: orders
  };
};




