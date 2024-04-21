import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import DeckPreview from "../components/DeckInfo/DeckPreview";
import DeckSettings from "../components/DeckInfo/DeckSettings";
import InfoPreview from "../components/DeckInfo/InfoPreview";
import NewCard from "../components/DeckInfo/NewCard";
import { BackIcon, SearchIcon } from "../components/icons";

const DeckInfo: React.FC = () => {
  const [isClicked, setIsClicked] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const deckId = location.state?.deckId;

  const handleBackClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsClicked(true);
    setTimeout(() => {
      setIsClicked(false);
      navigate("/");
    }, 70);
  };

  const handleStudyNowClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate("/cardview", { state: { deckId } });
  };

  const animatedStyle = isClicked ? { transform: "scale(0.98)" } : {};

  return (
    <div className="relative flex items-center justify-center w-full h-screen overflow-y-auto">
      <button
        className="absolute top-[2%] left-8 fill-textBase"
        onClick={handleBackClick}
        style={animatedStyle}
      >
        <BackIcon />
      </button>
      <div className="w-[700px] h-full mt-[200px]">
        <div className="flex justify-between">
          <div className="text-2xl font-semibold text-textBase">CS 173</div>
          <DeckSettings />
        </div>
        <DeckPreview />
        <div className="flex justify-center align-middle item-center">
          <button
            className="mt-[40px] bg-surface1 w-[300px] py-[10px] rounded-lg hover:bg-overlay0 hover:scale-[101%]"
            onClick={handleStudyNowClick}
            style={animatedStyle}
          >
            <span className="text-textBase">Study Now</span>
          </button>
        </div>
        <hr className="bg-surface1 my-[70px] h-0.5 border-0" />
        <div className="flex items-center p-2 rounded-lg bg-surface1">
          <input
            className="w-full ml-2 text-white placeholder-gray-300 bg-transparent outline-none"
            type="text"
            placeholder="Search"
          />
          <div className="fill-textBase">
            <SearchIcon />
          </div>
        </div>
        <div>
          {deckId && <NewCard deckId={deckId} />}
          {deckId && <InfoPreview deckId={deckId} />}
        </div>
      </div>
    </div>
  );
};

export default DeckInfo;
