export const ingredientsIsLoadingSelector = (store) =>
  store.ingredientsReducer.isLoading;

export const ingredientsDataSelector = (store) =>
  store.ingredientsReducer.ingredients;

export const ingredientsErrorSelector = (store) =>
  store.ingredientsReducer.error;


export const bunSelector = (state) => state.burgerConstructorReducer.bun;

export const burgerIngredientsSelector = (state) =>
  state.burgerConstructorReducer.ingredients;