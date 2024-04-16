let timerState = {
  timeLeft: 1500,
  isActive: false,
  cycleType: "Time to Focus!",
  cycleCount: 0
};

const getTimerState = () => {
  return timerState;
};

const setTimerState = (newState) => {
  timerState = newState;
};

module.exports = { getTimerState, setTimerState };