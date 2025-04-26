import axios from "axios";
import { useUserStore } from "../store/user-store";
import { getRefreshToken } from "../api-services/auth-services";
import { logoutHandler } from "../utils/navigator";
import { AxiosRequestConfig } from "axios";

export type CustomAxiosRequestConfig = AxiosRequestConfig & {
  _retry?: boolean;
};

const baseURL = import.meta.env.VITE_API_BASEURL;

export const axiosInstance = axios.create({
  baseURL,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = useUserStore.getState().access_token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.log(`start of error block!`);
    const originalRequest = error.config as CustomAxiosRequestConfig;
    console.log({ ...originalRequest });

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const refresh_token = useUserStore.getState().refresh_token;
        if (!refresh_token) {
          logoutHandler();
          return Promise.reject(error);
        }
        await getRefreshToken(refresh_token);
        const newAccessToken = useUserStore.getState().access_token;

        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        }

        return axiosInstance(originalRequest);
      } catch (err) {
        logoutHandler();
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);
