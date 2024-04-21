import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowIcon } from "../icons";

interface DeckProps {
  name: string;
}

const Deck: React.FC<DeckProps> = ({ name }) => {
  const [isClicked, setIsClicked] = useState(false);
  const navigate = useNavigate();

  const handleOnClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsClicked(true);
    setTimeout(() => {
      setIsClicked(false);
      navigate("/deckinfo");
    }, 70);
  };

  const animatedStyle = isClicked ? { transform: "scale(0.98)" } : {};

  return (
    <button onClick={handleOnClick} style={animatedStyle}>
      <div className="w-[750px] h-[50px] bg-surface0 rounded-lg mt-4 flex justify-between items-center px-[20px] hover:bg-overlay0 hover:scale-[101%]">
        <span className="font-semibold text-textBase">{name}</span>
        <div className="flex space-x-[20px] justify-center items-center">
          <div className="fill-textBase">
            <ArrowIcon />
          </div>
        </div>
      </div>
    </button>
  );
};

export default Deck;
