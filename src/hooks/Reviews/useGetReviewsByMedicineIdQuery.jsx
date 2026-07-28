import { useAxiosPublic } from "@/hooks/Axios/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

export default function useGetReviewsByMedicineIdQuery(medicineId) {
  const axiosPublic = useAxiosPublic();

  return useQuery({
    queryKey: ["medicineReviews", medicineId],
    queryFn: async () => {
      if (!medicineId) return null;
      const res = await axiosPublic.get(`/review/${medicineId}`);
      return res?.data;
    },
    enabled: !!medicineId,
  });
}
