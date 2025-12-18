import { Link } from "react-router";

const CancelPayment = () => {
  return (
    <div className="border-l-2 pl-4">
      <h2 className="text-xl text-red-600 mb-2">Your Payment is canceled</h2>
      <Link to="/all-products" className="btn btn-error text-lg text-white">
        Try Again
      </Link>
    </div>
  );
};

export default CancelPayment;
