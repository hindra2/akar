const GeneralSettings = () => {
  return (
    <div className="w-[700px]">
      <span className="text-5xl font-bold text-textBase">General</span>
      <hr className="border-t border-textBase w-full mt-[10px]" />
      <div className="ring-1 ring-accent ring-opacity-70 p-[10px] rounded-lg ml-[2px] bg-accent bg-opacity-5 text-textBase mt-[20px] flex flex-col space-y-2">
        <div className="flex items-center space-x-2">
          <label className="switch">
            <input type="checkbox" value="" className="sr-only peer" />
            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none  rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-accent"></div>
            <span className="switch-slider"></span>
          </label>
          <label htmlFor="zenMode" className="text-textBase ml-2">
            Zen Mode
          </label>
        </div>
        <div className="flex items-center space-x-2">
          <label className="switch">
            <input type="checkbox" value="" className="sr-only peer" />
            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none  rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-accent"></div>
            <span className="switch-slider"></span>
          </label>
          <label htmlFor="showShortcuts" className="text-textBase ml-2">
            Show Shortcuts
          </label>
        </div>
      </div>
      <div className="w-full h-[400px]"></div>
    </div>
  );
};

export default GeneralSettings;
