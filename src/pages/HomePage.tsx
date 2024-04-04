import React from "react";

const NotFound: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col items-end">
        <button>
          <div className="w-[140px] h-[40px] bg-surface0 rounded-xl flex justify-center items-center">
            <img className="" src={"/plus.svg"} alt="" height={15} width={15} />
            <span className="text-textBase ml-[12px] font-semibold">
              New Deck
            </span>
          </div>
        </button>
        <div className="w-[750px] h-[50px] bg-surface0 rounded-2xl mt-4 flex align-middle items-center px-[20px]">
          <span className="text-textBase">CS 173</span>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
