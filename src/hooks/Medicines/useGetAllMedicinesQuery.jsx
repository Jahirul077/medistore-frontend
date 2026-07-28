import { useAxiosPublic } from "@/hooks/Axios/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

export default function useGetAllMedicinesQuery(params = {}) {
  const axiosPublic = useAxiosPublic();

  return useQuery({
    queryKey: ["allMedicines", params],
    queryFn: async () => {
      // Filter out empty params
      const cleanParams = Object.fromEntries(
        Object.entries(params).filter(
          ([_, val]) => val !== "" && val !== undefined && val !== null && val !== "all-brands"
        )
      );

      const res = await axiosPublic.get("/medicines", { params: cleanParams });
      return res?.data;
    },
  });
}
