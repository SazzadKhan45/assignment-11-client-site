import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import Loading from "../Loading/Loading";
import { MdCancel } from "react-icons/md";

const BuyerOrderPage = () => {
  //
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

  // console.log(products);

  // handle order approved
  const handleOrderApprove = async (id) => {
    console.log(id);

    Swal.fire({
      title: "Are you sure?",
      text: "Cancel Your Order",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        // DELETE only after confirmation
        await axiosSecure.patch(`/order-cancel/${id}`);

        Swal.fire({
          title: "Successfully Cancel",
          text: "",
          icon: "success",
        });
        refetch();
      }
    });
  };

  //

  return (
    <div>
      <div className="overflow-x-auto">
        <div className="bg-primary py-2 mb-4">
          <h2 className="text-xl font-medium text-center">
            My Order List Table
          </h2>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>BuyerInfo</th>
              <th>Order Id</th>
              <th>Quantity & Status</th>
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
                  <td className="flex items-center gap-2">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img src={p?.images} />
                      </div>
                    </div>
                    <div>
                      <h2 className="font-medium">{p?.productName}</h2>
                      <p>Price: ${p?.price}</p>
                      <p className="font-medium">{p?.paymentOptions}</p>
                    </div>
                  </td>
                  <td className="font-medium">
                    <h2 className="">Id: {p?.trackingId}</h2>
                  </td>
                  <td>
                    <p>
                      Order:
                      <span
                        className={`font-medium ${
                          p?.orderStatus == "approved"
                            ? "text-green-600"
                            : "text-red-500"
                        }`}
                      >
                        {" "}
                        {p?.orderStatus}
                      </span>
                    </p>
                    <h2 className="font-medium">Units: {p?.Quantity}</h2>
                  </td>
                  <td>
                    {/* Cancel Order */}
                    {p?.orderStatus == "approved" ||
                    p?.orderStatus == "cancel" ||
                    p?.orderStatus == "rejected" ? (
                      <button
                        onClick={() => handleOrderApprove(p?._id)}
                        className="btn btn-sm tooltip"
                        data-tip="Cancel Order"
                        disabled
                      >
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
    </div>
  );
};

export default BuyerOrderPage;
