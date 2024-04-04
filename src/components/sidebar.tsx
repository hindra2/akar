import React from "react";
// import { Link } from "react-router-dom";
import { useState } from "react";
import NavigationLink from "./sidebarNav";

const Sidebar: React.FC = () => {
  const [isActive, setIsActive] = useState(false);

  const activeHandler = () => {
    setIsActive(!isActive);
  }

  return (
    <aside className="h-screen w-64 bg-surface0 text-textBase">
      <div className="flex items-center justify-between p-4 border-b border-overlay0">
        <span className="text-lg font-semibold">Akar</span>
        <div className="flex items-center justify-center bg-overlay0 h-[30px] w-[30px] rounded-full">
          <img
            alt='user'
            src="/user.svg"
            width={13}
            height={13}
          />
        </div>
      </div>

      <div className="p-4">
        <div className="bg-surface1 p-2 rounded-lg flex items-center">
          <input className="bg-transparent placeholder-gray-300 text-white w-full ml-2 outline-none" type="text" placeholder="Search" />
          <img
            alt='search'
            src="/search.svg"
            width={20}
            height={20}
          />
        </div>
      </div>

      <nav>
        <NavigationLink to="/" label="Home" iconSrc="/home.svg" />
        <NavigationLink to="/test" label="Test" iconSrc="/home.svg" />
      </nav>

      <div className="absolute bottom-0 w-64 p-4">
        <div className="flex items-center p-2 hover:bg-overlay0 rounded-lg">
          <img 
            src="/logout.svg"
            alt="logout.svg"
            width={20}
            height={20}
          />
          <span className="ml-2">Logout</span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
