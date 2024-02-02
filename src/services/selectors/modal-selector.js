export const modalOpenSelector = (state) =>
  state.modalReducer.modal;
export const isVisibleModalSelector = (state) =>
  state.modalReducer.isVisibleModal;
export const closeModalSelector = (state) =>
  state.modalReducer.isVisibleModal = false;
