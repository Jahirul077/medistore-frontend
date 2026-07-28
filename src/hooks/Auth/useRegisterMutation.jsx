import { useAxiosPublic } from "@/hooks/Axios/useAxiosPublic";
import { useMutation } from "@tanstack/react-query";

export default function useRegisterMutation({ onSuccess, onError } = {}) {
  const axiosPublic = useAxiosPublic();

  return useMutation({
    mutationKey: ["registerMutation"],
    mutationFn: async (data) => {
      const res = await axiosPublic.post("/auth/register", data);
      return res?.data;
    },
    onSuccess,
    onError,
  });
}
