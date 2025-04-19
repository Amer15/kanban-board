import axios from "axios";
import { useUserStore } from "../store/user-store";
import { getRefreshToken } from "../api-services/auth-services";

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
    console.log(`Token Error`);
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const refresh_token = useUserStore((state) => state.refresh_token);
        if (!refresh_token) {
          return Promise.reject("failed to get refresh token");
        }
        await getRefreshToken(refresh_token);
        const newAccessToken = useUserStore.getState().access_token;
        console.log(`new access token: ${newAccessToken}`);
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (error) {
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);
