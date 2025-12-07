import { FaCheckCircle, FaBookmark } from "react-icons/fa";
import MyContainer from "../MyContainer/MyContainer";
import { FcFactory } from "react-icons/fc";
import { RiAdminFill } from "react-icons/ri";
import { FaCartShopping } from "react-icons/fa6";
import { MdReviews } from "react-icons/md";

const WorksStep = () => {
  return (
    <div className="mt-16 bg-gray-50 py-16">
      <MyContainer>
        <h2 className="text-3xl font-bold text-center mb-10">
          How It Works To Step
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Card-1 */}
          <div className="p-6 bg-white shadow-md rounded-xl hover:shadow-lg hover:-translate-y-1 transition duration-300">
            <div className="flex items-center gap-3 mb-3">
              <RiAdminFill size={28} />
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
              <FcFactory size={28} />
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
              <FaCartShopping size={28} />
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
              <FaBookmark size={28} />
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
              <FaBookmark size={28} />
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
              <MdReviews size={28} />
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
