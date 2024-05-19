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

  const setLightMode = () => setIsLightMode(true);
  const setDarkMode = () => setIsLightMode(false);

  return (
    <div>
      <span className="text-5xl font-bold text-textBase">Appearance</span>
      <hr className="border-t border-textBase w-[700px] mt-[10px]" />
      <div className="mt-[20px] space-x-[50px]">
        <button onClick={setDarkMode}>
          <div
            className={`p-4 bg-gray-800 border-2 ${
              !isLightMode ? "border-accent" : "border-gray-600"
            } rounded-lg relative`}
            style={{ height: "100px", width: "150px" }}
          >
            <div className="h-4 bg-gray-600 rounded mb-2"></div>
            <div className="grid grid-cols-3 gap-2">
              <div className="h-8 bg-gray-700 rounded col-span-2"></div>
              <div className="h-8 bg-gray-700 rounded"></div>
            </div>
          </div>
          <span className="mt-2 block text-center text-textBase">Dark</span>
        </button>
        <button onClick={setLightMode} className="mr-2">
          <div
            className={`p-4 bg-white border-2 ${
              isLightMode ? "border-accent" : "border-gray-300"
            } rounded-lg relative`}
            style={{ height: "100px", width: "150px" }}
          >
            <div className="h-4 bg-gray-300 rounded mb-2"></div>
            <div className="grid grid-cols-3 gap-2">
              <div className="h-8 bg-gray-200 rounded col-span-2"></div>
              <div className="h-8 bg-gray-200 rounded"></div>
            </div>
          </div>
          <span className="mt-2 block text-center text-textBase">
            Light Mode
          </span>
        </button>
      </div>
    </div>
  );
};

export default AppearanceSettings;
