import React, { useState } from 'react';

const Test = () => {
  const [isVisible, setIsVisible] = useState(false);

  const showPopup = () => {
    setIsVisible(true);

    setTimeout(() => {
      setIsVisible(false);
    }, 2000); // Adjust the timing as needed
  };

  return (
    <div className="z-50">
      {isVisible && (
        <div
          className="absolute left-1/2 transform -translate-x-1/2 bg-white p-8 shadow-lg animate-fade-in-down"
          style={{ backgroundColor: '#68d391' }}
        >
          <p className="text-2xl text-white font-bold">Added successfully!</p>
        </div>
      )}

      <button
        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
        onClick={showPopup}
      >
        Click me
      </button>
    </div>
  );
};

export default Test;
