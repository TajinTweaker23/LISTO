import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const DefaultCalendar = () => {
  const [date, setDate] = useState(new Date());

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const renderCalendar = () => {
    const month = date.getMonth();
    const year = date.getFullYear();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();
    const days: JSX.Element[] = [];
    for (let i = firstDayOfMonth; i > 0; i--) {
      days.push(<div key={`prev-${i}`} className="day previous-month">{daysInPrevMonth - i + 1}</div>);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      const isToday = i === new Date().getDate() && month === new Date().getMonth() && year === new Date().getFullYear();
      days.push(<div key={`curr-${i}`} className={`day current-month ${isToday ? 'today' : ''}`}>{i}</div>);
    }
    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      days.push(<div key={`next-${i}`} className="day next-month">{i}</div>);
    }
    return days;
  };

  const handlePrevMonth = () => setDate(new Date(date.getFullYear(), date.getMonth() - 1, 1));
  const handleNextMonth = () => setDate(new Date(date.getFullYear(), date.getMonth() + 1, 1));

  const currentMonth = date.getMonth();
  const currentYear = date.getFullYear();

  return (
    <div className="device">
      <header>
        <div className="month-nav">
                    <button onClick={handlePrevMonth} title="Previous month" aria-label="Previous month"><ChevronLeft /></button>
          <span className="month">{months[currentMonth]} {currentYear}</span>
          <button onClick={handleNextMonth} title="Next month" aria-label="Next month"><ChevronRight /></button>
        </div>
        <div className="header-weekdays">
          <span>sun</span><span>mon</span><span>tue</span><span>wed</span><span>thu</span><span>fri</span><span>sat</span>
        </div>
      </header>
      <section>
        <div className="calendar">{renderCalendar()}</div>
      </section>
    </div>
  );
};

export default DefaultCalendar;