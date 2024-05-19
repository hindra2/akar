import React, { useState, useEffect, useRef } from "react";
import AccountSettings from "../components/Settings/Account";
import GeneralSettings from "../components/Settings/General";
import AppearanceSettings from "../components/Settings/Appearance";
import DatabaseSettings from "../components/Settings/Database";

const Settings: React.FC = () => {
  const [activeComponent, setActiveComponent] = useState("generalSettings");
  const generalRef = useRef<HTMLDivElement>(null);
  const accountRef = useRef<HTMLDivElement>(null);
  const appearanceRef = useRef<HTMLDivElement>(null);
  const databaseRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    const refs = [
      { ref: generalRef, name: "generalSettings" },
      { ref: accountRef, name: "accountSettings" },
      { ref: appearanceRef, name: "appearanceSettings" },
      { ref: databaseRef, name: "databaseSettings" },
    ];

    const middleOfViewport = window.innerHeight / 2;

    const closestToMiddle = refs.reduce(
      (closest, current) => {
        const rect = current.ref.current?.getBoundingClientRect();
        if (!rect) return closest;

        const distanceToMiddle = Math.abs(
          rect.top + rect.height / 2 - middleOfViewport
        );
        if (distanceToMiddle < closest.distance) {
          return { name: current.name, distance: distanceToMiddle };
        }
        return closest;
      },
      { name: activeComponent, distance: Infinity }
    );

    if (closestToMiddle.name !== activeComponent) {
      setActiveComponent(closestToMiddle.name);
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => {
        container.removeEventListener("scroll", handleScroll);
      };
    }
  }, [activeComponent]);

  const scrollToSection = (section: string) => {
    setActiveComponent(section);
    const sectionRef = {
      generalSettings: generalRef,
      accountSettings: accountRef,
      appearanceSettings: appearanceRef,
      databaseSettings: databaseRef,
    }[section];

    if (sectionRef && sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: "smooth" });
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
          onClick={() => scrollToSection("generalSettings")}
        >
          General
        </button>
        <button
          className={`profile-button mb-6 text-xl text-left p-2 ${
            activeComponent === "accountSettings"
              ? "text-accent border-l-2 border-accent -ml-2 pl-4"
              : "text-textBase"
          }`}
          onClick={() => scrollToSection("accountSettings")}
        >
          Account
        </button>
        <button
          className={`profile-button mb-6 text-xl text-left p-2 ${
            activeComponent === "appearanceSettings"
              ? "text-accent border-l-2 border-accent -ml-2 pl-4"
              : "text-textBase"
          }`}
          onClick={() => scrollToSection("appearanceSettings")}
        >
          Appearance
        </button>
        <button
          className={`profile-button mb-6 text-xl text-left p-2 ${
            activeComponent === "databaseSettings"
              ? "text-accent border-l-2 border-accent -ml-2 pl-4"
              : "text-textBase"
          }`}
          onClick={() => scrollToSection("databaseSettings")}
        >
          Database
        </button>
      </div>
      <div
        ref={containerRef}
        className="flex flex-col h-[80vh] w-[60%] ml-[100px] overflow-auto"
      >
        <div ref={generalRef}>
          <GeneralSettings />
        </div>
        <div ref={accountRef}>
          <AccountSettings />
        </div>
        <div ref={appearanceRef}>
          <AppearanceSettings />
        </div>
        <div ref={databaseRef}>
          <DatabaseSettings />
        </div>
      </div>
    </div>
  );
};

export default Settings;
