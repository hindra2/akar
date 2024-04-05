import { PlusIcon } from "../icons";

const NewCard = () => {
  return (
    <div>
      <button
        className="w-full h-[50px] bg-surface0 rounded-lg mt-4 flex justify-center items-center px-[20px]"
        style={{ backgroundColor: "rgba(49, 50, 68, 0.3)" }}
      >
        <div className="fill-textBase">
          <PlusIcon />
        </div>
        <span className=" text-Subtext2 ml-[10px] font-semibold">New Card</span>
      </button>
    </div>
  );
};

export default NewCard;
