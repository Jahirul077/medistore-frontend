import useAxiosPrivate from "@/hooks/Axios/useAxiosPrivate";
import { useMutation } from "@tanstack/react-query";

export default function useAddSellerMedicineMutation({ onSuccess, onError } = {}) {
  const axiosPrivate = useAxiosPrivate();

  return useMutation({
    mutationKey: ["addSellerMedicineMutation"],
    mutationFn: async (payload) => {
      const res = await axiosPrivate.post("/seller/medicines", payload);
      return res?.data;
    },
    onSuccess,
    onError,
  });
}
