import useAxiosPrivate from "@/hooks/Axios/useAxiosPrivate";
import { useMutation } from "@tanstack/react-query";

export default function useCreateCategoryMutation({ onSuccess, onError } = {}) {
  const axiosPrivate = useAxiosPrivate();

  return useMutation({
    mutationKey: ["createCategory"],
    mutationFn: async (data) => {
      const res = await axiosPrivate.post("/categories", data);
      return res?.data;
    },
    onSuccess,
    onError,
  });
}
