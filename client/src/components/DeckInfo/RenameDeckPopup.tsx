import React, { useRef, useEffect, useState } from "react";
import { useLocation, useNavigate} from "react-router-dom";
import supabase from "../../../utils/supabase";

interface PropOpen {
  isOpen: boolean;
  onClose: () => void;
}

const RenameDeckPopup: React.FC<PropOpen> = ({
  isOpen,
  onClose
}) => {
  const popupRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [deckName, setDeckName] = useState("");
  const deckId = useLocation().state?.deckId;
  const navigate = useNavigate();

  const handleRenameDeck = async () => {
    try {
      const { error: renameDeckError } = await supabase
      .from("decks")
      .update({ deck_name: deckName })
      .eq("deck_id", deckId)
      .single();

      if (renameDeckError) {
        throw renameDeckError;
      }

      console.log("Renamed Successfully");
      onClose();
      navigate("/");
    } catch (error) {
      console.error("Error renaming deck", error);
    }
  };

  useEffect(() => {
    if (isOpen) {
      setVisible(true);
      setTimeout(() => setAnimate(true), 10);
    } else {
      setAnimate(false);
      setTimeout(() => setVisible(false), 500);
    }
  }, [isOpen]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  if (!visible) {
    return null;
  }

  return (
    <div
      className={`fixed z-10 inset-0 flex items-center justify-center bg-surface0 bg-opacity-60 ${
        animate ? "opacity-100" : "opacity-0"
      } transition-opacity duration-500`}
      onClick={onClose}
    >
      <div
        ref={popupRef}
        onClick={(e) => e.stopPropagation()}
        className={`relative h-[200px] w-[500px] bg-surface1 rounded-lg overflow-hidden shadow-2xl ${
          animate ? "scale-100" : "scale-95"
        } transition-transform duration-500 ease-out flex`}
      >
        <div className="flex flex-col p-[20px] w-full">
          <span className="font-bold text-textBase mb-[10px]">
            Rename Deck
          </span>
          <div className="mb-[20px] space-y-[3px] mt-[10px]">
            {/* <span className="text-textBase">Name</span> */}
            <div className="bg-surface1 w-full h-[40px] rounded-lg flex ring-overlay1 ring-opacity-50 ring-1">
              <input
                className="w-full ml-2 bg-transparent outline-none placeholder-textPlaceholder text-textBase"
                type="text"
                value={deckName}
                onChange={(e) => setDeckName(e.target.value)}
              />
            </div>
          </div>
          <div className="flex justify-end space-x-[10px]">
            <button
              className="w-[75px] py-[7px] text-textBase bg-surface2 rounded-lg hover:bg-overlay1 hover:scale-[101%]"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="w-[75px] py-[7px] text-textBase bg-surface2 rounded-lg hover:bg-overlay1 hover:scale-[101%]"
              onClick={handleRenameDeck}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RenameDeckPopup;
