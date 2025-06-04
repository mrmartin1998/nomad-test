import { useState } from 'react';

const useCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  
  // Calendar logic will be implemented here
  
  return {
    selectedDate,
    setSelectedDate,
  };
};

export default useCalendar; 