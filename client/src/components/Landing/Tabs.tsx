"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "../../../utils/cn";

type Tab = {
  title: string;
  value: string;
  content?: string | React.ReactNode | any;
};

const DummyContent = ({ imageSrc }: { imageSrc: string }) => {
  return (
    <img
      src={imageSrc}
      alt="dummy image"
      className="object-cover object-left-top h-[60%] md:h-[90%] absolute -bottom-10 inset-x-0 w-[90%] rounded-xl mx-auto"
    />
  );
};

const tabsData: Tab[] = [
  {
    title: "Home Page",
    value: "home",
    content: (
      <div className="relative w-full h-full p-10 overflow-hidden text-xl font-bold text-white rounded-2xl md:text-4xl bg-gradient-to-br from-purple-700 to-violet-900">
        <p>Home Page</p>
        <DummyContent imageSrc="./landing/deckinfo.png" />
      </div>
    ),
  },
  {
    title: "Flashcards",
    value: "flashcards",
    content: (
      <div className="relative w-full h-full p-10 overflow-hidden text-xl font-bold text-white rounded-2xl md:text-4xl bg-gradient-to-br from-purple-700 to-violet-900">
        <p>Flashcards</p>
        <DummyContent imageSrc="./landing/learning.png" />
      </div>
    ),
  },
  {
    title: "Pomodoro",
    value: "pomodoro",
    content: (
      <div className="relative w-full h-full p-10 overflow-hidden text-xl font-bold text-white rounded-2xl md:text-4xl bg-gradient-to-br from-purple-700 to-violet-900">
        <p>Pomodoro</p>
        <DummyContent imageSrc="./landing/pomodorofocus.png" />
      </div>
    ),
  },
  {
    title: "Learning",
    value: "learning",
    content: (
      <div className="relative w-full h-full p-10 overflow-hidden text-xl font-bold text-white rounded-2xl md:text-4xl bg-gradient-to-br from-purple-700 to-violet-900">
        <p>Learning</p>
        <DummyContent imageSrc="./landing/learningpreview.png" />
      </div>
    ),
  },
];

export const Tabs = () => {
  const [active, setActive] = useState<Tab>(tabsData[0]);
  const [tabs, setTabs] = useState<Tab[]>(tabsData);

  const moveSelectedTabToTop = (idx: number) => {
    const newTabs = [...tabsData];
    const selectedTab = newTabs.splice(idx, 1);
    newTabs.unshift(selectedTab[0]);
    setTabs(newTabs);
    setActive(newTabs[0]);
  };

  const [hovering, setHovering] = useState(false);

  return (
    <>
      <div className="flex flex-row items-center justify-start [perspective:1000px] relative overflow-auto sm:overflow-visible no-visible-scrollbar max-w-full w-full mb-8">
        {tabsData.map((tab, idx) => (
          <button
            key={tab.title}
            onClick={() => {
              moveSelectedTabToTop(idx);
            }}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
            className={cn(
              "relative px-4 py-2 rounded-full bg-gray-200 text-gray-700 dark:bg-zinc-800 dark:text-white"
            )}
            style={{ transformStyle: "preserve-3d" }}
          >
            {active.value === tab.value && (
              <motion.div
                layoutId="clickedbutton"
                transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
                className="absolute inset-0 rounded-full bg-violet-500"
              />
            )}
            <span className="relative block">{tab.title}</span>
          </button>
        ))}
      </div>
      <FadeInDiv
        tabs={tabs}
        active={active}
        key={active.value}
        hovering={hovering}
        className="mt-8"
      />
    </>
  );
};

export const FadeInDiv = ({
  className,
  tabs,
  hovering,
}: {
  className?: string;
  key?: string;
  tabs: Tab[];
  active: Tab;
  hovering?: boolean;
}) => {
  const isActive = (tab: Tab) => {
    return tab.value === tabs[0].value;
  };

  return (
    <div className="relative w-full h-full">
      {tabs.map((tab, idx) => (
        <motion.div
          key={tab.value}
          layoutId={tab.value}
          style={{
            scale: 1 - idx * 0.1,
            top: hovering ? idx * -50 : 0,
            zIndex: -idx,
            opacity: idx < 3 ? 1 - idx * 0.1 : 0,
          }}
          animate={{ y: isActive(tab) ? [0, 40, 0] : 0 }}
          className={cn("w-full h-full absolute top-0 left-0", className)}
        >
          {tab.content}
        </motion.div>
      ))}
    </div>
  );
};
