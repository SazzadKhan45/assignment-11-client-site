import { Link, useParams } from "react-router";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import MyContainer from "../MyContainer/MyContainer";
import { useQuery } from "@tanstack/react-query";
import Loading from "../Loading/Loading";
import useUserRole from "../../Hooks/useUserRole";
// import useTheme from "../../Hooks/useTheme";

const ProductDetails = () => {
  // Custom hook
  const axiosSecure = useAxiosSecure();
  const { role } = useUserRole();
  //   const { isDark } = useTheme();
  const { id } = useParams();

  // Data loaded by tanstack Query

  const { data: product, isLoading } = useQuery({
    queryKey: ["Product", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/product/${id}`);
      return res.data.data;
    },
  });

  // console.log(product);

  return (
    <div className="my-16 px-2 md:px-0">
      <MyContainer>
        {isLoading ? (
          <Loading />
        ) : (
          <div className="shadow-2xl p-6 md:p-8 lg:p-12 rounded-xl md:h-[450px] lg:h-[600px] lg:w-[1000px] lg:mx-auto">
            <div className="md:flex justify-between items-center gap-12 ">
              {/* Image  */}
              <div className="flex-1 ">
                <img
                  className="h-auto md:h-[350px] lg:h-[450px] object-cover rounded"
                  src={product?.media.images[0]}
                />
              </div>

              {/* Info  */}
              <div className="flex-1 mt-4 md:mt-0 border-l-2 border-gray-400 pl-4">
                <h2 className="text-xl md:text-2xl font-medium">
                  {product?.productName}
                </h2>
                <p className="text-gray-500 mt-2">{product?.description}</p>
                {/*  */}
                <div className="flex  justify-between items-center mt-2">
                  <h3 className="font-medium">
                    Min-Order: {product?.minimumOrder}
                  </h3>
                  <h3 className="font-medium">
                    Available-Units: {product?.availableQuantity}
                  </h3>
                </div>
                <div className="divider"></div>
                {/*  */}
                <div className="flex  justify-between items-center mt-2">
                  <h3 className="font-bold text-lg">
                    Price: ${product?.price}
                  </h3>
                  <button className="btn btn-secondary">
                    {product?.category}
                  </button>
                </div>
                {/* Button show conditionally for role */}
                <div className="flex  justify-between items-center mt-4">
                  {role === "manager" || role === "Admin" ? (
                    <button className="flex w-full btn btn-primary font-medium text-lg text-black">
                      Edit Now
                    </button>
                  ) : (
                    <Link
                      to={`/order-product/${product?._id}`}
                      className="flex w-full btn btn-primary font-medium text-lg text-black"
                    >
                      Order Now
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </MyContainer>
    </div>
  );
};

export default ProductDetails;
