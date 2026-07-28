import { useAxiosPublic } from "@/hooks/Axios/useAxiosPublic";
import { useMutation } from "@tanstack/react-query";

export default function useVerifyOtpMutation({ onSuccess, onError } = {}) {
  const axiosPublic = useAxiosPublic();

  return useMutation({
    mutationKey: ["verifyOtpMutation"],
    mutationFn: async (data) => {
      const res = await axiosPublic.post("/auth/verify-otp", data);
      return res?.data;
    },
    onSuccess,
    onError,
  });
}
