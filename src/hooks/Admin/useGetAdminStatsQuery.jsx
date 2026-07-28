import useAxiosPrivate from "@/hooks/Axios/useAxiosPrivate";
import { useQuery } from "@tanstack/react-query";

export default function useGetAdminStatsQuery() {
  const axiosPrivate = useAxiosPrivate();

  return useQuery({
    queryKey: ["adminStats"],
    queryFn: async () => {
      const res = await axiosPrivate.get("/admin/stats");
      return res?.data;
    },
  });
}
