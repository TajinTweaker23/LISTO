import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import * as cheerio from 'cheerio';

// Simple in-memory cache to avoid scraping on every request
// In a production app, you might use Redis or a similar service
let cache = {
  data: null as any,
  timestamp: 0,
};

const CACHE_DURATION = 1000 * 60 * 60; // Cache for 1 hour

// --- Scraper for 1440 ---
async function scrape1440() {
  try {
    const { data } = await axios.get('https://join1440.com/');
    const $ = cheerio.load(data);
    const articles: any[] = [];
    // This selector targets the main story links in the latest edition
    $('div.post-content a[href*="/newsletter/"]').each((i, el) => {
      if (articles.length >= 3) return; // Get top 3
      const title = $(el).text().trim();
      const url = $(el).attr('href');
      if (title && url && !title.toLowerCase().includes('see sponsors')) {
        articles.push({ title, url, source: '1440' });
      }
    });
    return articles;
  } catch (error) {
    console.error('Error scraping 1440:', error);
    return [];
  }
}

// --- Scraper for Flipboard ---
async function scrapeFlipboard() {
  try {
    const { data } = await axios.get('https://flipboard.com/@news/the-daily-edition-3adc9613z');
    const $ = cheerio.load(data);
    const articles: any[] = [];
    // This selector targets articles within the "The Daily Edition" magazine
    $('article.post a.post-item-title').each((i, el) => {
      if (articles.length >= 3) return; // Get top 3
      const title = $(el).text().trim();
      const url = $(el).attr('href');
      if (title && url) {
        articles.push({ title, url, source: 'Flipboard' });
      }
    });
    return articles;
  } catch (error) {
    console.error('Error scraping Flipboard:', error);
    return [];
  }
}

// --- Placeholder for Substack ---
// NOTE: The Substack link you provided is a personalized feed.
// To scrape Substack, you must provide a link to a *specific, public* newsletter.
// Example: https://www.platformer.news/
async function scrapeSubstack(newsletterUrl: string) {
    if (!newsletterUrl) return [{ title: 'Select a public Substack to see articles here.', url: '#', source: 'Substack' }];
    // ... scraping logic for a specific Substack would go here
    return [];
}


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const now = Date.now();
  if (cache.data && (now - cache.timestamp < CACHE_DURATION)) {
    return res.status(200).json(cache.data);
  }

  try {
    // Fetch all sources in parallel
    const [articles1440, articlesFlipboard, articlesSubstack] = await Promise.all([
      scrape1440(),
      scrapeFlipboard(),
      scrapeSubstack('') // IMPORTANT: Replace with a public Substack URL
    ]);

    const allArticles = [...articles1440, ...articlesFlipboard, ...articlesSubstack];
    
    // Update cache
    cache = {
      data: allArticles,
      timestamp: now,
    };

    res.status(200).json(allArticles);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch news articles.' });
  }
}