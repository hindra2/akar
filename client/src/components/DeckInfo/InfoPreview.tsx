import { useState, useEffect } from "react";
import { Edit, Ellipsis, Trash } from "../icons";
import { useNavigate, useLocation } from "react-router-dom";
import { Toaster, toast } from "sonner";

interface Card {
  card_id: number;
  card_question: string;
  card_answer: string;
}

const InfoPreview = () => {
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  const [showDropdown, setShowDropdown] = useState<number | null>(null);
  const navigate = useNavigate();

  // Function to toggle the flashcard's expansion
  const toggleExpansion = (cardId: number) => {
    setExpandedCard(expandedCard === cardId ? null : cardId);
  };

  // Function to toggle the dropdown
  const toggleDropdown = (cardId: number) => {
    setShowDropdown(showDropdown === cardId ? null : cardId);
  };

  // Backend
  const location = useLocation();
  const deckId = location.state?.deckId;
  const deckName = location.state?.deckName;
  const [cards, setCards] = useState<Card[]>([]);

  const getCards = async () => {
    try {
      const response = await fetch(
        `http://localhost:5174/decks/${deckId}/cards`
      );
      const jsonData: Card[] = await response.json();
      // Sort the cards in descending order based on card_id
      const sortedCards = jsonData.sort((a, b) => b.card_id - a.card_id);
      setCards(sortedCards);
    } catch (err) {
      console.log((err as Error).message);
    }
  };

  const deleteCard = async (id: number) => {
    try {
      await fetch(`http://localhost:5174/cards/${id}`, {
        method: "DELETE",
      });
      setCards(cards.filter((card) => card.card_id !== id));
      // Show Sonner toast for successfully deleting a card
      toast.success("Card deleted successfully!", {
        position: "bottom-right",
        duration: 2000,
      });
    } catch (err) {
      console.error((err as Error).message);
    }
  };

  const editCard = (cardId: number) => {
    const cardDetails = cards.find((card) => card.card_id === cardId);
    navigate("/addcard", {
      state: { card: cardDetails, deckId: deckId, deckName: deckName },
    });
  };

  useEffect(() => {
    getCards();
  }, []);

  return (
    <div className="w-full">
      {cards.map((card) => (
        <div
          key={card.card_id}
          className={`w-full bg-surface0 rounded-lg mt-4 flex flex-col justify-center px-[20px] py-4 transition-all duration-300 ease-in-out cursor-pointer hover:scale-[101%] ${
            expandedCard === card.card_id ? "min-h-[100px]" : "min-h-[50px]"
          }`}
          onClick={() => toggleExpansion(card.card_id)}
        >
          <div className="flex items-center justify-between">
            <span
              className={`font-semibold transition-all duration-300 ease-in-out ${
                expandedCard === card.card_id
                  ? "text-xl text-textBase"
                  : "text-textBase"
              }`}
            >
              {card.card_question}
            </span>
            <div className="relative">
              <button
                className="fill-textBase focus:outline-none"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleDropdown(card.card_id);
                }}
              >
                <Ellipsis />
              </button>
              {showDropdown === card.card_id && (
                <div className="absolute right-0 w-32 mt-2 rounded-md shadow-lg bg-surface1 ring-1 ring-overlay0">
                  <button
                    className="flex w-full px-4 py-2 space-x-2 text-left text-white fill-white"
                    onClick={(e) => {
                      e.stopPropagation();
                      editCard(card.card_id);
                    }}
                  >
                    <Edit />
                    <span>Edit</span>
                  </button>
                  <button
                    className="flex w-full px-4 py-2 space-x-2 text-left fill-rose-500 text-rose-500"
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteCard(card.card_id);
                    }}
                  >
                    <Trash />
                    <span>Delete</span>
                  </button>
                </div>
              )}
            </div>
          </div>
          {expandedCard === card.card_id && (
            <div className="transition-opacity duration-300 ease-in-out opacity-100">
              <hr className="bg-surface1 my-[10px] h-[1px] border-0" />
              <span className="break-words whitespace-normal text-textBase">
                {card.card_answer}
              </span>
            </div>
          )}
        </div>
      ))}
      <Toaster richColors />
    </div>
  );
};

export default InfoPreview;
