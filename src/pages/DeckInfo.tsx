import DeckPreview from "../components/DeckInfo/DeckPreview";
import DeckSettings from "../components/DeckInfo/DeckSettings";
import InfoPreview from "../components/DeckInfo/InfoPreview";
import NewCard from "../components/DeckInfo/NewCard";
import { PlusIcon } from "../components/icons";

const DeckInfo: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-[700px] h-full mt-[200px]">
        <div className="flex justify-between">
          <div className="text-2xl font-semibold text-textBase">CS 173</div>
          <DeckSettings />
        </div>

        <DeckPreview />

        <div className="flex justify-center align-middle item-center">
          <button className="mt-[40px] bg-surface1 w-[300px] py-[10px] rounded-lg">
            <span className="text-textBase">Study Now</span>
          </button>
        </div>

        <hr className="bg-surface1 my-[70px] h-0.5 border-0" />

        <div>
          <NewCard />
          <InfoPreview />
        </div>
      </div>
    </div>
  );
};

export default DeckInfo;
