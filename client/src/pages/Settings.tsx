import React, { useState, useEffect } from "react";
import Switch from "../components/Settings/Switch";

const Settings: React.FC = () => {
  // Use a functional update to read the previous state and negate it
  const [darkMode, setDarkMode] = useState(
    () =>
      localStorage.getItem("theme") === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
  );

  useEffect(() => {
    localStorage.setItem("theme", darkMode ? "dark" : "light");
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode((prevMode) => !prevMode);

  return (
    <div className="p-4">
      <Switch
        settingKey="darkModeToggle"
        label="Toggle Dark/Light Mode"
        checked={darkMode}
        onChange={toggleDarkMode}
      />
    </div>
  );
};

export default Settings;
