import useAxiosPrivate from "@/hooks/Axios/useAxiosPrivate";
import { useMutation } from "@tanstack/react-query";

export default function useUpdateSellerOrderStatusMutation({ onSuccess, onError } = {}) {
  const axiosPrivate = useAxiosPrivate();

  return useMutation({
    mutationKey: ["updateSellerOrderStatus"],
    mutationFn: async ({ orderId, status }) => {
      const res = await axiosPrivate.patch(`/orders/seller/${orderId}`, {
        status,
      });
      return res?.data;
    },
    onSuccess,
    onError,
  });
}
