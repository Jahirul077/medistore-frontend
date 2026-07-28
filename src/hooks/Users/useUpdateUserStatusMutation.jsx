import useAxiosPrivate from "@/hooks/Axios/useAxiosPrivate";
import { useMutation } from "@tanstack/react-query";

export default function useUpdateUserStatusMutation({ onSuccess, onError } = {}) {
  const axiosPrivate = useAxiosPrivate();

  return useMutation({
    mutationKey: ["updateUserStatus"],
    mutationFn: async ({ id, status }) => {
      const res = await axiosPrivate.patch(`/admin/users/${id}`, { status });
      return res?.data;
    },
    onSuccess,
    onError,
  });
}
