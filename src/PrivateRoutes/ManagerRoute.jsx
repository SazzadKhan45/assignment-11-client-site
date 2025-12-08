import useAuth from "../Hooks/useAuth";
import Loading from "../Components/Loading/Loading";

const ManagerRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <Loading />;
  }

  // Not logged in → redirect to login
  if (!user) {
    return;
  }

  // Logged in but not a Manager → redirect to unauthorized page
  if (user?.role !== "Manager" && user?.role !== "Admin") {
    return;
  }

  // Manager → allow
  return children;
};

export default ManagerRoute;
