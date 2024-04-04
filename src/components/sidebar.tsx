import React from "react";
import { Link } from "react-router-dom";

const Sidebar: React.FC = () => {
  return (
    <aside className="h-screen w-64 bg-gray-800 text-gray-100">
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <span className="text-lg font-semibold">Akar</span>
        {/* ... your user icon / avatar if needed */}
      </div>

      <div className="p-4">
        <div className="bg-gray-700 p-2 rounded flex items-center">
          <input className="bg-transparent placeholder-gray-300 text-white w-full ml-2 outline-none" type="text" placeholder="Search" />
          {/* Place your search icon here */}
        </div>
      </div>

      <nav className="p-4">
        {/* Navigation links */}
        <Link to="/" className="flex items-center p-2 hover:bg-gray-700 rounded">
          {/* Home icon */}
          <span className="ml-2">Home</span>
        </Link>
        <Link to="/test" className="flex items-center p-2 hover:bg-gray-700 rounded">
          {/* Home icon */}
          <span className="ml-2">test</span>
        </Link>
      </nav>

      <div className="absolute bottom-0 w-64 p-4">
        <div className="flex items-center p-2 hover:bg-gray-700 rounded">
          {/* Plus icon or 'Add' icon */}
          <span className="ml-2">Logoout</span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
