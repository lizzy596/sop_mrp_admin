import axios from "axios";

axios.defaults.withCredentials = true

export const http = axios.create({
  withCredentials: true,
  baseURL: import.meta.env.VITE_API_URL,
});


export function createCaller(options) {
  const authHttp = axios.create({
    withCredentials: true,
    ...options,
  });

  return authHttp;
}

export function createAuthCaller(token) {
  const axiosCaller = axios.create({
    withCredentials: true,
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
      common: {
        'Authorization': `Bearer ${token}`
      }
    }
  });
  return axiosCaller;
}

const exports = {
  http,
  createCaller,
  createAuthCaller,
}

export default exports