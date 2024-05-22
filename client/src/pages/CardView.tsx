import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import CardComponent from "../components/CardView/Card";
import { BackIcon } from "../components/icons";
import supabase from "../../utils/supabase";

interface Card {
  card_id: number;
  card_question: string;
  card_answer: string;
}

const CardView: React.FC = () => {
  const [isClicked, setIsClicked] = useState(false);
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const navigate = useNavigate();
  const deckName = useLocation().state?.deckName;

  const handleOnClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsClicked(true);

    setTimeout(() => {
      setIsClicked(false);
      navigate(`/deckInfo`, { state: { deckId, deckName } });
    }, 70);
  };

  const animatedStyle = isClicked ? { transform: "scale(0.98)" } : {};
  const buttonAnimatedStyle = isButtonClicked
    ? { transform: "scale(0.98)" }
    : {};

  const location = useLocation();
  const deckId = location.state?.deckId; // Get the deckId from the location state

  const [cards, setCards] = useState<Card[]>([]);
  const [currentCard, setCurrentCard] = useState<Card | null>(null); // Initialize currentCard as null
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [allCardsShown, setAllCardsShown] = useState(false);
  const [answeredCards, setAnsweredCards] = useState(0);

  const getNextCard = async () => {
    try {
      const { data, error } = await supabase
        .from("cards")
        .select("*")
        .eq("deck_id", deckId)
        .order("card_id", { ascending: true })
        .limit(1)
        .single();

      if (error) {
        console.error("Error fetching next card:", error);
      } else {
        setCurrentCard(data);
      }
    } catch (error) {
      console.error("Error fetching next card:", error);
    } 
  };

  const getCards = async () => {
    try {
      const { data, error } = await supabase
        .from("cards")
        .select("*")
        .eq("deck_id", deckId)
        .order("card_id", { ascending: true });

      if (error) {
        console.error("Error fetching cards:", error);
      } else {
        setCards(data);
      }
    } catch (error) {
      console.error("Error fetching cards:", error);
    }
  };

  useEffect(() => {
    getCards();
    getNextCard(); // Call getNextCard function when the component mounts
  }, []);

  const toggleExpansion = () => {
    if (!showAnswer) {
      setShowAnswer(true);
    }
  };

  const handleNextCard = () => {
    if (currentCardIndex === cards.length - 1) {
      setAllCardsShown(true);
    } else {
      setCurrentCardIndex((prevIndex) => prevIndex + 1);
    }
    setAnsweredCards((prevCount) => prevCount + 1);
    setShowAnswer(false);
    getNextCard(); // Call getNextCard function after handling the current card
  };

  const handleButtonClick = async (difficulty: string) => {
    if (showAnswer && !allCardsShown && currentCard) {
      // Check if currentCard is not null
      console.log(`Button clicked: ${difficulty}`);
      setIsButtonClicked(true);

      // const rating = difficultyToRating(difficulty);
      // await fetch(`http://localhost:5174/cards/${currentCard.card_id}/review`, {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({ rating }),
      // });

      setTimeout(() => {
        setIsButtonClicked(false);
        handleNextCard();
      }, 70);
    }
  };

  // const difficultyToRating = (difficulty: string) => {
  //   switch (difficulty) {
  //     case "Easy":
  //       return 5;
  //     case "Medium":
  //       return 4;
  //     case "Hard":
  //       return 3;
  //     case "Skip":
  //       return 0;
  //     default:
  //       return 0;
  //   }
  // };

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

  const progressPercentage = Math.round((answeredCards / cards.length) * 100);

  return (
    <div className="relative flex flex-col items-center w-full h-full">
      <button
        className="absolute top-[2%] left-8 fill-textBase"
        onClick={handleOnClick}
        style={animatedStyle}
      >
        <BackIcon />
      </button>
      <div className="relative w-[60%] h-[15px] mt-[2%] overflow-hidden bg-accent bg-opacity-30 rounded-lg ring-[0.5px] ring-accent">
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
        <h1 className="flex items-center justify-center font-bold text-textBase w-[80%]">
          {!allCardsShown ? (
            <CardComponent
              question={cards[currentCardIndex]?.card_question || ""}
              answer={cards[currentCardIndex]?.card_answer || ""}
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
      {!showAnswer && !allCardsShown && (
        <div className="flex space-x-[30px] mb-[1.5%]">
          <button
            className="h-[50px] w-[200px] rounded-full flex flex-col justify-center items-center align-middle text-textBase ring-accent ring-opacity-50 ring-1 px-[12px] transition-transform duration-75"
            style={{
              backgroundColor: "rgb(137, 180, 250, 0.2)",
              ...buttonAnimatedStyle,
            }}
            onClick={toggleExpansion}
          >
            <span className="text-lg">Show Answer</span>
          </button>
        </div>
      )}
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
