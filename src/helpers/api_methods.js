import axios from "axios"
import { Notification } from "components/Common/Notification"

//apply base url for axios
export const API_URL = "http://192.168.1.48:3000/api/v1" //afnan//
// export const API_URL = "https://api.fms.indtechhc.com/api/v1"
// export const API_URL = "https://api.fms.indtechhc.com/api/v1"

export const axiosApi = axios.create({
  baseURL: API_URL,
})
axiosApi.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("token")
    if (token) {
      config.headers["Authorization"] = "token " + localStorage.getItem("token")
    }
    return config
  },
  function (error) {}
)

axiosApi.interceptors.response.use(
  response => {
    return response
  },
  err => {
    console.log(err.response.status)

    if (err.response.status == 401) {
      localStorage.clear("token")
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
