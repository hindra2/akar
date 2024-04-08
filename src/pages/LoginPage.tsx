import React from "react";
import LoginDetails from "../components/Login/LoginDetails";
import { AkarLogo } from "../components/icons";

const LoginPage: React.FC = () => {
  return (
    <div className="flex h-screen">
      <div className="w-[65%] h-full bg-surface0 px-[100px] flex flex-col justify-center items-center">
        <div className="absolute flex items-center justify-center top-[20px] left-[20px]">
          <AkarLogo />
          <span className="text-lg font-semibold text-white">akar</span>
        </div>
        <span className="text-white text-7xl">
          Flashcards boost memory retention by{" "}
          <span className="font-bold text-accent">50%</span> through active
          recall.
        </span>
      </div>
      <div className="w-[35%] h-full bg-base">
        <LoginDetails />
      </div>
    </div>
  );
};

export default LoginPage;
