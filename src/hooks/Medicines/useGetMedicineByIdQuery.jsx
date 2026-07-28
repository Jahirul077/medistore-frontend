import { useAxiosPublic } from "@/hooks/Axios/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

export default function useGetMedicineByIdQuery(id) {
  const axiosPublic = useAxiosPublic();

  return useQuery({
    queryKey: ["medicineDetails", id],
    queryFn: async () => {
      if (!id) return null;
      const res = await axiosPublic.get(`/medicines/${id}`);
      return res?.data;
    },
    enabled: !!id,
  });
}
