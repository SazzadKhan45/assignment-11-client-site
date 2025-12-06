import { useEffect } from "react";
import useAuth from "../Hooks/useAuth";
import { useNavigate } from "react-router";

const PrivateRoutes = ({ children }) => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth/login");
    }
  }, [user, loading, navigate]);

  if (loading) {
    return <span className="loading loading-bars loading-xl"></span>;
  }

  if (!user) {
    // Optionally, show nothing or a placeholder while redirecting
    return null;
  }

  return children;
};

export default PrivateRoutes;
