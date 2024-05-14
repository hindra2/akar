import React from "react";

interface CardProps {
  question: string;
  answer: string;
  isExpanded: boolean;
  toggleExpansion: () => void;
}

const Card: React.FC<CardProps> = ({
  question,
  answer,
  isExpanded,
  toggleExpansion,
}) => {
  return (
    <div
      className={`rounded-lg   px-4 py-6 cursor-pointer flex flex-col justify-center items-center transition-all duration-300 ease-in-out ${
        isExpanded ? "h-auto" : "h-20"
      }`}
      onClick={toggleExpansion}
      tabIndex={0}
    >
      <span
        className={`font-semibold text-textBase text-center transition-all duration-300 ease-in-out ${
          isExpanded ? "text-3xl" : "text-textBase text-3xl"
        }`}
      >
        {question}
      </span>
      {isExpanded && (
        <div className="w-full mt-4 transition-opacity duration-300 ease-in-out">
          <hr className="my-2 rounded bg-overlay0" />
          <div
            className={`px-4 py-2 text-3xl text-center transition-opacity duration-300 ease-in-out ${
              isExpanded ? "opacity-100" : "opacity-0"
            }`}
          >
            <span>{answer}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Card;
