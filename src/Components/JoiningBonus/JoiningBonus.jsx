import { FaRegCheckCircle, FaTimesCircle } from "react-icons/fa";
import MyContainer from "../MyContainer/MyContainer";
import useTheme from "../../Hooks/useTheme";

const JoiningBonus = () => {
  const { isDark } = useTheme();

  const cardData = [
    {
      title: "Basic",
      price: "$19/mo",
      features: [
        { label: "24/7 HotLine", available: true },
        { label: "Fast Order Place", available: true },
        { label: "PeBooking", available: true },
        { label: "Order Tracking", available: true },
        { label: "Real-time collaboration tools", available: false },
        { label: "Real-time collaboration tools", available: false },
      ],
    },
    {
      title: "Standard",
      price: "$25/mo",
      features: [
        { label: "24/7 HotLine", available: true },
        { label: "Fast Order Place", available: true },
        { label: "PeBooking", available: true },
        { label: "Order Tracking", available: true },
        { label: "Contact Before Order", available: true },
        { label: "No Limit", available: true },
      ],
    },
    {
      title: "Premium",
      price: "$39/mo",
      features: [
        { label: "24/7 HotLine", available: true },
        { label: "Fast Order Place", available: true },
        { label: "PeBooking", available: true },
        { label: "Order Tracking", available: true },
        { label: "Contact Before Order", available: true },
        { label: "No Limit", available: true },
      ],
    },
  ];

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
              Select Your Package!
            </h2>
            <p className="text-center md:px-8 lg:px-72 mt-2 text-white">
              "Select Your Package" lets new hires pick their preferred joining
              bonus amount or structure (cash, RSUs, perks) from pre-approved
              company options.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 lg:gap-10">
            {cardData.map((card, index) => (
              <div
                key={index}
                className="card bg-base-100 shadow-sm hover:scale-105 transition-transform duration-300"
              >
                <div
                  className={`card-body lg:p-16 ${
                    isDark ? "" : "text-gray-700"
                  }`}
                >
                  {card.badge && (
                    <span className="badge badge-xs badge-warning">
                      {card.badge}
                    </span>
                  )}
                  <div className="flex justify-between mt-2">
                    <h2 className="text-3xl font-bold">{card.title}</h2>
                    <span className="text-xl">{card.price}</span>
                  </div>

                  <ul className="mt-6 flex flex-col gap-2 text-xs">
                    {card.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2">
                        {feature.available ? (
                          <FaRegCheckCircle className="text-green-700" />
                        ) : (
                          <FaTimesCircle className="text-red-600" />
                        )}
                        <span
                          className={!feature.available ? "line-through" : ""}
                        >
                          {feature.label}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6">
                    <button className="btn btn-primary btn-block">
                      Subscribe
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </MyContainer>
    </div>
  );
};

export default JoiningBonus;
