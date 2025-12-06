import { NavLink, useNavigate } from "react-router";
import MyContainer from "../MyContainer/MyContainer";
import { Link } from "react-router";
import useTheme from "../../Hooks/useTheme";
import { IoMdMoon, IoMdSunny } from "react-icons/io";
import useAuth from "./../../Hooks/useAuth";
import { CgLogOut } from "react-icons/cg";
import { toast } from "react-toastify";
import LogoImg from "../../assets/Logo.png";

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
            ? "text-[#f0c14a] font-semibold underline"
            : " hover:text-[#eeb62a]"
        }
      >
        Home
      </NavLink>

      <NavLink
        to="/service"
        className={({ isActive }) =>
          isActive
            ? "text-[#f0c14a] font-semibold underline"
            : " hover:text-[#eeb62a]"
        }
      >
        All-Product
      </NavLink>
      <NavLink
        to="/service"
        className={({ isActive }) =>
          isActive
            ? "text-[#f0c14a] font-semibold underline"
            : " hover:text-[#eeb62a]"
        }
      >
        Dashboard
      </NavLink>

      {!user && (
        <>
          <NavLink
            to="/blogs"
            className={({ isActive }) =>
              isActive
                ? "text-[#f0c14a] font-semibold underline"
                : " hover:text-[#eeb62a]"
            }
          >
            About Us
          </NavLink>

          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive
                ? "text-[#f0c14a] font-semibold underline"
                : " hover:text-[#eeb62a]"
            }
          >
            Contact
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
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
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
              <Link
                to="/auth/login"
                className={` px-4 py-1 rounded-full font-medium text-black hover:bg-[#f1cd72] duration-300 ${
                  isDark ? "bg-white" : "bg-[#ecc664]"
                }`}
              >
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
