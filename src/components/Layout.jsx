import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { useState } from 'react';

const GAME_SECTIONS = [
  { id: 'the-isle', label: 'The Isle', path: '/the-isle', color: '#d4a053', active: true },
];

const ISLE_NAV = [
  { path: '/the-isle', label: 'Overview', end: true },
  { path: '/the-isle/encyclopedia', label: 'Encyclopedia' },
  { path: '/the-isle/timers', label: 'Timers' },
  { path: '/the-isle/diet', label: 'Diet' },
  { path: '/the-isle/survival', label: 'Survival' },
  { path: '/the-isle/roster', label: 'Roster' },
  { path: '/the-isle/leaderboard', label: 'Leaderboard' },
  { path: '/the-isle/events', label: 'Events' },
  { path: '/the-isle/tickets', label: 'Tickets' },
  { path: '/the-isle/apply', label: 'Apply' },
];

export default function Layout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const isIsle = location.pathname.startsWith('/the-isle');
  const isHome = location.pathname === '/';

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* === MFG TOP BAR === */}
      <header style={{
        position: 'sticky', top: 0, zIndex: 100,
        background: 'rgba(8,8,12,0.95)', backdropFilter: 'blur(12px)',
        borderBottom: `1px solid ${isIsle ? 'var(--isle-border)' : 'var(--mfg-border)'}`,
      }}>
        <div style={{
          maxWidth: 1200, margin: '0 auto', padding: '0 24px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 48,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            {/* MFG Logo */}
            <NavLink to="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
              <div style={{
                width: 28, height: 28, background: 'var(--mfg-red)', borderRadius: 6,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 11, fontWeight: 800, color: '#fff', fontFamily: 'var(--font-main)',
              }}>MF</div>
              <span style={{
                fontSize: 14, fontFamily: 'var(--font-main)', fontWeight: 700,
                color: 'var(--mfg-text-primary)', letterSpacing: 0.3,
              }}>MAX FORCE GAMING</span>
            </NavLink>

            {/* Main nav links */}
            <div style={{ display: 'flex', gap: 4, marginLeft: 8 }} className="desktop-nav">
              <NavLink to="/about"
                style={({ isActive }) => ({
                  padding: '4px 12px', fontSize: 11, borderRadius: 4,
                  background: isActive ? 'var(--mfg-bg-elevated)' : 'transparent',
                  color: isActive ? 'var(--mfg-text-primary)' : 'var(--mfg-text-muted)',
                  fontFamily: 'var(--font-main)', fontWeight: 500,
                  border: isActive ? '1px solid var(--mfg-border-light)' : '1px solid transparent',
                  textDecoration: 'none',
                })}
              >About</NavLink>
              {GAME_SECTIONS.map(g => (
                <NavLink key={g.id} to={g.path}
                  style={{
                    padding: '4px 12px', fontSize: 11, borderRadius: 4,
                    background: isIsle ? g.color + '18' : 'transparent',
                    color: isIsle ? g.color : 'var(--mfg-text-muted)',
                    fontFamily: 'var(--font-main)', fontWeight: 500,
                    border: isIsle ? `1px solid ${g.color}30` : '1px solid transparent',
                    textDecoration: 'none',
                  }}
                >{g.label}</NavLink>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <a href="https://discord.gg/kGsvjxTzCZ" target="_blank" rel="noreferrer">
              <button className="mfg-btn-discord" style={{ padding: '5px 14px', fontSize: 10 }}>
                Discord
              </button>
            </a>
            <button className="mfg-btn-outline" style={{ padding: '5px 14px', fontSize: 10 }}>
              Sign In
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="mobile-toggle"
              style={{
                display: 'none', background: 'none', border: '1px solid var(--mfg-border)',
                color: 'var(--mfg-text-muted)', padding: '4px 8px', borderRadius: 'var(--radius)',
                fontSize: 14,
              }}
            >☰</button>
          </div>
        </div>

        {/* === ISLE SUB-NAV === */}
        {isIsle && (
          <div style={{
            borderTop: '1px solid var(--isle-border)',
            background: 'rgba(18,16,12,0.9)',
          }}>
            <div style={{
              maxWidth: 1200, margin: '0 auto', padding: '0 24px',
              display: 'flex', alignItems: 'center', gap: 4, height: 38,
              overflowX: 'auto',
            }} className="desktop-nav">
              <div style={{
                display: 'flex', alignItems: 'center', gap: 6, marginRight: 12,
                borderRight: '1px solid var(--isle-border)', paddingRight: 12,
              }}>
                <span style={{ fontSize: 14 }}>🦖</span>
                <span style={{
                  fontFamily: 'var(--font-display)', fontSize: 13,
                  color: 'var(--isle-accent)', fontStyle: 'italic',
                }}>Dino Den</span>
              </div>
              {ISLE_NAV.map(item => (
                <NavLink
                  key={item.path} to={item.path} end={item.end}
                  style={({ isActive }) => ({
                    padding: '4px 10px', fontSize: 11,
                    fontFamily: 'var(--font-body)',
                    color: isActive ? 'var(--isle-accent)' : 'var(--isle-text-muted)',
                    borderRadius: 4,
                    background: isActive ? 'var(--isle-bg-elevated)' : 'transparent',
                    textDecoration: 'none', whiteSpace: 'nowrap',
                  })}
                >{item.label}</NavLink>
              ))}
            </div>
          </div>
        )}

        {/* Mobile dropdown */}
        {mobileOpen && (
          <div style={{
            padding: '8px 24px 16px', borderTop: '1px solid var(--mfg-border)',
            display: 'flex', flexDirection: 'column', gap: 2, background: 'var(--mfg-bg-primary)',
          }}>
            <NavLink to="/" onClick={() => setMobileOpen(false)}
              style={{ padding: '8px 12px', fontSize: 13, color: 'var(--mfg-text-secondary)', borderRadius: 4, textDecoration: 'none' }}>
              🏠 Home
            </NavLink>
            <NavLink to="/about" onClick={() => setMobileOpen(false)}
              style={({ isActive }) => ({ padding: '8px 12px', fontSize: 13, color: isActive ? 'var(--mfg-red)' : 'var(--mfg-text-secondary)', borderRadius: 4, textDecoration: 'none' })}>
              📋 About / Rules / Staff
            </NavLink>
            <div style={{ fontSize: 10, color: 'var(--isle-accent)', padding: '8px 12px 4px', letterSpacing: 1.5, fontFamily: 'var(--font-mono)' }}>THE ISLE</div>
            {ISLE_NAV.map(item => (
              <NavLink key={item.path} to={item.path} end={item.end}
                onClick={() => setMobileOpen(false)}
                style={({ isActive }) => ({
                  padding: '6px 12px 6px 24px', fontSize: 13,
                  color: isActive ? 'var(--isle-accent)' : 'var(--isle-text-muted)',
                  borderRadius: 4, textDecoration: 'none',
                })}
              >{item.label}</NavLink>
            ))}
          </div>
        )}
      </header>

      {/* Page Content */}
      <main style={{
        flex: 1,
        background: isIsle ? 'var(--isle-bg-deep)' : (isHome ? 'var(--mfg-bg-deep)' : 'var(--mfg-bg-deep)'),
      }} className={isIsle ? 'isle-context' : 'mfg-context'}>
        <Outlet />
      </main>

      {/* Footer */}
      <footer style={{
        borderTop: `1px solid ${isIsle ? 'var(--isle-border)' : 'var(--mfg-border)'}`,
        padding: '16px 24px', textAlign: 'center', fontSize: 11,
        color: 'var(--mfg-text-dim)', fontFamily: 'var(--font-mono)',
        background: 'var(--mfg-bg-deep)',
      }}>
        Max Force Gaming &bull; maxforcegaming.com &bull; Not affiliated with game developers
      </footer>

      <style>{`
        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
          .mobile-toggle { display: block !important; }
        }
      `}</style>
    </div>
  );
}
