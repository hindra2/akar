import React from 'react';
import { NavLink } from 'react-router-dom';

interface NavigationLinkProps {
  to: string;
  label: string;
  iconSrc: string;
}

const NavigationLink: React.FC<NavigationLinkProps> = ({ to, label, iconSrc }) => {
  return (
    <NavLink to={to} className={({ isActive }) => `flex items-center p-2 mx-5 rounded-lg ${isActive ? 'text-rosewater' : 'text-textBase'} hover:bg-overlay0`}>
      <img
        alt={iconSrc}
        src={iconSrc}
        width={20}
        height={20}
      />
      <span className="ml-2">{label}</span>
    </NavLink>
  );
};

export default NavigationLink;