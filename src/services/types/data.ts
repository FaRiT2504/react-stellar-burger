import { FC } from "react"
export type TIngredient = {
  readonly _id: string
  readonly name: string;
  readonly type: string;
  readonly proteins: number;
  readonly fat: number;
  readonly ingredient?: TIngredient;
  readonly carbohydrates: number;
  readonly calories: number;
  readonly price: number;
  readonly image: string;
  readonly image_large: string;
  readonly image_mobile: string;
  readonly __v: number;
  readonly uuid?: string | null
  readonly key?: string | null
  readonly action?: TIngredient | null
}
// export interface IOrder {
//   _id: string,
//   status: string,
//   number: number,
//   name: string,
//   createdAt: string,
//   updatedAt: string,
//   ingredients: string[]
// }
export type TOrder = {
  name?: string | null;
  createdAt: string;
  ingredients: string[];
  number: string | number;
  status: string | null;
  updatedAt: string;
  _id: string | number;
};
// export type TOrder = {
//   ingredients: string[],
//   _id: string | number,
//   status: string,
//   number: number,
//   createdAt: string,
//   updatedAt: string,
// } 
export type TGetResponse = {
  success: boolean;
  data: TIngredient[];
};

export type TUser = {
  readonly email: string;
  readonly name: string;
};

export type TRegistration = {
  success: boolean;
  user: TUser;
  refreshData: string[] | undefined
  refreshToken: string;
  accessToken: string;
}


export type TOwner = {
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
};

type TOrderInDetails = Omit<TOrder, 'ingredients'> & TOwner & {
  ingredients: TIngredient[];
};

export type TMakeOrder = {
  name: string;
  order: TOrderInDetails;
  success: boolean;
  user: TUser;
  refreshToken: string;
  accessToken: string;
  // accessToken: string | undefined;
  // refreshToken: {
  //   refreshToken: string | undefined;
  // }
};
export interface IProtectedRoute {
  onlyUnAuth?: boolean
  component: JSX.Element;
}

export interface INotProtected {
  component: JSX.Element;
}

export type TGetUser = Omit<TRegistration, 'accessToken' | 'refreshToken'> & TUser;
export type TResetPassword = {
  success: boolean;
  message: string;
}
export type TOrderNumber = {
  success: boolean;
  orders: TOrder;
};
export type TRefreshOption = {
  cache?: string
  method?: string
  headers: {
    "Content-Type": string
    Authorization?: string
  };
  body?: {
    "name": string,
    "email": string,
  } | string
};

export type TRefresh = Omit<TRegistration, 'user'>

export type TLogOut = {
  success: boolean;
  message: string;
}

export type TOrdersData = {
  total: number;
  totalToday: number;
  orders: ReadonlyArray<TOrder>
}


export type TOrdersInfo = {
  success: boolean,
  orders: ReadonlyArray<TOrder>,
  total: number,
  totalToday: number
}

export type TGetIngredients = {
  success: boolean;
  data: TIngredient[];
};

export type TCheckEmail = {
  // success: boolean;
  user: TUser;
}


