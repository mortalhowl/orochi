// src/utils/date.ts

import { format, parseISO, differenceInSeconds } from 'date-fns';
import { vi } from 'date-fns/locale';

/**
 * Định dạng một chuỗi ngày tháng hoặc đối tượng Date thành một chuỗi dễ đọc.
 * @param date - Ngày cần định dạng (string hoặc Date)
 * @param formatString - Chuỗi định dạng (mặc định: 'dd/MM/yyyy HH:mm')
 * @returns Chuỗi ngày tháng đã định dạng.
 * @example formatDateTime('2025-09-11T09:30:00') -> "11/09/2025 09:30"
 */
export const formatDateTime = (
  date: string | Date,
  formatString = 'dd/MM/yyyy HH:mm'
): string => {
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    return format(dateObj, formatString, { locale: vi });
  } catch (error) {
    console.error('Invalid date provided to formatDateTime:', date);
    return 'Ngày không hợp lệ';
  }
};

/**
 * Tính toán thời gian còn lại giữa thời điểm hiện tại và một ngày trong tương lai.
 * @param targetDate - Ngày đích (string hoặc Date)
 * @returns Object chứa ngày, giờ, phút, giây còn lại.
 */
export const getTimeRemaining = (targetDate: string | Date) => {
  const dateObj = typeof targetDate === 'string' ? parseISO(targetDate) : targetDate;
  const now = new Date();
  
  const totalSeconds = differenceInSeconds(dateObj, now);

  if (totalSeconds <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  const days = Math.floor(totalSeconds / (3600 * 24));
  const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = Math.floor(totalSeconds % 60);

  return { days, hours, minutes, seconds };
};