import { useState, useEffect } from 'react';
import { NewsArticle } from '@/services/newsService';

export const useBookmarks = () => {
  const [bookmarks, setBookmarks] = useState<NewsArticle[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('nexus_bookmarks');
    if (saved) {
      try {
        setBookmarks(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse bookmarks', e);
      }
    }
  }, []);

  const toggleBookmark = (article: NewsArticle) => {
    setBookmarks(prev => {
      const exists = prev.find(b => b.id === article.id);
      let next;
      if (exists) {
        next = prev.filter(b => b.id !== article.id);
      } else {
        next = [...prev, article];
      }
      localStorage.setItem('nexus_bookmarks', JSON.stringify(next));
      return next;
    });
  };

  const isBookmarked = (id: string) => bookmarks.some(b => b.id === id);

  return { bookmarks, toggleBookmark, isBookmarked };
};
