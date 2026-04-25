# Nexus Crypto Hub - Technical Documentation

## 1. Project Overview
Nexus Crypto Hub is an institutional-grade decentralized finance (DeFi) and energy market intelligence terminal. It bridges the gap between complex blockchain data and high-velocity decision-making through a polished, "Quantum-inspired" user interface.

**Project Name:** Nexus Crypto Hub  
**Core Motto:** Currency Reimagined.  

---

## 2. Technical Stack
The application is built using a modern, full-stack React architecture optimized for performance and real-time data streaming.

### Core Frameworks
- **Frontend:** React 19 + TypeScript
- **Build Tool:** Vite
- **Server:** Express.js (used as an API proxy for secure data fetching)
- **Routing:** React Router 7

### UI & Styling
- **Styling:** Tailwind CSS 4 (using `@import "tailwindcss"`)
- **Animations:** Motion (Framer Motion) for high-fidelity transitions
- **Icons:** Lucide React
- **Typography:** Geist Variable (Sans & Mono)

### State & Data Handling
- **API Client:** Axios
- **Persistence:** Browser LocalStorage (for Intelligence Archive)
- **Data Refreshing:** Adaptive polling (Auto-syncing intelligence vectors)

---

## 3. Core Features

### A. Alpha Terminal (Home)
- **Global Markets:** Real-time price tracking of top crypto assets via CoinGecko.
- **Conversion Engine:** Advanced crypto-to-fiat bridge for instant valuation.
- **Energy Pipeline:** Cross-sector intelligence mapping global crude and gas vectors.

### B. Market Pulse (Pulse)
- **High-Frequency Stream:** Real-time data feed focusing on top market cap assets.
- **Quantum Metrics:** Confidence Matching (CFM) scores and volatility indicators.
- **Network Status:** Live node monitoring simulation and block height tracking.

### C. Intelligence Hub (News)
- **Vector Search:** Real-time News API integration with search capabilities.
- **Sentiment Analysis:** Client-side NLP logic that classifies news as **Bullish**, **Bearish**, or **Neutral**.
- **CFM Scoring:** Algorithmic relevance scoring (80-99%) for every intelligence vector.
- **Institutional Reports:** Deep-scan modals with summarized content and source verification.

### D. Intelligence Archive (Saved)
- **Persistent Archive:** User-curated intelligence library saved via unique URL IDs.
- **Archive Management:** High-performance deletion and bulk management tools.
- **Mobile Optimized:** Full responsive support with touch-first controls and condensed sentiment badges.

### E. Portfolio Terminal
- **Asset Simulation:** Simplified institutional ledger for tracking cross-chain holdings.
- **Verification:** Shield-Check protocol for verified asset positions.

---

## 4. API & Integration Details

### Financial Data
- **Provider:** [CoinGecko API](https://www.coingecko.com/en/api)
- **Endpoints Used:** `/coins/markets`
- **Refresh rate:** 30 seconds

### Intelligence Data
- **Provider:** [NewsAPI](https://newsapi.org/)
- **Endpoints Used:** `/v2/everything` (via Express Proxy)
- **Refresh rate:** 60 seconds (Auto-streaming)

---

## 5. Design System

### Color Palette
- **Primary (Nexus Orange):** `#ff771c` - Used for primary actions, highlights, and branding.
- **Surface (Quantum Dark):** `#161311` - Primary background for depth and focus.
- **Accent (Gold):** `amber-500` - Used for energy sector and high-impact alerts.
- **Status (Semantic):** 
  - Green (`#22c55e`): Positive Sentiment / Bullish
  - Red (`#ef4444`): Negative Sentiment / Bearish
  - Zinc (`#a1a1aa`): Neutral / System Data

### Visual Language
- **Glassmorphism:** Heavy use of `backdrop-blur-xl` and `white/5` borders for a futuristic layers feel.
- **Micro-interactions:** Staggered list entrances and quantum pulse animations on active data nodes.
- **Typography:** Bold `black` (900 weight) headings with high letter-spacing for institutional authority.

---

## 6. Directory Structure
- `/src/components/analysis`: Technical indicators and Market Pulse.
- `/src/components/layout`: Core navigation, Hero, and News Hub.
- `/src/components/news`: Archive and Saved Vectors logic.
- `/src/services`: Integration layers for APIs.
- `/src/hooks`: Custom logic like `useBookmarks`.

---

## 7. Developer Notes
- **Deployment:** Optimized for Cloud Run and production-ready node environments.
- **Security:** API keys are managed server-side; client-side bookmarks are isolated to local storage.
- **Responsiveness:** Fluid grid system scaling from 320px (mobile) to 4K ultra-wide monitors.
