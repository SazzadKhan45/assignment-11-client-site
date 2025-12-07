import React from "react";
import MyContainer from "../MyContainer/MyContainer";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Loading from "../Loading/Loading";
import ProductsCard from "../ProductsCard/ProductsCard";
import useTheme from "./../../Hooks/useTheme";

const AllProducts = () => {
  const axiosSecure = useAxiosSecure();
  const { isDark } = useTheme();

  //Data loaded by TansQuery
  const { data: products = [], isLoading } = useQuery({
    queryKey: ["All-Product"],
    queryFn: async () => {
      const res = await axiosSecure.get("/all-product");
      return res.data.data;
    },
  });

  return (
    <div div className={`py-12 ${isDark ? "bg-gray-900" : "bg-amber-50"}`}>
      <MyContainer>
        <div className="">
          <h2 className="text-2xl md:text-4xl font-medium">
            Total Products{" "}
            <span className="text-gray-600 text-lg md:text-xl">
              ({products.length})
            </span>
          </h2>
        </div>

        {/* Product Data loaded */}
        <div className="mt-12">
          {isLoading ? (
            <Loading />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {products.map((product) => (
                <ProductsCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </MyContainer>
    </div>
  );
};

export default AllProducts;
