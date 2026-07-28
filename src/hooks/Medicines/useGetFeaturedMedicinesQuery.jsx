import { useAxiosPublic } from "@/hooks/Axios/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

export default function useGetFeaturedMedicinesQuery() {
  const axiosPublic = useAxiosPublic();

  return useQuery({
    queryKey: ["featuredMedicines"],
    queryFn: async () => {
      const res = await axiosPublic.get("/medicines/featured");
      return res?.data;
    },
  });
}
