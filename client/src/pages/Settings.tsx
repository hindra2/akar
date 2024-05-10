import React, { useState, useEffect } from "react";
import Switch from "../components/Settings/Switch";

const Settings: React.FC = () => {
  const [isLightMode, setIsLightMode] = useState(
    () =>
      localStorage.getItem("theme") === "light" ||
      (!("theme" in localStorage) &&
        !window.matchMedia("(prefers-color-scheme: dark)").matches)
  );

  useEffect(() => {
    localStorage.setItem("theme", isLightMode ? "light" : "dark");
    document.documentElement.classList.toggle("light", isLightMode);
    document.documentElement.classList.toggle("dark", !isLightMode);
  }, [isLightMode]);

  const toggleTheme = () => setIsLightMode((prevMode) => !prevMode);

  return (
    <div className="p-4">
      <Switch
        settingKey="themeModeToggle"
        label="Toggle Theme Mode"
        checked={isLightMode}
        onChange={toggleTheme}
      />
    </div>
  );
};

export default Settings;
