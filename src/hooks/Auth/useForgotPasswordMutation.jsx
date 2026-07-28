import { useAxiosPublic } from "@/hooks/Axios/useAxiosPublic";
import { useMutation } from "@tanstack/react-query";

export default function useForgotPasswordMutation({ onSuccess, onError } = {}) {
  const axiosPublic = useAxiosPublic();

  return useMutation({
    mutationKey: ["forgotPasswordMutation"],
    mutationFn: async (data) => {
      const res = await axiosPublic.post("/auth/forgot-password", data);
      return res?.data;
    },
    onSuccess,
    onError,
  });
}
