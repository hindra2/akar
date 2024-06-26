import React, { useState } from "react";
import LoginDetails from "../components/Login/LoginDetails";
import CreateNewAccount from "../components/Login/CreateNewAccount";
import { AkarLogo } from "../components/icons";
import TypingEffect from "../components/Login/TypingEffect";
import supabase from "../../utils/supabase";

interface LoginProps {
  onLogin: () => void;
}

const LoginPage: React.FC<LoginProps> = ({ onLogin }) => {
  const [showLogin, setShowLogin] = useState(true);
  const fullText = `Flashcards boost memory retention by <span class="text-accent font-semibold">up to 150%</span> through active recall.`;

  const toggleView = () => setShowLogin(!showLogin);

  const handleGoogleSignIn = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
    if (error) {
      console.error("Error signing in:", error);
    } else {
      console.log("User signed in:", data);
      onLogin();
    }
  };

  return (
    <div className="flex h-screen">
      <div className="w-[65%] h-full bg-surface0 px-[100px] flex flex-col justify-center items-center">
        <div className="absolute flex items-center justify-center top-[20px] left-[20px]">
          <AkarLogo />
          <span className="text-lg font-semibold text-white">akar</span>
        </div>
        <span className="text-white text-7xl">
          <TypingEffect text={fullText} typingSpeed={50} />
        </span>
      </div>
      <div className="w-[35%] h-full bg-base">
        <div className="px-[100px]">
          {showLogin ? <LoginDetails onLogin={onLogin} toggleView={toggleView} /> : <CreateNewAccount onLogin={onLogin} toggleView={toggleView} />}
          <div className="flex space-x-[20px] justify-center items-center mb-[20px]">
            <hr className="bg-surface1 h-[1px] border-0 w-[30%]" />
            <span className="text-textBase text-opacity-40">or</span>
            <hr className="bg-surface1 h-[1px] border-0 w-[30%]" />
          </div>
          <button className="w-full h-[40px] flex items-center justify-center ring-overlay0 ring-opacity-90 ring-1 rounded-lg space-x-[5px] hover:bg-overlay0 hover:scale-[101%]" onClick={handleGoogleSignIn}>
            <img src={"./googleLogo.png"} alt="Google sign-in" height={20} width={20} />
            <span className="text-textBase">Sign in with Google</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
