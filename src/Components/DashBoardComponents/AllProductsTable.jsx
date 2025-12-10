import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import { FaEdit, FaTrash } from "react-icons/fa";
import Loading from "../Loading/Loading";
import Swal from "sweetalert2";

const AllProductsTable = () => {
  //
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
        `/all-product-data?email=${user?.email}`
      );
      return res.data.data;
    },
  });

  // handle product delete
  const handleProductDelete = async (id) => {
    console.log(id);

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
        // DELETE only after confirmation
        await axiosSecure.delete(`/product/${id}`);

        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
        refetch();
      }
    });
  };

  // handle edit product
  const handleEditProduct = () => {
    Swal.fire({
      title: "Edit Product Successfully",
      icon: "success",
      draggable: true,
    });
  };

  //

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
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
                    <div className="mask mask-squircle h-12 w-12">
                      <img src={p?.media?.images[0]} />
                    </div>
                    <div>
                      <h2 className="font-medium">{p?.productName}</h2>
                      <p>{p?.category}</p>
                    </div>
                  </td>
                  <td>
                    <h2 className="font-medium">
                      ${p?.price} {p?.currency}
                    </h2>
                    <p>Units: {p?.availableQuantity}</p>
                  </td>
                  <td>
                    <button
                      onClick={() => handleEditProduct(p?._id)}
                      className="btn btn-sm mr-2 bg-primary tooltip"
                      data-tip="Edit"
                    >
                      <FaEdit />
                    </button>
                    {/* Delete product */}
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
    </div>
  );
};

export default AllProductsTable;
