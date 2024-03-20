import { URL } from "./data"
import { TMakeOrder, TLogOut, TRefreshOption, TRefresh, TRegistration, TGetIngredients, TGetUser, TResetPassword, TOrderNumber } from "../services/types/data";


export const checkResponse = <T>(res: Response): Promise<T> => {
  return res.ok ? res.json() : res.json().then((err: Response) => Promise.reject(err));
}

export const getResponse = <T>(endpoint: string, property: object) => {
  return fetch(URL + endpoint, property)
    .then(checkResponse<T>)
}

export const getIngredientsRequest = () => {
  return getResponse<TGetIngredients>(`/ingredients`, {
    method: 'GET',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      // Authorization: "Bearer" + localStorage.getItem("accessToken")
    },
  })
}


export const getOrderFeedRequest = (number: string | number) => {
  return getResponse<TOrderNumber>(`/orders/${number}`, {
    method: 'GET',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      // Authorization: "Bearer" + localStorage.getItem("accessToken")
    },
  })
}

export const getOrderProfileRequest = (number: string) => {
  return getResponse<TOrderNumber>(`/orders/${number}?token=${localStorage.getItem("accessToken")}`, {
    method: 'GET',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      // Authorization: "Bearer" + localStorage.getItem("accessToken")
    },
  })
}


const registration = (name: string, email: string, password: string) => {
  return getResponse<TRegistration>(`/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      "name": name,
      "email": email,
      "password": password,
    }),
  })
}


const checkEmail = (email: string) => {
  return getResponse<TRegistration>(`/password-reset`, {
    method: "POST",
    headers: {
      "Content-type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      "email": email,
    }),
  })
    .then((res) => {
      localStorage.setItem("resetPassword", "true");
      return res
    })
}

export const resetPassword = (newPassword: string, token: string) => {
  return getResponse<TResetPassword>(`/password-reset/reset`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      "password": newPassword,
      "token": token
    })
  }).then((res) => {
    localStorage.removeItem("resetPassword");
    return res
  });
};

const login = (email: string, password: string) => {
  return fetchWithRefresh<TRegistration>(`${URL}/auth/login`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      "email": email,
      "password": password
    })
  })
}


const logout = () => fetchWithRefresh<TLogOut>(`${URL}/auth/logout`, {
  method: 'POST',
  headers: {
    "Content-Type": "application/json;charset=utf-8",
  },
  body: JSON.stringify({
    "token": localStorage.getItem("refreshToken") as string
  })
}).then((res) => {
  return res
});


const getUser = () => fetchWithRefresh(`${URL}/auth/user`, {
  method: 'GET',
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer" + localStorage.getItem("accessToken") as string
  }
});

export const refreshToken = () => fetchWithRefresh<TRefresh>(`${URL}/auth/token`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json;charset=utf-8",
  },
  body: JSON.stringify({
    token: localStorage.getItem("refreshToken") as string,
  }),
})

export const fetchWithRefresh = async <T>(url: string, options: RequestInit & TRefreshOption): Promise<TRegistration | TMakeOrder> => {
  try {
    // return getResponse(url, options);
    const res = await fetch(url, options);
    return await checkResponse(res);
  } catch (err: any) {
    if (err.message === "jwt expired") {
      const refreshData = await refreshToken(); //обновляем токен
      if (!refreshData.success) {
        return Promise.reject(refreshData);
      }
      localStorage.setItem("refreshToken", refreshData.refreshToken);
      localStorage.setItem("accessToken", refreshData.accessToken);
      options.headers.Authorization = refreshData.accessToken;
      return await getResponse(url, options);//повторяем запрос
    } else {
      return Promise.reject(err);
    }
  }
};

const userRefresh = (name: string, email: string) => fetchWithRefresh(`${URL}/auth/user`, {
  method: 'PATCH',
  headers: {
    "Content-Type": "application/json;charset=utf-8",
    Authorization: localStorage.getItem("accessToken") as string
  },
  body: JSON.stringify({
    "name": name,
    "email": email,
  })
}) as Promise<TRegistration>;


export const api = {
  registration,
  getUser,
  login,
  logout,
  getResponse,
  resetPassword,
  fetchWithRefresh,
  refreshToken,
  checkEmail,
  userRefresh,
  getOrderFeedRequest
};




