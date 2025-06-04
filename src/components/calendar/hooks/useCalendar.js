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
} from 'date-fns';
import { es } from 'date-fns/locale';

const useCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

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

  // Date state checkers
  const isCurrentMonth = (date) => isSameMonth(date, currentDate);
  const isSelected = (date) => selectedDate && isSameDay(date, selectedDate);
  const isToday = (date) => isSameDay(date, new Date());

  return {
    currentDate,
    selectedDate,
    setSelectedDate,
    weeks: getDaysInMonth(currentDate),
    nextMonth,
    prevMonth,
    formatDay,
    formatMonth,
    isCurrentMonth,
    isSelected,
    isToday,
  };
};

export default useCalendar; 