import useAxiosPrivate from "@/hooks/Axios/useAxiosPrivate";
import { useMutation } from "@tanstack/react-query";

export default function useCreatePaymentMutation({ onSuccess, onError } = {}) {
  const axiosPrivate = useAxiosPrivate();

  return useMutation({
    mutationKey: ["createPaymentMutation"],
    mutationFn: async (payload) => {
      const res = await axiosPrivate.post("/payment", payload);
      return res?.data;
    },
    onSuccess,
    onError,
  });
}
