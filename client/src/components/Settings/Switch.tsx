import React from "react";

interface SwitchProps {
  settingKey: string; // if you need to handle different settings
  label: string;
  checked: boolean;
  onChange: () => void;
}

const Switch: React.FC<SwitchProps> = ({ checked, onChange, label }) => {
  return (
    <div className="flex items-center justify-center w-full">
      <label
        htmlFor="theme-mode-toggle"
        className="mr-2 font-bold text-textBase"
      >
        {label}
      </label>
      <input
        defaultChecked
        id="theme-mode-toggle"
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="cursor-pointer toggle-checkbox"
      />
    </div>
  );
};

export default Switch;
