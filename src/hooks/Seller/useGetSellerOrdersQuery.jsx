import useAxiosPrivate from "@/hooks/Axios/useAxiosPrivate";
import { useQuery } from "@tanstack/react-query";

export default function useGetSellerOrdersQuery() {
  const axiosPrivate = useAxiosPrivate();

  return useQuery({
    queryKey: ["sellerOrders"],
    queryFn: async () => {
      const res = await axiosPrivate.get("/orders/seller");
      return res?.data;
    },
  });
}
