# 🎮 Max Force Gaming — Community Hub

Multi-game community website built with React + Vite. Currently hosting The Isle (Dino Den) with more games planned.

## Current Features

### MFG Main
- Landing page with game portal
- About Us / Staff / Community Rules (tabbed page)

### The Isle — Dino Den
1. Encyclopedia — 19 Evrima species with full profiles
2. Growth Timers — Real-time tracking with pause/resume
3. Diet Finder — Food sources for every species
4. Survival Guide — Beginner to advanced strategies
5. Pack Roster — Create and manage groups
6. Leaderboard — Kill feed and community stats
7. Events — Schedule and browse server events
8. Tickets — Suggestions, reports, and help requests
9. Applications — Whitelist system with admin review

## Upcoming (Phases 2-4)
- Community blog (any logged-in user)
- News/announcements (admin only)
- Server status page (auto-ping)
- Discord OAuth login + role-based admin
- Game-specific blog/news feeds

## Deploy
```bash
npm install
npm run dev        # local dev
npm run build      # production build
```

Push to GitHub, connect to Vercel, deploy. The vercel.json handles SPA routing.

## Tech Stack
React 18, React Router 6, Vite 5, localStorage (upgrading to backend in Phase 3)
