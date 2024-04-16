import React, { useContext, useEffect } from 'react';
import { NextIcon } from '../components/icons';
import { PomodoroContext } from '../components/Pomodoro/PomodoroContext';

const Pomodoro: React.FC = () => {
  const { timeLeft, isActive, cycleType, cycleCount, updateTimer, toggle, nextCycle } = useContext(PomodoroContext);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive) {
      interval = setInterval(() => {
        updateTimer();
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isActive, updateTimer]);

  useEffect(() => {
    if (timeLeft === 0) {
      nextCycle();
    }
  }, [timeLeft, nextCycle]);

  // Update timer state on backend whenever significant changes occur
  useEffect(() => {
    updateTimer();
  }, [timeLeft, isActive, cycleType, cycleCount, updateTimer]);

  // Dynamically determine the total time based on the cycle type
  const totalTime: number =
    cycleType === 'Time to Focus!'
      ? 1500
      : cycleType === 'Take a Short Break!'
      ? 300
      : 900;

  // Update the progress calculation to reflect the current session length
  const progress: number = (1 - timeLeft / totalTime) * 100;
  const strokeDasharray: number = 2 * Math.PI * 210;
  const strokeDashoffset: number = strokeDasharray * (1 - progress / 100);
  
  return (
    <div className="flex flex-col items-center justify-center h-screen p-8">
      <div className="text-center">
        <span className="text-5xl font-bold text-textBase">{cycleType}</span>
      </div>
      <div className="relative">
        <svg className="transform -rotate-90" width="600" height="600">
          <circle
            cx="300"
            cy="300"
            r="210"
            stroke={
              cycleType === "Time to Focus!"
                ? "rgb(243, 139, 168, 0.3)"
                : "rgb(137, 180, 250, 0.3)"
            }
            strokeWidth="6"
            fill="transparent"
          />
          <circle
            cx="300"
            cy="300"
            r="210"
            stroke={cycleType === "Time to Focus!" ? "#f38ba8" : "#89b4fa"} // Use red for Time to Focus!, blue for breaks
            strokeWidth="6"
            fill="transparent"
            strokeDasharray={strokeDasharray.toString()}
            strokeDashoffset={strokeDashoffset.toString()}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute top-0 left-0 flex items-center justify-center w-full h-full">
          <div className="text-center">
            <div
              className={`font-bold text-8xl ${
                cycleType === "Time to Focus!" ? "text-red" : "text-accent"
              }`}
            >
              {`${Math.floor(timeLeft / 60)
                .toString()
                .padStart(2, "0")}:${(timeLeft % 60)
                .toString()
                .padStart(2, "0")}`}
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center w-full">
        {/* Invisible Spacer for when the timer is not active */}
        <div className={`flex-1 ${isActive ? "invisible" : ""}`}></div>

        {/* Pause button always centered */}
        <button
          className="w-[200px] py-3 rounded-lg text-textBase text-2xl font-bold bg-surface1 Time to Focus!:outline-none hover:bg-overlay0 hover:scale-[101%]"
          onClick={toggle} // Toggles the timer
        >
          {isActive ? "Pause" : "Start"}
        </button>

        {/* Next button or invisible placeholder */}
        {isActive ? (
          <button
            className="flex items-center justify-start flex-1"
            onClick={nextCycle}
          >
            <div className="fill-textBase ml-[20px]">
              <NextIcon />
            </div>
          </button>
        ) : (
          <div className="flex-1"></div>
        )}
      </div>
    </div>
  );
};

export default Pomodoro;
