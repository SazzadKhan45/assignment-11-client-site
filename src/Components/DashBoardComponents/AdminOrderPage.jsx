import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import { FaTrash } from "react-icons/fa";
import Loading from "../Loading/Loading";
import { useState } from "react";
import { MdTrackChanges } from "react-icons/md";

const AdminOrderPage = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);

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
        `/all-order-admin?email=${user?.email}`
      );
      return res.data.data;
    },
  });

  // Delete Order
  const handleProductDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axiosSecure.delete(`/order/${id}`);
        Swal.fire("Deleted!", "Order has been deleted.", "success");
        refetch();
      }
    });
  };

  return (
    <div>
      <div className="overflow-x-auto">
        <div className="bg-primary py-2 mb-4">
          <h2 className="text-xl font-medium text-center">All Orders List</h2>
        </div>

        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Product</th>
              <th>Price & Quantity</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {isPending ? (
              <tr>
                <td colSpan={4}>
                  <Loading />
                </td>
              </tr>
            ) : (
              products.map((p, index) => (
                <tr key={p._id}>
                  <th>{index + 1}</th>

                  <td className="flex items-center gap-3">
                    <div className="h-12 w-12">
                      <img
                        className="object-cover rounded-lg w-full h-full"
                        src={p?.images}
                        alt={p?.productName}
                      />
                    </div>
                    <div>
                      <h2 className="font-medium">{p?.productName}</h2>
                      <p className="text-sm">{p?.category}</p>
                    </div>
                  </td>

                  <td>
                    <h2 className="font-medium">
                      ${p?.price} {p?.currency}
                    </h2>
                    <p className="text-sm">Units: {p?.availableQuantity}</p>
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

                    <button
                      onClick={() => handleProductDelete(p?._id)}
                      className="btn btn-sm tooltip"
                      data-tip="Remove"
                    >
                      <FaTrash className="text-red-600" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ✅ SINGLE MODAL (OUTSIDE TABLE) */}
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

export default AdminOrderPage;
