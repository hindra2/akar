import React, { useEffect, useState } from "react";
import axios from "axios";

interface SwitchProps {
  settingKey: string;
  label: string;
}

const Switch: React.FC<SwitchProps> = ({ settingKey, label }) => {
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    // Fetch the initial setting value from the backend
    axios
      .get(`/api/settings/${settingKey}`)
      .then((response) => {
        setIsEnabled(response.data.isEnabled);
      })
      .catch((error) => console.error("Error fetching settings:", error));
  }, [settingKey]);

  const handleToggle = () => {
    const newEnabledState = !isEnabled;
    console.log('Toggle button clicked for:', settingKey);
    setIsEnabled(newEnabledState);
  
    // Update the setting value in the backend
    axios
      .post(`/api/settings/${settingKey}`, { isEnabled: newEnabledState })
      .then((response) => console.log("Settings updated:", response.data))
      .catch((error) => console.error("Error updating settings:", error));
  };

  return (
    <div className="flex justify-center h-full">
      <div className="flex items-center justify-center w-full font-bold text-textBase">
        <label
          htmlFor={`switch-${settingKey}`}
          className="mb-0 mr-3 text-textBase cursor-pointer select-none"
        >
          {label}
        </label>
        <div className="relative inline-block w-8 h-4 rounded-full cursor-pointer">
          <input
            id={`switch-${settingKey}`}
            type="checkbox"
            className={`absolute w-8 h-4 transition-colors duration-300 rounded-full appearance-none cursor-pointer peer ${
              isEnabled ? "bg-review" : "bg-red"
            }`}
            checked={isEnabled}
            onChange={handleToggle}
          />
          <label
            htmlFor={`switch-${settingKey}`}
            className={`before:content[''] absolute top-2/4 -left-1 h-5 w-5 -translate-y-2/4 cursor-pointer rounded-full border shadow-md transition-all duration-300 before:absolute before:top-2/4 before:left-2/4 before:block before:h-10 before:w-10 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:opacity-0 before:transition-opacity hover:before:opacity-10 ${
              isEnabled
                ? "translate-x-full border-gray-900 before:bg-gray-900"
                : "border-blue-gray-100 bg-white before:bg-blue-gray-500"
            }`}
          >
            <div
              className="inline-block p-5 rounded-full top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4"
              data-ripple-dark="true"
            ></div>
          </label>
        </div>
      </div>
    </div>
  );
};

export default Switch;