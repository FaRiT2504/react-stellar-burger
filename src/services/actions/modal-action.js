export const CLOSE_MODAL = "CLOSE_MODAL"
export const OPEN_MODAL = "OPEN_MODAL"
export const openModalAction = (item) => {
  return {
    type: OPEN_MODAL,
    payload: {
      modal: item,
    }
  };
}

export const closeModalAction = () => {
  return {
    type: CLOSE_MODAL,
    payload: {
      modal: null,
      isVisibleModal: false

    }
  };
}