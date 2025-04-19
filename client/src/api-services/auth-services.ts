import axios, { AxiosError } from "axios";
import { axiosInstance } from "../config/axios-config";
import { useUserStore } from "../store/user-store";
import { AuthData } from "../types";

export const registerUser = async ({
  email,
  full_name,
  password,
}: {
  email: string;
  full_name: string;
  password: string;
}) => {
  try {
    await axios.post(`${import.meta.env.VITE_API_BASEURL}/users/register`, {
      full_name,
      email,
      password,
    });
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(error.message);
      if (
        error.response?.data?.message
      ) {
        throw new Error(error.response.data.message);
      } else {
        throw new Error(
          error.message ?? "something went wrong! failed to register"
        );
      }
    }
  }
};

export const login = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_API_BASEURL}/users/login`, {
      email,
      password
    });
    const data: AuthData = {
      access_token: response.data.access_token,
      refresh_token: response.data.refresh_token,
      user: response.data.user,
    };
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      if (
        error.response?.data?.message
      ) {
        throw new Error(error.response.data.message);
      } else {
        throw new Error(
          error.message ?? "something went wrong! failed to login"
        );
      }
    }
    return null;
  }
};

export const getRefreshToken = async (refresh_token: string) => {
  try {
    const response = await axiosInstance.post(`/customers/refresh-token`, {
      refresh_token,
    });

    const newAccessToken: string = response.data.access_token;
    const updateAccessToken = useUserStore.getState().updateAccessToken;
    updateAccessToken(newAccessToken);
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(error.message);
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      } else {
        throw new Error(
          error.message ?? "something went wrong! failed to login"
        );
      }
    }
  }
};
