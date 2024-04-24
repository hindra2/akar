import React from "react";
import LandingHeader from "../components/Landing/Header";
import { HeroParallax } from "../components/Landing/HeroParallax";

const LandingPage: React.FC = () => {
  const products = [
    {
      thumbnail: "/landing/deckinfo.png",
    },
    {
      thumbnail: "/landing/learning.png",
    },
    {
      thumbnail: "/landing/pomodorofocus.png",
    },
    {
      thumbnail: "/landing/learningpreview.png",
    },
    {
      thumbnail: "/landing/login.png",
    },
    {
      thumbnail: "/landing/pomodorobreak.png",
    },
    {
      thumbnail: "/landing/addcard.png",
    },
    {
      thumbnail: "/landing/deckinfo.png",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-surface0">
      <div className="w-screen">
        <LandingHeader />
      </div>
      <div>
        <HeroParallax products={products} />
      </div>
    </div>
  );
};

export default LandingPage;
