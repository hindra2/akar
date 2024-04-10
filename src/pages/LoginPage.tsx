// LoginPage.tsx with full sentence typing effect
import React from "react";
import LoginDetails from "../components/Login/LoginDetails";
import { AkarLogo } from "../components/icons";
import TypingEffect from "../components/Login/TypingEffect"; // Ensure this is imported

const LoginPage: React.FC = () => {
  // Full sentence to be animated
  const fullText =
    "Fllashcards boost memory retention by up to 50% through active recall.";

  return (
    <div className="flex h-screen">
      <div className="w-[65%] h-full bg-surface0 px-[100px] flex flex-col justify-center items-center">
        <div className="absolute flex items-center justify-center top-[20px] left-[20px]">
          <AkarLogo />
          <span className="text-lg font-semibold text-white">akar</span>
        </div>
        {/* Using TypingEffect component for the full sentence */}
        <span className="text-white text-7xl">
          <TypingEffect text={fullText} typingSpeed={100} />
        </span>
      </div>
      <div className="w-[35%] h-full bg-base">
        <LoginDetails />
      </div>
    </div>
  );
};

export default LoginPage;
