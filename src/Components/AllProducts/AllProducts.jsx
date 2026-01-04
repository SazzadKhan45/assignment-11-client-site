import { IoMdSearch } from "react-icons/io";
import MyContainer from "../MyContainer/MyContainer";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Loading from "../Loading/Loading";
import ProductsCard from "../ProductsCard/ProductsCard";
import useTheme from "./../../Hooks/useTheme";
import { useState } from "react";

const AllProducts = () => {
  const axiosSecure = useAxiosSecure();
  const { isDark } = useTheme();
  const [searchText, setSearchText] = useState("");

  // Load data with TanStack Query
  const { data: products = [], isLoading } = useQuery({
    queryKey: ["All-Product"],
    queryFn: async () => {
      const res = await axiosSecure.get("/all-product");
      return res.data.data;
    },
  });

  // Filter Products by Name OR Category
  const filteredProducts = products.filter(
    (item) =>
      item.productName.toLowerCase().includes(searchText.toLowerCase()) ||
      item.category.toLowerCase().includes(searchText.toLowerCase())
  );

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const currentItems = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className={`py-12 ${isDark ? "bg-gray-900" : "bg-amber-50"}`}>
      <title>All Products</title>
      <MyContainer>
        {/* Header Section */}
        <div className="md:flex justify-between items-center gap-16 px-4 md:px-0">
          <div className="flex-1">
            <h2 className="text-2xl md:text-4xl font-medium mb-4 md:mb-0">
              Total Products{" "}
              <span className="text-gray-600 text-lg md:text-xl">
                ({filteredProducts.length})
              </span>
            </h2>
          </div>

          {/* Live Search */}
          <label className="input flex-1 flex items-center gap-2">
            <IoMdSearch size={18} />
            <input
              type="search"
              placeholder="Search by name or category..."
              value={searchText}
              onChange={(e) => {
                setSearchText(e.target.value);
                setCurrentPage(1); // reset page on search
              }}
              className="bg-transparent outline-none w-full"
            />
          </label>
        </div>

        {/* Product Cards */}
        <div className="mt-12">
          {isLoading ? (
            <Loading />
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {currentItems.length > 0 ? (
                  currentItems.map((product) => (
                    <ProductsCard key={product._id} product={product} />
                  ))
                ) : (
                  <div className="col-span-3 flex flex-col items-center justify-center my-10">
                    <h2 className="text-5xl mb-4">Oops! Sorry</h2>
                    <p className="text-xl text-gray-500">
                      No products found 😥
                    </p>
                  </div>
                )}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-10 gap-2">
                  <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                    className="btn btn-sm"
                  >
                    Prev
                  </button>

                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`btn btn-sm ${
                        currentPage === i + 1 ? "btn-primary" : ""
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}

                  <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(currentPage + 1)}
                    className="btn btn-sm"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </MyContainer>
    </div>
  );
};

export default AllProducts;
