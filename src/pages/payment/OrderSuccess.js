import React from "react";
import { Link } from "react-router-dom";

const OrderSuccess = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
          <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clip-rule="evenodd" />
        </svg>

        <h1 className="text-3xl font-bold text-gray-800 mb-2">Order Successful!</h1>
        <p className="text-gray-600 mb-6">
          Thank you for your purchase. Your order has been placed successfully and
          is now being processed.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            to="/orders"
            className="bg-primeColor text-white px-6 py-2 rounded-md hover:bg-black duration-300"
          >
            View My Orders
          </Link>
          <Link
            to="/"
            className="bg-gray-200 text-gray-800 px-6 py-2 rounded-md hover:bg-gray-300 duration-300"
          >
            Back to Home
          </Link>
        </div>
      </div>

      <footer className="mt-8 text-gray-500 text-sm text-center">
        Need help? Contact our support team at
        <a
          href="mailto:support@example.com"
          className="text-primeColor hover:underline ml-1"
        >
          support@example.com
        </a>
        .
      </footer>
    </div>
  );
};

export default OrderSuccess;