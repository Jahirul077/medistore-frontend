import axios from "axios";

const getBaseUrl = () => {
  const envUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://medistore-api-seven.vercel.app";
  if (envUrl.endsWith("/api")) {
    return envUrl;
  }
  return `${envUrl.replace(/\/$/, "")}/api`;
};

const axiosInstance = axios.create({
  baseURL: getBaseUrl(),
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      return Promise.reject({
        message: "Network error. Please check your connection.",
        status: 0,
      });
    }

    const { status, data } = error.response;

    return Promise.reject({
      status,
      message: data?.message || "Something went wrong. Please try again.",
      ...data,
    });
  }
);

export const useAxiosPublic = () => axiosInstance;
