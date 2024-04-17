import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextInput from "../components/AddCard/TextInput";
import { BackIcon, PlusIcon } from "../components/icons";

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
      <div>
        <div className="flex flex-col w-[700px] mt-[200px]">
          <div className="flex items-center w-full mb-2 text-xl text-textBase">
            Question
          </div>
          <div className="flex items-center">
            <TextInput />
          </div>
        </div>

        <div className="flex flex-col w-[700px] mt-[30px]">
          <div className="flex items-center w-full mb-2 text-xl text-textBase">
            Answer
          </div>
          <div className="flex items-center">
            <TextInput />
          </div>
        </div>
        <div className="flex justify-end w-full">
          <div className="w-[100px] h-[40px] bg-surface2 rounded-lg flex justify-center items-center hover:bg-overlay0 hover:scale-[101%] mt-[30px]">
            <div className="fill-textBase">
              <PlusIcon />
            </div>
            <span className="text-textBase ml-[10px] font-semibold">Add</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCard;
