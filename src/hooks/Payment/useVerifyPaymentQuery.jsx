import useAxiosPrivate from "@/hooks/Axios/useAxiosPrivate";
import { useQuery } from "@tanstack/react-query";

export default function useVerifyPaymentQuery(sessionId) {
  const axiosPrivate = useAxiosPrivate();

  return useQuery({
    queryKey: ["verifyPayment", sessionId],
    queryFn: async () => {
      if (!sessionId) return null;
      const res = await axiosPrivate.get(`/payment/verify/${sessionId}`);
      return res?.data;
    },
    enabled: !!sessionId,
  });
}
