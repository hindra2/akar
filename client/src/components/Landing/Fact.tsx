import React, { useState, useEffect } from "react";

const LandingFact = () => {
  const [index, setIndex] = useState(0);
  const studies = [
    "biology",
    "computer science",
    "law",
    "engineering",
    "mathematics",
    "psychology",
    "physics",
    "chemistry",
    "economics",
    "political science",
    "sociology",
    "anthropology",
    "medicine",
    "environmental science",
    "education",
    "linguistics",
    "history",
    "philosophy",
    "geology",
    "astronomy",
    "business administration",
    "public health",
    "neuroscience",
    "archaeology",
    "communication studies",
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % studies.length);
    }, 1000); // changes every 0.5 seconds

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="w-[70%]">
      <span className="text-6xl font-semibold text-white text-center justify-center items-center">
        More than 65% of college students use flashcards to study{" "}
        <span className="text-accent">{studies[index]}</span>
      </span>
    </div>
  );
};

export default LandingFact;
