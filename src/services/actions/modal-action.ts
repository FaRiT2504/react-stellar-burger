import {
  CLOSE_MODAL,
  OPEN_MODAL,
} from '../constants/constants';

// export const CLOSE_MODAL = "CLOSE_MODAL"
// export const OPEN_MODAL = "OPEN_MODAL"

export interface IOpenModalAction {
  readonly type: typeof OPEN_MODAL;
  readonly payload: {
    modal: string
  }
}

export interface ICloseModalAction {
  readonly type: typeof CLOSE_MODAL;
  readonly payload: {
    modal: null,
    isVisibleModal: boolean
  }
}

export type TModalAction =
  | IOpenModalAction
  | ICloseModalAction


export const openModalAction = (item: string): IOpenModalAction => {
  return {
    type: OPEN_MODAL,
    payload: {
      modal: item,
    }
  };
}

export const closeModalAction = (): ICloseModalAction => {
  return {
    type: CLOSE_MODAL,
    payload: {
      modal: null,
      isVisibleModal: false
    }
  };
}
