import React from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import MyContainer from "../MyContainer/MyContainer";
import { AiFillFire } from "react-icons/ai";
import Loading from "../Loading/Loading";
import ProductsCard from "../ProductsCard/ProductsCard";
import { Link } from "react-router";

const HomePageProducts = () => {
  const axiosSecure = useAxiosSecure();

  const { isLoading, data: products = [] } = useQuery({
    queryKey: ["Latest Product"],
    queryFn: async () => {
      const res = await axiosSecure.get("/products-home");
      return res.data.data;
    },
  });

  // console.log(products);

  return (
    <div className="mt-12 px-2 md:px-0">
      <title>Home</title>
      <MyContainer>
        <div>
          <h2 className="flex justify-center items-center gap-1 text-2xl md:text-4xl font-medium">
            <AiFillFire className="text-red-500" /> Our Latest Collection
          </h2>
          <p className="text-justify md:text-center text-gray-500 md:px-8 lg:px-60 mt-2">
            Discover our latest collection of garments, featuring stylish,
            comfortable, and high-quality pieces designed for modern living.
            Trendy designs, premium fabrics, and versatile styles perfect for
            every occasion.
          </p>
        </div>

        {/*  */}
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
        <h2 className="text-center text-lg font-medium mt-8">
          <Link to="/all-products" className="px-4 py-2 rounded  bg-primary">
            Show More..
          </Link>
        </h2>
      </MyContainer>
    </div>
  );
};

export default HomePageProducts;
