import React from 'react';
import Grid from './components/Grid';
import Header from './components/Header';
import Timeline from './components/Timeline';
import useCalendar from './hooks/useCalendar';

const Calendar = () => {
  const { visaArrivalDate, formatFullDate, getProcessingDays } = useCalendar();

  return (
    <div className="max-w-2xl">
      {/* Title with blue dot */}
      <div className="flex flex-col gap-1 mb-6">
        <div className="flex items-center gap-2">
          <h2 className="text-2xl font-bold mb-2">Get a Guaranteed Visa on</h2>
          in {getProcessingDays()} days
        </div>
        <div className="text-blue-600 text-sm ml-4">
          {formatFullDate(new Date())}
        </div>
      </div>

      <div className="flex gap-6">
        {/* Main calendar container */}
        <div className="relative flex-1">
          {/* Processing days label */}
          <div className="absolute -top-3 left-4 z-10">
            <div className="flex items-center gap-1.5">
              
              
            </div>
            <div className="ml-3 text-xs text-blue-600/90">
              
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-gray-100">
            {/* Delivery date and timeline toggle */}
            <div className="p-4 space-y-3">
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 rounded bg-blue-600/10">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-blue-600">
                    <path fillRule="evenodd" d="M12.516 2.17a.75.75 0 00-1.032 0 11.209 11.209 0 01-7.877 3.08.75.75 0 00-.722.515A12.74 12.74 0 002.25 9.75c0 5.942 4.064 10.933 9.563 12.348a.75.75 0 00.374 0c5.499-1.415 9.563-6.406 9.563-12.348 0-1.39-.223-2.73-.635-3.985a.75.75 0 00-.722-.516l-.143.001c-2.996 0-5.717-1.17-7.734-3.08zm3.094 8.016a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="text-lg font-medium text-gray-900">
                  {formatFullDate(visaArrivalDate)}
                </div>
              </div>
              
              <button className="flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-700 transition-colors">
                <span className="text-blue-600/90">View Timeline</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-blue-600/70">
                  <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                </svg>
              </button>
            </div>

            {/* Calendar content */}
            <div className="px-4 pb-4">
              <div className="bg-gray-50/50 rounded-xl p-4 space-y-4">
                <Header />
                <Grid />
                <Timeline />
              </div>
            </div>
          </div>
        </div>

        {/* Good to know section */}
        <div className="w-80">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <h3 className="text-base font-semibold text-gray-900 mb-4">GOOD TO KNOW</h3>
            
            <div className="space-y-4">
              {/* Nomad info */}
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-blue-600">
                    <path fillRule="evenodd" d="M12.516 2.17a.75.75 0 00-1.032 0 11.209 11.209 0 01-7.877 3.08.75.75 0 00-.722.515A12.74 12.74 0 002.25 9.75c0 5.942 4.064 10.933 9.563 12.348a.75.75 0 00.374 0c5.499-1.415 9.563-6.406 9.563-12.348 0-1.39-.223-2.73-.635-3.985a.75.75 0 00-.722-.516l-.143.001c-2.996 0-5.717-1.17-7.734-3.08zm3.094 8.016a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-900">Nomad on your Visa!</h4>
                  <p className="text-sm text-gray-600">Nomad works with the authorities to get your visa on time!</p>
                </div>
              </div>

              {/* Public Holidays */}
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-red-600">
                    <path d="M12.75 12.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM7.5 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM8.25 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM9.75 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM10.5 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM12.75 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM14.25 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM15 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM16.5 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM15 12.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM16.5 13.5a.75.75 0 100-1.5.75.75 0 000 1.5z" />
                    <path fillRule="evenodd" d="M6.75 2.25A.75.75 0 017.5 3v1.5h9V3A.75.75 0 0118 3v1.5h.75a3 3 0 013 3v11.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V7.5a3 3 0 013-3H6V3a.75.75 0 01.75-.75zm13.5 9a1.5 1.5 0 00-1.5-1.5H5.25a1.5 1.5 0 00-1.5 1.5v7.5a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5v-7.5z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-900">Public Holidays</h4>
                  <p className="text-sm text-gray-600">We take into account public holidays observed in the country you are traveling to.</p>
                </div>
              </div>

              {/* Weekends */}
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-yellow-50 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-yellow-600">
                    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-900">Weekends</h4>
                  <p className="text-sm text-gray-600">Embassies are shut on Saturday & Sunday. Your visa cannot be processed then.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar; 