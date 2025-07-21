import React from 'react';
import Image from 'next/image';

// Mock data for events - you can replace this with data from an API
const eventsData = [
  {
    id: 'event-1',
    day: '26',
    month: 'Jul',
    year: '2025',
    title: 'Summer Art & Music Festival',
    time: '12:00PM - 10:00PM',
    location: 'Central Park',
    ticketUrl: '#',
  },
  {
    id: 'event-2',
    day: '02',
    month: 'Aug',
    year: '2025',
    title: 'Neighborhood Farmers Market',
    time: '09:00AM - 01:00PM',
    location: 'Town Square',
    ticketUrl: '#',
  },
  {
    id: 'event-3',
    day: '15',
    month: 'Aug',
    year: '2025',
    title: 'Outdoor Movie Night: Classic Cinema',
    time: '08:00PM - 11:00PM',
    location: 'Community Green',
    ticketUrl: '#',
  },
];

const EventsSection = () => {
  return (
    <section id="events-1928">
      <div className="cs-container">
        <div className="cs-image-group">
          <picture className="cs-picture">
            <source
              media="(max-width: 600px)"
              srcSet="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=800&auto=format&fit=crop"
            />
            <source
              media="(min-width: 601px)"
              srcSet="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=1200&auto=format&fit=crop"
            />
            <Image
              loading="lazy"
              decoding="async"
              src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=1200&auto=format&fit=crop"
              alt="Outdoor community event with string lights"
              width={522}
              height={680}
            />
          </picture>
          {/* Decorative Graphics */}
        </div>
        <div className="cs-content">
          <div className="cs-flex">
            <span className="cs-topper">Discover Your Community</span>
          <ul>
            {eventsData.map((event) => (
              <li key={event.id} className="cs-item">
                <span className="cs-date">
                  <strong>{event.day}</strong>
                  {event.month} {event.year}
                </span>
                <div className="cs-info">
                  <h3 className="cs-h3">{event.title}</h3>
                  <span className="cs-time">
                    <Image
                      className="cs-icon"
                      src="https://csimg.nyc3.cdn.digitaloceanspaces.com/Images/Icons/gold-clock.svg"
                      alt="icon"
                      width={24}
                      height={24}
                      loading="lazy"
                      decoding="async"
                    />
                    {event.time}
                  </span>
                </div>
                <a href={event.ticketUrl} className="cs-button-solid">
                  More Info
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
    </section>
  );
};

export default EventsSection;