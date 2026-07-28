import useAxiosPrivate from "@/hooks/Axios/useAxiosPrivate";
import { useMutation } from "@tanstack/react-query";

export default function useCreateReviewMutation({ onSuccess, onError } = {}) {
  const axiosPrivate = useAxiosPrivate();

  return useMutation({
    mutationKey: ["createReviewMutation"],
    mutationFn: async (payload) => {
      const res = await axiosPrivate.post("/review", payload);
      return res?.data;
    },
    onSuccess,
    onError,
  });
}
