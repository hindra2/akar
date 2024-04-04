import React from "react";
import { NavLink } from "react-router-dom";

import { PlusIcon, ArrowIcon } from "../components/icons";

const HomePage: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col items-end mt-[-20%]">
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
        <NavLink to="/deckinfo">
          <div className="w-[750px] h-[50px] bg-surface0 rounded-lg mt-4 flex justify-between items-center px-[20px]">
            <span className="font-semibold text-textBase">CS 173</span>
            <div className="flex space-x-[20px] justify-center items-center">
              <div className="flex space-x-[8px]">
                <div
                  className="h-[20px] text-xs rounded-3xl flex justify-center items-center align-middle text-new ring-new ring-opacity-50 ring-1 px-[12px]"
                  style={{ backgroundColor: "rgba(203,166,247, 0.2)" }}
                >
                  5 New
                </div>
                <div
                  className="h-[20px] text-xs rounded-3xl flex justify-center items-center align-middle text-learning ring-learning ring-opacity-50 ring-1 px-[12px]"
                  style={{ backgroundColor: "rgba(250, 179, 135, 0.2)" }}
                >
                  2 Learning
                </div>
                <div
                  className="h-[20px] text-xs rounded-3xl flex justify-center items-center align-middle text-review ring-review ring-opacity-50 ring-1 px-[12px]"
                  style={{ backgroundColor: "rgba(166, 227, 161, 0.2)" }}
                >
                  9 Review
                </div>
              </div>
              <div className="fill-textBase">
                <ArrowIcon />
              </div>
            </div>
          </div>
        </NavLink>
      </div>
    </div>
  );
};

export default HomePage;
