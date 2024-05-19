import React from "react";

const Statistics: React.FC = () => {
  return (
    <div className="flex flex-col h-full p-4">
      <h1 className="text-white text-2xl font-bold mb-4">Statistics</h1>
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white shadow rounded p-4">
          <h2 className="text-lg font-bold mb-2">Today</h2>
          <p>No cards have been studied today.</p>
        </div>
        <div className="bg-white shadow rounded p-4">
          <h2 className="text-lg font-bold mb-2">Future Due</h2>
          <p>The number of reviews due in the future.</p>
          <div className="flex justify-between mt-2">
            <span>Backlog</span>
            <span>1 month</span>
            <span>3 months</span>
            <span>1 year</span>
            <span>All</span>
          </div>
          <div className="mt-2">
            <div className="bg-green-500 h-4" style={{ width: "60%" }}></div>
            <p className="mt-1">
              Total: 805 reviews
              <br />
              Average: 24 reviews/day
              <br />
              Due tomorrow: 46 reviews
            </p>
          </div>
        </div>
        <div className="bg-white shadow rounded p-4">
          <h2 className="text-lg font-bold mb-2">Calendar</h2>
          {/* Add calendar component here */}
        </div>
        <div className="bg-white shadow rounded p-4">
          <h2 className="text-lg font-bold mb-2">Reviews</h2>
          <p>The number of questions you have answered.</p>
          <div className="flex justify-between mt-2">
            <span>1 month</span>
            <span>3 months</span>
            <span>1 year</span>
          </div>
          <div className="mt-2">
            <div className="bg-blue-500 h-4" style={{ width: "40%" }}></div>
            <p className="mt-1">
              Days studied: 22 of 31 (71%)
              <br />
              Total: 2,463 reviews
              <br />
              Average for days studied: 112 reviews/day
            </p>
          </div>
        </div>
        <div className="bg-white shadow rounded p-4">
          <h2 className="text-lg font-bold mb-2">Card Counts</h2>
          <div className="flex justify-center">
            <div className="w-40 h-40 rounded-full bg-blue-500 flex items-center justify-center text-white text-xl font-bold">
              <div className="text-center">
                <p>New</p>
                <p>17,626</p>
                <p>86.14%</p>
              </div>
            </div>
          </div>
          <div className="mt-2 space-y-1">
            <p>Learning: 0 (0%)</p>
            <p>Relearning: 0 (0%)</p>
            <p>Young: 269 (1.31%)</p>
            <p>Mature: 2,353 (11.5%)</p>
          </div>
        </div>
        <div className="bg-white shadow rounded p-4">
          <h2 className="text-lg font-bold mb-2">Review Intervals</h2>
          <p>Delays until reviews are shown again.</p>
          <div className="flex justify-between mt-2">
            <span>1 month</span>
            <span>50%</span>
            <span>95%</span>
            <span>All</span>
          </div>
          <div className="mt-2">
            <div className="bg-gray-300 h-4">
              <div className="bg-blue-500 h-4" style={{ width: "60%" }}></div>
            </div>
            <p className="mt-1">Average interval: 9.67 months</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
