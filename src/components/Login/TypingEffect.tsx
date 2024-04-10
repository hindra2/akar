import React, { useState, useEffect } from "react";

interface TypingEffectProps {
  text: string;
  typingSpeed?: number;
}

const TypingEffect: React.FC<TypingEffectProps> = ({
  text,
  typingSpeed = 0.00001,
}) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index < text.length) {
        setDisplayedText((prev) => prev + text.charAt(index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, typingSpeed);

    return () => clearInterval(timer);
  }, [text, typingSpeed]);

  return <span>{displayedText}</span>;
};

export default TypingEffect;
