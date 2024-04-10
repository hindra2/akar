import { useState, useEffect } from "react";

const InfoPreview = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);

  // Function to toggle the flashcard's expansion
  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
    // Reset showAnswer to false instantly if we are collapsing the card
    if (isExpanded) setShowAnswer(false);
  };

  useEffect(() => {
    if (isExpanded) {
      // Wait for the expansion animation to finish before showing the answer
      const timer = setTimeout(() => {
        setShowAnswer(true);
      }, 300); // This duration should match your transition duration
      return () => clearTimeout(timer);
    }
  }, [isExpanded]);
  return (
    <div>
      <div
        className={`w-full bg-surface0 rounded-lg mt-4 flex flex-col justify-center px-[20px] transition-all duration-300 ease-in-out cursor-pointer hover:bg-overlay0 hover:scale-[101%] ${
          isExpanded ? "h-[100px]" : "h-[50px]"
        }`}
        onClick={toggleExpansion}
      >
        <span
          className={`font-semibold transition-all duration-300 ease-in-out ${
            isExpanded ? "text-xl text-textBase" : "text-textBase"
          }`}
        >
          What is the formula of Force?
        </span>
        {showAnswer && (
          <div className="transition-opacity duration-300 ease-in-out opacity-100">
            <hr className="bg-surface1 my-[10px] h-[1px] border-0" />
            <span className="text-textBase">Force = Mass × Acceleration</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default InfoPreview;
