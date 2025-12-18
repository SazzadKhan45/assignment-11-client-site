import { NavLink, useNavigate } from "react-router";
import MyContainer from "../MyContainer/MyContainer";
import { Link } from "react-router";
import useTheme from "../../Hooks/useTheme";
import { IoMdMoon, IoMdSunny } from "react-icons/io";
import useAuth from "./../../Hooks/useAuth";
import { CgLogOut } from "react-icons/cg";
import { toast } from "react-toastify";
import LogoImg from "../../assets/Logo.png";
import useUserRole from "../../Hooks/useUserRole";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const Navbar = () => {
  //
  const { isDark, toggleTheme } = useTheme();
  //
  const { user, loading, LogoutUser } = useAuth();
  const { role } = useUserRole();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  // console.log(user);

  // Manager info
  const { data: managerInfo } = useQuery({
    queryKey: ["manager-info", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/manager-info?email=${user?.email}`);
      return res.data.data;
    },
    enabled: !!user?.email,
  });
  // console.log(managerInfo);

  // handle logOut user
  const handleLogoutUser = () => {
    LogoutUser()
      .then(() => {
        toast.success("Logout Successfully");
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Nav Links

  const Links = (
    <>
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive
            ? "text-[#f0c14a] font-semibold underline"
            : "hover:text-[#eeb62a]"
        }
      >
        Home
      </NavLink>
      <NavLink
        to="/all-products"
        className={({ isActive }) =>
          isActive
            ? "text-[#f0c14a] font-semibold underline"
            : "hover:text-[#eeb62a]"
        }
      >
        All-Products
      </NavLink>
      {/* Check User role Admin or manager */}
      {role == "Admin" && (
        <NavLink
          to="/add-product"
          className={({ isActive }) =>
            isActive
              ? "text-[#f0c14a] font-semibold underline"
              : "hover:text-[#eeb62a]"
          }
        >
          Add-Product
        </NavLink>
      )}

      {/* Check manager account suspend */}
      {role === "manager" && (
        <>
          {managerInfo?.status === "pending" && (
            <NavLink
              to="/dashboard/pending"
              className={({ isActive }) =>
                isActive
                  ? "text-[#f0c14a] font-semibold underline"
                  : "hover:text-[#eeb62a]"
              }
            >
              Add-Product
            </NavLink>
          )}
          {managerInfo?.status === "suspend" && (
            <NavLink
              to="/dashboard/suspend"
              className={({ isActive }) =>
                isActive
                  ? "text-[#f0c14a] font-semibold underline"
                  : "hover:text-[#eeb62a]"
              }
            >
              Add-Product
            </NavLink>
          )}
          {managerInfo?.status === "approved" && (
            <NavLink
              to="/add-product"
              className={({ isActive }) =>
                isActive
                  ? "text-[#f0c14a] font-semibold underline"
                  : "hover:text-[#eeb62a]"
              }
            >
              Add-Product
            </NavLink>
          )}
        </>
      )}

      {/* Admin profile  */}
      {role == "Admin" && (
        <NavLink
          to="/dashboard/adminProfile"
          className={({ isActive }) =>
            isActive
              ? "text-[#f0c14a] font-semibold underline"
              : "hover:text-[#eeb62a]"
          }
        >
          Dashboard
        </NavLink>
      )}

      {/* Manager profile  */}
      {role == "manager" && (
        <NavLink
          to="/dashboard/managerProfile"
          className={({ isActive }) =>
            isActive
              ? "text-[#f0c14a] font-semibold underline"
              : "hover:text-[#eeb62a]"
          }
        >
          Dashboard
        </NavLink>
      )}
      {/* Manager profile  */}
      {role == "buyer" && (
        <NavLink
          to="/dashboard/buyerProfile"
          className={({ isActive }) =>
            isActive
              ? "text-[#f0c14a] font-semibold underline"
              : "hover:text-[#eeb62a]"
          }
        >
          Dashboard
        </NavLink>
      )}

      {/* No user navbar */}
      {!user && (
        <>
          <NavLink
            to="/about-us"
            className={({ isActive }) =>
              isActive
                ? "text-[#f0c14a] font-semibold underline"
                : "hover:text-[#eeb62a]"
            }
          >
            About Us
          </NavLink>

          <NavLink
            to="/contact-us"
            className={({ isActive }) =>
              isActive
                ? "text-[#f0c14a] font-semibold underline"
                : "hover:text-[#eeb62a]"
            }
          >
            Contact Us
          </NavLink>
        </>
      )}
    </>
  );

  // Ui Code
  return (
    <div className={`shadow-sm bg-gray-700 text-white`}>
      <MyContainer>
        <div className="navbar ">
          <div className="navbar-start">
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost md:hidden"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {" "}
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />{" "}
                </svg>
              </div>
              <ul
                tabIndex="-1"
                className={`menu menu-sm dropdown-content  rounded-b z-1 mt-3 w-52 p-2 shadow pl-6 space-y-2 ${
                  isDark ? "bg-white text-black" : "bg-gray-500"
                }`}
              >
                {Links}
              </ul>
            </div>
            <Link to="/" className=" hidden md:flex items-center">
              <img className="h-[50px] w-[60px]" src={LogoImg} alt="" />
              <h2 className="-ml-2 font-bold border-b-2">
                G-<span className="text-[#F0B92D]">Flow</span>
              </h2>
            </Link>
          </div>
          <div className="navbar-center hidden md:flex">
            <ul
              className={`menu menu-horizontal px-1 flex md:gap-6 lg:gap-10 md:font-medium lg:text-[16px]
              }`}
            >
              {Links}
            </ul>
          </div>
          <div className="navbar-end">
            {/* Navbar end */}
            {loading ? (
              <span className="loading loading-spinner text-success"></span>
            ) : user ? (
              <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button">
                  <div className="h-12 w-12 rounded-full overflow-hidden border cursor-pointer">
                    <img
                      src={user?.photoURL}
                      alt="Profile"
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
                <ul
                  tabIndex="-1"
                  className="dropdown-content menu bg-gray-500 rounded-box z-1 w-52 p-2 shadow-sm mt-2 text-white"
                >
                  <div className="mx-auto pt-4">
                    <div className="h-12 w-12 rounded-full overflow-hidden border cursor-pointer">
                      <img
                        src={user?.photoURL}
                        alt="Profile"
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="pt-2">
                    <p className="text-center font-medium">
                      Name: {user?.displayName}
                    </p>
                  </div>

                  <li className="px-6">
                    <button
                      onClick={handleLogoutUser}
                      className="bg-gray-800 my-3 font-bold flex items-center justify-center gap-2 w-full text-white py-2 rounded"
                    >
                      LogOut <CgLogOut size={20} />
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <div>
                <Link
                  to="/auth/login"
                  className={` px-4 pt-1 pb-2 rounded-full font-medium text-black hover:bg-[#f1cd72] duration-300 ${
                    isDark ? "bg-white" : "bg-[#ecc664]"
                  }`}
                >
                  Login
                </Link>
                <Link
                  to="/auth/register"
                  className={`px-4 pb-2 pt-1 ml-2 rounded-full font-medium text-black  ${
                    isDark ? "bg-[#3f8ff8] text-white" : "bg-white"
                  }`}
                >
                  Register
                </Link>
              </div>
            )}

            {/* Toggle menu light & dark */}
            <div className="ml-2">
              {isDark ? (
                <div className="text-[#e7c06c] bg-gray-400 p-1 rounded-full cursor-pointer">
                  <IoMdMoon size={20} onClick={toggleTheme} />
                </div>
              ) : (
                <div className="cursor-pointer bg-white p-1 rounded-full">
                  <IoMdSunny
                    size={20}
                    className="text-orange-400"
                    onClick={toggleTheme}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </MyContainer>
    </div>
  );
};

export default Navbar;
