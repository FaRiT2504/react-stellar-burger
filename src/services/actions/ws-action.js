export const WS_CONNECTION_START = 'WS_CONNECTION_START';
export const WS_CONNECTION_SUCCESS = 'WS_CONNECTION_SUCCESS';
export const WS_CONNECTION_ERROR = 'WS_CONNECTION_ERROR';
export const WS_CONNECTION_CLOSED = 'WS_CONNECTION_CLOSED';
export const WS_CONNECTION_DISCONNECT = ' WS_CONNECTION_DISCONNECT';
export const WS_GET_ORDERS = 'WS_GET_ORDERS';
export const WS_SEND_MESSAGE = 'WS_SEND_MESSAGE';
export const WS_USER_NAME_UPDATE = 'WS_USER_NAME_UPDATE';


export const wsConnectionStart = (url) => {
  return {
    type: WS_CONNECTION_START,
    payload: url,
  };
};

export const wsConnectionSuccess = () => {
  return {
    type: WS_CONNECTION_SUCCESS
  };
};

export const wsConnectionError = () => {
  return {
    type: WS_CONNECTION_ERROR
  };
};

export const wsConnectionClosed = () => {
  return {
    type: WS_CONNECTION_CLOSED
  };
};

export const wsGetOrders = orders => {
  return {
    type: WS_GET_ORDERS,
    payload: orders
  };
};

export const wsSendMessage = message => {
  return {
    type: WS_SEND_MESSAGE,
    payload: message
  };
};

export const wsUserNameUpdate = userName => {
  return {
    type: WS_USER_NAME_UPDATE,
    payload: userName
  };
};


