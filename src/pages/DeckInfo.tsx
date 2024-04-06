import { useNavigate } from "react-router-dom";
import { useState } from "react";

import DeckPreview from "../components/DeckInfo/DeckPreview";
import DeckSettings from "../components/DeckInfo/DeckSettings";
import InfoPreview from "../components/DeckInfo/InfoPreview";
import NewCard from "../components/DeckInfo/NewCard";

const DeckInfo: React.FC = () => {
  const [isClicked, setIsClicked] = useState(false);
  const navigate = useNavigate(); // Hook for navigation

  const handleOnClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsClicked(true);

    setTimeout(() => {
      setIsClicked(false);
      navigate("/cardview");
    }, 70);
  };

  const animatedStyle = isClicked ? { transform: "scale(0.98)" } : {};

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-[700px] h-full mt-[200px]">
        <div className="flex justify-between">
          <div className="text-2xl font-semibold text-textBase">CS 173</div>
          <DeckSettings />
        </div>

        <DeckPreview />

        <div className="flex justify-center align-middle item-center">
          <button className="mt-[40px] bg-surface1 w-[300px] py-[10px] rounded-lg hover:bg-overlay0 hover:scale-[101%]" onClick={handleOnClick} style={animatedStyle}>
            <span className="text-textBase">Study Now</span>
          </button>
        </div>

        <hr className="bg-surface1 my-[70px] h-0.5 border-0" />

        <div>
          <NewCard />
          <InfoPreview />
        </div>
      </div>
    </div>
  );
};

export default DeckInfo;
