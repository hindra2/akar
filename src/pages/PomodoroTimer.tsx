import React, { useState, useEffect } from "react";

const Pomodoro: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState(1500); // 25 minutes in seconds
  const [isActive, setIsActive] = useState(false);
  const totalTime = 1500; // Total time in seconds

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((timeLeft) => timeLeft - 1);
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft]);

  const toggle = () => {
    setIsActive(!isActive);
  };

  const reset = () => {
    setTimeLeft(totalTime);
    setIsActive(false);
  };

  // Calculate the strokeDashoffset for the progress circle
  // It starts at full and decreases to 0 as time counts down
  const progress = ((totalTime - timeLeft) / totalTime) * 100;
  const strokeDasharray = 2 * Math.PI * 70; // Circumference of the circle
  const strokeDashoffset = strokeDasharray - (strokeDasharray * progress) / 100;

  return (
    <div className="flex flex-col items-center justify-center h-screen p-8 bg-gray-800">
      <div className="relative">
        {/* Circular Progress Bar */}
        <svg className="transform -rotate-90" width="200" height="200">
          <circle
            cx="100"
            cy="100"
            r="70"
            stroke="#4B5563" // Start with grey color
            strokeWidth="10"
            fill="transparent"
          />
          <circle
            cx="100"
            cy="100"
            r="70"
            stroke="#EF4444" // Red color fills up as time decreases
            strokeWidth="10"
            fill="transparent"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />
        </svg>

        {/* Timer */}
        <div className="absolute top-0 left-0 flex items-center justify-center w-full h-full">
          <div className="text-center">
            <div className="text-4xl font-bold text-white">
              {`${Math.floor(timeLeft / 60)
                .toString()
                .padStart(2, "0")}:${(timeLeft % 60)
                .toString()
                .padStart(2, "0")}`}
            </div>
            <div className="text-red-300">Current Task: Research</div>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex mt-8 space-x-4">
        {isActive ? (
          <button
            className="px-6 py-3 text-white bg-yellow-500 rounded-full focus:outline-none"
            onClick={toggle}
          >
            Pause
          </button>
        ) : (
          <button
            className="px-6 py-3 text-white bg-green-500 rounded-full focus:outline-none"
            onClick={toggle}
          >
            Start
          </button>
        )}
        <button
          className="px-6 py-3 text-white bg-blue-500 rounded-full focus:outline-none"
          onClick={reset}
          disabled={timeLeft === totalTime}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default Pomodoro;
