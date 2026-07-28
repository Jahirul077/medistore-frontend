import useAxiosPrivate from "@/hooks/Axios/useAxiosPrivate";
import { useMutation } from "@tanstack/react-query";

export default function useDeleteReviewMutation({ onSuccess, onError } = {}) {
  const axiosPrivate = useAxiosPrivate();

  return useMutation({
    mutationKey: ["deleteReviewMutation"],
    mutationFn: async (id) => {
      const res = await axiosPrivate.delete(`/review/${id}`);
      return res?.data;
    },
    onSuccess,
    onError,
  });
}
