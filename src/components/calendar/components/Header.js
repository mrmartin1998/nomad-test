import React from 'react';
import useCalendar from '../hooks/useCalendar';

const Header = () => {
  const { currentDate, nextMonth, prevMonth, formatMonth } = useCalendar();

  return (
    <div className="flex items-center justify-between">
      <div className="font-semibold">{formatMonth(currentDate)}</div>
      <div className="flex gap-2">
        <button 
          onClick={prevMonth}
          className="btn btn-sm btn-ghost"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>
        <button 
          onClick={nextMonth}
          className="btn btn-sm btn-ghost"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Header; 