import useAxiosPrivate from "@/hooks/Axios/useAxiosPrivate";
import { useMutation } from "@tanstack/react-query";

export default function useUpdateReviewMutation({ onSuccess, onError } = {}) {
  const axiosPrivate = useAxiosPrivate();

  return useMutation({
    mutationKey: ["updateReviewMutation"],
    mutationFn: async ({ id, data }) => {
      const res = await axiosPrivate.patch(`/review/${id}`, data);
      return res?.data;
    },
    onSuccess,
    onError,
  });
}
