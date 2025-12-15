import { useForm } from "react-hook-form";
import MyContainer from "../MyContainer/MyContainer";
import useAuth from "./../../Hooks/useAuth";
import useTheme from "../../Hooks/useTheme";
import axios from "axios";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { toast } from "react-toastify";

const AddProduct = () => {
  const categories = ["Shirt", "Pant", "Jacket", "Top"];
  const paymentOptions = ["Cash on Delivery", "Online Payment"];
  // Custom hook
  const { user } = useAuth();
  const { isDark } = useTheme();
  const axiosSecure = useAxiosSecure();
  console.log(user);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      showOnHome: false,
    },
  });

  const handleNewProductPost = async (data) => {
    console.log("Product Data:", data);

    if (!data.images || data.images.length === 0) {
      console.error("No images selected!");
      return;
    }

    const host_key = import.meta.env.VITE_image_host_key;

    // Upload each image separately
    const uploadedImageURLs = [];
    for (let i = 0; i < data.images.length; i++) {
      const imageFile = data.images[i];

      const formData = new FormData();
      formData.append("image", imageFile);

      const uploadRes = await axios.post(
        `https://api.imgbb.com/1/upload?key=${host_key}`,
        formData
      );

      uploadedImageURLs.push(uploadRes.data.data.display_url);
    }

    const token = user?.accessToken;
    console.log(token);

    // ProductData info
    const productInfo = {
      productName: data.productName,
      title: data.productTitle,
      description: data.description,
      category: data.category,
      price: data.price,
      currency: "USD",
      availableQuantity: data.availableUnit,
      minimumOrder: data.orderUnit,
      supplierEmail: data.email,
      media: { images: uploadedImageURLs },
      createdAt: new Date(),
      paymentOptions: [data.payment],
      orderButton: {
        visibleForRoles: ["manager"],
        requiresVerifiedAccount: false,
      },
    };

    console.log(productInfo);

    //  Data save in the database
    try {
      const res = await axiosSecure.post("/single-product", productInfo);
      toast.success("Successfully Upload Product");
      reset(); // now this will run

      return res.data;
    } catch (error) {
      console.error("Product upload failed:", error);
    }
  };

  //

  return (
    <div className={`py-12  ${isDark ? "" : "bg-[#FFFBEB]"}`}>
      <MyContainer>
        <div
          className={`mx-auto rounded-lg shadow-2xl p-8 md:w-[720px] lg:w-[900px] ${
            isDark ? "bg-gray-500" : "bg-base-200"
          }`}
        >
          <h2 className="text-2xl md:text-4xl font-medium text-center underline mb-8">
            Add Now Best Collection
          </h2>
          <form
            onSubmit={handleSubmit(handleNewProductPost)}
            className="space-y-6"
          >
            {/* Manager name & Email */}
            <div className="md:flex justify-between items-center gap-6">
              {/* Manager Name */}
              <div className="flex-1 w-full">
                <label className="block font-medium mb-1">User Name</label>
                <input
                  type="text"
                  defaultValue={user?.displayName}
                  readOnly
                  {...register("managerName")}
                  className="w-full border rounded px-3 py-2"
                />
                {errors.managerName && (
                  <p className="text-red-500 text-sm">
                    {errors.managerName.message}
                  </p>
                )}
              </div>
              {/* Manager email */}
              <div className="flex-1 w-full">
                <label className="block font-medium mb-1">User Email</label>
                <input
                  type="text"
                  defaultValue={user?.email}
                  readOnly
                  {...register("email")}
                  className="w-full border rounded px-3 py-2"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>
            </div>
            {/* Product Name */}
            <div className="flex-1 w-full">
              <label className="block font-medium mb-1">Product Name</label>
              <input
                type="text"
                {...register("productName", {
                  required: "Product name is required",
                })}
                className="w-full border rounded px-3 py-2"
                placeholder="Enter Product Name"
              />
              {errors.productName && (
                <p className="text-red-500 text-sm">
                  {errors.productName.message}
                </p>
              )}
            </div>
            {/* Product title */}
            <div className="flex-1 w-full">
              <label className="block font-medium mb-1">Product Title</label>
              <input
                type="text"
                {...register("productTitle", {
                  required: "Product name is required",
                })}
                className="w-full border rounded px-3 py-2"
                placeholder="Enter Product Name"
              />
              {errors.productTitle && (
                <p className="text-red-500 text-sm">
                  {errors.productTitle.message}
                </p>
              )}
            </div>

            {/* Product price & Image */}
            <div className="md:flex justify-between items-center gap-6">
              {/* Price */}
              <div className="flex-1 w-full">
                <label className="block font-medium mb-1">Product Price</label>
                <input
                  type="number"
                  {...register("price", {
                    required: "Price is required",
                    min: { value: 0, message: "Price must be positive" },
                  })}
                  className="w-full border rounded px-3 py-2"
                  placeholder="Enter Price"
                />
                {errors.price && (
                  <p className="text-red-500 text-sm">{errors.price.message}</p>
                )}
              </div>
              {/* Images Upload */}
              <div className="flex-1 w-full mt-4 md:mt-0">
                <label className="block font-medium mb-1">Images Upload</label>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  {...register("images", {
                    required: "Please upload image",
                  })}
                  className="w-full file-input"
                />
                {errors.images && (
                  <p className="text-red-500 text-sm">
                    {errors.images.message}
                  </p>
                )}
              </div>
            </div>

            {/* Available Quantity & Minimum Order Quantity */}
            <div className="md:flex justify-between items-center gap-6">
              {/* Available Quantity */}
              <div className="flex-1 w-full">
                <label className="block font-medium mb-1">
                  Available Quantity
                </label>
                <input
                  type="number"
                  {...register("availableUnit", {
                    required: "Quantity is required",
                    min: { value: 50, message: "Quantity must be 50" },
                  })}
                  className="w-full border rounded px-3 py-2"
                  placeholder="Quantity must be 50"
                />
                {errors.availableUnit && (
                  <p className="text-red-500 text-sm">
                    {errors.availableUnit.message}
                  </p>
                )}
              </div>
              {/* Minimum Order Quantity */}
              <div className="flex-1 w-full mt-4 md:mt-0">
                <label className="block font-medium mb-1">
                  Minimum Order Quantity
                </label>
                <input
                  type="number"
                  {...register("orderUnit", {
                    required: "MOQ is required",
                    min: { value: 1, message: "Must be at least 50" },
                  })}
                  className="w-full border rounded px-3 py-2"
                  placeholder="Must be at least 50"
                />
                {errors.orderUnit && (
                  <p className="text-red-500 text-sm">
                    {errors.orderUnit.message}
                  </p>
                )}
              </div>
            </div>

            {/* Category & Payment Options */}
            <div className="md:flex justify-between items-center gap-6">
              {/* Category */}
              <div className="flex-1 w-full">
                <label className="block font-medium mb-1">Category</label>
                <select
                  {...register("category", {
                    required: "Category is required",
                  })}
                  className="w-full border rounded px-3 py-2"
                >
                  <option className="text-black" value="">
                    Select Category
                  </option>
                  {categories.map((cat) => (
                    <option className="text-black" key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <p className="text-red-500 text-sm">
                    {errors.category.message}
                  </p>
                )}
              </div>
              {/* Payment Options */}
              <div className="flex-1 w-full mt-4 md:mt-0">
                <label className="block font-medium mb-1">
                  Payment Options
                </label>
                <select
                  {...register("payment", {
                    required: "Payment option is required",
                  })}
                  className="w-full border rounded px-3 py-2"
                >
                  <option className="text-black" value="">
                    Select Payment Option
                  </option>
                  {paymentOptions.map((opt) => (
                    <option className="text-black" key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
                {errors.payment && (
                  <p className="text-red-500 text-sm">
                    {errors.payment.message}
                  </p>
                )}
              </div>
            </div>

            {/* Product Description */}
            <div>
              <label className="block font-medium mb-1">
                Product Description*
              </label>
              <textarea
                {...register("description", {
                  required: "Description is required",
                })}
                className="w-full border rounded px-3 py-2"
                rows={4}
              ></textarea>
              {errors.description && (
                <p className="text-red-500 text-sm">
                  {errors.description.message}
                </p>
              )}
            </div>
            {/* Submit */}
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-primary text-white px-10 py-2 rounded cursor-pointer"
              >
                Add Product
              </button>
            </div>
          </form>
        </div>
      </MyContainer>
    </div>
  );
};

export default AddProduct;
