const DatabaseSettings = () => {
  return (
    <div className="w-[700px]">
      <span className="text-5xl font-bold text-textBase">Database</span>
      <hr className="border-t border-textBase w-[700px] mt-[10px]" />
      <div className="ring-1 ring-accent ring-opacity-70 p-[10px] rounded-lg ml-[2px] bg-accent bg-opacity-5 text-textBase space-x-[10px] mt-[10px]">
        <span className="text-xl">Export Content:</span>
        <select className="bg-surface1 text-textBase px-2 py-1 rounded">
          <option value="deck1">All</option>
          <option value="deck1">Deck 1</option>
          <option value="deck2">Deck 2</option>
          <option value="deck3">Deck 3</option>
          <option value="deck4">Deck 4</option>
        </select>
      </div>
      <div className="w-full h-[400px]"></div>
    </div>
  );
};

export default DatabaseSettings;
