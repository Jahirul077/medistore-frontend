import { useAxiosPublic } from "@/hooks/Axios/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

export default function useGetAllMedicinesQuery(params = {}, { onSuccess, onError } = {}) {
  const axiosPublic = useAxiosPublic();

  return useQuery({
    queryKey: ["getAllMedicines", params],
    queryFn: async () => {
      const res = await axiosPublic.get("/medicines", { params });
      return res?.data;
    },
    onSuccess,
    onError,
  });
}
