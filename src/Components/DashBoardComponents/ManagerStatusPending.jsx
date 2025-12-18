import { AiOutlineClockCircle } from "react-icons/ai";
import { Link } from "react-router";

const ManagerStatusPending = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md text-center">
        <AiOutlineClockCircle className="mx-auto text-yellow-500 text-6xl mb-4" />
        <h2 className="text-2xl font-bold mb-2">Account Pending Approval</h2>
        <p className="text-gray-600 mb-6">
          Your manager account is currently under review. Once approved, you
          will have full access to your dashboard and can start adding products.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            to="/"
            className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
          >
            Back to Home
          </Link>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition"
          >
            Refresh Status
          </button>
        </div>
        <p className="mt-6 text-gray-400 text-sm">
          Please check back later or contact support if you have questions.
        </p>
      </div>
    </div>
  );
};

export default ManagerStatusPending;
