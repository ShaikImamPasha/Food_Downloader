import React, { useState } from 'react';


const Test = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible((prev) => !prev);
  };

  return (
    <div className="flex flex-col items-center">
      <button
        onClick={toggleVisibility}
        className="bg-blue-500 text-white py-2 px-4 rounded mb-4"
      >
        Toggle Card
      </button>

      {isVisible && (
        <div className="card-container animate-slide-in">
          <div className="card bg-white p-4">
            <p>Your card content goes here</p>
          </div>
        </div>
      )}

      {!isVisible && (
        <div className={`card-container animate-slide-out ${isVisible ? 'hidden' : ''}`}>
          <div className="card bg-white p-4">
            <p>Your card content goes here</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Test;
