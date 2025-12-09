import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useUserRole = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: role, isLoading } = useQuery({
    queryKey: ["userRole", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get("/all-users");

      const allUsers = res.data; // your API returns raw array

      // Find logged in user
      const found = allUsers.find((u) => u.email === user.email);

      return found?.role || null;
    },
  });

  return { role, isLoading };
};

export default useUserRole;
