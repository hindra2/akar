const days = [
  { name: "Mon", fill: false },
  { name: "Tue", fill: true },
  { name: "Wed", fill: false },
  { name: "Thu", fill: true },
  { name: "Fri", fill: true },
  { name: "Sat", fill: false },
  { name: "Sun", fill: true },
];

const WeekStreak = () => {
  return (
    <div className="flex flex-col">
      <span className="font-semibold text-textBase">This Week</span>
      <div className="mt-[20px] flex space-x-[40px]">
        {days.map((day) => (
          <div
            key={day.name}
            className="flex flex-col items-center justify-center mx-2"
          >
            <div
              className={`h-[35px] w-[35px] rounded-full ${
                day.fill
                  ? "bg-accent bg-opacity-30 ring-1 ring-accent"
                  : "ring-1 ring-accent"
              }`}
            ></div>
            <span className="text-sm text-textBase mt-[5px]">{day.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeekStreak;
