import useAxiosPrivate from "@/hooks/Axios/useAxiosPrivate";
import { useMutation } from "@tanstack/react-query";

export default function useDeleteSellerMedicineMutation({ onSuccess, onError } = {}) {
  const axiosPrivate = useAxiosPrivate();

  return useMutation({
    mutationKey: ["deleteSellerMedicineMutation"],
    mutationFn: async (id) => {
      const res = await axiosPrivate.delete(`/seller/medicines/${id}`);
      return res?.data;
    },
    onSuccess,
    onError,
  });
}
