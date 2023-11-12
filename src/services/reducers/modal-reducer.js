import { CLOSE_MODAL, OPEN_MODAL } from "../actions/modal-action"

const initialState = {
  modal: null,
  isVisibleModal: false
};

export const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_MODAL: {
      return {
        ...state,
        modal: action.payload.modal,
        isVisibleModal: true
      };
    }

    case CLOSE_MODAL: {
      return {
        modal: action.payload.modal,
        isVisibleModal: action.payload.isVisibleModal
      };
    }
    default: {
      return state;
    }
  }
};