import React, { useState } from "react";
import { PlusIcon } from "../icons";
import NewDeckPopup from "./NewDeck-popup";
import supabase from "../../../utils/supabase";

interface NewDeckProps {
  onDeckCreated: () => void;
}

const NewDeck: React.FC<NewDeckProps> = ({ onDeckCreated }) => {
  const [isNewDeckPopupOpen, setIsNewDeckPopupOpen] = useState(false);

  const openNewDeckPopup = () => {
    setIsNewDeckPopupOpen(true);
  };

  const closeNewDeckPopup = () => {
    setIsNewDeckPopupOpen(false);
  };

  const handleCreateDeck = async (deckName: string) => {
    try {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      
      if (userError) {
        console.error("Error getting user:", userError);
        return;
      }
      
      console.log("Creating deck with name:", deckName, "and user ID:", user?.id); // Log the values

      const { error } = await supabase
        .from('decks')
        .insert({ deck_name: deckName, user_id: user?.id })
        .single()

      closeNewDeckPopup();
      onDeckCreated();

      if (error) {
        console.error("Error creating deck:", error);
        return
      }
    } catch (error) {
      console.error("Error creating deck:", error);
    }
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
      <NewDeckPopup
        isOpen={isNewDeckPopupOpen}
        onClose={closeNewDeckPopup}
        onCreateDeck={handleCreateDeck}
      />
    </div>
  );
};

export default NewDeck;
