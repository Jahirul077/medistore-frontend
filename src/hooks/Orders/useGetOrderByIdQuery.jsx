import useAxiosPrivate from "@/hooks/Axios/useAxiosPrivate";
import { useQuery } from "@tanstack/react-query";

export default function useGetOrderByIdQuery(id) {
  const axiosPrivate = useAxiosPrivate();

  return useQuery({
    queryKey: ["orderDetails", id],
    queryFn: async () => {
      if (!id) return null;
      const res = await axiosPrivate.get(`/orders/${id}`);
      return res?.data;
    },
    enabled: !!id,
  });
}
