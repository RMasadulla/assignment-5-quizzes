import axios from "axios";
import { useEffect } from "react";
import { axiosInstance } from "../api";
import { AUTH_URL } from "../api/config";
import { useAuth } from "./useAuth";

export const useAxios = () => {
  const { auth, setAuth } = useAuth();

  useEffect(() => {
    const requestIntercept = axiosInstance.interceptors.request.use(
      (config) => {
        const accessToken = auth?.accessToken;
        if (accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = axiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (error.response.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            const refreshToken = auth?.refreshToken;

            const response = await axios.post(`${AUTH_URL}/refresh-token`, {
              refreshToken,
            });

            const { accessToken, refreshToken: newRefreshToken } =
              response.data.data;

            setAuth((prevAuth) => ({
              ...prevAuth,
              accessToken,
              refreshToken: newRefreshToken || prevAuth.refreshToken,
            }));

            originalRequest.headers.Authorization = `Bearer ${accessToken}`;
            return axios(originalRequest);
          } catch (error) {
            throw error;
          }
        }

        return Promise.reject(error);
      }
    );
    return () => {
      axiosInstance.interceptors.request.eject(requestIntercept);
      axiosInstance.interceptors.response.eject(responseIntercept);
    };
  }, [auth.accessToken]);

  return { axiosInstance };
};
