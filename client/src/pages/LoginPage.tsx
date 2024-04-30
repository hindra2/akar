import React, { useState } from "react";
import LoginDetails from "../components/Login/LoginDetails";
import CreateNewAccount from "../components/Login/CreateNewAccount";
import { AkarLogo } from "../components/icons";
import TypingEffect from "../components/Login/TypingEffect";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebase";

const LoginPage: React.FC = () => {
  const [showLogin, setShowLogin] = useState(true);
  const fullText = `Flashcards boost memory retention by <span class="text-accent font-semibold">up to 50%</span> through active recall.`;

  const toggleView = () => setShowLogin(!showLogin);
  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      // Handle successful sign-in
      console.log(result.user);
    } catch (error) {
      // Handle sign-in error
      console.error(error);
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
          {showLogin ? (
            <LoginDetails toggleView={toggleView} />
          ) : (
            <CreateNewAccount toggleView={toggleView} />
          )}
          <div className="flex space-x-[20px] justify-center items-center mb-[20px]">
            <hr className="bg-surface1 h-[1px] border-0 w-[30%]" />
            <span className="text-textBase text-opacity-40">or</span>
            <hr className="bg-surface1 h-[1px] border-0 w-[30%]" />
          </div>
          <button
            onClick={handleGoogleSignIn}
            className="w-full h-[40px] flex items-center justify-center ring-overlay0 ring-opacity-90 ring-1 rounded-lg space-x-[5px] hover:bg-overlay0 hover:scale-[101%]"
          >
            <img
              src={"./googleLogo.png"}
              alt="Google sign-in"
              height={20}
              width={20}
            />
            <span className="text-textBase">Sign in with Google</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
