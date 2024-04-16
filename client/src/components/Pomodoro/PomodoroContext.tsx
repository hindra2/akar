import React, { createContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

interface PomodoroState {
  timeLeft: number;
  isActive: boolean;
  cycleCount: number;
  cycleType: 'Time to Focus!' | 'Take a Short Break!' | 'Take a Long Break!';
}

interface PomodoroContextValue extends PomodoroState {
  updateTimer: () => void;
  toggle: () => void;
  nextCycle: () => void;
}

const PomodoroContext = createContext<PomodoroContextValue>({
  timeLeft: 1500,
  isActive: false,
  cycleCount: 0,
  cycleType: 'Time to Focus!',
  updateTimer: () => {},
  toggle: () => {},
  nextCycle: () => {},
});

interface PomodoroProviderProps {
  children: ReactNode;
}

const PomodoroProvider: React.FC<PomodoroProviderProps> = ({ children }) => {
  const [timeLeft, setTimeLeft] = useState<number>(1500);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [cycleCount, setCycleCount] = useState<number>(0);
  const [cycleType, setCycleType] = useState<'Time to Focus!' | 'Take a Short Break!' | 'Take a Long Break!'>('Time to Focus!');

  useEffect(() => {
    axios.get('http://localhost:5174/api/timer')
      .then(response => {
        const { timeLeft, isActive, cycleType, cycleCount } = response.data;
        setTimeLeft(timeLeft);
        setIsActive(isActive);
        setCycleType(cycleType);
        setCycleCount(cycleCount);
      })
      .catch(error => console.error('Error fetching timer state:', error));
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isActive) {
      interval = setInterval(() => {
        setTimeLeft(prevTimeLeft => prevTimeLeft - 1);
      }, 1000);
    } else if (interval) {
      clearInterval(interval);
    }
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isActive]);

  const updateTimer = () => {
    axios.post('http://localhost:5174/api/timer', { timeLeft, isActive, cycleType, cycleCount })
      .then(response => console.log(response.data.message))
      .catch(error => console.error('Error updating timer state:', error));
  };

  const toggle = () => {
    setIsActive(!isActive);
  };

  const nextCycle = () => {
    setIsActive(false);
    if (cycleType === 'Time to Focus!') {
      if (cycleCount === 3) {
        setCycleType('Take a Long Break!');
        setCycleCount(0);
        setTimeLeft(900);
      } else {
        setCycleType('Take a Short Break!');
        setCycleCount(cycleCount + 1);
        setTimeLeft(300);
      }
    } else {
      setCycleType('Time to Focus!');
      setTimeLeft(1500);
    }
  };

  const value = { timeLeft, isActive, cycleCount, cycleType, updateTimer, toggle, nextCycle };

  return <PomodoroContext.Provider value={value}>{children}</PomodoroContext.Provider>;
};

export { PomodoroProvider, PomodoroContext };
