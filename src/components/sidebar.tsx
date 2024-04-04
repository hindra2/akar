import React from "react";
import NavigationLink from "./sidebarNav";

import {  HomeIcon, UserIcon, SearchIcon, LogoutIcon } from "./icons";

const Sidebar: React.FC = () => {

  return (
    <aside className="h-screen w-64 bg-surface0 text-textBase">
      <div className="flex items-center justify-between p-4 border-b border-overlay0">
        <span className="text-lg font-semibold">Akar</span>
        <div className="flex items-center justify-center bg-overlay0 h-[30px] w-[30px] rounded-full fill-textBase">
          <UserIcon />
        </div>
      </div>

      <div className="p-4">
        <div className="bg-surface1 p-2 rounded-lg flex items-center">
          <input className="bg-transparent placeholder-gray-300 text-white w-full ml-2 outline-none" type="text" placeholder="Search" />
          <div className="fill-textBase">
            <SearchIcon />
          </div>
        </div>
      </div>

      <nav>
        <NavigationLink to="/" label="Home" Icon={HomeIcon} />
        <NavigationLink to="/test" label="Test" Icon={HomeIcon} />
      </nav>

      <div className="absolute bottom-0 w-64 p-4">
        <div className="flex items-center p-2 hover:bg-overlay0 rounded-lg fill-textBase">
          <LogoutIcon />
          <span className="ml-2">Logout</span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
