import React, { useState, useEffect } from "react";
import InfoPreview from "../components/flashcards/InfoPreview";

import { PlusIcon, SettingsIcon } from "../components/icons";

const DeckInfo: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-[700px] h-full mt-[200px]">
        <div className="flex justify-between">
          <div className="text-2xl font-semibold text-textBase">CS 173</div>
          <button className="w-[140px] h-[40px] bg-surface0 rounded-lg flex justify-center items-center">
            <div className="fill-textBase">
              <SettingsIcon />
            </div>
            <span className="text-textBase ml-[10px] font-semibold">
              Settings
            </span>
          </button>
        </div>

        <div className="mt-[100px] flex justify-center">
          <div className="flex space-x-[30px]">
            <div
              className="h-[90px] w-[140px] rounded-lg flex flex-col justify-center items-center align-middle text-new ring-new ring-opacity-50 ring-1"
              style={{ backgroundColor: "rgba(203,166,247, 0.2)" }}
            >
              <span className="text-xl font-bold">3</span>
              <span className="text-lg">New</span>
            </div>
            <div
              className="h-[90px] w-[140px] text-xs rounded-lg flex flex-col justify-center items-center align-middle text-learning ring-learning ring-opacity-50 ring-1 px-[12px]"
              style={{ backgroundColor: "rgba(250, 179, 135, 0.2)" }}
            >
              <span className="text-xl font-bold">2</span>
              <span className="text-lg">Learning</span>
            </div>
            <div
              className="h-[90px] w-[140px] text-xs rounded-lg flex flex-col justify-center items-center align-middle text-review ring-review ring-opacity-50 ring-1 px-[12px]"
              style={{ backgroundColor: "rgba(166, 227, 161, 0.2)" }}
            >
              <span className="text-xl font-bold">9</span>
              <span className="text-lg">Review</span>
            </div>
          </div>
        </div>

        <div className="flex justify-center align-middle item-center">
          <button className="mt-[40px] bg-surface1 w-[300px] py-[10px] rounded-lg">
            <span className="text-textBase">Study Now</span>
          </button>
        </div>

        <hr className="bg-surface1 my-[70px] h-0.5 border-0" />

        <div>
          <button
            className="w-full h-[50px] bg-surface0 rounded-lg mt-4 flex justify-center items-center px-[20px]"
            style={{ backgroundColor: "rgba(49, 50, 68, 0.3)" }}
          >
            <div className="fill-textBase">
              <PlusIcon />
            </div>
            <span className=" text-Subtext2 ml-[10px] font-semibold">
              New Card
            </span>
          </button>
          <InfoPreview />
        </div>
      </div>
    </div>
  );
};

export default DeckInfo;
