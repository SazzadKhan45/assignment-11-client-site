import { useState } from "react";
import MyContainer from "../../Components/MyContainer/MyContainer";
import { useForm } from "react-hook-form";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { Link, useNavigate } from "react-router";
import { FcGoogle } from "react-icons/fc";
import useAuth from "../../Hooks/useAuth";
import { toast } from "react-toastify";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const Login = () => {
  //All state hare
  const [togglePass, setTogglePass] = useState(false);

  // Custom hook
  const { setLoading, logInUserWithGoogle, loginUserEmailPassword } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  // React hook form function
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // handle google login
  const handleGoogleLogin = () => {
    setLoading(true);

    logInUserWithGoogle()
      .then((result) => {
        const user = result.user;

        const userData = {
          name: user.displayName,
          email: user.email,
          photo: user.photoURL,
          role: "buyer",
        };

        return axiosSecure.post("/userList", userData).catch((error) => {
          if (error.response?.status === 409) {
            // User exists → treat as success
            return { data: { inserted: false } };
          }
          throw error;
        });
      })
      .then(() => {
        toast.success("Login Successfully");
        navigate("/");
      })
      .catch((error) => {
        toast.error("Login Failed");
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Handle login form
  const handleLoginEmailPassword = (data) => {
    setLoading(true);

    loginUserEmailPassword(data.email, data.password)
      .then(() => {
        toast.success("Login Successful");
        navigate("/");
      })
      .catch((error) => {
        toast.error("Login Failed");
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
        reset();
      });
  };

  //
  return (
    <div className="bg-base-200 md:py-12">
      <title>Login</title>
      <MyContainer>
        <div className="hero-content">
          <div className="card bg-base-100 w-full max-w-sm md:max-w-lg lg:max-w-2xl shrink-0 shadow-2xl md:px-8 lg:px-12 md:py-4">
            <div className="card-body">
              <h1 className="text-2xl md:text-3xl font-bold text-center py-4">
                WellCome to Login
              </h1>
              {/* Google login button */}
              <button
                onClick={handleGoogleLogin}
                className="btn bg-orange-100 text-[16px] text-black border-[#e5e5e5]"
              >
                <FcGoogle size={18} />
                Login with Google
              </button>

              {/* Divider */}
              <div className="divider -mb-0.5">OR</div>

              {/* Login form */}
              <form onSubmit={handleSubmit(handleLoginEmailPassword)}>
                <fieldset className="fieldset">
                  {/* Email field */}
                  <label className="label text-lg">Your Email</label>
                  <input
                    type="email"
                    className="input w-full text-[16px]"
                    placeholder="Enter Email"
                    {...register("email", { required: true })}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">
                      Email is required
                    </p>
                  )}
                  {/* Password field */}
                  <label className="label text-lg">Password</label>
                  <div className="relative">
                    <input
                      type={togglePass ? "text" : "password"}
                      className="input w-full pr-10 text-[16px]" // add padding-right so text doesn't overlap icon
                      placeholder="Password"
                      {...register("password", { required: true })}
                    />
                    <span
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-xl cursor-pointer"
                      onClick={() => setTogglePass(!togglePass)}
                    >
                      {togglePass ? <IoMdEye /> : <IoMdEyeOff />}
                    </span>
                  </div>
                  {errors.password && (
                    <p className="text-red-500 text-sm mt-1">
                      Password is required
                    </p>
                  )}

                  <div>
                    <p className="link link-hover text-[16px] cursor-pointer text-blue-500">
                      Forgot password?
                    </p>
                  </div>
                  <button className="btn btn-neutral mt-4 text-lg">
                    Login
                  </button>
                </fieldset>
              </form>
              {/*  */}
              <div className="mx-auto text-[16px] pb-4 mt-2">
                <span>Don’t have an account?</span>
                <Link
                  to="/auth/register"
                  className="ml-1 text-blue-500 font-medium"
                >
                  Register
                </Link>
              </div>
            </div>
          </div>
        </div>
      </MyContainer>
    </div>
  );
};

export default Login;
