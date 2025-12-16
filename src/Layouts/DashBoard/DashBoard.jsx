import { Outlet, useNavigate } from "react-router";

import useTheme from "./../../Hooks/useTheme";
import { IoMdMoon, IoMdSunny } from "react-icons/io";
import DashBoardComponents from "../../Components/DashBoardComponents/DashBoardComponents";
import useAuth from "../../Hooks/useAuth";
import { toast } from "react-toastify";
import { CgLogOut } from "react-icons/cg";
import useUserRole from "../../Hooks/useUserRole";

const DashBoard = () => {
  // Custom hooks
  const { isDark, toggleTheme } = useTheme();
  const { user, LogoutUser } = useAuth();
  const { role } = useUserRole();
  // Navigate hook
  const navigate = useNavigate();

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

  return (
    <div>
      <div className="drawer md:drawer-open">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Navbar */}
          <nav className="navbar w-full bg-base-300">
            <label
              htmlFor="my-drawer-4"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              {/* Sidebar toggle icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2"
                fill="none"
                stroke="currentColor"
                className="my-1.5 inline-block size-4"
              >
                <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
                <path d="M9 4v16"></path>
                <path d="M14 10l2 2l-2 2"></path>
              </svg>
              {/* User role show  */}
            </label>

            <div>
              {/* Admin dashboard */}
              {role == "Admin" && (
                <h2 className="text-xl font-medium ml-4">Admin Dashboard</h2>
              )}
              {/* Manager dashboard */}
              {role == "manager" && (
                <h2 className="text-xl font-medium ml-4">Manager Dashboard</h2>
              )}
              {/* Buyer dashboard */}
              {role == "buyer" && (
                <h2 className="text-xl font-medium ml-4">Buyer Dashboard</h2>
              )}
            </div>
            {/* User Profile */}
            <div className="px-4 ml-auto">
              <div className="flex items-center gap-2">
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
                <div className="ml-2">
                  {isDark ? (
                    <div className="text-[#b99c5d] cursor-pointer btn btn-sm">
                      <IoMdMoon size={20} onClick={toggleTheme} />
                    </div>
                  ) : (
                    <div className="cursor-pointer btn btn-sm">
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
          </nav>

          {/* Page content here & Outlet */}
          <div className="p-4">
            {/* User Profile */}
            {/* {role == "Admin" && (
              <>
                <h2>Admin Profile</h2>
              </>
            )} */}
            {/* User Profile */}
            {/* {role == "manager" && (
              <>
                <h2>Manager Profile</h2>
              </>
            )} */}
            {/* User Profile */}
            {/* {role == "buyer" && (
              <>
                <h2>Buyer Profile</h2>
              </>
            )} */}

            <Outlet />
          </div>
        </div>

        <div className="drawer-side is-drawer-close:overflow-visible">
          <label
            htmlFor="my-drawer-4"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>

          {/* Left side bar menu & icons */}
          <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
            <ul className="menu w-full">
              <DashBoardComponents />
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
