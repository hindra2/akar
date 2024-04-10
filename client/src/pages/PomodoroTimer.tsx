import React, { useState, useEffect } from "react";
import { NextIcon } from "../components/icons";

type CycleType =
  | "Time to Focus!"
  | "Take a Short Break!"
  | "Take a Long Break!";

const Pomodoro: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<number>(1500); // Start with 25 minutes for Time to Focus!
  const [isActive, setIsActive] = useState<boolean>(false);
  const [cycleCount, setCycleCount] = useState<number>(0); // Tracks the number of Time to Focus! cycles completed
  const [cycleType, setCycleType] = useState<CycleType>("Time to Focus!");

  // Dynamically determine the total time based on the cycle type
  const totalTime: number =
    cycleType === "Time to Focus!"
      ? 1500
      : cycleType === "Take a Short Break!"
      ? 300
      : 900;

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false); // Stop timer automatically at the end of a cycle
      switch (cycleType) {
        case "Time to Focus!":
          if (cycleCount === 3) {
            // After 4 Time to Focus! cycles
            setCycleType("Take a Long Break!");
            setCycleCount(0); // Reset cycle count after a Take a Long Break!
            setTimeLeft(900); // 15 minutes for Take a Long Break!
          } else {
            setCycleType("Take a Short Break!");
            setCycleCount(cycleCount + 1); // Increment cycle count
            setTimeLeft(300); // 5 minutes for Take a Short Break!
          }
          break;
        case "Take a Short Break!":
        case "Take a Long Break!":
          setCycleType("Time to Focus!");
          setTimeLeft(1500); // 25 minutes for Time to Focus!
          break;
      }
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft, cycleType, cycleCount]);

  const toggle = (): void => {
    setIsActive(!isActive);
  };

  const nextCycle = (): void => {
    setIsActive(false); // Stop the current cycle
    if (cycleType === "Time to Focus!") {
      if (cycleCount === 3) {
        setCycleType("Take a Long Break!");
        setCycleCount(0); // Reset cycle count
        setTimeLeft(900); // 15 minutes for Take a Long Break!
      } else {
        setCycleType("Take a Short Break!");
        setCycleCount(cycleCount + 1); // Increment cycle count
        setTimeLeft(300); // 5 minutes for Take a Short Break!
      }
    } else {
      setCycleType("Time to Focus!");
      setTimeLeft(1500); // 25 minutes for Time to Focus!
    }
  };

  // Update the progress calculation to reflect the current session length
  const progress: number = (1 - timeLeft / totalTime) * 100;
  const strokeDasharray: number = 2 * Math.PI * 210; // Circle circumference
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
