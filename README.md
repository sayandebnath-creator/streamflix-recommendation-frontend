# StreamFlix Frontend

The frontend for **StreamFlix**, an AI-powered movie discovery and recommendation platform.

Built with **Next.js 15, TypeScript, Tailwind CSS, and TanStack Query**, it provides a responsive cinematic interface for browsing movies, semantic search, movie details, and content-based recommendations.

## Features

- Semantic movie search using natural-language queries
- Paginated movie catalog
- Movie details and recommendations
- Debounced search
- Responsive movie grid
- Loading, error, and empty states
- TMDB poster integration with fallbacks
- TanStack Query caching and server-state management
- Type-safe API layer
- Smooth UI animations
- Keyboard shortcut for search (`⌘ K` / `Ctrl K`)

## Tech Stack

| Technology | Purpose |
|---|---|
| Next.js 15 | Framework and App Router |
| TypeScript | Type safety |
| Tailwind CSS | Styling |
| TanStack Query | Server-state management |
| Axios | API communication |
| Framer Motion | UI animations |
| Lucide React | Icons |
| shadcn/ui | Reusable UI components |

---

# Architecture

The frontend follows a layered architecture where UI components, data fetching, API communication, and types are separated.

```bash
┌─────────────────────────────────────┐
│              Browser                │
│                                     │
│   Pages + Components + User Input   │
└──────────────────┬──────────────────┘
                   │
                   ▼
┌─────────────────────────────────────┐
│          TanStack Query             │
│                                     │
│  Caching • Loading • Error • Fetch  │
└──────────────────┬──────────────────┘
                   │
                   ▼
┌─────────────────────────────────────┐
│           Service Layer             │
│                                     │
│         movieService.ts             │
└──────────────────┬──────────────────┘
                   │
                   ▼
┌─────────────────────────────────────┐
│            Axios Client             │
│                                     │
│       Centralized API Client        │
└──────────────────┬──────────────────┘
                   │
                   │ HTTP
                   ▼
┌─────────────────────────────────────┐
│            Go Backend               │
└─────────────────────────────────────┘
```

The frontend communicates only with the **Go API**. The Go backend handles PostgreSQL, `pgvector`, recommendations, and the embedding service.

```bash
Browser
   │
   ▼
Next.js Frontend
   │
   ▼
Go REST API
   │
   ├───────────────► PostgreSQL + pgvector
   │
   └───────────────► Embedding Service
```

---

# Project Structure

```bash
frontend/
├── app/
│   ├── page.tsx                 # Home / movie catalog
│   ├── layout.tsx               # Root layout
│   ├── globals.css              # Global styles
│   └── movies/
│       └── [id]/
│           └── page.tsx         # Movie details
│
├── components/
│   ├── layout/
│   │   └── Navbar.tsx
│   ├── movies/
│   │   ├── MovieCard.tsx
│   │   ├── MovieGrid.tsx
│   │   └── MovieSearch.tsx
│   └── ui/                      # Reusable UI components
│
├── lib/
│   ├── api/
│   │   └── axios.ts             # API client
│   ├── hooks/
│   │   ├── useMovies.ts
│   │   ├── useMovie.ts
│   │   ├── useMovieSearch.ts
│   │   └── useRecommendations.ts
│   └── providers.tsx            # TanStack Query provider
│
├── services/
│   └── movieService.ts          # Backend API operations
│
├── types/
│   └── movie.ts                 # TypeScript models
│
└── utils/
    └── image.ts                 # Poster URL utilities
```

---

# Data Flow

## Movie Catalog

```bash
Home Page
   │
   ▼
useMovies(page)
   │
   ▼
movieService.getMovies()
   │
   ▼
GET /movies?page=1&limit=20
   │
   ▼
Go Backend
   │
   ▼
Movie Grid
```

The catalog uses **server-side pagination** so the browser does not load the entire movie dataset at once.

## Semantic Search

```bash
User Query
   │
   ▼
MovieSearch
   │
   ▼
500ms Debounce
   │
   ▼
useMovieSearch()
   │
   ▼
movieService.searchMovies()
   │
   ▼
GET /search?q=...
   │
   ▼
Go Backend
   │
   ▼
Semantic Results
```

The frontend is responsible for the search experience, while embedding generation and vector search are handled by the backend.

## Movie Details

```bash
/movies/:id
      │
      ▼
useMovie(id)
      │
      ▼
GET /movies/:id
      │
      ▼
Movie Details
      │
      ▼
useRecommendations(id)
      │
      ▼
GET /movies/:id/recommendations
      │
      ▼
Recommended Movies
```

---

# Frontend Design Principles

### Separation of Concerns

Components handle presentation and interaction, while API operations are kept inside services and hooks.

```bash
Component
    ↓
Hook
    ↓
Service
    ↓
Axios
    ↓
Backend
```

### Server State Management

Movie data is server-owned state, so **TanStack Query** is used instead of Redux.

It provides:

- Caching
- Loading states
- Error handling
- Refetching
- Request deduplication

### Minimal Client-Side JavaScript

Next.js Server Components are used by default.

Client Components are introduced only where browser-side interaction is required, such as:

- Search
- Keyboard shortcuts
- Interactive navigation
- Movie card interactions

---

# UI

The interface follows a dark, cinematic visual direction with:

- Large movie posters
- Responsive grids
- Subtle hover effects
- Smooth transitions
- Minimal navigation
- Loading skeletons
- Dedicated error and empty states

The design is inspired by modern streaming platforms without directly cloning Netflix.

---

# Setup

## Prerequisites

```bash
Node.js
npm
```

The StreamFlix Go backend must also be running.

## Install Dependencies

```bash
npm install
```

## Environment Variables

Create `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:<GO_API_PORT>
```

The URL must point to the **Go backend API**, not the embedding service.

## Start Development Server

```bash
npm run dev
```

Open:

```bash
http://localhost:3000
```

---

# Production

Create an optimized production build:

```bash
npm run build
```

Start the production server:

```bash
npm run start
```

Run linting:

```bash
npm run lint
```

---

# Backend Integration

The frontend consumes the following backend functionality:

```bash
GET /movies
GET /movies/:id
GET /movies/:id/recommendations
GET /search?q=<query>
```

The backend is responsible for:

```bash
PostgreSQL
    +
pgvector
    +
Semantic Search
    +
Embeddings
    +
Recommendations
```

The frontend focuses on presenting these capabilities through a responsive user interface.

---

# Author

**Sayan Debnath**