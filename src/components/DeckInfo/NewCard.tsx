import { PlusIcon } from "../icons";

const NewCard = () => {
  return (
    <div>
      <button className="w-full h-[50px] bg-translucentSurface0 rounded-lg mt-4 flex justify-center items-center px-[20px] transition-all duration-300 ease-in-out hover:bg-surface0 hover:scale-[101%] cursor-pointer">
        <div className="fill-textBase">
          <PlusIcon />
        </div>
        <span className=" text-Subtext2 ml-[10px] font-semibold">New Card</span>
      </button>
    </div>
  );
};

export default NewCard;
