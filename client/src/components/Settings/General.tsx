const GeneralSettings = () => {
  return (
    <div className="w-[700px]">
      <span className="text-5xl font-bold text-textBase">General</span>
      <hr className="border-t border-textBase w-full mt-[10px]" />
      <div className="ring-1 ring-accent ring-opacity-70 p-[10px] rounded-lg ml-[2px] bg-accent bg-opacity-5 text-textBase space-x-[10px] mt-[20px] flex flex-col">
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="zenMode"
            className="accent form-checkbox h-5 w-5 text-accent border-accent rounded focus:ring-accent"
          />
          <label htmlFor="zenMode" className="text-textBase">
            Zen Mode
          </label>
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="showShortcuts"
            className="accent form-checkbox h-5 w-5 text-accent border-accent rounded focus:ring-accent"
          />
          <label htmlFor="showShortcuts" className="text-textBase">
            Show Shortcuts
          </label>
        </div>
      </div>
      <div className="w-full h-[400px]"></div>
    </div>
  );
};

export default GeneralSettings;
