import { useEffect, useRef } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { Link, useSearchParams } from "react-router";

const OnlinePayment = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const axiosSecure = useAxiosSecure();

  const hasSaved = useRef(false);

  useEffect(() => {
    if (!sessionId || hasSaved.current) return;

    hasSaved.current = true;

    axiosSecure.post("/save-order", { sessionId });
  }, [sessionId, axiosSecure]);

  return (
    <div className="pl-4 border-l-2 mt-2">
      <h2 className="text-green-500 font-bold text-xl mb-2">
        Successfully Payment Your Order
      </h2>
      <p className="mb-2 font-medium">Please Click Confirm</p>
      <Link to="/dashboard/buyer-order" className="btn btn-secondary text-lg">
        Confirm Order
      </Link>
    </div>
  );
};

export default OnlinePayment;
