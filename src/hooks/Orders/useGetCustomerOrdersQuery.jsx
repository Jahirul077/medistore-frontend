import useAxiosPrivate from "@/hooks/Axios/useAxiosPrivate";
import { useQuery } from "@tanstack/react-query";

export default function useGetCustomerOrdersQuery({ onSuccess, onError } = {}) {
  const axiosPrivate = useAxiosPrivate();

  return useQuery({
    queryKey: ["getCustomerOrders"],
    queryFn: async () => {
      const res = await axiosPrivate.get("/orders");
      return res?.data;
    },
    onSuccess,
    onError,
  });
}
