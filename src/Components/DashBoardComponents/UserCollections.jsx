import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { SiTicktick } from "react-icons/si";
import { TbPlayerEjectFilled } from "react-icons/tb";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";
import { useState } from "react";

const UserCollections = () => {
  // All State
  const [searchUser, setSearchUser] = useState("");
  // Custom hooks
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const adminEmail = user?.email;

  //TanstackQuery function
  const { data: users = [], refetch } = useQuery({
    queryKey: ["userList"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/all-users?email=${adminEmail}`);
      return res.data;
    },
  });
  // console.log(users);

  //
  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(searchUser.toLowerCase()) ||
      u.email.toLowerCase().includes(searchUser.toLowerCase())
  );

  // handle user remove
  const handleUserDelete = (id) => {
    //
    Swal.fire({
      title: "Are you sure?",
      text: "Remove This User",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Remove",
    }).then(async (result) => {
      if (result.isConfirmed) {
        //
        await axiosSecure.delete(`/user/${id}`);
        //
        Swal.fire({
          title: "Remove User",
          text: "Successfully !!",
          icon: "success",
        });
        refetch();
      }
    });
  };

  // User handleStatus
  const handleStatusApproved = async (id) => {
    //
    Swal.fire({
      title: "Are you sure?",
      text: "Approve User",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Approved",
    }).then(async (result) => {
      if (result.isConfirmed) {
        //
        await axiosSecure.patch(`/user-update/${id}`);
        //
        Swal.fire({
          title: "Approved",
          text: "Successfully !!",
          icon: "success",
        });
        refetch();
      }
    });
  };

  const handleStatusSuspend = async (id) => {
    //
    Swal.fire({
      title: "Are you sure?",
      text: "Suspend This User",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Suspend",
    }).then(async (result) => {
      if (result.isConfirmed) {
        //
        await axiosSecure.patch(`/user-suspend/${id}`);
        //
        Swal.fire({
          title: "Suspended",
          text: "Successfully !!",
          icon: "success",
        });
        refetch();
      }
    });
  };

  //

  return (
    <div className="overflow-x-auto">
      <div className="flex justify-between items-center md:px-8 my-4">
        <h2 className="text-xl font-medium">
          Total Users:{" "}
          <span className="text-[16px]">({filteredUsers?.length})</span>
        </h2>
        <label className="input">
          <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <input
            type="search"
            onChange={(e) => setSearchUser(e.target.value)}
            required
            placeholder="Search"
          />
        </label>
      </div>
      <div className="bg-primary py-2 mb-4">
        <h2 className="text-xl font-medium text-center">All User List Table</h2>
      </div>
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>#</th>
            <th>User Photo</th>
            <th>User Info</th>
            <th>User Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user, idx) => (
            <tr key={user._id}>
              <th>{idx + 1}</th>
              <td>
                <div className="mask mask-squircle h-12 w-12">
                  <img src={user?.photo} />
                </div>
              </td>
              <td>
                <h2 className="font-medium">{user?.name}</h2>
                <p>{user?.email}</p>
                <p>Id: {user?._id}</p>
              </td>
              <td>
                <h2 className="font-medium">{user?.role}</h2>
                <p
                  className={`${
                    user?.status == "pending" || user?.status == "suspend"
                      ? "text-red-500"
                      : "text-green-500"
                  }`}
                >
                  {user?.status}
                </p>
              </td>
              <td>
                {user?.status === "approved" ? (
                  <button
                    className="btn btn-sm tooltip"
                    data-tip="Already Approved"
                    disabled
                  >
                    <SiTicktick />
                  </button>
                ) : (
                  //
                  <button
                    onClick={() => handleStatusApproved(user?._id)}
                    className="btn btn-sm tooltip"
                    data-tip="Approve"
                  >
                    <SiTicktick />
                  </button>
                )}
                {/*  user */}
                <button
                  onClick={() => handleStatusSuspend(user?._id)}
                  className="btn btn-sm tooltip mx-2 text-red-600"
                  data-tip="Suspends"
                >
                  <TbPlayerEjectFilled />
                </button>
                {/* Remove user */}
                <button
                  onClick={() => handleUserDelete(user?._id)}
                  className="btn btn-sm tooltip"
                  data-tip="Remove"
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserCollections;
