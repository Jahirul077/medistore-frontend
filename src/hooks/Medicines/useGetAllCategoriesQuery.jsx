import { useAxiosPublic } from "@/hooks/Axios/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

export default function useGetAllCategoriesQuery({ onSuccess, onError } = {}) {
  const axiosPublic = useAxiosPublic();

  return useQuery({
    queryKey: ["getAllCategories"],
    queryFn: async () => {
      const res = await axiosPublic.get("/categories");
      return res?.data;
    },
    onSuccess,
    onError,
  });
}
