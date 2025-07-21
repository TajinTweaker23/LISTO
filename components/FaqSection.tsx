import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronDown, Plus } from 'lucide-react'; // <-- Import icons

// Define the structure for our FAQ data
const faqData = {
  categories: [
    { id: 'one', name: 'All available starter feature' },
    { id: 'two', name: 'Home service 24/7' },
    { id: 'three', name: 'Customer agent service' },
    { id: 'four', name: 'Professional Service' },
    { id: 'five', name: '2 dedicated consultant' },
  ],
  questions: {
    one: [
      { q: 'What is the best way to start investing?', a: 'The best way to start is by defining your financial goals, understanding your risk tolerance, and then choosing a diversified portfolio of low-cost index funds or ETFs. Our app can guide you through this process step-by-step.' },
      { q: 'How can I improve my credit score?', a: 'To improve your credit score, focus on paying bills on time, keeping credit card balances low, and avoiding opening too many new accounts at once. Regularly check your credit report for errors.' },
    ],
    two: [
      { q: 'What are the tax implications of investing?', a: 'Tax implications vary based on the type of investment and how long you hold it. Generally, long-term capital gains are taxed at a lower rate than short-term gains. We recommend consulting with a tax professional for personalized advice.' },
      { q: 'What is the difference between a traditional IRA and a Roth IRA?', a: 'A Traditional IRA offers tax-deductible contributions and taxes on withdrawals in retirement. A Roth IRA uses after-tax contributions, allowing for tax-free withdrawals in retirement.' },
    ],
    // Add more questions for categories 'three', 'four', 'five' as needed
  },
};

const FaqSection = () => {
  const [activeFilter, setActiveFilter] = useState('one');
  const [openItem, setOpenItem] = useState(0); // Default to the first item being open

  const handleFilterClick = (filter) => {
    setActiveFilter(filter);
    setOpenItem(0); // Reset to the first item when changing categories
  };

  const handleItemClick = (index) => {
    setOpenItem(openItem === index ? null : index); // Toggle open/closed
  };

  return (
    <section id="faq-1720">
      <div className="cs-container">
        <div className="cs-content">
          <span className="cs-topper">Faq</span>
          <h2 className="cs-title">Frequently Asked Questions</h2>
        </div>
        <div className="cs-flex-group">
          <div className="cs-button-group">
            <div className="cs-flex">
              {faqData.categories.map((cat) => (
                <button
                  key={cat.id}
                  className={`cs-option ${activeFilter === cat.id ? 'cs-active' : ''}`}
                  onClick={() => handleFilterClick(cat.id)}
                  data-filter={cat.id}
                >
                  <Plus className="cs-icon" aria-hidden="true" />
                  {cat.name}
                </button>
              ))}
            </div>
            <picture className="cs-picture">
              <source media="(max-width: 600px)" srcSet="https://images.unsplash.com/photo-1497032628192-86f99d791ba7?q=80&w=800&auto=format&fit=crop" />
              <source media="(min-width: 601px)" srcSet="https://images.unsplash.com/photo-1497032628192-86f99d791ba7?q=80&w=1200&auto=format&fit=crop" />
              <Image loading="lazy" decoding="async" src="https://images.unsplash.com/photo-1497032628192-86f99d791ba7?q=80&w=1200&auto=format&fit=crop" alt="A stylish and creative workspace" width={353} height={493} />
            </picture>
          </div>
          <div className="cs-wrapper">
            {Object.entries(faqData.questions).map(([category, questions]) => (
              <ul key={category} className={`cs-faq-group ${activeFilter === category ? '' : 'cs-hidden'}`} data-category={category}>
                {questions.map((item, index) => (
                  <li key={index} className={`cs-faq-item ${openItem === index ? 'cs-active' : ''}`}>
                    <button className="cs-button" onClick={() => handleItemClick(index)}>
                      <span className="cs-button-text">{item.q}</span>
                      <ChevronDown className="cs-chevron" aria-hidden="true" />
                    </button>
                    <p className="cs-item-p">{item.a}</p>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;