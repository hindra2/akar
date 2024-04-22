import { PlusIcon } from "../icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface NewCardProps {
  deckId: number;
  deckName: string;
}

const NewCard: React.FC<NewCardProps> = ({ deckId, deckName }) => {
  const [isClicked, setIsClicked] = useState(false);
  const navigate = useNavigate();

  const handleOnClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsClicked(true);

    setTimeout(() => {
      setIsClicked(false);
      navigate("/addcard", { state: { deckId, deckName } });
    }, 70);
  };

  const animatedStyle = isClicked ? { transform: "scale(0.98)" } : {};

  return (
    <div>
      <button
        className="w-full h-[50px] bg-translucentSurface0 rounded-lg mt-4 flex justify-center items-center px-[20px] transition-all duration-300 ease-in-out hover:bg-surface0 hover:scale-[101%] cursor-pointer"
        onClick={handleOnClick}
        style={animatedStyle}
      >
        <div className="fill-textBase">
          <PlusIcon />
        </div>
        <span className="text-Subtext0 ml-[10px] font-semibold">New Card</span>
      </button>
    </div>
  );
};

export default NewCard;
