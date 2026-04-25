import axios from 'axios';

const NEWS_API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const NEWS_API_BASE = 'https://newsapi.org/v2';

export interface NewsArticle {
  id: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  author?: string;
  source: {
    name: string;
  };
  content?: string;
  category?: string;
  impact?: 'High' | 'Medium' | 'Low' | 'Critical';
  sentiment?: 'positive' | 'negative' | 'neutral';
  relevanceScore?: number;
}

const analyzeSentiment = (text: string): 'positive' | 'negative' | 'neutral' => {
  const positiveMarkers = ['surge', 'gain', 'growth', 'bullish', 'peak', 'high', 'win', 'rally', 'success', 'potential', 'boost', 'upgrade'];
  const negativeMarkers = ['drop', 'fall', 'slump', 'bearish', 'risk', 'crisis', 'danger', 'low', 'loss', 'crash', 'correction', 'impact'];
  
  const lowerText = text.toLowerCase();
  const posCount = positiveMarkers.filter(m => lowerText.includes(m)).length;
  const negCount = negativeMarkers.filter(m => lowerText.includes(m)).length;

  if (posCount > negCount) return 'positive';
  if (negCount > posCount) return 'negative';
  return 'neutral';
};

export const fetchFinancialNews = async (query: string = 'crypto bitcoin ethereum'): Promise<NewsArticle[]> => {
  try {
    const response = await axios.get('/api/intellifeed', {
      params: {
        q: query,
        pageSize: 12
      },
      timeout: 10000 // 10s timeout
    });

    if (!response.data || !response.data.articles || response.data.articles.length === 0) {
      if (response.data?.status === 'error') {
        console.warn('News proxy returned error:', response.data.message);
      }
      return [];
    }

    return response.data.articles.map((article: any) => ({
      ...article,
      id: btoa(article.url || Math.random().toString()).substring(0, 16),
      category: query.includes('oil') || query.includes('energy') ? 'Energy' : 'Market',
      impact: Math.random() > 0.7 ? 'High' : 'Medium',
      sentiment: analyzeSentiment(`${article.title} ${article.description}`),
      relevanceScore: Math.floor(Math.random() * 20) + 80
    }));
  } catch (error: any) {
    // If it's a network error, it might be adblockers or severe connection issues
    if (error.message === 'Network Error') {
      console.error('Critical Network Error in News Service. Possible adblocker interference or server unavailability.');
    } else {
      console.error('Error fetching news:', error.message || error);
    }
    return [];
  }
};
