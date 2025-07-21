import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const DefaultCalendar = () => {
  const [date, setDate] = useState(new Date());

  const renderCalendar = () => {
    const month = date.getMonth();
    const year = date.getFullYear();
    
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();

    const days = [];

    // Days from previous month
    for (let i = firstDayOfMonth; i > 0; i--) {
      days.push(<div key={`prev-${i}`} className="day previous-month">{daysInPrevMonth - i + 1}</div>);
    }

    // Days from current month
    for (let i = 1; i <= daysInMonth; i++) {
      const isToday = i === new Date().getDate() && month === new Date().getMonth() && year === new Date().getFullYear();
      days.push(<div key={`curr-${i}`} className={`day current-month ${isToday ? 'today' : ''}`}>{i}</div>);
    }

    // Days from next month
    const remainingDays = 42 - days.length; // 42 cells for a 6x7 grid
    for (let i = 1; i <= remainingDays; i++) {
      days.push(<div key={`next-${i}`} className="day next-month">{i}</div>);
    }
    
    return days;
  };

  const handlePrevMonth = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() + 1, 1));
  };

  const monthName = date.toLocaleString('default', { month: 'long' });
  const year = date.getFullYear();

  return (
    <div className="device">
      <header>
        <div className="header-title">
          <h1>Calendar</h1>
        </div>
        <div className="month-nav">
          <button onClick={handlePrevMonth}><ChevronLeft /></button>
          <h2 className="month">{monthName} {year}</h2>
          <button onClick={handleNextMonth}><ChevronRight /></button>
        </div>
        <div className="header-weekdays">
          <span>sun</span>
          <span>mon</span>
          <span>tue</span>
          <span>wed</span>
          <span>thu</span>
          <span>fri</span>
          <span>sat</span>
        </div>
      </header>
      <section>
        <div className="calendar">
          {renderCalendar()}
        </div>
        <div className="calendar-labels">
            <span className="label vacation">Vacation</span>
            <span className="label walk">Walk</span>
            <span className="label fishing">Fishing</span>
            <span className="label weekend">Weekend</span>
        </div>
      </section>
    </div>
  );
};

export default DefaultCalendar;