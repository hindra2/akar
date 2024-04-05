import React, { ComponentType, useState } from "react";
import { NavLink } from "react-router-dom";

interface NavigationLinkProps {
  to: string;
  label: string;
  Icon: ComponentType;
}

const NavigationLink: React.FC<NavigationLinkProps> = ({ to, label, Icon }) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleOnClick = () => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 90);
  };

  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center p-2 mx-5 rounded-lg font-semibold text-xl space-x-[12px] hover:bg-overlay0 transform transition-all duration-150 ${
          isActive ? "text-accent fill-accent" : "text-textBase fill-textBase"
        } ${isClicked ? "scale-[98%] bg-opacity-50" : ""}`
      }
      onClick={handleOnClick}
    >
      <Icon />
      <span className="ml-2">{label}</span>
    </NavLink>
  );
};

export default NavigationLink;
