import { useState, useEffect } from "react";

const InfoPreview = () => {
  const [expandedCard, setExpandedCard] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);

  // Function to toggle the flashcard's expansion
  const toggleExpansion = (cardId) => {
    setExpandedCard(expandedCard === cardId ? null : cardId);
    setShowAnswer(expandedCard !== cardId);
  };

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

  useEffect(() => {
    getCards();
  }, []);

  console.log(cards);

  return (
    <div className="h-[400px] overflow-y-auto">
      <div className="px-4">
        {cards.map((card) => (
          <div
            key={card.card_id}
            className={`w-full bg-surface0 rounded-lg mt-4 flex flex-col justify-center px-[20px] py-4 transition-all duration-300 ease-in-out cursor-pointer hover:bg-overlay0 hover:scale-[101%] ${
              expandedCard === card.card_id ? "min-h-[100px]" : "min-h-[50px]"
            }`}
            onClick={() => toggleExpansion(card.card_id)}
          >
            <span
              className={`font-semibold transition-all duration-300 ease-in-out ${
                expandedCard === card.card_id
                  ? "text-xl text-textBase"
                  : "text-textBase"
              }`}
            >
              {card.card_question}
            </span>
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
    </div>
  );
};

export default InfoPreview;
