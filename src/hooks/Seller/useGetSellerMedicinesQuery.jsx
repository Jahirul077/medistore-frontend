import useAxiosPrivate from "@/hooks/Axios/useAxiosPrivate";
import { useQuery } from "@tanstack/react-query";

export default function useGetSellerMedicinesQuery() {
  const axiosPrivate = useAxiosPrivate();

  return useQuery({
    queryKey: ["sellerMedicines"],
    queryFn: async () => {
      const res = await axiosPrivate.get("/seller/medicines");
      return res?.data;
    },
  });
}
