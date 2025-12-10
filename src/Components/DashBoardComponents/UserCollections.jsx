import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { SiTicktick } from "react-icons/si";
import { TbPlayerEjectFilled } from "react-icons/tb";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";

const UserCollections = () => {
  // Custom hooks
  const axiosSecure = useAxiosSecure();

  //TanstackQuery function
  const { data: users = [], refetch } = useQuery({
    queryKey: ["userList"],
    queryFn: async () => {
      const res = await axiosSecure.get("/all-users");
      return res.data;
    },
  });

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
  const handleStatusChange = async (id) => {
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

  //

  return (
    <div className="overflow-x-auto">
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
          {users.map((user, idx) => (
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
                    user?.status == "pending"
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
                    onClick={() => handleStatusChange(user?._id)}
                    className="btn btn-sm tooltip"
                    data-tip="Approve"
                  >
                    <SiTicktick />
                  </button>
                )}
                {/*  user */}
                <button className="btn btn-sm tooltip mx-2" data-tip="Suspends">
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
