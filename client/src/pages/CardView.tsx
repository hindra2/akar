import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../components/CardView/Card";
import { BackIcon } from "../components/icons";

const CardView: React.FC = () => {
  const [isClicked, setIsClicked] = useState(false);
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const navigate = useNavigate(); // Hook for navigation

  const handleOnClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsClicked(true);

    setTimeout(() => {
      setIsClicked(false);
      navigate("/deckInfo");
    }, 70);
  };

  const animatedStyle = isClicked ? { transform: "scale(0.98)" } : {};
  const buttonAnimatedStyle = isButtonClicked
    ? { transform: "scale(0.98)" }
    : {};
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
    if (!showAnswer) {
      setShowAnswer(true);
    }
  };

  const handleNextCard = () => {
    if (currentCardIndex === cardsData.length - 1) {
      setAllCardsShown(true);
    } else {
      setCurrentCardIndex((prevIndex) => prevIndex + 1);
    }
    setAnsweredCards((prevCount) => prevCount + 1);
    setShowAnswer(false);
  };

  const handleButtonClick = (difficulty: string) => {
    if (showAnswer && !allCardsShown) {
      // Handle button click based on difficulty
      console.log(`Button clicked: ${difficulty}`);
      setIsButtonClicked(true);
      setTimeout(() => {
        setIsButtonClicked(false);
        handleNextCard();
      }, 70);
    }
  };

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (
        !showAnswer &&
        !allCardsShown &&
        (event.key === " " || event.key === "Spacebar")
      ) {
        toggleExpansion();
      } else if (showAnswer && !allCardsShown) {
        switch (event.key) {
          case "1":
            handleButtonClick("Easy");
            break;
          case "2":
            handleButtonClick("Medium");
            break;
          case "3":
            handleButtonClick("Hard");
            break;
          case "4":
            handleButtonClick("Skip");
            break;
          default:
            break;
        }
      } else if (
        allCardsShown &&
        (event.key === " " || event.key === "Spacebar")
      ) {
        handleOnClick(event as unknown as React.MouseEvent);
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [showAnswer, allCardsShown, handleOnClick]);

  const progressPercentage = Math.round(
    (answeredCards / cardsData.length) * 100
  );

  return (
    <div className="relative flex flex-col items-center w-full h-full">
      <button
        className="absolute top-[2%] left-8 fill-textBase"
        onClick={handleOnClick}
        style={animatedStyle}
      >
        <BackIcon />
      </button>
      <div className="relative w-[60%] h-[15px] mt-[2%] overflow-hidden bg-translucentAccent rounded-lg">
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
            <div className="flex flex-col items-center text-center">
              <span className="text-4xl text-textBase">
                Congratulations! You have finished this deck for now.
              </span>

              <button
                className="mt-[100px] bg-surface1 w-[300px] py-[10px] rounded-lg hover:bg-overlay0 hover:scale-[101%]"
                onClick={handleOnClick}
              >
                Return Home
              </button>
            </div>
          )}
        </h1>
      </div>
      {showAnswer && !allCardsShown && (
        <div className="flex space-x-[30px] mb-[1.5%]">
          <button
            className="h-[50px] w-[100px] rounded-full flex flex-col justify-center items-center align-middle text-review ring-review ring-opacity-50 ring-1 px-[12px] transition-transform duration-75"
            style={{
              backgroundColor: "rgba(166, 227, 161, 0.2)",
              ...buttonAnimatedStyle,
            }}
            onClick={() => handleButtonClick("Easy")}
          >
            <span className="text-lg">Easy</span>
          </button>
          <button
            className="h-[50px] w-[100px] rounded-full flex flex-col justify-center items-center align-middle text-learning ring-learning ring-opacity-50 ring-1 px-[12px] transition-transform duration-75"
            style={{
              backgroundColor: "rgba(250, 179, 135, 0.2)",
              ...buttonAnimatedStyle,
            }}
            onClick={() => handleButtonClick("Medium")}
          >
            <span className="text-lg">Medium</span>
          </button>
          <button
            className="h-[50px] w-[100px] rounded-full flex flex-col justify-center items-center align-middle text-red ring-red ring-opacity-50 ring-1 px-[12px] transition-transform duration-75"
            style={{
              backgroundColor: "rgba(210, 15, 57, 0.2)",
              ...buttonAnimatedStyle,
            }}
            onClick={() => handleButtonClick("Hard")}
          >
            <span className="text-lg">Hard</span>
          </button>
          <button
            className="h-[50px] w-[100px] rounded-full flex flex-col justify-center items-center align-middle text-new ring-new ring-opacity-50 ring-1 transition-transform duration-75"
            style={{
              backgroundColor: "rgba(203,166,247, 0.2)",
              ...buttonAnimatedStyle,
            }}
            onClick={() => handleButtonClick("Skip")}
          >
            <span className="text-lg">Skip</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default CardView;
