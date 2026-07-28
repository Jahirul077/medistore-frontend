import useAxiosPrivate from "@/hooks/Axios/useAxiosPrivate";
import { useMutation } from "@tanstack/react-query";

export default function useUpdateSellerMedicineMutation({ onSuccess, onError } = {}) {
  const axiosPrivate = useAxiosPrivate();

  return useMutation({
    mutationKey: ["updateSellerMedicineMutation"],
    mutationFn: async ({ id, data }) => {
      const res = await axiosPrivate.patch(`/seller/medicines/${id}`, data);
      return res?.data;
    },
    onSuccess,
    onError,
  });
}
