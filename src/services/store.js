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

} from './actions/ws-action';



const wsActions = {
  wsInit: WS_CONNECTION_START,
  wsClose: WS_CONNECTION_CLOSED,
  onOpen: WS_CONNECTION_SUCCESS,
  onError: WS_CONNECTION_ERROR,
  onOrders: WS_GET_ORDERS,
};

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(applyMiddleware(thunk, socketMiddleware(wsActions)));

export const store = createStore(rootReducer, enhancer);








