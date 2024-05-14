import Switch from "./Switch";
import { useState, useEffect } from "react";

const AppearanceSettings = () => {
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
    <div>
      <span className="text-5xl font-bold text-textBase">Appearance</span>
      <div>
        <Switch
          settingKey="themeModeToggle"
          label="Toggle Theme Mode"
          checked={isLightMode}
          onChange={toggleTheme}
        />
      </div>
    </div>
  );
};

export default AppearanceSettings;
