import { PlusIcon } from "../icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const NewCard = () => {
  const [isClicked, setIsClicked] = useState(false);
  const navigate = useNavigate(); // Hook for navigation

  const handleOnClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsClicked(true);

    setTimeout(() => {
      setIsClicked(false);
      navigate("/addcard");
    }, 70);
  };

  const animatedStyle = isClicked ? { transform: "scale(0.98)" } : {};

  return (
    <div>
      <button className="w-full h-[50px] bg-translucentSurface0 rounded-lg mt-4 flex justify-center items-center px-[20px] transition-all duration-300 ease-in-out hover:bg-surface0 hover:scale-[101%] cursor-pointer" onClick={handleOnClick} style={animatedStyle}>
        <div className="fill-textBase">
          <PlusIcon />
        </div>
        <span className=" text-Subtext2 ml-[10px] font-semibold">New Card</span>
      </button>
    </div>
  );
};

export default NewCard;