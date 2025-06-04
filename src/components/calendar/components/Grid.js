import React from 'react';

const Grid = () => {
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
        <tr>
          <td className="p-2">26</td>
          <td className="p-2">27</td>
          <td className="p-2">28</td>
          <td className="p-2">29</td>
          <td className="p-2">30</td>
          <td className="p-2">31</td>
          <td className="p-2">1</td>
        </tr>
        {/* We'll add more rows dynamically later */}
      </tbody>
    </table>
  );
};

export default Grid; 