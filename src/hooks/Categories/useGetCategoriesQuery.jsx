import { useAxiosPublic } from "@/hooks/Axios/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

export default function useGetCategoriesQuery(params = {}) {
  const axiosPublic = useAxiosPublic();

  return useQuery({
    queryKey: ["categories", params],
    queryFn: async () => {
      const cleanParams = Object.fromEntries(
        Object.entries(params).filter(
          ([_, val]) => val !== "" && val !== undefined && val !== null
        )
      );
      const res = await axiosPublic.get("/categories", { params: cleanParams });
      return res?.data;
    },
  });
}
