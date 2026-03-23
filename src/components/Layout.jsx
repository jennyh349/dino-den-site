import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { useState } from 'react';

const NAV_ITEMS = [
  { path: '/', label: 'Home', icon: '🏠' },
  { path: '/encyclopedia', label: 'Encyclopedia', icon: '📖' },
  { path: '/timers', label: 'Growth Timers', icon: '⏱' },
  { path: '/diet', label: 'Diet Finder', icon: '🌿' },
  { path: '/survival', label: 'Survival Guide', icon: '🗺️' },
  { path: '/roster', label: 'Pack Roster', icon: '🦕' },
  { path: '/leaderboard', label: 'Leaderboard', icon: '🏆' },
  { path: '/events', label: 'Events', icon: '📅' },
  { path: '/tickets', label: 'Tickets', icon: '🎫' },
  { path: '/apply', label: 'Apply', icon: '📝' },
];

export default function Layout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Top Nav */}
      <header style={{
        position: 'sticky', top: 0, zIndex: 100,
        background: 'rgba(18,16,12,0.92)', backdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--border)',
      }}>
        <div style={{
          maxWidth: 1200, margin: '0 auto', padding: '0 24px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 56,
        }}>
          {/* Logo */}
          <NavLink to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
            <span style={{ fontSize: 20, fontFamily: 'var(--font-display)', color: 'var(--accent)', fontWeight: 700, letterSpacing: 1 }}>
              Dino Den
            </span>
            <span style={{
              fontSize: 8, padding: '2px 6px', background: 'var(--bg-elevated)',
              borderRadius: 3, color: 'var(--accent)', letterSpacing: 1.5,
              fontFamily: 'var(--font-mono)',
            }}>EVRIMA</span>
          </NavLink>

          {/* Desktop Nav */}
          <nav style={{ display: 'flex', gap: 4, alignItems: 'center' }} className="desktop-nav">
            {NAV_ITEMS.filter(n => n.path !== '/').map(item => (
              <NavLink
                key={item.path}
                to={item.path}
                style={({ isActive }) => ({
                  padding: '6px 10px',
                  fontSize: 11,
                  fontFamily: 'var(--font-body)',
                  color: isActive ? 'var(--accent)' : 'var(--text-muted)',
                  borderRadius: 'var(--radius)',
                  background: isActive ? 'var(--bg-elevated)' : 'transparent',
                  textDecoration: 'none',
                  transition: 'all 0.2s',
                  whiteSpace: 'nowrap',
                })}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Auth placeholder */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <button className="btn-outline" style={{ padding: '5px 14px', fontSize: 11 }}>
              Sign In
            </button>
            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="mobile-toggle"
              style={{
                display: 'none', background: 'none', border: '1px solid var(--border)',
                color: 'var(--text-muted)', padding: '6px 10px', borderRadius: 'var(--radius)',
                fontFamily: 'var(--font-mono)', fontSize: 14,
              }}
            >
              ☰
            </button>
          </div>
        </div>

        {/* Mobile Nav Dropdown */}
        {mobileOpen && (
          <div style={{
            padding: '8px 24px 16px', borderTop: '1px solid var(--border)',
            display: 'flex', flexDirection: 'column', gap: 4,
          }}>
            {NAV_ITEMS.map(item => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                style={({ isActive }) => ({
                  padding: '8px 12px',
                  fontSize: 13,
                  color: isActive ? 'var(--accent)' : 'var(--text-secondary)',
                  background: isActive ? 'var(--bg-elevated)' : 'transparent',
                  borderRadius: 'var(--radius)',
                  textDecoration: 'none',
                  display: 'flex', alignItems: 'center', gap: 10,
                })}
              >
                <span style={{ fontSize: 14 }}>{item.icon}</span>
                {item.label}
              </NavLink>
            ))}
          </div>
        )}
      </header>

      {/* Page Content */}
      <main style={{ flex: 1 }}>
        <Outlet />
      </main>

      {/* Footer */}
      <footer style={{
        borderTop: '1px solid var(--border)', padding: '20px 24px',
        textAlign: 'center', fontSize: 11, color: 'var(--text-dim)',
        fontFamily: 'var(--font-mono)',
      }}>
        Dino Den — The Isle Evrima Community &bull; Not affiliated with Afterthought LLC
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
