import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

// Fix for bundled server: esbuild handles import.meta.url differently
let __dirname: string;
try {
  const __filename = fileURLToPath(import.meta.url);
  __dirname = path.dirname(__filename);
} catch (e) {
  // Fallback for CJS environment
  __dirname = process.cwd();
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware
  app.use(express.json());

  // API Route for News Proxy
  app.get('/api/intellifeed', async (req, res) => {
    const { q, pageSize = 10 } = req.query;
    const apiKey = process.env.NEWS_API_KEY || process.env.VITE_NEWS_API_KEY;

    if (!apiKey) {
      console.warn('News API Key not configured. Returning empty results.');
      return res.json({ status: 'ok', totalResults: 0, articles: [] });
    }

    try {
      const response = await axios.get('https://newsapi.org/v2/everything', {
        params: {
          q,
          pageSize,
          sortBy: 'publishedAt',
          language: 'en',
          apiKey: apiKey,
        },
        headers: {
          'User-Agent': 'NexusCryptoHub/1.0',
          'Accept': 'application/json'
        },
        timeout: 8000 // 8s timeout for external call
      });
      res.json(response.data);
    } catch (error: any) {
      const errorMsg = error.response?.data?.message || error.message;
      console.error('News Proxy error:', errorMsg);
      // Return 200 with error status to allow frontend to handle it cleanly without crashing
      res.json({ 
        status: 'error', 
        totalResults: 0, 
        articles: [], 
        message: errorMsg,
        code: error.response?.data?.code || 'FETCH_ERROR'
      });
    }
  });

  // API Route for Yahoo Finance Proxy
  app.get('/api/macro', async (req, res) => {
    const { symbol, interval = '1h', range = '1d' } = req.query;
    if (!symbol) return res.status(400).json({ error: 'Symbol required' });

    try {
      const response = await axios.get(`https://query1.finance.yahoo.com/v8/finance/chart/${symbol}`, {
        params: { interval, range },
        headers: { 'User-Agent': 'Mozilla/5.0' }
      });
      res.json(response.data);
    } catch (error: any) {
      console.error(`Macro proxy error for ${symbol}:`, error.message);
      res.status(500).json({ error: 'Failed to fetch macro data' });
    }
  });

  // Health check
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
