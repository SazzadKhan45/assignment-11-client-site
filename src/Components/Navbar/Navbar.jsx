import { NavLink, useNavigate } from "react-router";
import MyContainer from "../MyContainer/MyContainer";
import { Link } from "react-router";
import useTheme from "../../Hooks/useTheme";
import { IoMdMoon, IoMdSunny } from "react-icons/io";
import useAuth from "./../../Hooks/useAuth";
import { CgLogOut } from "react-icons/cg";
import { toast } from "react-toastify";

const Navbar = () => {
  //
  const { isDark, toggleTheme } = useTheme();
  //
  const { user, loading, LogoutUser } = useAuth();
  const navigate = useNavigate();

  // handle logOut user
  const handleLogoutUser = () => {
    LogoutUser()
      .then(() => {
        toast.success("Logout Successfully");
        navigate("/auth/login");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const Links = (
    <>
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive
            ? "text-orange-500 font-semibold underline"
            : " hover:text-orange-400"
        }
      >
        Home
      </NavLink>

      <NavLink
        to="/service"
        className={({ isActive }) =>
          isActive
            ? "text-orange-500 font-semibold underline"
            : " hover:text-orange-400"
        }
      >
        Services
      </NavLink>

      <NavLink
        to="/blogs"
        className={({ isActive }) =>
          isActive
            ? "text-orange-500 font-semibold underline"
            : " hover:text-orange-400"
        }
      >
        Blogs
      </NavLink>

      <NavLink
        to="/contact"
        className={({ isActive }) =>
          isActive
            ? "text-orange-500 font-semibold underline"
            : " hover:text-orange-400"
        }
      >
        Contact Us
      </NavLink>
    </>
  );

  // Ui Code
  return (
    <div
      className={`shadow-sm ${
        isDark ? "bg-gray-600 text-white" : "bg-white text-black"
      }`}
    >
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
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                {Links}
              </ul>
            </div>
            <Link to="/" className="btn btn-ghost text-xl hidden md:flex">
              Assignment-11
            </Link>
          </div>
          <div className="navbar-center hidden md:flex">
            <ul
              className={`menu menu-horizontal px-1 flex gap-4 md:font-medium lg:text-[16px]
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
              <Link to="/auth/login" className="btn">
                Login
              </Link>
            )}

            {/* Toggle menu light & dark */}
            <div className="ml-2">
              {isDark ? (
                <div className="text-[#b99c5d]">
                  <IoMdMoon size={20} onClick={toggleTheme} />
                </div>
              ) : (
                <div className="cursor-pointer">
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
