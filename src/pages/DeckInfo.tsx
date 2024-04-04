import React from "react";

const DeckInfo: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-[700px] h-full bg-white mt-[150px] flex">
        <div className="mr-4 text-2xl text-textBase">CS 173</div>
        <div className="w-[140px] h-[40px] bg-surface0 rounded-lg flex justify-center items-center"></div>
      </div>
    </div>
  );
};

export default DeckInfo;
