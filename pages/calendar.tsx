import React, { useState } from 'react';
import Head from 'next/head';
import DefaultCalendar from '@/components/DefaultCalendar';
import '../styles/calendar.css';

const NotionCalendarPlaceholder = () => (
  <div className="notion-placeholder"><h2>Notion Calendar</h2><p>This is where the Notion-style calendar would be.</p></div>
);

const CalendarPage = () => {
  const [view, setView] = useState('default');

  return (
    <>
      <Head><title>Calendar - LISTO</title></Head>
      <div className="calendar-page-container">
        <div className="view-toggle">
          <button onClick={() => setView('default')} className={view === 'default' ? 'active' : ''}>Default</button>
          <button onClick={() => setView('notion')} className={view === 'notion' ? 'active' : ''}>Notion</button>
        </div>
        <div className="calendar-content">
          {view === 'default' ? <DefaultCalendar /> : <NotionCalendarPlaceholder />}
        </div>
      </div>
    </>
  );
};

export default CalendarPage;