import { URL } from "./data"
import { TGetUser, TMakeOrder, TRefreshOption, TRefresh, TLogOut, TRegistration } from "../services/types/data";
import { string } from "prop-types";

let accessToken = localStorage.getItem("accessToken")
export const checkResponse = (res: any) => {
  return res.ok ? res.json() : res.json().then((err: string) => Promise.reject(err));
}


export const getResponse = (endpoint: string, property: object) => {
  return fetch(URL + endpoint, property)
    .then(checkResponse)
}

export const getIngredientsRequest = () => {
  return getResponse(`/ingredients`, {
    method: 'GET',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      // Authorization: "Bearer" + localStorage.getItem("accessToken")
    },
  })
}


export const getOrderFeedRequest = (number: string | number) => {
  return getResponse(`/orders/${number}`, {
    method: 'GET',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      // Authorization: "Bearer" + localStorage.getItem("accessToken")
    },
  })
}

export const getOrderProfileRequest = (number: string) => {
  return getResponse(`/orders/${number}?token=${localStorage.getItem("accessToken")}`, {
    method: 'GET',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      // Authorization: "Bearer" + localStorage.getItem("accessToken")
    },
  })
}


const registration = (name: string, email: string, password: string) => {
  return getResponse(`/auth/register`, {
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
  return getResponse(`/password-reset`, {
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
  return getResponse(`/password-reset/reset`, {
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

// const login = (email: string, password: string) => {
//   return getResponse(`/auth/login`, {
//     method: 'POST',
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       "email": email,
//       "password": password
//     })
//   })
// }

const login = (email: string, password: string) => {
  return fetchWithRefresh(`${URL}/auth/login`, {
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


const logout = () => fetchWithRefresh(`${URL}/auth/logout`, {
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

export const refreshToken = () => fetchWithRefresh(`${URL}/auth/token`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json;charset=utf-8",
  },
  body: JSON.stringify({
    token: localStorage.getItem("refreshToken") as string,
  }),
})


export const fetchWithRefresh = async (url: string, options: RequestInit & TRefreshOption): Promise<TRegistration | TMakeOrder> => {
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
});


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




