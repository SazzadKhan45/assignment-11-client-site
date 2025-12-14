import axios from "axios";
import { useEffect } from "react";
import useAuth from "./useAuth";
import { useNavigate } from "react-router";

const axiosSecure = axios.create({
  baseURL: "https://server-site-ebon.vercel.app",
});

const useAxiosSecure = () => {
  const { user, LogoutUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Request interceptor
    const reqInterceptor = axiosSecure.interceptors.request.use(
      async (config) => {
        if (user) {
          // Use Firebase ID token
          const token = await user.getIdToken();
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      }
    );

    // Response interceptor
    const resInterceptor = axiosSecure.interceptors.response.use(
      (response) => response,
      (error) => {
        const statusCode = error.response?.status;

        if (statusCode === 401 || statusCode === 403) {
          LogoutUser().then(() => {
            navigate("/login");
          });
        }

        return Promise.reject(error);
      }
    );

    // Cleanup interceptors
    return () => {
      axiosSecure.interceptors.request.eject(reqInterceptor);
      axiosSecure.interceptors.response.eject(resInterceptor);
    };
  }, [user, LogoutUser, navigate]);

  return axiosSecure;
};

export default useAxiosSecure;
