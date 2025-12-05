import axios from "axios";
import { useEffect } from "react";
import useAuth from "./useAuth";
import { useNavigate } from "react-router";

const axiosSecure = axios.create({
  baseURL: "http://localhost:3000",
});

const useAxiosSecure = () => {
  const { user, LogoutUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // req interceptor
    const reqInterceptor = axiosSecure.interceptors.request.use((config) => {
      if (user?.accessToken) {
        config.headers.Authorization = `Bearer ${user.accessToken}`;
      }
      return config;
    });
    // Response interceptor
    const resInterceptor = axiosSecure.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        // console.log(error);
        // Unauthorized & Forbidden user logout to login page
        const statusCode = error.status;
        if (statusCode === 401 || statusCode === 403) {
          LogoutUser()
            .then(() => {
              navigate("/");
            })
            .catch((error) => {
              console.log(error);
            });
        }
        console.log(statusCode);

        return Promise.reject(error);
      }
    );
    //
    return () => {
      axiosSecure.interceptors.request.eject(reqInterceptor);
      axiosSecure.interceptors.response.eject(resInterceptor);
    };
  }, [user, navigate, LogoutUser]);

  //

  return axiosSecure;
};

export default useAxiosSecure;
