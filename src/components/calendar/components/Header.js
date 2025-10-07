import React from 'react';
import useCalendar from '../hooks/useCalendar';

const Header = () => {
  const { currentDate, formatMonth } = useCalendar();

  return (
    <div className="flex items-center justify-between px-1">
      <div className="text-base font-semibold text-gray-900 lowercase">
        {formatMonth(currentDate)}
      </div>
    </div>
  );
};

export default Header; 