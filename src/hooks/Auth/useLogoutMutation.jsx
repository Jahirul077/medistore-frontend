import useAxiosPrivate from "@/hooks/Axios/useAxiosPrivate";
import { useMutation } from "@tanstack/react-query";

export default function useLogoutMutation({ onSuccess, onError } = {}) {
  const axiosPrivate = useAxiosPrivate();

  return useMutation({
    mutationKey: ["logoutMutation"],
    mutationFn: async () => {
      try {
        const res = await axiosPrivate.post(
          "/auth/logout",
          {},
          { skipGlobalToast: true }
        );
        return res?.data;
      } catch (error) {
        return { message: "Logged out" };
      }
    },
    onSuccess,
    onError,
  });
}
