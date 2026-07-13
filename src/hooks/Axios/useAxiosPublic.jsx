import axios from "axios";

const BASE_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/api`;

if (!process.env.NEXT_PUBLIC_BASE_URL) {
  console.warn("NEXT_PUBLIC_BASE_URL is not defined in .env file");
}

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: false,
});

export const useAxiosPublic = () => axiosInstance;

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

export default useAxiosPublic;
