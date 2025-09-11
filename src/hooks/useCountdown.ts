// src/hooks/useCountdown.ts
import { useEffect, useState } from 'react';
import { getTimeRemaining } from '@/utils/date';

export const useCountdown = (targetDate: string | Date) => {
  const [timeRemaining, setTimeRemaining] = useState(getTimeRemaining(targetDate));

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining(getTimeRemaining(targetDate));
    }, 1000);

    // Dọn dẹp interval khi component unmount
    return () => clearInterval(interval);
  }, [targetDate]);

  return timeRemaining;
};