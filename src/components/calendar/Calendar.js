import React from 'react';
import Grid from './components/Grid';
import Header from './components/Header';
import Timeline from './components/Timeline';

const Calendar = () => {
  return (
    <div className="border rounded-lg p-4 bg-base-200">
      <div className="space-y-4">
        <Header />
        <Grid />
        <Timeline />
      </div>
    </div>
  );
};

export default Calendar; 