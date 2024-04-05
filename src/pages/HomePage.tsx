import React from "react";

import { PlusIcon } from "../components/icons";
import Deck from "../components/Home/deck";
import WeekStreak from "../components/Home/WeekStreak";

const HomePage: React.FC = () => {
  return (
    <div className="flex justify-center h-screen">
      <div className="flex flex-col mt-[8%]">
        <span className="mb-[15%] text-textBase font-semibold text-5xl text-center">
          Good Afternoon, John{" "}
        </span>

        <div className="flex flex-col items-end">
          <button>
            <div className="w-[140px] h-[40px] bg-surface0 rounded-lg flex justify-center items-center">
              <div className="fill-textBase">
                <PlusIcon />
              </div>
              <span className="text-textBase ml-[10px] font-semibold">
                New Deck
              </span>
            </div>
          </button>
          <Deck name="CS173" newLabel="5" learningLabel="2" reviewLabel="9" />
          <Deck name="CS225" newLabel="3" learningLabel="5" reviewLabel="200" />
        </div>

        <div className="mt-[30%] flex justify-center items-center">
          <WeekStreak />
        </div>

        <span className="text-center text-textBase mt-[10%]">
          12 Cards Studied Today
        </span>
      </div>
    </div>
  );
};

export default HomePage;
