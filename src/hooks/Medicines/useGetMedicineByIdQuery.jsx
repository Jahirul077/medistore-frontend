import { useAxiosPublic } from "@/hooks/Axios/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

export default function useGetMedicineByIdQuery(id, { onSuccess, onError } = {}) {
  const axiosPublic = useAxiosPublic();

  return useQuery({
    queryKey: ["getMedicineById", id],
    queryFn: async () => {
      if (!id) return null;
      const res = await axiosPublic.get(`/medicines/${id}`);
      return res?.data;
    },
    enabled: Boolean(id),
    onSuccess,
    onError,
  });
}
