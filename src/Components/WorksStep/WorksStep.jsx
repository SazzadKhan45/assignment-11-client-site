import { FaBookmark } from "react-icons/fa";
import MyContainer from "../MyContainer/MyContainer";
import { FcFactory } from "react-icons/fc";
import { RiAdminFill } from "react-icons/ri";
import { FaCartShopping } from "react-icons/fa6";
import { MdReviews } from "react-icons/md";
import useTheme from "../../Hooks/useTheme";

const WorksStep = () => {
  const { isDark } = useTheme();

  return (
    <div
      className={`mt-12 pb-12   ${
        isDark ? "bg-[#1D232A]" : "bg-gray-50 text-gray-800"
      }`}
    >
      <MyContainer>
        <div className="px-2 md:px-0 pt-12">
          <h2 className="flex justify-center items-center gap-1 text-2xl md:text-4xl font-medium">
            How It Works To Steps
          </h2>
          <p className="text-center text-gray-500 md:px-8 lg:px-60 mt-2">
            Explore garment products uploaded by factories with details and
            pricing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-2 md:px-0 mt-12 text-gray-800">
          {/* Card-1 */}
          <div className="p-6 bg-white shadow-md rounded-xl hover:shadow-lg hover:-translate-y-1 transition duration-300">
            <div className="flex items-center gap-3 mb-3">
              <RiAdminFill size={28} className="text-[#df9919]" />
              <h3 className="font-semibold text-lg">
                Admin Confirms & Manages Delivery
              </h3>
            </div>

            <p className="text-gray-600 text-sm leading-relaxed">
              The admin validates the order, coordinates shipping, and ensures
              smooth delivery to the buyer.
            </p>
          </div>
          {/* Card-2 */}
          <div className="p-6 bg-white shadow-md rounded-xl hover:shadow-lg hover:-translate-y-1 transition duration-300">
            <div className="flex items-center gap-3 mb-3">
              <FcFactory size={28} className="text-[#df9919]" />
              <h3 className="font-semibold text-lg">
                Factory Manager Uploads Products
              </h3>
            </div>

            <p className="text-gray-600 text-sm leading-relaxed">
              Garment factory managers add product listings with photos,
              details, and quantity. Items immediately appear for buyers.
            </p>
          </div>

          {/* Card-3 */}
          <div className="p-6 bg-white shadow-md rounded-xl hover:shadow-lg hover:-translate-y-1 transition duration-300">
            <div className="flex items-center gap-3 mb-3">
              <FaCartShopping size={28} className="text-[#df9919]" />
              <h3 className="font-semibold text-lg">Buyer Places Order</h3>
            </div>

            <p className="text-gray-600 text-sm leading-relaxed">
              Buyers submit orders with quantity and delivery information. The
              admin receives instant notifications.
            </p>
          </div>

          {/* Card-4 */}
          <div className="p-6 bg-white shadow-md rounded-xl hover:shadow-lg hover:-translate-y-1 transition duration-300">
            <div className="flex items-center gap-3 mb-3">
              <FaBookmark size={28} className="text-[#df9919]" />
              <h3 className="font-semibold text-lg">Buyer Booking Products</h3>
            </div>

            <p className="text-gray-600 text-sm leading-relaxed">
              Buyers explore a wide range of garment items uploaded by factory
              managers with images, specifications, and pricing.
            </p>
          </div>

          {/* Card-5 */}
          <div className="p-6 bg-white shadow-md rounded-xl hover:shadow-lg hover:-translate-y-1 transition duration-300">
            <div className="flex items-center gap-3 mb-3">
              <FaBookmark size={28} className="text-[#df9919]" />
              <h3 className="font-semibold text-lg">
                Factory Ships the Product
              </h3>
            </div>

            <p className="text-gray-600 text-sm leading-relaxed">
              After approval, the factory ships products to the buyer. Tracking
              updates are shared with the admin and buyer.
            </p>
          </div>

          {/* Card-6 */}
          <div className="p-6 bg-white shadow-md rounded-xl hover:shadow-lg hover:-translate-y-1 transition duration-300">
            <div className="flex items-center gap-3 mb-3">
              <MdReviews size={28} className="text-[#df9919]" />
              <h3 className="font-semibold text-lg">
                Order Completed & Reviews
              </h3>
            </div>

            <p className="text-gray-600 text-sm leading-relaxed">
              After approval, the factory ships products to the buyer. Tracking
              updates are shared with the admin and buyer.
            </p>
          </div>
        </div>
      </MyContainer>
    </div>
  );
};

export default WorksStep;
