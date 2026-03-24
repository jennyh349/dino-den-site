import { Link } from 'react-router-dom';

const FEATURES = [
  { icon: '📖', title: 'Species catalog', desc: 'Detailed profiles for all 19 Evrima creatures.', to: '/the-isle/encyclopedia', color: 'var(--isle-accent)' },
  { icon: '⏱', title: 'Growth timers', desc: 'Track your dino\'s growth in real time.', to: '/the-isle/timers', color: 'var(--isle-green)' },
  { icon: '🌿', title: 'Diet & foraging', desc: 'Food sources and nutrition for every species.', to: '/the-isle/diet', color: 'var(--isle-green)' },
  { icon: '🗺️', title: 'Survival journal', desc: 'Tips, strategies, and field-tested advice.', to: '/the-isle/survival', color: 'var(--isle-accent)' },
  { icon: '🦕', title: 'Pack roster', desc: 'Organize your pack or herd.', to: '/the-isle/roster', color: 'var(--isle-blue)' },
  { icon: '🏆', title: 'Leaderboard', desc: 'Kill feed and community stats.', to: '/the-isle/leaderboard', color: 'var(--isle-purple)' },
  { icon: '📅', title: 'Events', desc: 'Upcoming server events and hunts.', to: '/the-isle/events', color: 'var(--isle-accent)' },
  { icon: '🎫', title: 'Tickets', desc: 'Suggestions, reports, and help requests.', to: '/the-isle/tickets', color: 'var(--isle-blue)' },
  { icon: '📝', title: 'Apply', desc: 'Submit your whitelist application.', to: '/the-isle/apply', color: 'var(--isle-green)' },
];

export default function IsleHome() {
  return (
    <div className="fade-in">
      <div style={{
        padding: '48px 24px 36px', textAlign: 'center',
        borderBottom: '1px solid var(--isle-border)',
      }}>
        <div style={{
          fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 3,
          color: 'var(--isle-text-dim)', textTransform: 'uppercase', marginBottom: 12,
        }}>The Isle — Evrima · Community Field Guide</div>
        <h1 style={{
          fontFamily: 'var(--font-display)', fontSize: 38, fontWeight: 400,
          fontStyle: 'italic', color: 'var(--isle-text-primary)', marginBottom: 12,
        }}>Welcome to the Den</h1>
        <p style={{
          fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--isle-text-muted)',
          maxWidth: 500, margin: '0 auto 24px', lineHeight: 1.8,
        }}>
          A field researcher's companion to surviving The Isle. Catalog every species,
          track your growth, and record your journey across the island.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
          <Link to="/the-isle/encyclopedia"><button className="btn-primary">Browse species</button></Link>
          <Link to="/the-isle/timers"><button className="btn-outline">Start a timer</button></Link>
        </div>
      </div>

      <div className="page-container">
        <div className="section-label">Field guide sections</div>
        <div className="grid-3" style={{ marginBottom: 32 }}>
          {FEATURES.map(f => (
            <Link key={f.to} to={f.to} style={{ textDecoration: 'none' }}>
              <div className="card" style={{ height: '100%', cursor: 'pointer' }}>
                <div style={{ fontSize: 20, marginBottom: 8 }}>{f.icon}</div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 15, color: f.color, marginBottom: 4 }}>{f.title}</div>
                <div style={{ fontSize: 12, color: 'var(--isle-text-muted)', lineHeight: 1.6 }}>{f.desc}</div>
              </div>
            </Link>
          ))}
        </div>

        <div style={{
          display: 'flex', gap: 28, justifyContent: 'center', padding: '20px 0',
          borderTop: '1px solid var(--isle-border)',
          fontFamily: 'var(--font-mono)', fontSize: 11,
        }}>
          <span style={{ color: 'var(--isle-text-dim)' }}>Species: <span style={{ color: 'var(--isle-accent)' }}>19</span></span>
          <span style={{ color: 'var(--isle-text-dim)' }}>Sections: <span style={{ color: 'var(--isle-text-primary)' }}>9</span></span>
          <span style={{ color: 'var(--isle-text-dim)' }}>Branch: <span style={{ color: 'var(--isle-green)' }}>Evrima</span></span>
        </div>
      </div>
    </div>
  );
}
