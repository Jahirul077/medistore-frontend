import { getLocalStorage, removeLocalStorage } from "@/utils/localStorage";
import { getSessionStorage, removeSessionStorage } from "@/utils/sessionStorage";
import axios from "axios";
import { toast } from "sonner";

const getBaseUrl = () => {
  const envUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://medistore-api-seven.vercel.app";
  if (envUrl.endsWith("/api")) {
    return envUrl;
  }
  return `${envUrl.replace(/\/$/, "")}/api`;
};

const axiosInstance = axios.create({
  baseURL: getBaseUrl(),
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  timeout: 30000,
});

const useAxiosPrivate = () => axiosInstance;

axiosInstance.interceptors.request.use(
  (config) => {
    const token =
      getLocalStorage("MEDISTORE_ACCESS_TOKEN") ||
      getSessionStorage("MEDISTORE_ACCESS_TOKEN");

    if (token) {
      config.headers.Authorization = token.startsWith("Bearer ") ? token : `Bearer ${token}`;
    }

    if (config.data instanceof FormData) {
      delete config.headers["Content-Type"];
    }

    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { response, config } = error;

    if (config?.skipGlobalToast) {
      return Promise.reject(error);
    }

    if (!response) {
      toast.error("Network error — please check your connection.");
      return Promise.reject(error);
    }

    const status = response.status;
    const errorMessage = String(response.data?.message || "").toLowerCase();

    const isUserNotExistError =
      errorMessage.includes("user does not exist") ||
      errorMessage.includes("user not found") ||
      errorMessage.includes("user invalid") ||
      errorMessage.includes("invalid user") ||
      errorMessage.includes("account not found");

    if (status === 401 || isUserNotExistError) {
      toast.error(response.data?.message || "Session expired or user does not exist. Logging out...");
      
      if (typeof window !== "undefined") {
        localStorage.clear();
        sessionStorage.clear();
        if (!window.location.pathname.includes("/auth/login")) {
          window.location.href = "/auth/login";
        }
      }

      return Promise.reject(error);
    }

    if (status === 403) {
      toast.error("You don’t have permission to access this resource.");
      return Promise.reject(error);
    }

    if (status === 400) {
      toast.error(response.data?.message || "Invalid request.");
      return Promise.reject(error);
    }

    if (status === 404) {
      toast.error(response.data?.message || "Requested resource not found.");
      return Promise.reject(error);
    }

    if (status >= 500) {
      toast.error("Server error — please try again later.");
      return Promise.reject(error);
    }

    toast.error(response.data?.message || "Something went wrong.");
    return Promise.reject(error);
  }
);

export default useAxiosPrivate;
