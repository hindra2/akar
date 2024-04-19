import { useState, useEffect, useRef } from "react";
import { Edit, Ellipsis, Trash } from "../icons";
import { useNavigate } from "react-router-dom";

const InfoPreview = () => {
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const [showDropdown, setShowDropdown] = useState<string | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const cardRef = useRef(null);
  const navigate = useNavigate();

  // Function to toggle the flashcard's expansion
  const toggleExpansion = (cardId: string) => {
    setExpandedCard(expandedCard === cardId ? null : cardId);
    setShowAnswer(expandedCard !== cardId);
  };

  // Function to toggle the dropdown
  const toggleDropdown = (cardId: string) => {
    setShowDropdown(showDropdown === cardId ? null : cardId);
  };

  // Function to close the edit popup and show answer section when clicking outside
  const handleOutsideClick = (event: MouseEvent) => {
    if (cardRef.current && !cardRef.current.contains(event.target)) {
      setExpandedCard(null);
      setShowAnswer(false);
      setShowDropdown(null);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  // backend
  const [cards, setCards] = useState([]);

  const getCards = async () => {
    try {
      const response = await fetch("http://localhost:5174/cards");
      const jsonData = await response.json();
      // Sort the cards in descending order based on card_id
      const sortedCards = jsonData.sort((a, b) => b.card_id - a.card_id);
      setCards(sortedCards);
    } catch (err) {
      console.log(err.message);
    }
  };

  const deleteCard = async (cardId: string) => {
    try {
      await fetch(`http://localhost:5174/cards/${cardId}`, {
        method: "DELETE",
      });
      setCards(cards.filter((card) => card.card_id !== cardId));
    } catch (err) {
      console.log(err.message);
    }
  };

  const editCard = (card: string) => {
    navigate("/addcard", { state: { card } });
  };

  useEffect(() => {
    getCards();
  }, []);

  console.log(cards);

  return (
    <div className="w-full">
      {cards.map((card) => (
        <div
          key={card.card_id}
          ref={cardRef}
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
                <div className="absolute right-0 w-32 mt-2 rounded-md shadow-lg bg-overlay0">
                  <button
                    className="flex w-full px-4 py-2 space-x-2 text-left text-white fill-white"
                    onClick={() => editCard(card)}
                  >
                    <Edit />
                    <span>Edit</span>
                  </button>
                  <button
                    className="flex w-full px-4 py-2 space-x-2 text-left text-white fill-white"
                    onClick={() => deleteCard(card.card_id)}
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
    </div>
  );
};

export default InfoPreview;
