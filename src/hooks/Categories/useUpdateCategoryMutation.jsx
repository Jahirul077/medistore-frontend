import useAxiosPrivate from "@/hooks/Axios/useAxiosPrivate";
import { useMutation } from "@tanstack/react-query";

export default function useUpdateCategoryMutation({ onSuccess, onError } = {}) {
  const axiosPrivate = useAxiosPrivate();

  return useMutation({
    mutationKey: ["updateCategory"],
    mutationFn: async ({ id, data }) => {
      const res = await axiosPrivate.patch(`/categories/${id}`, data);
      return res?.data;
    },
    onSuccess,
    onError,
  });
}
