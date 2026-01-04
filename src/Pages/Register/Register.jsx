import { useState } from "react";
import useAuth from "../../Hooks/useAuth";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import MyContainer from "../../Components/MyContainer/MyContainer";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router";
import axios from "axios";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

//
const Register = () => {
  //All state hare
  const [togglePass, setTogglePass] = useState(false);

  // Custom hook
  const {
    user,
    setUser,
    setLoading,
    logInUserWithGoogle,
    registerUserEmailPassword,
    updateUserProfile,
  } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  console.log(user);

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

  // Handle register user email & password
  const handleRegisterEmailPassword = async (data) => {
    try {
      setLoading(true);

      // 1. Create user
      const result = await registerUserEmailPassword(data.email, data.password);

      // 2. Upload image to ImgBB
      const imageFile = data.photo[0];
      const formData = new FormData();
      formData.append("image", imageFile);

      const host_key = import.meta.env.VITE_image_host_key;

      const uploadRes = await axios.post(
        `https://api.imgbb.com/1/upload?key=${host_key}`,
        formData
      );

      const photoURL = uploadRes.data.data.display_url;

      // 3. Update Firebase profile
      await updateUserProfile({
        displayName: data.name,
        photoURL: photoURL,
      });

      // 4. Prepare user info for MongoDB
      const userInfo = {
        name: data.name,
        email: data.email,
        role: data.role,
        photo: photoURL,
      };

      // 5. Save user to MongoDB
      await axiosSecure.post("/userList", userInfo);

      // 6. Update UI user state
      setUser({
        ...result.user,
        displayName: data.name,
        photoURL: photoURL,
      });

      toast.success("Successfully Registered!");
      navigate("/");
      reset();
    } catch (error) {
      console.error("Registration error:", error);

      if (error.code === "auth/email-already-in-use") {
        toast.error("This email is already in use.");
      } else {
        toast.error("Registration Failed!");
      }
    } finally {
      setLoading(false);
    }
  };

  //

  return (
    <div className="bg-base-200 md:py-4">
      <title>Register</title>
      <MyContainer>
        <div className="hero-content">
          <div className="card bg-base-100 w-full max-w-sm md:max-w-lg lg:max-w-2xl shrink-0 shadow-2xl md:px-6 lg:px-12">
            <div className="card-body">
              <h1 className="text-2xl md:text-3xl font-bold text-center pb-4">
                Register a New Account
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
              <form onSubmit={handleSubmit(handleRegisterEmailPassword)}>
                <fieldset className="fieldset">
                  {/* Name field */}
                  <label className="label text-lg">Your Name</label>
                  <input
                    type="text"
                    className="input w-full text-[16px]"
                    placeholder="Enter Your Name"
                    {...register("name", { required: true })}
                  />

                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">
                      Name is required
                    </p>
                  )}

                  {/* Upload image */}
                  <label className="label text-lg">Upload Photo</label>
                  <input
                    type="file"
                    className="file-input w-full"
                    {...register("photo", { required: true })}
                  />
                  {errors.photo && (
                    <p className="text-red-500 text-sm mt-1">
                      Please select a role
                    </p>
                  )}
                  {/* Select Role */}
                  <div className="mb-4">
                    <label className="block text-lg mb-1">Select Role</label>

                    <select
                      {...register("role", { required: true })}
                      className="select select-bordered w-full text-[16px]"
                      defaultValue=""
                    >
                      <option disabled value="">
                        Choose a role
                      </option>
                      <option value="buyer">Buyer</option>
                      <option value="manager">Manager</option>
                    </select>

                    {errors.role && (
                      <p className="text-red-500 text-sm mt-1">
                        Please select a role
                      </p>
                    )}
                  </div>

                  {/* Email field */}
                  <label className="label text-lg">Your Email</label>
                  <input
                    type="email"
                    className="input w-full text-[16px]"
                    placeholder="Enter Your Email"
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
                      className="input w-full pr-10 text-[16px]"
                      placeholder="Password"
                      {...register("password", {
                        required: "Password is required",
                        pattern: {
                          value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/,
                          message:
                            "Min 6 chars, 1 uppercase, 1 lowercase, and 1 number required",
                        },
                      })}
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
                      {errors.password.message}
                    </p>
                  )}

                  <div>
                    <p className="link link-hover text-[16px] cursor-pointer text-blue-500">
                      Forgot password?
                    </p>
                  </div>
                  <button className="btn btn-neutral mt-4 text-lg">
                    Register
                  </button>
                </fieldset>
              </form>
              {/*  */}
              <div className="mx-auto text-[16px] pb-2 mt-2">
                <span>Already have an account?</span>
                <Link
                  to="/auth/login"
                  className="ml-1 text-blue-500 font-medium"
                >
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </MyContainer>
    </div>
  );
};

export default Register;
