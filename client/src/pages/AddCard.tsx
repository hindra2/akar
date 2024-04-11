import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextInput from "../components/AddCard/TextInput";
import { BackIcon } from "../components/icons";

const AddCard: React.FC = () => {
  const [isClicked, setIsClicked] = useState(false);
  const navigate = useNavigate(); // Hook for navigation

  const handleOnClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsClicked(true);

    setTimeout(() => {
      setIsClicked(false);
      navigate("/deckInfo");
    }, 70);
  };

  const animatedStyle = isClicked ? { transform: "scale(0.98)" } : {};
  return (
    <div className="relative flex flex-col items-center h-full relativeflex">
      <button
        className="absolute top-[2%] left-8 fill-textBase"
        onClick={handleOnClick}
        style={animatedStyle}
      >
        <BackIcon />
      </button>
      <div className="flex flex-col w-[700px] mt-[200px]">
        <div className="flex items-center w-full mb-2 text-xl text-textBase">
          Front
        </div>
        <div className="flex items-center">
          <TextInput />
        </div>
      </div>

      <div className="flex flex-col w-[700px] mt-[50px]">
        <div className="flex items-center w-full mb-2 text-xl text-textBase">
          Back
        </div>
        <div className="flex items-center">
          <TextInput />
        </div>
      </div>
    </div>
  );
};

export default AddCard;
