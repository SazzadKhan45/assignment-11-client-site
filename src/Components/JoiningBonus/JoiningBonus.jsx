import { FaRegCheckCircle, FaTimesCircle } from "react-icons/fa";
import MyContainer from "../MyContainer/MyContainer";
import useTheme from "../../Hooks/useTheme";

const JoiningBonus = () => {
  const { isDark } = useTheme();

  return (
    <div
      className={`mt-12 px-3 md:px-0 ${
        isDark ? "bg-[#364153]" : "bg-secondary text-primary"
      }`}
    >
      <MyContainer>
        <div className="py-12">
          <div className="px-2 md:px-0">
            <h2 className="text-2xl md:text-4xl font-medium text-center">
              Select To Your Package!
            </h2>
            <p className="text-center md:px-8 lg:px-72 mt-2 text-white">
              Select To Your Package" lets new hires pick their preferred
              joining bonus amount or structure (cash, RSUs, perks) from
              pre-approved company options.
            </p>
          </div>
          {/* Joining Pack */}

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 lg:gap-10">
            {/* Basic package */}
            <div className="card bg-base-100 shadow-sm hover:scale-105 transition-transform duration-300">
              <div className={`card-body  ${isDark ? "" : "text-gray-700"}`}>
                <span className="mt-4 badge-warning"></span>
                <div className="flex justify-between">
                  <h2 className="text-3xl font-bold">Basic</h2>
                  <span className="text-xl">$19/mo</span>
                </div>
                <ul className="mt-6 flex flex-col gap-2 text-xs">
                  <li className="flex items-center gap-2">
                    <FaRegCheckCircle className="text-green-700" />
                    <span>24/7 HotLine</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <FaRegCheckCircle className="text-green-700" />
                    <span>Fast Order Place</span>
                  </li>
                  <li>
                    <li className="flex items-center gap-2">
                      <FaRegCheckCircle className="text-green-700" />
                      <span>PeBooking </span>
                    </li>
                  </li>
                  <li>
                    <li className="flex items-center gap-2">
                      <FaRegCheckCircle className="text-green-700" />
                      <span>Order Tracking</span>
                    </li>
                  </li>
                  <li className="flex items-center gap-2">
                    <FaTimesCircle className="text-red-600" />
                    <span className="line-through">
                      Real-time collaboration tools
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <FaTimesCircle className="text-red-600" />
                    <span className="line-through">
                      Real-time collaboration tools
                    </span>
                  </li>
                </ul>
                <div className="mt-6">
                  <button className="btn btn-primary btn-block">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
            {/* Most Popular pack */}
            <div className="card bg-base-100 shadow-sm hover:scale-105 transition-transform duration-300">
              <div className={`card-body ${isDark ? "" : "text-gray-700"}`}>
                <span className="badge badge-xs badge-warning">
                  Most Popular
                </span>
                <div className="flex justify-between">
                  <h2 className="text-3xl font-bold">Standard</h2>
                  <span className="text-xl">$25/mo</span>
                </div>
                <ul className="mt-6 flex flex-col gap-2 text-xs">
                  <li className="flex items-center gap-2">
                    <FaRegCheckCircle className="text-green-700" />
                    <span>24/7 HotLine</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <FaRegCheckCircle className="text-green-700" />
                    <span>Fast Order Place</span>
                  </li>
                  <li>
                    <li className="flex items-center gap-2">
                      <FaRegCheckCircle className="text-green-700" />
                      <span>PeBooking </span>
                    </li>
                  </li>
                  <li>
                    <li className="flex items-center gap-2">
                      <FaRegCheckCircle className="text-green-700" />
                      <span>Order Tracking</span>
                    </li>
                  </li>
                  <li className="flex items-center gap-2">
                    <FaRegCheckCircle className="text-green-700" />
                    <span>Contact Before Order</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <FaRegCheckCircle className="text-green-700" />
                    <span>No Limit</span>
                  </li>
                </ul>
                <div className="mt-6">
                  <button className="btn btn-primary btn-block">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
            {/* Premium Pack */}
            <div className="card bg-base-100 shadow-sm hover:scale-105 transition-transform duration-300">
              <div className={`card-body ${isDark ? "" : "text-gray-700"}`}>
                <span className=" mt-3 badge-warning"></span>
                <div className="flex justify-between">
                  <h2 className="text-3xl font-bold">Premium</h2>
                  <span className="text-xl">$39/mo</span>
                </div>
                <ul className="mt-6 flex flex-col gap-2 text-xs">
                  <li className="flex items-center gap-2">
                    <FaRegCheckCircle className="text-green-700" />
                    <span>24/7 HotLine</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <FaRegCheckCircle className="text-green-700" />
                    <span>Fast Order Place</span>
                  </li>
                  <li>
                    <li className="flex items-center gap-2">
                      <FaRegCheckCircle className="text-green-700" />
                      <span>PeBooking </span>
                    </li>
                  </li>
                  <li>
                    <li className="flex items-center gap-2">
                      <FaRegCheckCircle className="text-green-700" />
                      <span>Order Tracking</span>
                    </li>
                  </li>
                  <li className="flex items-center gap-2">
                    <FaRegCheckCircle className="text-green-700" />
                    <span>Contact Before Order</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <FaRegCheckCircle className="text-green-700" />
                    <span>No Limit</span>
                  </li>
                </ul>
                <div className="mt-6">
                  <button className="btn btn-primary btn-block">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </MyContainer>
    </div>
  );
};

export default JoiningBonus;
