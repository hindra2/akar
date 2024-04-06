import React, { useState, useEffect } from "react";
import Card from "../components/CardView/Card";

const CardView: React.FC = () => {
  const cardsData = [
    { question: "What is the formula of Force?", answer: "Force = Mass × Acceleration" },
    { question: "What is the capital of France?", answer: "Paris" },
    { question: "Who wrote Romeo and Juliet?", answer: "William Shakespeare" },
  ];

  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [allCardsShown, setAllCardsShown] = useState(false);

  const toggleExpansion = () => {
    if (showAnswer) {
      if (currentCardIndex === cardsData.length - 1) {
        setAllCardsShown(true);
      } else {
        setCurrentCardIndex((prevIndex) => prevIndex + 1);
      }
    }
    setShowAnswer(!showAnswer);
  };

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === " " || event.key === "Spacebar") {
        if (!allCardsShown) {
          toggleExpansion();
        }
      }
    };
  
    document.addEventListener("keydown", handleKeyPress);
  
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [showAnswer, allCardsShown]);

  return (
    <div className="flex justify-center h-full">
      <h1 className="flex items-center justify-center w-full font-bold text-textBase">
        {!allCardsShown ? (
          <Card 
            question={cardsData[currentCardIndex].question}
            answer={cardsData[currentCardIndex].answer}
            isExpanded={showAnswer}
            toggleExpansion={toggleExpansion} 
          />
        ) : (
          <div>No more cards</div>
        )}
      </h1>
    </div>
  );  
};

export default CardView;
