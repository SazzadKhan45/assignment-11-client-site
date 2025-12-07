import React from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import MyContainer from "../MyContainer/MyContainer";
import { AiFillFire } from "react-icons/ai";

const HomePageProducts = () => {
  const axiosSecure = useAxiosSecure();

  const { isLoading, data: products = [] } = useQuery({
    queryKey: ["Latest Product"],
    queryFn: async () => {
      const res = await axiosSecure.get("/products-home");
      return res.data;
    },
  });

  console.log(products);

  return (
    <div className="mt-12 px-2 md:px-0">
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
        {isLoading ? "Loading" : <h2>Total Product {products?.data.length}</h2>}
      </MyContainer>
    </div>
  );
};

export default HomePageProducts;
