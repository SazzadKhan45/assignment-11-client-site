import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import { FaEdit, FaTrash } from "react-icons/fa";

const AllProductsTable = () => {
  //
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: products = [] } = useQuery({
    queryKey: ["All-Product"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/all-product-data?email=${user?.email}`
      );
      return res.data.data;
    },
  });

  console.log(products);

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
            {products.map((p, index) => (
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
                  <button className="btn btn-sm mr-2 bg-primary">
                    <FaEdit />
                  </button>
                  <button className="btn btn-sm">
                    <FaTrash className="text-red-600" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllProductsTable;
