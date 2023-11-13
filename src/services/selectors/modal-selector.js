export const modalOpenSelector = (store) =>
  store.modalReducer.modal;
export const isVisibleModalSelector = (store) =>
  store.modalReducer.isVisibleModal;
export const closeModalSelector = (store) =>
  store.modalReducer.isVisibleModal = false;
