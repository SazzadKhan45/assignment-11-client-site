import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import Loading from "../Loading/Loading";
import { MdCancel, MdTrackChanges } from "react-icons/md";
import { useState } from "react";

const BuyerOrderPage = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);

  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    isPending,
    data: products = [],
    refetch,
  } = useQuery({
    queryKey: ["buyer-order", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/all-buyer-order?email=${user?.email}`
      );
      return res.data.data;
    },
    enabled: !!user?.email,
  });

  // Cancel order
  const handleOrderApprove = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Cancel your order?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axiosSecure.patch(`/order-cancel/${id}`);
        Swal.fire("Cancelled!", "Order has been cancelled.", "success");
        refetch();
      }
    });
  };

  return (
    <div>
      <title>My Orders</title>
      <div className="overflow-x-auto">
        <div className="bg-primary py-2 mb-4">
          <h2 className="text-xl font-medium text-center">My Order List</h2>
        </div>

        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Product Info</th>
              <th>Order ID</th>
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
              products.map((p, index) => (
                <tr key={p._id}>
                  <th>{index + 1}</th>

                  <td className="flex items-center gap-2">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img src={p?.images} alt={p?.productName} />
                      </div>
                    </div>
                    <div>
                      <h2 className="font-medium">{p?.productName}</h2>
                      <p>Price: ${p?.price}</p>
                      <p className="font-medium">{p?.paymentOptions}</p>
                    </div>
                  </td>

                  <td className="font-medium">{p?.trackingId || "N/A"}</td>

                  <td>
                    <p>
                      Order:
                      <span
                        className={`font-medium ml-1 ${
                          p?.orderStatus === "approved" ||
                          p?.orderStatus === "completed"
                            ? "text-green-600"
                            : "text-red-500"
                        }`}
                      >
                        {p?.orderStatus}
                      </span>
                    </p>
                    <p className="font-medium">Units: {p?.Quantity}</p>
                  </td>

                  <td>
                    <button
                      onClick={() => {
                        setSelectedOrder(p);
                        document.getElementById("my_modal_5").showModal();
                      }}
                      className="btn btn-sm tooltip mr-2"
                      data-tip="Tracking Order"
                    >
                      <MdTrackChanges />
                    </button>

                    {p?.orderStatus === "approved" ||
                    p?.orderStatus === "cancel" ||
                    p?.orderStatus === "rejected" ? (
                      <button disabled className="btn btn-sm">
                        <MdCancel />
                      </button>
                    ) : (
                      <button
                        onClick={() => handleOrderApprove(p?._id)}
                        className="btn btn-sm tooltip"
                        data-tip="Cancel Order"
                      >
                        <MdCancel />
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ✅ SINGLE MODAL — OUTSIDE TABLE */}
      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">📦 Order Tracking</h3>

          {selectedOrder && (
            <div className="py-4 space-y-2">
              <p>
                <strong>Product:</strong> {selectedOrder.productName}
              </p>

              <p>
                <strong>Status:</strong>{" "}
                <span className="badge badge-info">
                  {selectedOrder.orderStatus}
                </span>
              </p>

              <p>
                <strong>Tracking ID:</strong>{" "}
                {selectedOrder.trackingId || "Not assigned yet"}
              </p>

              {selectedOrder.orderStatus === "pending" && (
                <p className="text-warning">
                  ⏳ Your order is being processed.
                </p>
              )}

              {selectedOrder.orderStatus === "approved" && (
                <p className="text-primary">
                  🚚 Your order has been approved and will be shipped soon.
                </p>
              )}

              {selectedOrder.orderStatus === "completed" && (
                <p className="text-success">
                  ✅ Your order has been delivered successfully.
                </p>
              )}
            </div>
          )}

          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default BuyerOrderPage;
