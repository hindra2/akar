import React from "react";
import Switch from "../components/Settings/Switch"

const Settings: React.FC = () => {
  return (
    <div className="flex justify-center h-full">
      <h1 className="flex items-center justify-center w-full font-bold text-textBase">
        <Switch settingKey="PomodoroOnSidebar" label="Enable Pomodoro on Sidebar" />
      </h1>
    </div>
  );
};

export default Settings;
