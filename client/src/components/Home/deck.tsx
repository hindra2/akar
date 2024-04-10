import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowIcon } from "../icons";

interface DeckProps {
  name: string;
  newLabel: string;
  learningLabel: string;
  reviewLabel: string;
}

const Deck: React.FC<DeckProps> = ({ name, newLabel, learningLabel, reviewLabel }) => {
  const [isClicked, setIsClicked] = useState(false);
  const navigate = useNavigate(); // Hook for navigation

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
          <div className="flex space-x-[8px]">
            <div className="h-[20px] text-xs rounded-3xl flex justify-center items-center align-middle text-new ring-new ring-opacity-50 ring-1 px-[12px]" style={{ backgroundColor: "rgba(203,166,247, 0.2)" }}>
              {newLabel + " New"}
            </div>
            <div className="h-[20px] text-xs rounded-3xl flex justify-center items-center align-middle text-learning ring-learning ring-opacity-50 ring-1 px-[12px]" style={{ backgroundColor: "rgba(250, 179, 135, 0.2)" }}>
              {learningLabel + " Learning"}
            </div>
            <div className="h-[20px] text-xs rounded-3xl flex justify-center items-center align-middle text-review ring-review ring-opacity-50 ring-1 px-[12px]" style={{ backgroundColor: "rgba(166, 227, 161, 0.2)" }}>
              {reviewLabel + " Review"}
            </div>
          </div>
          <div className="fill-textBase">
            <ArrowIcon />
          </div>
        </div>
      </div>
    </button>
  );
};

export default Deck;
