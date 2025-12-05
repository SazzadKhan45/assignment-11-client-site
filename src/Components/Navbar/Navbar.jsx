import { NavLink } from "react-router";
import MyContainer from "../MyContainer/MyContainer";
import { Link } from "react-router";
import useTheme from "../../Hooks/useTheme";
import { IoMdMoon, IoMdSunny } from "react-icons/io";

const Navbar = () => {
  const { isDark, toggleTheme } = useTheme();

  const Links = (
    <>
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive
            ? "text-blue-600 font-semibold underline"
            : "text-gray-700 hover:text-blue-500"
        }
      >
        Home
      </NavLink>

      <NavLink
        to="/service"
        className={({ isActive }) =>
          isActive
            ? "text-blue-600 font-semibold underline"
            : "text-gray-700 hover:text-blue-500"
        }
      >
        Services
      </NavLink>

      <NavLink
        to="/blogs"
        className={({ isActive }) =>
          isActive
            ? "text-blue-600 font-semibold underline"
            : "text-gray-700 hover:text-blue-500"
        }
      >
        Blogs
      </NavLink>

      <NavLink
        to="/contact"
        className={({ isActive }) =>
          isActive
            ? "text-blue-600 font-semibold underline"
            : "text-gray-700 hover:text-blue-500"
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
        isDark ? "bg-gray-900 text-white" : "bg-white text-black"
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
            <Link to="/" className="btn btn-ghost text-xl">
              Assignment-11
            </Link>
          </div>
          <div className="navbar-center hidden md:flex">
            <ul className="menu menu-horizontal px-1 flex gap-4 md:font-medium lg:text-[16px]">
              {Links}
            </ul>
          </div>
          <div className="navbar-end">
            <Link className="btn">Login</Link>
            <div className="ml-4">
              {isDark ? (
                <div className="text-[#EBD8BA] shadow">
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
