import React from "react";
import { SearchIcon } from "../components/icons";
import Table from "../components/ManageCards/Table";

const ManageCards: React.FC = () => {
  return (
    <div className="flex flex-col h-full pr-[20px] pl-[40px] py-[20px]">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center p-2 rounded-lg bg-surface1">
          <input
            className="w-full ml-2 text-white placeholder-gray-300 bg-transparent outline-none"
            type="text"
            placeholder="Search"
          />
          <div className="fill-textBase">
            <SearchIcon />
          </div>
        </div>
      </div>
      <Table />
    </div>
  );
};

export default ManageCards;
