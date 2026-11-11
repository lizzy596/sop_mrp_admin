import axios from "axios";
import authService from "./auth.service";

const addAuthHeader = (config) => {
  const { token } = authService.userValue;
  Object.assign(config, {
    withCredentials: true,
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return config;
}

const authHttp = axios.create({
  withCredentials: true,
});

authHttp.interceptors.request.use(function (config) {
  return addAuthHeader(config);;
}, function (error) {
  return Promise.reject(error);
});


authHttp.interceptors.response.use(function (response) {
  Object.assign(response, { isError: false })
  return response;
}, async function (error) {
  const { config } = error;
  if (!config) {
    return Promise.reject(error);
  }

  if (error?.response?.status >= 500) {
    return Promise.reject(error);
  }

  const authError = error?.response?.status > 400 && error?.response?.status < 404
  if (!authError) {
    // console.log("error.response", error)
    if (error?.response) {
      Object.assign(error.response, { isError: true });
      return Promise.resolve(error.response);
    } else {
      Object.assign(error, { response: { isError: true } })
      return Promise.resolve(error)
    }

  }

  if (authError && !config._retry) {
    try {
      await authService.refreshToken();
      config._retry = true;
      return authHttp(addAuthHeader(config))

    } catch {
      console.log("Caught", error.config);
      return Promise.reject(error);
    }
  }
  return Promise.reject(error);
});

export default authHttp;