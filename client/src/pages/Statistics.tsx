import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Statistics: React.FC = () => {
  const learningMasteryData = {
    labels: [
      "0-10%",
      "10-20%",
      "20-30%",
      "30-40%",
      "40-50%",
      "50-60%",
      "60-70%",
      "70-80%",
      "80-90%",
      "90-100%",
    ],
    datasets: [
      {
        label: "Mastery Level",
        data: [5, 10, 15, 20, 25, 30, 35, 40, 45, 50],
        backgroundColor: "rgba(137, 180, 250, 0.6)",
        borderColor: "rgba(137, 180, 250, 1)",
        borderWidth: 1,
      },
    ],
  };

  const learningMasteryOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Learning Mastery Distribution",
      },
    },
  };

  return (
    <div className="flex flex-col h-full pr-[20px] pl-[40px] py-[20px]">
      <div className="flex items-center mb-4 space-x-[20px]">
        <h1 className="text-textBase text-2xl font-bold">Deck: </h1>
        <select className="bg-surface1 text-textBase p-2 rounded">
          <option value="deck1">All</option>
          <option value="deck1">Deck 1</option>
          <option value="deck2">Deck 2</option>
          <option value="deck3">Deck 3</option>
          <option value="deck4">Deck 4</option>
        </select>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-surface1 shadow rounded p-4">
          <h2 className="text-textBase text-lg font-bold mb-2">Today</h2>
          <p className="text-textBase">No cards have been studied today.</p>
        </div>
        <div className="bg-surface1 shadow rounded p-4">
          <h2 className="text-textBase text-lg font-bold mb-2">Future Due</h2>
          <p className="text-textBase">
            The number of reviews due in the future.
          </p>
          <div className="flex justify-between mt-2">
            <span className="text-textBase">Backlog</span>
            <span className="text-textBase">1 month</span>
            <span className="text-textBase">3 months</span>
            <span className="text-textBase">1 year</span>
            <span className="text-textBase">All</span>
          </div>
          <div className="mt-2">
            <div className="bg-green-500 h-4" style={{ width: "60%" }}></div>
            <p className="text-textBase mt-1">
              Total: 805 reviews
              <br />
              Average: 24 reviews/day
              <br />
              Due tomorrow: 46 reviews
            </p>
          </div>
        </div>

        <div className="bg-surface1 shadow rounded p-4">
          <h2 className="text-textBase text-lg font-bold mb-2">
            Learning Mastery
          </h2>
          <div className="flex flex-col items-center justify-center">
            <Bar data={learningMasteryData} options={learningMasteryOptions} />
          </div>
        </div>

        <div className="bg-surface1 shadow rounded p-4">
          <h2 className="text-textBase text-lg font-bold mb-2">Reviews</h2>
          <p className="text-textBase">
            The number of questions you have answered.
          </p>
          <div className="flex justify-between mt-2">
            <span className="text-textBase">1 month</span>
            <span className="text-textBase">3 months</span>
            <span className="text-textBase">1 year</span>
          </div>
          <div className="mt-2">
            <div className="bg-accent h-4" style={{ width: "40%" }}></div>
            <p className="text-textBase mt-1">
              Days studied: 22 of 31 (71%)
              <br />
              Total: 2,463 reviews
              <br />
              Average for days studied: 112 reviews/day
            </p>
          </div>
        </div>
        <div className="bg-surface1 shadow rounded p-4">
          <h2 className="text-textBase text-lg font-bold mb-2">Card Counts</h2>
          <div className="flex justify-center">
            <div className="w-40 h-40 rounded-full bg-accent flex items-center justify-center text-textBase text-xl font-bold">
              <div className="text-center">
                <p className="text-textBase">New</p>
                <p className="text-textBase">17,626</p>
                <p className="text-textBase">86.14%</p>
              </div>
            </div>
          </div>
          <div className="mt-2 space-y-1">
            <p className="text-textBase">Learning: 0 (0%)</p>
            <p className="text-textBase">Relearning: 0 (0%)</p>
            <p className="text-textBase">Young: 269 (1.31%)</p>
            <p className="text-textBase">Mature: 2,353 (11.5%)</p>
          </div>
        </div>
        <div className="bg-surface1 shadow rounded p-4">
          <h2 className="text-textBase text-lg font-bold mb-2">
            Review Intervals
          </h2>
          <p className="text-textBase">Delays until reviews are shown again.</p>
          <div className="flex justify-between mt-2">
            <span className="text-textBase">1 month</span>
            <span className="text-textBase">50%</span>
            <span className="text-textBase">95%</span>
            <span className="text-textBase">All</span>
          </div>
          <div className="mt-2">
            <div className="bg-gray-300 h-4">
              <div className="bg-accent h-4" style={{ width: "60%" }}></div>
            </div>
            <p className="text-textBase mt-1">Average interval: 9.67 months</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
