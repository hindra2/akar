import React from "react";
import TextInput from "../components/AddCard/TextInput";

const AddCard: React.FC = () => {
  return (
    <div className="flex flex-col items-center h-full">
      <div className="flex flex-col w-[700px] mt-[200px]">
        <div className="flex items-center text-xl mb-2 w-full text-textBase">
          Front
        </div>
        <div className="flex items-center">
          <TextInput />
        </div>
      </div>

      <div className="flex flex-col w-[700px] mt-[50px]">
        <div className="flex items-center text-xl mb-2 w-full text-textBase">
          Back
        </div>
        <div className="flex items-center">
          <TextInput />
        </div>
      </div>
    </div>
  );
};

export default AddCard;
