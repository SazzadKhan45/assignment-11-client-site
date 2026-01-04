import React from "react";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { Link, Navigate, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import Loading from "../Loading/Loading";
import { LuLogOut } from "react-icons/lu";

const BuyerProfile = () => {
  // Custom hooks
  const { user, LogoutUser } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  // Buyer profile info
  const { isPending, data: managerInfo } = useQuery({
    queryKey: ["manager-info", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/buyer-info?email=${user?.email}`);
      return res.data.data;
    },
    enabled: !!user?.email,
  });

  //
  const { data: orders = [] } = useQuery({
    queryKey: ["buyer-order", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/all-buyer-order?email=${user?.email}`
      );
      return res.data.data;
    },
    enabled: !!user?.email,
  });

  // Logout User
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

  //
  return (
    <div className="px-4">
      <title>My Profile</title>
      <div className="px-4">
        {isPending ? (
          <div>
            <Loading />
          </div>
        ) : (
          <div>
            <ul className=" p-2 shadow-sm mt-2">
              <div className="flex gap-12 ">
                <div className="h-40 w-40 rounded-lg drop-shadow-2xl overflow-hidden border-2 cursor-pointer">
                  <img
                    src={managerInfo?.photo}
                    alt="Profile"
                    className="h-full w-full object-cover"
                  />
                </div>
                {/*  */}
                <div className="border-l-2 border-gray-600 pl-4">
                  <h2>
                    Name:{" "}
                    <span className="font-medium">{managerInfo?.name}</span>
                  </h2>
                  <p>
                    Role:{" "}
                    <span className="font-medium">{managerInfo?.role}</span>
                  </p>
                  <p>
                    Email:{" "}
                    <span className="font-medium">{managerInfo?.email}</span>
                  </p>
                  <p>
                    Id: <span className="font-medium">{managerInfo?._id}</span>
                  </p>
                  <p>
                    {managerInfo?.createdAt &&
                      new Date(managerInfo.createdAt).toLocaleString("en-BD", {
                        timeZone: "Asia/Dhaka",
                        year: "numeric",
                        month: "long",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                  </p>
                </div>
              </div>

              <div className="mt-12 border-t-2 border-primary">
                <div>
                  <h2 className="text-secondary text-2xl font-medium text-center py-4">
                    <span className="inline-block border-b-2 border-primary">
                      Buyer All Orders Info Data
                    </span>
                  </h2>
                  <div className="flex gap-6 py-10">
                    {/*  */}
                    <div className="bg-primary py-8 pl-4 rounded-xl flex-1 flex flex-col justify-center items-center text-center">
                      <h2 className="text-3xl font-medium">
                        AllOrdes:-{" "}
                        <span className="text-secondary font-bold">
                          {orders.length} Units
                        </span>
                      </h2>
                      <Link
                        to="/dashboard/buyer-order"
                        className="btn btn-secondary mt-4 font-medium px-8 text-[17px]"
                      >
                        Show All
                      </Link>
                    </div>
                    {/*  */}
                    <div className="py-8 pl-4 rounded-xl flex-1 flex flex-col justify-center items-center text-center"></div>
                  </div>
                </div>
                <button
                  onClick={handleLogoutUser}
                  className="bg-secondary my-3 font-bold flex items-center justify-center gap-2 w-full text-white py-2 rounded cursor-pointer"
                >
                  <LuLogOut /> LogOut
                </button>
              </div>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default BuyerProfile;
