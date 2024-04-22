import React from "react";
import { MacbookScroll } from "../components/Landing/MacbookScroll";
import { HeroParallax } from "../components/Landing/HeroParallax";
import { TypewriterEffect } from "../components/Landing/Typewriter";
import { GoogleGeminiEffect } from "../components/Landing/GeminiEffect";
import { motion, useMotionValue } from "framer-motion";

const LandingPage: React.FC = () => {
  const pathLength1 = useMotionValue(1);
  const pathLength2 = useMotionValue(2);
  const pathLength3 = useMotionValue(3);
  const pathLength4 = useMotionValue(4);
  const pathLength5 = useMotionValue(5);
  return (
    <div className="flex flex-col justify-center h-full bg-surface0">
      <h1 className="flex items-center justify-center w-full font-bold text-textBase">
        Hello
      </h1>
      <GoogleGeminiEffect
        pathLengths={[
          pathLength1,
          pathLength2,
          pathLength3,
          pathLength4,
          pathLength5,
        ]}
        title="Your Title Here"
        description="Your description here"
        className="your-custom-classname"
      />
      <div className="mt-[50000px]">
        <HeroParallax
          products={[
            {
              title: "Product 1",
              link: "http://linkto.product1",
              thumbnail: "http://linkto.thumbnail1",
            },
            {
              title: "Product 2",
              link: "http://linkto.product2",
              thumbnail: "http://linkto.thumbnail2",
            },
            // ...more products
          ]}
        />
      </div>
      <div className="mt-[100px]">
        <TypewriterEffect
          words={[
            { text: "Word1", className: "some-class" },
            { text: "Word2" },
            // ...more words
          ]}
          // ... any other props like className or cursorClassName
        />
      </div>
      <MacbookScroll />
    </div>
  );
};

export default LandingPage;
