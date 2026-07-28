import useAxiosPrivate from "@/hooks/Axios/useAxiosPrivate";
import { useMutation } from "@tanstack/react-query";

export default function useDeleteCategoryMutation({ onSuccess, onError } = {}) {
  const axiosPrivate = useAxiosPrivate();

  return useMutation({
    mutationKey: ["deleteCategory"],
    mutationFn: async (id) => {
      const res = await axiosPrivate.delete(`/categories/${id}`);
      return res?.data;
    },
    onSuccess,
    onError,
  });
}
