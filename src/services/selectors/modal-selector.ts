import { RootState } from '../../services/types/index';
export const modalOpenSelector = (state: RootState) =>
  state.modalReducer.modal;
export const isVisibleModalSelector = (state: RootState) =>
  state.modalReducer.isVisibleModal;
export const closeModalSelector = (state: RootState) =>
  state.modalReducer.isVisibleModal = false;
