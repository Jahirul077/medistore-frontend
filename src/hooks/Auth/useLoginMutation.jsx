import { useAxiosPublic } from "@/hooks/Axios/useAxiosPublic";
import { useMutation } from "@tanstack/react-query";

export default function useLoginMutation({ onSuccess, onError } = {}) {
  const axiosPublic = useAxiosPublic();

  return useMutation({
    mutationKey: ["loginMutation"],
    mutationFn: async (data) => {
      const res = await axiosPublic.post("/auth/login", data);
      return res?.data;
    },
    onSuccess,
    onError,
  });
}
