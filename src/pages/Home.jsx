import { Link } from 'react-router-dom';

const FEATURES = [
  { icon: '📖', title: 'Species catalog', desc: 'Detailed profiles for all 19 Evrima creatures with stats, abilities, and survival tips.', to: '/encyclopedia', color: 'var(--accent)' },
  { icon: '⏱', title: 'Growth timers', desc: 'Track your dinosaur\'s growth in real time. Never guess when you\'ll hit adult again.', to: '/timers', color: 'var(--green)' },
  { icon: '🌿', title: 'Diet & foraging', desc: 'Know exactly what your dino eats and where to find it on the map.', to: '/diet', color: 'var(--green)' },
  { icon: '🗺️', title: 'Survival journal', desc: 'Tips, strategies, and field-tested advice for every stage of the game.', to: '/survival', color: 'var(--accent)' },
  { icon: '🦕', title: 'Pack roster', desc: 'Organize your pack or herd. Track members, roles, and dino choices.', to: '/roster', color: 'var(--blue)' },
  { icon: '🏆', title: 'Leaderboard', desc: 'Community kill feed, survival records, and bragging rights.', to: '/leaderboard', color: 'var(--purple)' },
  { icon: '📅', title: 'Events', desc: 'Upcoming server events, hunts, and community gatherings.', to: '/events', color: 'var(--accent)' },
  { icon: '🎫', title: 'Tickets', desc: 'Submit suggestions, report issues, or request help from the team.', to: '/tickets', color: 'var(--blue)' },
  { icon: '📝', title: 'Apply', desc: 'Want to join the server? Submit your whitelist application here.', to: '/apply', color: 'var(--green)' },
];

export default function Home() {
  return (
    <div className="fade-in">
      {/* Hero */}
      <div style={{
        padding: '64px 24px 48px', textAlign: 'center',
        background: 'linear-gradient(180deg, rgba(30,26,18,0.6) 0%, transparent 100%)',
        borderBottom: '1px solid var(--border)',
      }}>
        <div style={{
          fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 3,
          color: 'var(--text-dim)', textTransform: 'uppercase', marginBottom: 16,
        }}>
          Community Field Guide
        </div>
        <h1 style={{
          fontFamily: 'var(--font-display)', fontSize: 42, fontWeight: 400,
          fontStyle: 'italic', color: 'var(--text-primary)', marginBottom: 16,
          lineHeight: 1.2,
        }}>
          Welcome to the Den
        </h1>
        <p style={{
          fontFamily: 'var(--font-body)', fontSize: 15, color: 'var(--text-muted)',
          maxWidth: 520, margin: '0 auto 28px', lineHeight: 1.8,
        }}>
          A field researcher's companion to surviving The Isle. Catalog every species,
          track your growth, and record your journey across the island.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/encyclopedia"><button className="btn-primary">Browse species</button></Link>
          <a href="https://discord.gg/kGsvjxTzCZ" target="_blank" rel="noreferrer">
            <button className="btn-outline">Join Discord</button>
          </a>
        </div>
      </div>

      {/* Features Grid */}
      <div className="page-container">
        <div className="section-label" style={{ marginBottom: 20 }}>Field Guide Sections</div>
        <div className="grid-3" style={{ marginBottom: 40 }}>
          {FEATURES.map(f => (
            <Link key={f.to} to={f.to} style={{ textDecoration: 'none' }}>
              <div className="card" style={{ height: '100%', cursor: 'pointer' }}>
                <div style={{ fontSize: 22, marginBottom: 10 }}>{f.icon}</div>
                <div style={{
                  fontFamily: 'var(--font-display)', fontSize: 16, color: f.color,
                  marginBottom: 6,
                }}>{f.title}</div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.6 }}>
                  {f.desc}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Community Stats */}
        <div style={{
          display: 'flex', gap: 32, justifyContent: 'center', padding: '24px 0',
          borderTop: '1px solid var(--border)',
          fontFamily: 'var(--font-mono)', fontSize: 11,
        }}>
          <span style={{ color: 'var(--text-dim)' }}>
            Species documented: <span style={{ color: 'var(--accent)' }}>19</span>
          </span>
          <span style={{ color: 'var(--text-dim)' }}>
            Field guide sections: <span style={{ color: 'var(--text-primary)' }}>9</span>
          </span>
          <span style={{ color: 'var(--text-dim)' }}>
            Branch: <span style={{ color: 'var(--green)' }}>Evrima</span>
          </span>
        </div>
      </div>
    </div>
  );
}
