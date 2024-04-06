import React, { useState, useEffect } from "react";
import Card from "../components/CardView/Card";

const CardView: React.FC = () => {
  const cardsData = [
    {
      question: "What is the formula of Force?",
      answer: "Force = Mass × Acceleration",
    },
    {
      question: "What is the capital of France?",
      answer: "Paris",
    },
    {
      question: "Who wrote Romeo and Juliet?",
      answer: "William Shakespeare",
    },
  ];

  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [allCardsShown, setAllCardsShown] = useState(false);
  const [answeredCards, setAnsweredCards] = useState(0);

  const toggleExpansion = () => {
    if (showAnswer) {
      if (currentCardIndex === cardsData.length - 1) {
        setAllCardsShown(true);
      } else {
        setCurrentCardIndex((prevIndex) => prevIndex + 1);
      }
    } else {
      setAnsweredCards((prevCount) => prevCount + 1);
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

  const progressPercentage = Math.round(
    (answeredCards / cardsData.length) * 100
  );

  return (
    <div className="flex flex-col items-center h-full">
      <div className="relative w-[60%] h-[15px] mt-[2%] overflow-hidden bg-translucentAccent rounded-lg ring-accent ring-1">
        <div
          className="h-full transition-all duration-500 ease-in-out bg-accent"
          style={{ width: `${progressPercentage}%` }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm font-bold text-textBase">
            {progressPercentage}%
          </span>
        </div>
      </div>
      <div className="flex justify-center flex-1">
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
    </div>
  );
};

export default CardView;
