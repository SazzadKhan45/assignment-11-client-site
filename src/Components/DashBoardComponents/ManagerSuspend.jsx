import { MdBlock } from "react-icons/md";
import { Link } from "react-router";

const ManagerSuspend = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md text-center">
        <MdBlock className="mx-auto text-red-500 text-6xl mb-4" />
        <h2 className="text-2xl font-bold mb-2">Account Suspended</h2>
        <p className="text-gray-600 mb-6">
          Your manager account has been suspended due to a violation of our
          terms and conditions. Access to your dashboard and adding products is
          temporarily disabled.
        </p>
        <p className="text-gray-600 mb-6">
          Please review ourTerms & Condition to understand the reason for
          suspension.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            to="/contact-us"
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
          >
            Contact Support
          </Link>
          <Link
            to="/"
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition"
          >
            Back to Home
          </Link>
        </div>
        <p className="mt-6 text-gray-400 text-sm">
          If you believe this is a mistake, please contact our support team.
        </p>
      </div>
    </div>
  );
};

export default ManagerSuspend;
