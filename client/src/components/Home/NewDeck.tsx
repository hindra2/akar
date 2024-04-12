import React, { useState } from "react";
import { PlusIcon } from "../icons";
import NewDeckPopup from "./NewDeck-popup";

const NewDeck = () => {
  const [isNewDeckPopupOpen, setIsNewDeckPopupOpen] = useState(false);

  const openNewDeckPopup = () => {
    setIsNewDeckPopupOpen(true);
  };

  const closeNewDeckPopup = () => {
    setIsNewDeckPopupOpen(false);
  };

  return (
    <div>
      <button onClick={openNewDeckPopup}>
        <div className="w-[140px] h-[40px] bg-surface0 rounded-lg flex justify-center items-center hover:bg-overlay0 hover:scale-[101%]">
          <div className="fill-textBase">
            <PlusIcon />
          </div>
          <span className="text-textBase ml-[10px] font-semibold">
            New Deck
          </span>
        </div>
      </button>
      <NewDeckPopup isOpen={isNewDeckPopupOpen} onClose={closeNewDeckPopup} />
    </div>
  );
};

export default NewDeck;
