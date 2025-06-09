import { useState } from 'react';
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  format,
  addMonths,
  subMonths,
  isSameMonth,
  isSameDay,
  isWeekend,
  addDays,
  differenceInDays,
  addBusinessDays,
} from 'date-fns';
import { es } from 'date-fns/locale';

const useCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const today = new Date();
  
  // Calculate visa arrival date (today + 6 business days)
  const visaArrivalDate = addBusinessDays(today, 6);

  // Get calendar days for current month view
  const getDaysInMonth = (date) => {
    const start = startOfWeek(startOfMonth(date));
    const end = endOfWeek(endOfMonth(date));
    
    const days = eachDayOfInterval({ start, end });
    
    // Group days into weeks
    const weeks = [];
    let week = [];
    
    days.forEach(day => {
      week.push(day);
      if (week.length === 7) {
        weeks.push(week);
        week = [];
      }
    });

    return weeks;
  };

  // Navigation handlers
  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));

  // Format handlers
  const formatDay = (date) => format(date, 'd');
  const formatMonth = (date) => format(date, 'MMMM yyyy', { locale: es });
  const formatFullDate = (date) => format(date, "d MMM yyyy 'at' HH:mm aa");

  // Date state checkers
  const isCurrentMonth = (date) => isSameMonth(date, currentDate);
  const isVisaArrival = (date) => isSameDay(date, visaArrivalDate);
  const isToday = (date) => isSameDay(date, today);
  const isWeekendDay = (date) => isWeekend(date);

  // Get processing days info
  const getProcessingDays = () => {
    return differenceInDays(visaArrivalDate, today);
  };

  return {
    currentDate,
    today,
    visaArrivalDate,
    weeks: getDaysInMonth(currentDate),
    nextMonth,
    prevMonth,
    formatDay,
    formatMonth,
    formatFullDate,
    isCurrentMonth,
    isVisaArrival,
    isToday,
    isWeekendDay,
    getProcessingDays,
  };
};

export default useCalendar; 