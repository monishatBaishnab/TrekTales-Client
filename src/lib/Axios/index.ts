import axios from "axios";
import { cookies } from "next/headers";

import localConfig from "@/config/localConfig";

const axiosInstance = axios.create({
  baseURL: localConfig.publicApi,
});

axiosInstance.interceptors.request.use(
  function (config) {
    const cookieStore = cookies();
    const accessToken = cookieStore.get("token")?.value;

    if (accessToken) {
      config.headers.Authorization = accessToken;
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
export default axiosInstance;
