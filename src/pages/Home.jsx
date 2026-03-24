import { Link } from 'react-router-dom';

const GAMES = [
  {
    id: 'the-isle', name: 'Dino Den', subtitle: 'The Isle — Evrima',
    desc: 'Encyclopedia, growth timers, survival guides, pack rosters, and everything you need to dominate the island.',
    path: '/the-isle', emoji: '🦖', color: '#d4a053', active: true,
    features: ['19 species catalog', 'Live growth timers', 'Kill feed & leaderboard', 'Event scheduling'],
  },
];

const COMMUNITY_STATS = [
  { label: 'Active Games', value: '1', color: 'var(--mfg-red)' },
  { label: 'Features', value: '9+', color: 'var(--mfg-text-primary)' },
  { label: 'Platform', value: 'PC', color: 'var(--mfg-text-secondary)' },
];

export default function Home() {
  return (
    <div className="fade-in">
      {/* Hero */}
      <div style={{ padding: '80px 24px 60px', textAlign: 'center' }}>
        <div style={{
          fontFamily: 'var(--font-main)', fontSize: 48, fontWeight: 800,
          color: 'var(--mfg-text-primary)', lineHeight: 1.1, marginBottom: 16,
        }}>
          MAX FORCE <span style={{ color: 'var(--mfg-red)' }}>GAMING</span>
        </div>
        <p style={{
          fontFamily: 'var(--font-main)', fontSize: 15, color: 'var(--mfg-text-muted)',
          maxWidth: 480, margin: '0 auto 32px', lineHeight: 1.7,
        }}>
          One community. Multiple worlds. Your home base for game servers,
          tools, and the people who make it all worth playing.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
          <a href="https://discord.gg/kGsvjxTzCZ" target="_blank" rel="noreferrer">
            <button className="mfg-btn-discord">Join the Discord</button>
          </a>
          <Link to="/the-isle">
            <button className="mfg-btn-outline">Browse Games</button>
          </Link>
        </div>
      </div>

      {/* Games */}
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 24px 48px' }}>
        <div style={{
          fontSize: 10, letterSpacing: 2.5, textTransform: 'uppercase',
          color: 'var(--mfg-text-dim)', fontFamily: 'var(--font-mono)',
          marginBottom: 16,
        }}>Our servers</div>

        {GAMES.map(game => (
          <Link key={game.id} to={game.path} style={{ textDecoration: 'none', display: 'block' }}>
            <div style={{
              background: 'var(--mfg-bg-card)', border: '1px solid var(--mfg-border)',
              borderRadius: 12, padding: 28, marginBottom: 16,
              display: 'flex', gap: 24, alignItems: 'flex-start',
              transition: 'border-color 0.2s',
              cursor: 'pointer',
            }}
              onMouseEnter={e => e.currentTarget.style.borderColor = game.color + '50'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--mfg-border)'}
            >
              <div style={{
                width: 64, height: 64, borderRadius: 12,
                background: `linear-gradient(135deg, ${game.color}15, ${game.color}05)`,
                border: `1px solid ${game.color}25`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 32, flexShrink: 0,
              }}>{game.emoji}</div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                  <span style={{
                    fontFamily: game.id === 'the-isle' ? 'var(--font-display)' : 'var(--font-main)',
                    fontSize: 22, color: game.color, fontWeight: game.id === 'the-isle' ? 400 : 700,
                    fontStyle: game.id === 'the-isle' ? 'italic' : 'normal',
                  }}>{game.name}</span>
                  <span style={{
                    fontSize: 8, padding: '2px 8px', borderRadius: 3,
                    background: game.active ? game.color + '18' : 'var(--mfg-bg-elevated)',
                    color: game.active ? game.color : 'var(--mfg-text-dim)',
                    fontFamily: 'var(--font-mono)', letterSpacing: 1.5,
                  }}>{game.active ? 'ACTIVE' : 'COMING SOON'}</span>
                </div>
                <div style={{ fontSize: 12, color: 'var(--mfg-text-muted)', marginBottom: 8, fontFamily: 'var(--font-mono)', letterSpacing: 0.5 }}>
                  {game.subtitle}
                </div>
                <p style={{ fontSize: 13, color: 'var(--mfg-text-secondary)', lineHeight: 1.6, marginBottom: 12 }}>
                  {game.desc}
                </p>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {game.features.map((f, i) => (
                    <span key={i} style={{
                      fontSize: 10, padding: '3px 10px', borderRadius: 4,
                      background: 'var(--mfg-bg-elevated)', color: 'var(--mfg-text-muted)',
                      fontFamily: 'var(--font-mono)',
                    }}>{f}</span>
                  ))}
                </div>
              </div>
              <div style={{ color: game.color, fontSize: 18, flexShrink: 0, marginTop: 4 }}>→</div>
            </div>
          </Link>
        ))}

        {/* Coming soon placeholder */}
        <div style={{
          background: 'var(--mfg-bg-card)', border: '1px dashed var(--mfg-border)',
          borderRadius: 12, padding: 28, textAlign: 'center', opacity: 0.5,
        }}>
          <div style={{ fontSize: 24, marginBottom: 8 }}>🎮</div>
          <div style={{ fontSize: 14, color: 'var(--mfg-text-muted)', fontWeight: 600 }}>More games coming soon</div>
          <div style={{ fontSize: 12, color: 'var(--mfg-text-dim)', marginTop: 4 }}>New servers and communities on the way</div>
        </div>
      </div>

      {/* Stats bar */}
      <div style={{
        borderTop: '1px solid var(--mfg-border)', padding: '20px 24px',
        display: 'flex', justifyContent: 'center', gap: 40,
      }}>
        {COMMUNITY_STATS.map((s, i) => (
          <div key={i} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 22, fontWeight: 700, color: s.color, fontFamily: 'var(--font-main)' }}>{s.value}</div>
            <div style={{ fontSize: 10, color: 'var(--mfg-text-dim)', fontFamily: 'var(--font-mono)', letterSpacing: 1 }}>{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
