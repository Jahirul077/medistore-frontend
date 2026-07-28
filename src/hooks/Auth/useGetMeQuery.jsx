import useAxiosPrivate from "@/hooks/Axios/useAxiosPrivate";
import { useQuery } from "@tanstack/react-query";

export default function useGetMeQuery({ onSuccess, onError } = {}) {
  const axiosPrivate = useAxiosPrivate();

  return useQuery({
    queryKey: ["getMe"],
    queryFn: async () => {
      const res = await axiosPrivate.get("/auth/me");
      return res?.data;
    },
    onSuccess,
    onError,
  });
}
