import React, { useState, useEffect } from "react";
import Switch from "../components/Settings/Switch";

const Settings: React.FC = () => {
  const [darkMode, setDarkMode] = useState(() =>
    document.documentElement.classList.contains("dark")
  );

  useEffect(() => {
    localStorage.setItem("theme", darkMode ? "dark" : "light");
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

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
