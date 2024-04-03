import React from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar: React.FC = () => {
  const location = useLocation();

  // Function to determine if the link is active
  const isActive = (path: string): boolean => location.pathname === path;

  return (
    <div className="fixed top-0 left-0 z-10 flex items-center justify-between h-full w-[100px] p-2 bg-surface-0 shadow-xl">
      <nav className="flex items-center ml-4">
        <Link to="/" className={`mx-2 text-sxl text-text relative inline-block group ${isActive("/")}`}>
        <span className="text-text">Home</span>
          <span className={`text-teal absolute bottom-0 left-0 right-0 h-0.5 bg-current scale-x-0 group-hover:scale-x-100 transform transition-transform ease-out duration-150 ${isActive("/") ? "scale-x-100" : ""}`}></span>
        </Link>
        <Link to="/test" className={`mx-2 text-sxl relative inline-block group ${isActive("/test")}`}>
          <span className="text-text">Test</span>
          <span className={`text-teal absolute bottom-0 left-0 right-0 h-0.5 bg-current scale-x-0 group-hover:scale-x-100 transform transition-transform ease-out duration-150 ${isActive("/test") ? "scale-x-100" : ""}`}></span>
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
