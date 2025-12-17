import { useForm, useWatch } from "react-hook-form";
import MyContainer from "../MyContainer/MyContainer";
import useAuth from "./../../Hooks/useAuth";
import useTheme from "../../Hooks/useTheme";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useNavigate, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

const OrderPage = () => {
  // Custom hook
  const { user } = useAuth();
  const { isDark } = useTheme();
  const axiosSecure = useAxiosSecure();

  //
  const { id } = useParams();
  const navigate = useNavigate();

  // React hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm({
    defaultValues: {
      showOnHome: false,
    },
  });

  // Tanstack query
  const { data: product } = useQuery({
    queryKey: ["Product", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/product/${id}`);
      return res.data.data;
    },
  });

  // Live watch user order quantity
  const orderUnit = useWatch({
    control,
    name: "orderUnit",
  });

  // Live watch select payment method
  const paymentMethodSelect = useWatch({
    control,
    name: "payment",
  });
  console.log(paymentMethodSelect);

  // Calculate live total amount
  const totalAmount = (orderUnit || 0) * (product?.price || 0);

  //handle order post function
  const handleNewOrderPost = async (data) => {
    const totalAmount = product.price * data.orderUnit;

    const orderInfo = {
      name: user?.displayName,
      productName: product.productName,
      category: product.category,
      price: totalAmount,
      images: product.media.images[0],
      buyerEmail: user.email,
      supplierEmail: product.supplierEmail,
      paymentOptions: data.payment,
      Quantity: data.orderUnit,
      contact: data.contactNumber,
      productId: product._id,
    };

    console.log(orderInfo);

    //
    Swal.fire({
      title: "Are you sure?",
      text: `Total Amount: $${totalAmount}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm Order",
    }).then(async (result) => {
      if (result.isConfirmed) {
        //
        await axiosSecure.post("/buyer-order", orderInfo);
        Swal.fire({
          title: "Place New Order",
          text: "Please Check Dashboard Oder Status",
          icon: "success",
        });
        reset();
        navigate("/all-products");
      }
    });
  };

  // Online Payments function
  const handleOnlinePayment = async (data) => {
    //
    const totalAmount = product.price * data.orderUnit;
    // Online paymentInfo
    const paymentInfo = {
      cost: totalAmount,
      buyerEmail: user.email,
      productId: product._id,
      productName: product.productName,
      images: product.media.images[0],
      Quantity: data.orderUnit,
      contact: data.contactNumber,
      supplierEmail: product.supplierEmail,
      paymentOptions: data.payment,
      category: product.category,
      name: user?.displayName,
    };

    //
    const res = await axiosSecure.post("/payment-checkout", paymentInfo);
    //
    window.open(res.data.url);
  };

  //

  return (
    <div className={`py-12 ${isDark ? "" : "bg-[#FFFBEB]"}`}>
      <MyContainer>
        <div
          className={`mx-auto rounded-lg shadow-2xl p-8 md:w-[800px] lg:w-[900px] ${
            isDark ? "bg-gray-500" : "bg-base-200"
          }`}
        >
          {/* Products info */}
          <div className="md:flex gap-6 items-center md:border rounded-lg mb-4 md:p-3">
            <div>
              <img
                className="rounded h-[300px] w-full"
                src={product?.media.images[0]}
              />
            </div>
            <div className="md:border-l-2 md:border-gray-400 md:pl-4 mt-3 md:mt-0">
              <h2 className="text-lg font-medium">Title: {product?.title}</h2>
              <p className="py-2 font-medium">Name: {product?.productName}</p>
              <h2 className="text-xl font-bold">Price: ${product?.price}</h2>
              <p className="py-2 font-medium">
                availableQuantity: {product?.availableQuantity}
              </p>
              <p className="font-medium">Min-Order: {product?.minimumOrder}</p>
              <button className="font-medium btn mt-2">
                Category: {product?.category}
              </button>
            </div>
          </div>

          {/* Get deliver info from buyer */}
          <form
            onSubmit={handleSubmit(handleNewOrderPost)}
            className="space-y-6 md:px-12 lg:px-20"
          >
            <div className="text-center">
              <h3 className="text-2xl inline-block border-b-2 pb-0.5">
                Order Summary
              </h3>
            </div>

            {/* Buyer name & Min-Order Quantity */}
            <div className="md:flex justify-between items-center gap-6">
              {/* Buyer Name */}
              <div className="flex-1 w-full">
                <label className="block font-medium mb-1">Your Name</label>
                <input
                  type="text"
                  defaultValue={user?.displayName}
                  readOnly
                  {...register("buyerName")}
                  className="w-full border rounded px-3 py-2"
                />
              </div>

              {/* Order Quantity */}
              <div className="flex-1 w-full mt-4 md:mt-0">
                <label className="block font-medium mb-1">
                  Min-Order Quantity
                </label>
                <input
                  type="number"
                  {...register("orderUnit", {
                    required: "Min-Quantity is required",
                    min: { value: 50, message: "Must be at least 50" },
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

            {/* Payment & Address */}
            <div className="md:flex justify-between items-center gap-6">
              {/* Payment */}
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

                  {product?.paymentOptions.map((opt) => (
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

              {/* Address */}
              <div className="flex-1 w-full">
                <label className="block font-medium mb-1">
                  Delivery Address
                </label>

                <input
                  type="text"
                  {...register("address", {
                    required: "Delivery address is required",
                    minLength: {
                      value: 5,
                      message: "Address must be at least 5 characters",
                    },
                  })}
                  className="w-full border rounded px-3 py-2"
                  placeholder="Enter Address"
                />

                {errors.address && (
                  <p className="text-red-500 text-sm">
                    {errors.address.message}
                  </p>
                )}
              </div>
            </div>
            {/* Contact info */}
            <div className="md:flex justify-between items-center gap-6">
              {/*  */}
              <div className="flex-1 w-full">
                <label className="block font-medium mb-1">Your Number</label>
                <input
                  type="text"
                  {...register("contactNumber", {
                    required: "Contact Number is required",
                  })}
                  className="w-full border rounded px-3 py-2"
                  placeholder="Enter Your Number"
                />
              </div>
              {/*  */}
              <div className="flex-1 w-full">
                <label className="block font-medium mb-1">Instructions </label>
                <input
                  type="text"
                  {...register("instructions")}
                  className="w-full border rounded px-3 py-2"
                  placeholder="Enter Your Instructions"
                />
              </div>
            </div>

            {/* Submit */}
            <div className="flex items-center justify-between mt-6">
              <h2 className="text-2xl">
                Total Amount : $
                <span className="font-bold text-secondary">{totalAmount}</span>
              </h2>

              {paymentMethodSelect == "Online Payment" ? (
                <button
                  type="button"
                  onClick={handleSubmit(handleOnlinePayment)}
                  className="bg-secondary text-white px-10 py-2 rounded cursor-pointer"
                >
                  Place Your Order
                </button>
              ) : (
                <button
                  type="submit"
                  className="bg-secondary text-white px-10 py-2 rounded cursor-pointer"
                >
                  Place Your Order
                </button>
              )}
            </div>
          </form>
        </div>
      </MyContainer>
    </div>
  );
};
export default OrderPage;
