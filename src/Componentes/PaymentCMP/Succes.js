// Success.js
import React from "react";
import { Link } from "react-router-dom";
import { motion, useSpring } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";
import { useSpring as useSpringRS, animated } from "react-spring";

const Succes = () => {
  const progressSpringProps = useSpringRS({
    width: "100%",
    from: { width: "0%" },
    config: { duration: 1000, delay: 1000 },
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-r from-green-400 to-blue-500 h-screen flex items-center justify-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-8 rounded shadow-md text-center"
      >
        <motion.div
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-4"
        >
          <FaCheckCircle className="h-16 w-16 text-green-500 mx-auto" />
        </motion.div>
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-3xl font-bold text-gray-800 mb-2"
        >
          Order Confirmed!
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.9 }}
          className="text-gray-600 mb-4"
        >
          Your delicious food is on its way to you. Enjoy your meal!
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.2 }}
        >
          <Link
            to="/"
            className="inline-block bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-600 transition duration-300 ease-in-out"
          >
            Order More
          </Link>
        </motion.div>
        <animated.div
          style={{
            ...progressSpringProps,
          }}
          className="mt-8 bg-gray-100 p-6 rounded flex flex-col items-center relative overflow-hidden"
        >
          <p className="text-gray-600 mb-4">Track your order status:</p>
          <div className="bg-green-500 h-2 rounded-full mb-4 w-full">
            <animated.div
              style={{
                width: progressSpringProps.width,
              }}
              className="h-2 bg-white rounded-full"
            />
          </div>
          <p className="text-gray-600">
            Estimated Delivery Time: <strong>30 minutes</strong>
          </p>
        </animated.div>
      </motion.div>
    </motion.div>
  );
};

export default Succes;
