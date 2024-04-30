import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import {
  Edit,
  SettingsIcon,
  Trash,
  Manage,
  Import,
  Export,
  Advanced,
} from "../icons";

interface DeckSettingsProps {
  deckId: number | undefined;
  onDelete: () => void;
}

const DeckSettings: React.FC<DeckSettingsProps> = ({ deckId, onDelete }) => {
  console.log("DeckSettings - deckId:", deckId);
  const [showSettingsDropdown, setShowSettingsDropdown] = useState(false);
  const navigate = useNavigate();

  const toggleSettingsDropdown = () => {
    setShowSettingsDropdown(!showSettingsDropdown);
  };

  const handleDeleteDeck = async () => {
    if (!deckId) {
      console.error("Deck ID is undefined");
      return;
    }

    try {
      console.log("Deleting deck with ID:", deckId);
      await api.delete(`/decks/${deckId}`);
      onDelete();
      navigate("/");
    } catch (error) {
      console.error("Error deleting deck:", error);
    }
  };

  return (
    <div className="relative">
      <button
        className="w-[140px] h-[40px] bg-surface0 rounded-lg flex justify-center items-center hover:bg-overlay0 hover:scale-[101%]"
        onClick={toggleSettingsDropdown}
      >
        <div className="fill-textBase">
          <SettingsIcon />
        </div>
        <span className="text-textBase ml-[10px] font-semibold">Settings</span>
      </button>
      {showSettingsDropdown && (
        <div className="absolute px-[15px] mt-2 rounded-md shadow-lg left-[120px] bg-surface1 ring-1 ring-overlay0">
          <button
            className="flex w-full py-2 space-x-2 text-left text-white fill-white"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <Edit />
            <span>Rename</span>
          </button>
          <button
            className="flex w-full py-2 space-x-2 text-left text-white fill-white"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <Manage />
            <span>Manage</span>
          </button>
          <button
            className="flex w-full py-2 space-x-2 text-left text-white fill-white"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <Import />
            <span>Import</span>
          </button>
          <button
            className="flex w-full py-2 space-x-2 text-left text-white fill-white"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <Export />
            <span>Export</span>
          </button>
          <button
            className="flex w-full py-2 space-x-2 text-left text-white fill-white"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <Advanced />
            <span>Advanced</span>
          </button>
          <button
            className="flex w-full py-2 space-x-2 text-left fill-rose-500 text-rose-500"
            onClick={(e) => {
              e.stopPropagation();
              handleDeleteDeck();
            }}
          >
            <Trash />
            <span>Delete</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default DeckSettings;
