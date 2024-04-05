import { SettingsIcon } from "../icons";

const DeckSettings = () => {
  return (
    <div>
      <button className="w-[140px] h-[40px] bg-surface0 rounded-lg flex justify-center items-center">
        <div className="fill-textBase">
          <SettingsIcon />
        </div>
        <span className="text-textBase ml-[10px] font-semibold">Settings</span>
      </button>
    </div>
  );
};

export default DeckSettings;
