import React from 'react';

const Grid = () => {
  // This is temporary static data - we'll make it dynamic later
  const weeks = [
    [26, 27, 28, 29, 30, 31, 1],
    [2, 3, 4, 5, 6, 7, 8],
    [9, 10, 11, 12, 13, 14, 15],
    [16, 17, 18, 19, 20, 21, 22],
    [23, 24, 25, 26, 27, 28, 29],
    [30, 1, 2, 3, 4, 5, 6],
  ];

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
            {week.map((day, dayIndex) => (
              <td 
                key={dayIndex}
                className={`p-2 hover:bg-base-300 rounded cursor-pointer transition-colors
                  ${day === 5 ? 'bg-primary text-primary-content' : ''} // Example: highlighting day 5
                  ${(weekIndex === 0 || weekIndex === 5) && day > 7 ? 'text-base-content/50' : ''} // Dimming days from adjacent months
                `}
              >
                {day}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Grid; 