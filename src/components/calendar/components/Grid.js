import React from 'react';
import useCalendar from '../hooks/useCalendar';

const Grid = () => {
  const {
    weeks,
    formatDay,
    isCurrentMonth,
    isSelected,
    isToday,
    setSelectedDate
  } = useCalendar();

  return (
    <table className="w-full text-center text-sm">
      <thead>
        <tr className="text-base-content/70">
          <th>Mon</th>
          <th>Tue</th>
          <th>Wed</th>
          <th>Thu</th>
          <th>Fri</th>
          <th>Sat</th>
          <th>Sun</th>
        </tr>
      </thead>
      <tbody>
        {weeks.map((week, weekIndex) => (
          <tr key={weekIndex}>
            {week.map((date, dayIndex) => (
              <td 
                key={dayIndex}
                onClick={() => setSelectedDate(date)}
                className={`p-2 hover:bg-base-300 rounded cursor-pointer transition-colors
                  ${!isCurrentMonth(date) ? 'text-base-content/50' : ''}
                  ${isSelected(date) ? 'bg-primary text-primary-content' : ''}
                  ${isToday(date) ? 'border border-primary' : ''}
                  ${dayIndex === 5 || dayIndex === 6 ? 'text-error' : ''} // Weekend days
                `}
              >
                {formatDay(date)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Grid; 