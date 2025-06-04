import React from 'react';
import Grid from './components/Grid';
import Header from './components/Header';
import Timeline from './components/Timeline';

const Calendar = () => {
  return (
    <div className="calendar-container">
      <Header />
      <Grid />
      <Timeline />
    </div>
  );
};

export default Calendar; 