import Loading from "../Components/Loading/Loading";
import useUserRole from "../Hooks/useUserRole";

const AdminOrManagerRoute = ({ children }) => {
  const { role, isLoading } = useUserRole();

  if (isLoading) return <Loading />;

  if (role !== "Admin" && role !== "manager") {
    return <p>Access Denied</p>;
  }

  return children;
};

export default AdminOrManagerRoute;
