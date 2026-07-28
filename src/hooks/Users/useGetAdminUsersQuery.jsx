import useAxiosPrivate from "@/hooks/Axios/useAxiosPrivate";
import { useQuery } from "@tanstack/react-query";

export default function useGetAdminUsersQuery(params = {}) {
  const axiosPrivate = useAxiosPrivate();

  return useQuery({
    queryKey: ["adminUsers", params],
    queryFn: async () => {
      const cleanParams = Object.fromEntries(
        Object.entries(params).filter(
          ([_, val]) => val !== "" && val !== undefined && val !== null && val !== "ALL"
        )
      );
      const res = await axiosPrivate.get("/admin/users", { params: cleanParams });
      return res?.data;
    },
  });
}
