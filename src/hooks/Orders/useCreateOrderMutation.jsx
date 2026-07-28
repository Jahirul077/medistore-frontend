import useAxiosPrivate from "@/hooks/Axios/useAxiosPrivate";
import { useMutation } from "@tanstack/react-query";

export default function useCreateOrderMutation({ onSuccess, onError } = {}) {
  const axiosPrivate = useAxiosPrivate();

  return useMutation({
    mutationKey: ["createOrderMutation"],
    mutationFn: async (orderData) => {
      const res = await axiosPrivate.post("/orders", orderData);
      return res?.data;
    },
    onSuccess,
    onError,
  });
}
