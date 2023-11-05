export const ingredientsIsLoadingSelector = (store) =>
  store.ingredientsReducer.isLoading;
export const ingredientsDataSelector = (store) =>
  store.ingredientsReducer.ingredients;
export const ingredientsErrorSelector = (store) =>
  store.ingredientsReducer.error;