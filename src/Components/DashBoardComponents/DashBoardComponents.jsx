import { AiFillProduct } from "react-icons/ai";
import { FaCartPlus, FaUserFriends } from "react-icons/fa";
import { Link, NavLink } from "react-router";
import useUserRole from "./../../Hooks/useUserRole";
import { CgProfile } from "react-icons/cg";

const DashBoardComponents = () => {
  // Custom hooks
  const { role } = useUserRole();

  //
  return (
    <div className="grow space-y-3">
      {/* Sidebar content here */}

      {/* Home page Menu */}
      <li className="bg-primary rounded text-[15px] font-medium">
        <Link
          to="/"
          className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
          data-tip="Homepage"
        >
          {/* Home icon */}
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
            <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path>
            <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
          </svg>
          <span className="is-drawer-close:hidden">Homepage</span>
        </Link>
      </li>

      {/* User List */}
      {role === "Admin" && (
        <>
          <li className="border-b-2 border-primary text-[15px]">
            <NavLink
              to="/dashboard/adminProfile"
              className={({ isActive }) =>
                isActive
                  ? "text-[#f0c14a] font-semibold underline"
                  : "hover:text-[#7e5a01] is-drawer-close:tooltip is-drawer-close:tooltip-right"
              }
              data-tip="Admin Profile"
            >
              <CgProfile size={20} />
              <span className="is-drawer-close:hidden">Admin Profile</span>
            </NavLink>
          </li>
          <li className="border-b-2 border-primary text-[15px]">
            <NavLink
              to="/dashboard/user-collections"
              className={({ isActive }) =>
                isActive
                  ? "text-[#f0c14a] font-semibold underline"
                  : "hover:text-[#7e5a01] is-drawer-close:tooltip is-drawer-close:tooltip-right"
              }
              data-tip="Manage Users"
            >
              <FaUserFriends size={20} />
              <span className="is-drawer-close:hidden">Manage Users</span>
            </NavLink>
          </li>

          {/* All Products List */}
          <li className="border-b-2 border-primary text-[15px]">
            <NavLink
              to="/dashboard/all-products"
              className={({ isActive }) =>
                isActive
                  ? "text-[#f0c14a] font-semibold underline"
                  : "hover:text-[#7e5a01] is-drawer-close:tooltip is-drawer-close:tooltip-right"
              }
              data-tip="All Products"
            >
              <AiFillProduct size={20} />
              <span className="is-drawer-close:hidden">All Products</span>
            </NavLink>
          </li>
          <li className="border-b-2 border-primary text-[15px]">
            <NavLink
              to="/dashboard/all-orders"
              className={({ isActive }) =>
                isActive
                  ? "text-[#f0c14a] font-semibold underline"
                  : "hover:text-[#7e5a01] is-drawer-close:tooltip is-drawer-close:tooltip-right"
              }
              data-tip="All Orders"
            >
              <FaCartPlus size={20} />
              <span className="is-drawer-close:hidden">All Orders</span>
            </NavLink>
          </li>
        </>
      )}

      {/*  */}
      {role === "manager" && (
        <>
          <li className="border-b-2 border-primary text-[15px]">
            <NavLink
              to="/dashboard/managerProfile"
              className={({ isActive }) =>
                isActive
                  ? "text-[#f0c14a] font-semibold underline"
                  : "hover:text-[#7e5a01] is-drawer-close:tooltip is-drawer-close:tooltip-right"
              }
              data-tip="Manager Profile"
            >
              <CgProfile size={20} />
              <span className="is-drawer-close:hidden">Manager Profile</span>
            </NavLink>
          </li>
          <li className="border-b-2 border-primary text-[15px]">
            <NavLink
              to="/dashboard/manager-products"
              className={({ isActive }) =>
                isActive
                  ? "text-[#f0c14a] font-semibold underline"
                  : "hover:text-[#7e5a01] is-drawer-close:tooltip is-drawer-close:tooltip-right"
              }
              data-tip="My Products"
            >
              <AiFillProduct size={20} />
              <span className="is-drawer-close:hidden">My Products</span>
            </NavLink>
          </li>
          <li className="border-b-2 border-primary text-[15px]">
            <NavLink
              to="/dashboard/manager-order"
              className={({ isActive }) =>
                isActive
                  ? "text-[#f0c14a] font-semibold underline"
                  : "hover:text-[#7e5a01] is-drawer-close:tooltip is-drawer-close:tooltip-right"
              }
              data-tip="My Orders"
            >
              <FaCartPlus size={20} />
              <span className="is-drawer-close:hidden">My Orders</span>
            </NavLink>
          </li>
        </>
      )}

      {/* All Products List */}
      {role === "buyer" && (
        <div>
          <li className="border-b-2 border-primary text-[15px]">
            <NavLink
              to="/dashboard/buyerProfile"
              className={({ isActive }) =>
                isActive
                  ? "text-[#f0c14a] font-semibold underline"
                  : "hover:text-[#7e5a01] is-drawer-close:tooltip is-drawer-close:tooltip-right"
              }
              data-tip="Buyer Profile"
            >
              <CgProfile size={20} />
              <span className="is-drawer-close:hidden">Buyer Profile</span>
            </NavLink>
          </li>
          {/*  */}
          <li className="border-b-2 border-primary text-[15px]">
            <NavLink
              to="/dashboard/buyer-order"
              className={({ isActive }) =>
                isActive
                  ? "text-[#f0c14a] font-semibold underline"
                  : "hover:text-[#7e5a01] is-drawer-close:tooltip is-drawer-close:tooltip-right"
              }
              data-tip="My Orders"
            >
              <FaCartPlus size={20} />
              <span className="is-drawer-close:hidden">My Orders</span>
            </NavLink>
          </li>
        </div>
      )}
    </div>
  );
};

export default DashBoardComponents;
