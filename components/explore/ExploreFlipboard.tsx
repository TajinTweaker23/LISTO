import React, { useState, useEffect, useRef } from 'react';
import { Flipper, Flipped } from 'react-flip-toolkit';
import classnames from 'classnames';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ArrowRight, Rss, Zap, Wind } from 'lucide-react';

// Mock RSS Parser - in a real app, use a library like 'rss-parser'
const parseRSS = async (url: string) => {
  console.log(`Fetching RSS from: ${url}`);
  // This is a mock. In a real app, you'd fetch and parse the RSS feed.
  // Returning a set of mock articles.
  return {
    items: [
      { title: 'The Future of UI Design', link: '#', contentSnippet: 'Exploring the latest trends in user interface design, from neumorphism to glassmorphism.', isoDate: new Date().toISOString(), source: 'Design Weekly' },
      { title: 'AI in Creative Workflows', link: '#', contentSnippet: 'How artificial intelligence is revolutionizing the way designers and artists create.', isoDate: new Date().toISOString(), source: 'TechCrunch' },
      { title: 'Sustainable Web Design', link: '#', contentSnippet: 'Creating beautiful websites with a minimal carbon footprint.', isoDate: new Date().toISOString(), source: 'A List Apart' },
      { title: 'The Psychology of Color in Branding', link: '#', contentSnippet: 'How color choices impact consumer perception and brand identity.', isoDate: new Date().toISOString(), source: 'Smashing Magazine' },
      { title: 'Mastering CSS Grid', link: '#', contentSnippet: 'A deep dive into the most powerful layout system in CSS.', isoDate: new Date().toISOString(), source: 'CSS-Tricks' },
      { title: 'Neurodiversity in Tech', link: '#', contentSnippet: 'Building inclusive products for all minds.', isoDate: new Date().toISOString(), source: 'UX Collective' },
    ]
  };
};

const defaultFeeds = [
  { name: 'Design', url: 'https://rss.dribbble.com/shots/popular', icon: <Zap className="w-4 h-4" /> },
  { name: 'Tech', url: 'https://techcrunch.com/feed/', icon: <Rss className="w-4 h-4" /> },
  { name: 'Wellness', url: 'https://www.mindful.org/feed/', icon: <Wind className="w-4 h-4" /> },
];

interface Article {
  title: string;
  link: string;
  contentSnippet: string;
  isoDate: string;
  source: string;
}

const ExploreFlipboard: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [filter, setFilter] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [activeFeed, setActiveFeed] = useState(defaultFeeds[0].name);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      setIsLoading(true);
      const feed = defaultFeeds.find(f => f.name === activeFeed);
      if (feed) {
        try {
          const parsedFeed = await parseRSS(feed.url);
          setArticles(parsedFeed.items);
        } catch (error) {
          console.error("Failed to fetch or parse RSS feed:", error);
          // In case of error, use mock data
          const mockFeed = await parseRSS('');
          setArticles(mockFeed.items);
        }
      }
      setIsLoading(false);
    };

    fetchArticles();
  }, [activeFeed]);

  const filteredArticles = articles.filter(article =>
    article.title.toLowerCase().includes(filter.toLowerCase())
  );

  const toggleExpanded = (id: string) => {
    setExpandedId(prevId => (prevId === id ? null : id));
  };

  return (
    <div className="p-4 md:p-8 bg-gray-100 dark:bg-gray-900 min-h-screen font-sans text-gray-800 dark:text-gray-200">
      <header className="mb-8">
        <h1 className="text-4xl font-bold tracking-tighter bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 bg-clip-text text-transparent">Explore</h1>
        <p className="text-lg text-gray-500 dark:text-gray-400 mt-1">Your daily digest of inspiration and knowledge.</p>
      </header>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-grow">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Filter articles..."
            value={filter}
            onChange={e => setFilter(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-full focus:ring-2 focus:ring-purple-500 outline-none transition-all"
          />
        </div>
        <div className="flex items-center gap-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-full p-1">
          {defaultFeeds.map(feed => (
            <button
              key={feed.name}
              onClick={() => setActiveFeed(feed.name)}
              className={classnames(
                "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-colors",
                {
                  'bg-purple-600 text-white shadow': activeFeed === feed.name,
                  'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700': activeFeed !== feed.name,
                }
              )}
            >
              {feed.icon}
              {feed.name}
            </button>
          ))}
        </div>
      </div>

      <Flipper flipKey={`${expandedId}-${filter}-${activeFeed}`} spring="gentle" staggerConfig={{
        default: {
          reverse: expandedId !== null,
          speed: 0.5,
        }
      }}>
        <div ref={containerRef} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <AnimatePresence>
            {isLoading ? (
              Array.from({ length: 8 }).map((_, i) => (
                <motion.div key={`loader-${i}`} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 animate-pulse">
                  <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                </motion.div>
              ))
            ) : (
              filteredArticles.map((article, index) => {
                const isExpanded = expandedId === article.title;
                return (
                  <Flipped key={article.title} flipId={article.title}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ delay: index * 0.05 }}
                      className={classnames("cursor-pointer", {
                        'col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4': isExpanded,
                      })}
                      onClick={() => toggleExpanded(article.title)}
                    >
                      {isExpanded ? (
                        <ExpandedArticle article={article} onClose={() => setExpandedId(null)} />
                      ) : (
                        <SummarizedArticle article={article} />
                      )}
                    </motion.div>
                  </Flipped>
                );
              })
            )}
          </AnimatePresence>
        </div>
      </Flipper>
    </div>
  );
};

const SummarizedArticle: React.FC<{ article: Article }> = ({ article }) => (
  <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden h-full flex flex-col">
    <div className="p-6 flex-grow">
      <p className="text-sm text-purple-500 font-semibold mb-2">{article.source}</p>
      <h2 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">{article.title}</h2>
      <p className="text-gray-600 dark:text-gray-400 text-sm flex-grow">{article.contentSnippet}</p>
    </div>
    <div className="px-6 pb-4 mt-4">
      <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
        <span>{new Date(article.isoDate).toLocaleDateString()}</span>
        <div className="flex items-center gap-1 hover:text-purple-500">
          Read more <ArrowRight className="w-3 h-3" />
        </div>
      </div>
    </div>
  </div>
);

const ExpandedArticle: React.FC<{ article: Article; onClose: () => void }> = ({ article, onClose }) => (
  <Flipped flipId={`${article.title}-content`}>
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 relative">
      <button onClick={(e) => { e.stopPropagation(); onClose(); }} className="absolute top-4 right-4 p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors" aria-label="Close article">
        <X className="w-5 h-5" />
      </button>
      <p className="text-base text-purple-500 font-semibold mb-2">{article.source}</p>
      <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">{article.title}</h1>
      <p className="text-gray-700 dark:text-gray-300 mb-6">{article.contentSnippet}...</p>
      <a href={article.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-full font-semibold hover:bg-purple-700 transition-colors">
        Read Full Article <ArrowRight className="w-4 h-4" />
      </a>
      <p className="text-xs text-gray-500 dark:text-gray-400 mt-6">Published on: {new Date(article.isoDate).toLocaleString()}</p>
    </div>
  </Flipped>
);

export default ExploreFlipboard;
