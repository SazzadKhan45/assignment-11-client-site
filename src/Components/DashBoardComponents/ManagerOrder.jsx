import Loading from "../Loading/Loading";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import { FcAcceptDatabase } from "react-icons/fc";
import { LuView } from "react-icons/lu";
import { TbPlayerEjectFilled } from "react-icons/tb";

const ManagerOrder = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    isPending,
    data: products = [],
    refetch,
  } = useQuery({
    queryKey: ["All-Product"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/all-order-manager?email=${user?.email}`
      );
      return Array.isArray(res.data.data) ? res.data.data : [];
    },
  });

  const handleOrderApprove = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Accept This Order",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Confirm",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axiosSecure.patch(`/order-approve/${id}`);
        Swal.fire({
          title: "Confirm Order",
          text: "Your Order has been Accepted",
          icon: "success",
        });
        refetch();
      }
    });
  };

  const handleOrderReject = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Reject This Order",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Confirm",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axiosSecure.patch(`/order-reject/${id}`);
        Swal.fire({
          title: "Rejected Confirm",
          text: "Your Order has been rejected",
          icon: "success",
        });
        refetch();
      }
    });
  };

  const handleEditProduct = () => {
    Swal.fire({
      title: "Edit Product Successfully",
      icon: "success",
      draggable: true,
    });
  };

  return (
    <div>
      <div className="overflow-x-auto">
        <div className="bg-primary py-2 mb-4">
          <h2 className="text-xl font-medium text-center">
            All Order List Table
          </h2>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>BuyerInfo</th>
              <th>OrderId</th>
              <th>Quantity & Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {isPending ? (
              <tr>
                <td colSpan={5}>
                  <Loading />
                </td>
              </tr>
            ) : (
              Array.isArray(products) &&
              products.map((p, index) => (
                <tr key={p._id}>
                  <th>{index + 1}</th>
                  <td>
                    <h2>{p?.name}</h2>
                    <p>{p?.buyerEmail}</p>
                  </td>
                  <td>
                    <h2>
                      Id: <span className="font-medium">{p?.trackingId}</span>
                    </h2>
                  </td>
                  <td>
                    <h2 className="font-medium">Units: {p?.Quantity}</h2>
                    <p>
                      Order:
                      <span
                        className={`font-medium ${
                          p?.orderStatus === "approved"
                            ? "text-green-600"
                            : "text-red-500"
                        }`}
                      >
                        {" "}
                        {p?.orderStatus}
                      </span>
                    </p>
                  </td>
                  <td>
                    <button
                      onClick={() => handleEditProduct(p?._id)}
                      className="btn btn-sm mr-2 tooltip"
                      data-tip="Order Views"
                    >
                      <LuView />
                    </button>
                    <button
                      onClick={() => handleOrderReject(p?._id)}
                      className="btn btn-sm mr-2 tooltip"
                      data-tip="Reject Order"
                    >
                      <TbPlayerEjectFilled />
                    </button>
                    <button
                      onClick={() => handleOrderApprove(p?._id)}
                      className="btn btn-sm tooltip"
                      data-tip="Accept Order"
                    >
                      <FcAcceptDatabase />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManagerOrder;
