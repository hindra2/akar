import React from "react";

import { PlusIcon } from "../components/icons";

import Deck from "../components/Home/deck";

const HomePage: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col items-end mt-[-20%]">
        <button>
          <div className="w-[140px] h-[40px] bg-surface0 rounded-lg flex justify-center items-center">
            <div className="fill-textBase">
              <PlusIcon />
            </div>
            <span className="text-textBase ml-[10px] font-semibold">
              New Deck
            </span>
          </div>
        </button>
        <Deck name="CS173" newLabel="5" learningLabel="2" reviewLabel="9" />
        <Deck name="CS225" newLabel="3" learningLabel="5" reviewLabel="200" />
      </div>
    </div>
  );
};

export default HomePage;
