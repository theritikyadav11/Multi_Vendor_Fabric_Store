import React from "react";

const PaymentMethod = ({ paymentMethod, setPaymentMethod, disabled }) => {
  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
    console.log("Payment Method changed to:", e.target.value);
  };

  return (
    <div className="mb-4">
      <label
        htmlFor="paymentMethod"
        className="block text-gray-700 text-sm font-bold mb-2"
      >
        Payment Method:
      </label>
      <div className="relative">
        <select
          id="paymentMethod"
          value={paymentMethod}
          onChange={handlePaymentMethodChange}
          disabled={disabled}
          className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-2 px-3 pr-8 rounded leading-tight focus:outline-none focus:border-blue-500"
        >
          <option value="select_an_option">Select Payment Method</option>
          <option value="cash_on_delivery">Cash on Delivery</option>
          <option value="upi">UPI</option> {/* Added UPI option */}
          {/* Add more payment methods here in Phase 2 */}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg
            className="fill-current h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethod;
