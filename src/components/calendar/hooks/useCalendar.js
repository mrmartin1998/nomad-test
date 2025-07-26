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
  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const today = new Date();
  
  // Calculate visa arrival date (today + 5 business days)
  const visaArrivalDate = addBusinessDays(today, 5);

  // Get calendar days for current month view
  const getDaysInMonth = (date) => {
    // Start the week on Monday (1) instead of Sunday (0)
    const start = startOfWeek(startOfMonth(date), { weekStartsOn: 1 });
    const end = endOfWeek(endOfMonth(date), { weekStartsOn: 1 });
    
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
  const formatFullDate = (date) => format(date, "d MMM yyyy", { locale: es });

  // Date state checkers
  const isCurrentMonth = (date) => isSameMonth(date, currentDate);
  const isVisaArrival = (date) => isSameDay(date, visaArrivalDate);
  const isToday = (date) => isSameDay(date, today);
  const isWeekendDay = (date) => {
    const day = date.getDay();
    return day === 6 || day === 0; // 6 is Saturday, 0 is Sunday
  };

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