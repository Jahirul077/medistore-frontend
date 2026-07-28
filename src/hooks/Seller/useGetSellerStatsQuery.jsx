import useAxiosPrivate from "@/hooks/Axios/useAxiosPrivate";
import { useQuery } from "@tanstack/react-query";

export default function useGetSellerStatsQuery() {
  const axiosPrivate = useAxiosPrivate();

  return useQuery({
    queryKey: ["sellerStats"],
    queryFn: async () => {
      const res = await axiosPrivate.get("/seller/stats");
      return res?.data;
    },
  });
}
