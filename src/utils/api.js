import { URL } from "./constants"
let accessToken = localStorage.getItem("accessToken")
export const checkResponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
}

export const getResponse = (endpoint, property) => {
  return fetch(URL + endpoint, property)
    .then(checkResponse)
}

export const getOrderFeedRequest = (number) => {
  return getResponse(`/orders/${number}`, {
    method: 'GET',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json',
      // Authorization: "Bearer" + localStorage.getItem("accessToken")
    },
  })
}

export const getOrderProfileRequest = (number) => {
  return getResponse(`/orders/${number}?token=${localStorage.getItem("accessToken")}`, {
    method: 'GET',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json',
      // Authorization: "Bearer" + localStorage.getItem("accessToken")
    },
  })
}


const registration = (name, email, password) => {
  return getResponse(`/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      "name": name,
      "email": email,
      "password": password,
    }),
  })
}


const checkEmail = (email) => {
  return getResponse(`/password-reset`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
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

export const resetPassword = (newPassword, token) => {
  return getResponse(`/password-reset/reset`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
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

const login = (email, password) => {
  return getResponse(`/auth/login`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
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
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    "token": localStorage.getItem("refreshToken")
  })
}).then((res) => {
  return res
});


const getUser = () => fetchWithRefresh(`${URL}/auth/user`, {
  method: 'GET',
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer" + localStorage.getItem("accessToken")
  }
});

export const refreshToken = () => fetchWithRefresh(`${URL}/auth/token`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json;charset=utf-8",
  },
  body: JSON.stringify({
    token: localStorage.getItem("refreshToken"),
  }),
})


export const fetchWithRefresh = async (url, options) => {
  try {
    // return getResponse(url, options);
    const res = await fetch(url, options);
    return await checkResponse(res);
  } catch (err) {
    if (err.message === "jwt expired") {
      const refreshData = await refreshToken(); //обновляем токен
      if (!refreshData.success) {
        return Promise.reject(refreshData);
      }
      localStorage.setItem("refreshToken", refreshData.refreshToken);
      localStorage.setItem("accessToken", refreshData.accessToken);
      options.headers.authorization = refreshData.accessToken;
      return await getResponse(url, options);//повторяем запрос
    } else {
      return Promise.reject(err);
    }
  }
};

const userRefresh = (name, email) => fetchWithRefresh(`${URL}/auth/user`, {
  method: 'PATCH',
  headers: {
    "Content-Type": "application/json;charset=utf-8",
    Authorization: localStorage.getItem("accessToken")
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




