import useAxiosPrivate from "@/hooks/Axios/useAxiosPrivate";
import { useQuery } from "@tanstack/react-query";

export default function useGetAdminOrdersQuery(params = {}) {
  const axiosPrivate = useAxiosPrivate();

  return useQuery({
    queryKey: ["adminOrders", params],
    queryFn: async () => {
      const cleanParams = Object.fromEntries(
        Object.entries(params).filter(
          ([_, val]) =>
            val !== "" && val !== undefined && val !== null && val !== "ALL"
        )
      );
      const res = await axiosPrivate.get("/admin/orders", {
        params: cleanParams,
      });
      return res?.data;
    },
  });
}
