import React, { useState } from "react";
import AccountSettings from "../components/Settings/Account";
import GeneralSettings from "../components/Settings/General";
import AppearanceSettings from "../components/Settings/Appearance";
import DatabaseSettings from "../components/Settings/Database";

const Settings: React.FC = () => {
  const [activeComponent, setActiveComponent] = useState("generalSettings");

  const renderComponent = () => {
    switch (activeComponent) {
      case "generalSettings":
        return <GeneralSettings />;
      case "accountSettings":
        return <AccountSettings />;
      case "appearanceSettings":
        return <AppearanceSettings />;
      case "databaseSettings":
        return <DatabaseSettings />;
      default:
        return <GeneralSettings />;
    }
  };

  return (
    <div className="flex p-4 mt-[10%] ml-[5%]">
      <div className="flex flex-col ml-[30px]">
        <button
          className={`profile-button mb-6 text-xl text-left p-2 ${
            activeComponent === "generalSettings"
              ? "text-accent border-l-2 border-accent -ml-2 pl-4"
              : "text-textBase"
          }`}
          onClick={() => setActiveComponent("generalSettings")}
        >
          General
        </button>
        <button
          className={`profile-button mb-6 text-xl text-left p-2 ${
            activeComponent === "accountSettings"
              ? "text-accent border-l-2 border-accent -ml-2 pl-4"
              : "text-textBase"
          }`}
          onClick={() => setActiveComponent("accountSettings")}
        >
          Account
        </button>
        <button
          className={`profile-button mb-6 text-xl text-left p-2 ${
            activeComponent === "appearanceSettings"
              ? "text-accent border-l-2 border-accent -ml-2 pl-4"
              : "text-textBase"
          }`}
          onClick={() => setActiveComponent("appearanceSettings")}
        >
          Appearance
        </button>
        <button
          className={`profile-button mb-6 text-xl text-left p-2 ${
            activeComponent === "databaseSettings"
              ? "text-accent border-l-2 border-accent -ml-2 pl-4"
              : "text-textBase"
          }`}
          onClick={() => setActiveComponent("databaseSettings")}
        >
          Database
        </button>
      </div>
      <div className="flex h-[80vh] w-[60%] ml-[100px]">
        {renderComponent()}
      </div>
    </div>
  );
};

export default Settings;
