import React, { useState } from "react";
import NavigationLink from "./sidebarNav";
import { useNavigate } from "react-router-dom";
import {
  HomeIcon,
  LogoutIcon,
  StatsIcon,
  SettingsIconSidebar,
  AkarLogo,
  TimerIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronStraightIcon,
} from "../icons";

interface SidebarProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  isSidebarOpen,
  toggleSidebar,
  onLogout,
}) => {
  const [isClicked, setIsClicked] = useState(false);
  const navigate = useNavigate();

  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsClicked(true);
    setTimeout(() => {
      setIsClicked(false);
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.removeItem("fullName");
      onLogout();
      navigate("/login");
    }, 70);
  };

  const animatedStyle = isClicked ? { transform: "scale(0.98)" } : {};

  return (
    <aside
      className={`fixed top-0 left-0 h-screen bg-surface0 text-textBase transition-all duration-300 ease-in-out drop-shadow-2xl ${
        isSidebarOpen ? "w-64 translate-x-0" : "w-0 -translate-x-full"
      }`}
    >
      <div
        className={`flex flex-col h-full transition-opacity duration-200 ease-in-out ${
          isSidebarOpen ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-overlay0">
          <div className="flex items-center justify-center">
            <AkarLogo />
            <span className="text-lg font-semibold">akar</span>
          </div>
        </div>
        <nav className="flex-grow space-y-[10px] mt-[20px]">
          <NavigationLink to="/" label="Home" Icon={HomeIcon} />
          <NavigationLink
            to="/statistics"
            label="Statistics"
            Icon={StatsIcon}
          />
          <NavigationLink
            to="/pomodoro"
            label="Pomodoro Timer"
            Icon={TimerIcon}
          />
          <NavigationLink
            to="/settings"
            label="Settings"
            Icon={SettingsIconSidebar}
          />
        </nav>
        <div className="p-4">
          <button
            className="flex rounded-lg hover:bg-overlay0 fill-textBase space-x-[12px] w-full"
            onClick={handleLogout}
            style={animatedStyle}
          >
            <div className="flex items-center p-2">
              <LogoutIcon />
              <span className="ml-2 text-xl font-semibold">Logout</span>
            </div>
          </button>
        </div>
      </div>
      <button
        className="absolute right-0 p-2 transition-transform duration-300 ease-in-out transform translate-x-full -translate-y-1/2 top-1/2 fill-textBase"
        onClick={toggleSidebar}
      >
        {isSidebarOpen ? (
          <div className="flex items-center justify-center group stroke-textBase">
            <div className="group-hover:hidden">
              <ChevronStraightIcon />
            </div>
            <div className="hidden group-hover:block">
              <ChevronLeftIcon />
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center group stroke-textBase">
            <div className="group-hover:hidden">
              <ChevronStraightIcon />
            </div>
            <div className="hidden group-hover:block">
              <ChevronRightIcon />
            </div>
          </div>
        )}
      </button>
    </aside>
  );
};

export default Sidebar;
