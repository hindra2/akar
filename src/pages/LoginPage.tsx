import React from "react";
import LoginDetails from "../components/Login/LoginDetails";

const LoginPage: React.FC = () => {
  return (
    <div className="flex h-screen">
      <div className="w-[65%] h-full bg-base"></div>
      <div className="w-[35%] h-full bg-surface0">
        <LoginDetails />
      </div>
    </div>
  );
};

export default LoginPage;
