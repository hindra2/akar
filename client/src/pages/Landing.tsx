import React from "react";
import LandingHeader from "../components/Landing/Header";
import { HeroParallax } from "../components/Landing/HeroParallax";
import TypingEffect from "../components/Login/TypingEffect";
import { Tabs } from "../components/Landing/Tabs";
import { useNavigate } from "react-router-dom";
import LandingFact from "../components/Landing/Fact";
import Footer from "../components/Landing/Footer";

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  const products = [
    { thumbnail: "./landing/deckinfo.png" },
    { thumbnail: "./landing/learning.png" },
    { thumbnail: "./landing/pomodorofocus.png" },
    { thumbnail: "./landing/learningpreview.png" },
    { thumbnail: "./landing/login.png" },
    { thumbnail: "./landing/pomodorobreak.png" },
    { thumbnail: "./landing/addcard.png" },
    { thumbnail: "./landing/deckinfo.png" },
  ];

  const fullText = `Built for <span class="text-accent font-semibold">Students</span> by <span class="text-accent font-semibold">Students</span>`;

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden shadow-2xl bg-surface1">
      <div className="fixed top-0 z-50 w-screen bg-surface1">
        <LandingHeader />
      </div>
      <div className="mt-[50px]">
        <HeroParallax products={products} />
      </div>
      <div className="space-y-[200px] mb-[100px] mt-[-600px]">
        <div className="flex flex-col items-center justify-center w-full">
          <LandingFact />
        </div>
        <div className="h-[20rem] md:h-[40rem] [perspective:1000px] relative flex flex-col max-w-5xl mx-auto w-full items-center justify-start my-40">
          <span className="text-5xl text-white font-bold text-center mb-[30px]">
            Check out <span className="text-accent">akar's</span> features!
          </span>
          <Tabs />
        </div>
        <div className="flex flex-col items-center justify-center text-6xl text-white">
          <TypingEffect text={fullText} typingSpeed={50} />
          <div className="space-x-[20px]">
            <button className="text-lg font-semibold" onClick={handleLogin}>
              Log in
            </button>
            <button className="text-lg font-semibold px-[10px] py-[3px] bg-surface2 rounded-lg text-textBase hover:bg-overlay0 hover:scale-[101%]">
              Sign Up
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LandingPage;
