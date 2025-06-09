import React from 'react';
import useCalendar from '../hooks/useCalendar';

const Grid = () => {
  const {
    weeks,
    formatDay,
    isCurrentMonth,
    isVisaArrival,
    isToday,
    isWeekendDay,
  } = useCalendar();

  const renderDateLabel = (date) => {
    if (isToday(date)) {
      return (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white px-2 py-0.5 rounded-sm border border-blue-100 z-10">
          <div className="text-[10px] font-medium text-blue-600 whitespace-nowrap">TODAY</div>
        </div>
      );
    }
    if (isVisaArrival(date)) {
      return (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white px-2 py-0.5 rounded-sm border border-blue-100 z-10">
          <div className="text-[10px] font-medium text-blue-600 whitespace-nowrap">VISA ARRIVAL</div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="px-2 py-1">
      <table className="w-full text-center border-separate border-spacing-2">
        <thead>
          <tr>
            <th className="p-1.5 text-xs font-medium text-gray-500">Mon</th>
            <th className="p-1.5 text-xs font-medium text-gray-500">Tue</th>
            <th className="p-1.5 text-xs font-medium text-gray-500">Wed</th>
            <th className="p-1.5 text-xs font-medium text-gray-500">Thu</th>
            <th className="p-1.5 text-xs font-medium text-gray-500">Fri</th>
            <th className="p-1.5 text-xs font-medium text-gray-500">Sat</th>
            <th className="p-1.5 text-xs font-medium text-gray-500">Sun</th>
          </tr>
        </thead>
        <tbody>
          {weeks.map((week, weekIndex) => (
            <tr key={weekIndex}>
              {week.map((date, dayIndex) => (
                <td 
                  key={dayIndex}
                  className="relative p-0"
                >
                  <div
                    className={`
                      relative w-full py-3 px-2
                      rounded-lg transition-all cursor-pointer
                      hover:bg-gray-50
                      ${!isCurrentMonth(date) ? 'text-gray-400' : 'text-gray-700'}
                      ${isVisaArrival(date) ? 'bg-blue-600 text-white hover:bg-blue-700' : ''}
                      ${isWeekendDay(date) ? 'bg-pink-50/50 hover:bg-pink-100/70' : ''}
                      ${isToday(date) ? 'border border-blue-100' : ''}
                      text-sm font-medium
                    `}
                  >
                    {renderDateLabel(date)}
                    {formatDay(date)}
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Grid; 