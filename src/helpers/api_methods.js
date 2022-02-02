import axios from "axios"
import { Notification } from "components/Common/Notification"

//apply base url for axios

// export const API_URL = "https://api.fms.lohasteels.com/api/v1" //server//
// export const API_URL = "http://192.168.0.120:8000/api/v1" //naseem/
// export const API_URL = "http://192.168.1.14:3333/api/v1" //afnan//
// export const API_URL = "http://192.168.0.143:8000/api/v1" //hakeem/
// export const API_URL = "http://192.168.0.100:8000/api/v1" //hashid/
// export const API_URL = "http://192.168.0.115:8000/api/v1" //hakeem/
export const API_URL = "http://127.0.0.1:8000/api/v1" //mac//

export const axiosApi = axios.create({
  baseURL: API_URL,
})
axiosApi.interceptors.request.use(
  function (config) {
    const token = sessionStorage.getItem("token")
    if (token) {
      config.headers["Authorization"] =
        "token " + sessionStorage.getItem("token")
    }
    return config
  },
  function (error) {
    console.log(error.response)
  }
)

axiosApi.interceptors.response.use(
  response => {
    return response
  },
  err => {
    if (err.response.status == 401) {
      sessionStorage.clear("token")
      window.location.reload(false)

      Notification({
        type: "error",
        message: err?.response?.data?.detail,
        title: err?.response?.statusText,
      })
    } else {
      Notification({
        type: "error",
        message: err?.response?.data?.detail,
        title: err?.response?.statusText,
      })
    }
    console.log(err.response)
    return err.response
  }
)

export async function get(url, config = {}) {
  return await axiosApi.get(url, { ...config }).then(response => response.data)
}

export async function post(url, data, config = {}) {
  return axiosApi
    .post(url, { ...data }, { ...config })
    .then(response => response.data)
}

export async function ApiPut(url, data, config = {}) {
  return axiosApi
    .put(url, { ...data }, { ...config })
    .then(response => response.data)
}

export async function patch(url, data, config = {}) {
  return axiosApi
    .patch(url, { ...data }, { ...config })
    .then(response => response.data)
}

export async function del(url, config = {}) {
  return await axiosApi
    .delete(url, { ...config })
    .then(response => response.data)
}
