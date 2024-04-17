import LoginDetails from "../components/Login/LoginDetails";
import { AkarLogo } from "../components/icons";
import TypingEffect from "../components/Login/TypingEffect";

const LoginPage: React.FC = () => {
  const fullText = `Flashcards boost memory retention by <span class="text-accent font-semibold">up to 50%</span> through active recall.`;

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
        <LoginDetails />
      </div>
    </div>
  );
};

export default LoginPage;
