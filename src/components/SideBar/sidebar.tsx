import React, { useState } from "react";
import NavigationLink from "./sidebarNav";
import { useNavigate } from "react-router-dom";

import {
  HomeIcon,
  UserIcon,
  SearchIcon,
  LogoutIcon,
  StatsIcon,
  SettingsIconSidebar,
  AkarLogo
} from "../icons";

const Sidebar: React.FC = () => {
  const [isClicked, setIsClicked] = useState(false);
  const navigate = useNavigate(); // Hook for navigation

  const handleOnClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsClicked(true);

    setTimeout(() => {
      setIsClicked(false);
      navigate("/login");
    }, 70);
  };

  return (
    <aside className="w-64 h-screen bg-surface0 text-textBase">
      <div className="flex items-center justify-between p-4 border-b border-overlay0">
        <div className="flex justify-center items-center">
          <AkarLogo />
          <span className="text-lg font-semibold">akar</span>
        </div>
        <div className="flex items-center justify-center bg-overlay0 h-[30px] w-[30px] rounded-full fill-textBase">
          <UserIcon />
        </div>
      </div>

      <div className="p-4">
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

      <nav className=" space-y-[2px]">
        <NavigationLink to="/" label="Home" Icon={HomeIcon} />
        <NavigationLink to="/statistics" label="Statistics" Icon={StatsIcon} />
        <NavigationLink
          to="/settings"
          label="Settings"
          Icon={SettingsIconSidebar}
        />
        <NavigationLink to="/login" label="Login" Icon={SettingsIconSidebar} />
      </nav>

      <div className="absolute bottom-0 w-64 p-4">
        <div className="flex rounded-lg hover:bg-overlay0 fill-textBase space-x-[12px]">
          <button className="flex items-center p-2" onClick={handleOnClick}>
            <LogoutIcon />
            <span className="ml-2 text-xl font-semibold">Logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
