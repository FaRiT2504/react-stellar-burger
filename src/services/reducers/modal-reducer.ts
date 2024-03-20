import { CLOSE_MODAL, OPEN_MODAL } from "../constants/constants"
import { TModalAction } from '../actions/modal-action';

type TInitialState = {
  modal: null | string,
  isVisibleModal: boolean
};

const initialState: TInitialState = {
  modal: null,
  isVisibleModal: false
};

export const modalReducer = (state = initialState, action: TModalAction): TInitialState => {
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