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
    <div className="flex flex-col items-center justify-center h-screen p-8">
      <div className="relative">
        {/* Circular Progress Bar */}
        <svg className="transform -rotate-90" width="400" height="400">
          <circle
            cx="200"
            cy="200"
            r="140"
            stroke="rgb(137, 180, 250, 0.3)"
            strokeWidth="6"
            fill="transparent"
          />
          <circle
            cx="200"
            cy="200"
            r="140"
            stroke="#89b4fa"
            fill="transparent"
            strokeDasharray={strokeDasharray.toString()}
            strokeDashoffset={strokeDashoffset.toString()}
            strokeLinecap="round"
          />
        </svg>

        {/* Timer */}
        <div className="absolute top-0 left-0 flex items-center justify-center w-full h-full">
          <div className="text-center">
            <div className="text-4xl font-bold text-textBase">
              {`${Math.floor(timeLeft / 60)
                .toString()
                .padStart(2, "0")}:${(timeLeft % 60)
                .toString()
                .padStart(2, "0")}`}
            </div>
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
