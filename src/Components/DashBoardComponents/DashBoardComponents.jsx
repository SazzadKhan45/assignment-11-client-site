import { AiFillProduct } from "react-icons/ai";
import { FaCartPlus, FaUserFriends } from "react-icons/fa";
import { Link } from "react-router";

const DashBoardComponents = () => {
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
      <li className="border-b-2 border-primary text-[15px]">
        <Link
          className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
          data-tip="Manage Users"
        >
          {/* User icon */}
          <FaUserFriends size={20} />
          <span className="is-drawer-close:hidden">Manage Users</span>
        </Link>
      </li>
      {/* All Products List */}
      <li className="border-b-2 border-primary text-[15px]">
        <Link
          to="/dashboard/all-products"
          className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
          data-tip="All Products"
        >
          {/* Products icon */}
          <AiFillProduct size={20} />
          <span className="is-drawer-close:hidden">All Products</span>
        </Link>
      </li>
      {/* All Products List */}
      <li className="border-b-2 border-primary text-[15px]">
        <Link
          className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
          data-tip="All Orders"
        >
          {/* Products icon */}
          <FaCartPlus size={20} />
          <span className="is-drawer-close:hidden">All Orders</span>
        </Link>
      </li>
    </div>
  );
};

export default DashBoardComponents;
