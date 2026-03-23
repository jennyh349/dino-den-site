# 🦖 Dino Den — The Isle Evrima Community Hub

A full-featured community website for The Isle (Evrima) built with React + Vite.

## Features

1. **Encyclopedia** — Full species catalog with stats, abilities, tips for all 19 Evrima creatures
2. **Growth Timers** — Real-time growth tracking with pause/resume and stage indicators
3. **Diet Finder** — Diet reference for every species with foraging tips
4. **Survival Guide** — Field-tested strategies from beginner to advanced
5. **Pack Roster** — Create and manage packs/herds with member tracking
6. **Leaderboard** — Community kill feed, survival logs, and achievement tracking
7. **Events** — Schedule and browse upcoming server events
8. **Tickets** — Suggestion box, bug reports, and help requests with voting
9. **Applications** — Whitelist application system with admin review

## Getting Started

```bash
npm install
npm run dev
```

## Deploy to Vercel

1. Push to GitHub
2. Connect repo to [vercel.com](https://vercel.com)
3. Deploy — Vercel auto-detects Vite

## Tech Stack

- React 18
- React Router 6
- Vite 5
- localStorage for data persistence
- Prepared for Discord OAuth integration

## Future: Discord Auth

The site is structured to support Discord OAuth login. When ready:
1. Create a Discord application at discord.com/developers
2. Add OAuth2 redirect URL
3. Implement the auth flow in `src/components/Layout.jsx` (Sign In button)
4. Gate admin features (ticket status, application review) behind auth roles

## License

Built for the Dino Den community.
