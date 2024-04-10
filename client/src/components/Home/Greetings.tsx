const getGreeting = (): string => {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return "Good Morning";
  if (hour >= 12 && hour < 18) return "Good Afternoon";
  if (hour >= 18 || hour < 5) return "Good Evening";
  return "Good Night";
};

const Greetings = () => {
  const greeting = getGreeting();
  return (
    <div>
      <span className="text-5xl font-semibold text-center text-textBase">
        {greeting}, John
      </span>
    </div>
  );
};

export default Greetings;
