import { URL } from "./constants"

export const checkResponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
}

export const getResponse = (endpoint, property) => {
  return fetch(URL + endpoint, property)
    .then(checkResponse)
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

const logout = () => {
  return getResponse(`/auth/login`, {
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
}

const getUser = () => fetchWithRefresh(`/auth/user`, {
  method: 'GET',
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer " + localStorage.getItem("accessToken")
  }
});



export const refreshToken = () => {
  return getResponse(`/auth/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  })
};

export const fetchWithRefresh = async (url, options) => {
  try {
    return await getResponse(url, options);
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



export const api = {
  registration,
  getUser,
  login,
  logout,
  getResponse,
  resetPassword,
  fetchWithRefresh,
  refreshToken,
  checkEmail
};




