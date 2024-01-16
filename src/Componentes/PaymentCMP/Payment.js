// Payment.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import dotenv from "dotenv";
import "dotenv/config";
import { useDispatch, useSelector } from "react-redux";
import { addLoginMode } from "../../Utils/Redux/userSlice";
dotenv.config();

const Payment = ({ setPrice }) => {
  const dispatch = useDispatch();
  const navigator = useNavigate();
  const [loading, setLoading] = useState(false);
  const userDetailes = useSelector((state) => state.user.userData);
  async function fun() {
    setLoading(true);

    const loadScript = (source) => {
      return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = source;
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
      });
    };

    const response = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!response) {
      console.log("Razorpay failed to load");
      setLoading(false);
      return;
    }

    const options = {
      key: process.env.PaymentKey,
      amount: (userDetailes.price + 20 + 4 + 50) * 100,
      currency: "INR",
      name: "booking",
      email: "a@gmail.com",
      description: "Thank you for booking!",
      handler: ({ payment_id }) => {
        navigator("/order");
      },
      prefill: {
        name: userDetailes.name,
        email: userDetailes.gmail,
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
    setLoading(false);
  }

  return (
    <div className="">
      <button
        onClick={() =>
          userDetailes === null ? dispatch(addLoginMode()) : (setPrice(), fun())
        }
        className={`${
          loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500"
        } hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-all`}
        disabled={loading}
      >
        {loading ? "Processing..." : "Pay Now"}
      </button>
    </div>
  );
};

export { Payment };
