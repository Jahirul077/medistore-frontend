import { useAxiosPublic } from "@/hooks/Axios/useAxiosPublic";
import { useMutation } from "@tanstack/react-query";

export default function useResetPasswordMutation({ onSuccess, onError } = {}) {
  const axiosPublic = useAxiosPublic();

  return useMutation({
    mutationKey: ["resetPasswordMutation"],
    mutationFn: async (data) => {
      const res = await axiosPublic.post("/auth/reset-password", data);
      return res?.data;
    },
    onSuccess,
    onError,
  });
}
