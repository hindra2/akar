const DeckPreview = () => {
  return (
    <div>
      <div className="mt-[100px] flex justify-center">
        <div className="flex space-x-[30px]">
          <div
            className="h-[90px] w-[140px] rounded-lg flex flex-col justify-center items-center align-middle text-new ring-new ring-opacity-50 ring-1"
            style={{ backgroundColor: "rgba(203,166,247, 0.2)" }}
          >
            <span className="text-xl font-bold">3</span>
            <span className="text-lg">New</span>
          </div>
          <div
            className="h-[90px] w-[140px] text-xs rounded-lg flex flex-col justify-center items-center align-middle text-learning ring-learning ring-opacity-50 ring-1 px-[12px]"
            style={{ backgroundColor: "rgba(250, 179, 135, 0.2)" }}
          >
            <span className="text-xl font-bold">2</span>
            <span className="text-lg">Learning</span>
          </div>
          <div
            className="h-[90px] w-[140px] text-xs rounded-lg flex flex-col justify-center items-center align-middle text-review ring-review ring-opacity-50 ring-1 px-[12px]"
            style={{ backgroundColor: "rgba(166, 227, 161, 0.2)" }}
          >
            <span className="text-xl font-bold">9</span>
            <span className="text-lg">Review</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeckPreview;
