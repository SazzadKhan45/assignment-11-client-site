import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Loading from "../Loading/Loading";
import Swal from "sweetalert2";
import { FaEdit, FaTrash } from "react-icons/fa";

const ManagerProducts = () => {
  // Custom hooks
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // TanStack Query v5
  const {
    data: products = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["Manager-products", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/manager-product?email=${user?.email}`
      );
      return res.data.data;
    },
    enabled: !!user?.email,
  });

  // Loading state
  if (isLoading) return <Loading />;

  // Error state
  if (error) return <p>Failed to load products.</p>;

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
  console.log(products);

  return (
    <div>
      <title>My Products</title>
      <div className="bg-primary py-2 mb-4">
        <h2 className="text-xl font-medium text-center">
          My Products List Table
        </h2>
      </div>
      {/* My products data table */}
      <div>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>Products Images</th>
                <th>Products Info</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {products.map((product, idx) => (
                <tr key={product._id}>
                  <th>{idx + 1}</th>
                  <td>
                    <div className="mask mask-squircle h-12 w-12">
                      <img src={product.media.images[0]} />
                    </div>
                  </td>
                  <td>
                    <h3 className="font-medium">
                      Name: {product?.productName}
                    </h3>
                    <p className="font-bold">Price: {product?.price}</p>
                    <p>{product?.paymentOptions}</p>
                  </td>
                  <td>
                    <button
                      onClick={() => handleEditProduct(product?._id)}
                      className="btn btn-sm mr-2 bg-primary tooltip"
                      data-tip="Edit"
                    >
                      <FaEdit />
                    </button>
                    {/* Delete product */}
                    <button
                      onClick={() => handleProductDelete(product?._id)}
                      className="btn btn-sm tooltip"
                      data-tip="Remove"
                    >
                      <FaTrash className="text-red-600" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManagerProducts;
