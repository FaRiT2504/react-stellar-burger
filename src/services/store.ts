import { legacy_createStore as createStore, compose, applyMiddleware } from 'redux';
import { rootReducer } from "./reducers/rootReducer";
import { socketMiddleware } from './middleware/socetMiddleware';
import thunk from "redux-thunk";
import {
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_GET_ORDERS,
  WS_CONNECTION_CLOSED,
} from './constants/constants';

// import {TInitialState} from './reducers/burger-constructor-reducer';
export type TWsActions = {
  wsInit: typeof WS_CONNECTION_START,
  wsClose: typeof WS_CONNECTION_CLOSED,
  onOpen: typeof WS_CONNECTION_SUCCESS,
  onError: typeof WS_CONNECTION_ERROR,
  onOrders: typeof WS_GET_ORDERS,
}

const wsActions = {
  wsInit: WS_CONNECTION_START,
  wsClose: WS_CONNECTION_CLOSED,
  onOpen: WS_CONNECTION_SUCCESS,
  onError: WS_CONNECTION_ERROR,
  onOrders: WS_GET_ORDERS,
};

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose : compose;

const enhancer = composeEnhancers(applyMiddleware(thunk, socketMiddleware(wsActions)));

export const store = createStore(rootReducer, enhancer);











