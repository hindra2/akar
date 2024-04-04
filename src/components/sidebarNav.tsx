import React, { ComponentType } from 'react';
import { NavLink } from 'react-router-dom';

interface NavigationLinkProps {
  to: string;
  label: string;
  Icon: ComponentType;
}

const NavigationLink: React.FC<NavigationLinkProps> = ({ to, label, Icon }) => {
  return (
    <NavLink to={to} className={({ isActive }) => `flex items-center p-2 mx-5 rounded-lg hover:bg-overlay0 ${isActive ? 'text-rosewater fill-rosewater' : 'text-textBase fill-textBase'}`}>
      <Icon />
      <span className="ml-2">{label}</span>
    </NavLink>
  );
};

export default NavigationLink;