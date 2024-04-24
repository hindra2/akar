import { AkarLogo } from "../icons";

const LandingHeader = () => {
  return (
    <div>
      <div className="flex justify-between text-textBase px-[20px] mt-[20px]">
        <div className="flex items-center justify-center">
          <AkarLogo />
          <span className="text-lg font-semibold">akar</span>
        </div>
        <div className="space-x-[20px]">
          <button className="text-lg font-semibold">Log in</button>
          <button className="text-lg font-semibold px-[10px] py-[3px] bg-surface2 rounded-lg text-textBase hover:bg-overlay0 hover:scale-[101%]">
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingHeader;
