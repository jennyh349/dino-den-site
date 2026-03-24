import { useState, useEffect } from 'react';
import { DINOS } from '../../data/dinos.js';

function load(key, fb) { try { return JSON.parse(localStorage.getItem(key) || JSON.stringify(fb)); } catch { return fb; } }

export default function Leaderboard() {
  const [entries, setEntries] = useState(() => load('dd-leaderboard', []));
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ player: '', dino: DINOS[0].id, type: 'kill', target: '', notes: '' });
  const [filterType, setFilterType] = useState('all');
  const [sortBy, setSortBy] = useState('recent');

  useEffect(() => { localStorage.setItem('dd-leaderboard', JSON.stringify(entries)); }, [entries]);

  const submit = () => {
    if (!form.player.trim()) return;
    const dino = DINOS.find(d => d.id === form.dino);
    setEntries(prev => [{
      id: Date.now(), ...form, dinoName: dino.name, dinoEmoji: dino.emoji, dinoColor: dino.color,
      timestamp: Date.now(), date: new Date().toLocaleDateString(),
    }, ...prev]);
    setForm({ player: '', dino: DINOS[0].id, type: 'kill', target: '', notes: '' });
    setShowForm(false);
  };

  const filtered = entries.filter(e => filterType === 'all' || e.type === filterType);

  const playerStats = {};
  entries.forEach(e => {
    if (!playerStats[e.player]) playerStats[e.player] = { kills: 0, survivals: 0, total: 0 };
    playerStats[e.player][e.type === 'kill' ? 'kills' : 'survivals']++;
    playerStats[e.player].total++;
  });
  const topPlayers = Object.entries(playerStats).sort((a, b) => b[1].total - a[1].total).slice(0, 10);

  const TYPES = [
    { id: 'kill', label: '⚔️ Kill', color: 'var(--red)' },
    { id: 'survival', label: '🏕️ Survival', color: 'var(--green)' },
    { id: 'achievement', label: '🏆 Achievement', color: 'var(--accent)' },
  ];

  return (
    <div className="page-container fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
        <div>
          <h1 className="page-title">Kill Feed & Leaderboard</h1>
          <p className="page-subtitle">Community stats, memorable kills, and survival milestones. Record your glory.</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="btn-primary">+ Log Entry</button>
      </div>

      {showForm && (
        <div className="card fade-in" style={{ marginBottom: 24, borderLeft: '3px solid var(--accent)' }}>
          <div className="section-label">Log a new entry</div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 10 }}>
            <input placeholder="Player name" value={form.player} onChange={e => setForm(f => ({ ...f, player: e.target.value }))} style={{ flex: 1, minWidth: 150 }} />
            <select value={form.dino} onChange={e => setForm(f => ({ ...f, dino: e.target.value }))}>
              {DINOS.map(d => <option key={d.id} value={d.id}>{d.emoji} {d.name}</option>)}
            </select>
            <select value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))}>
              {TYPES.map(t => <option key={t.id} value={t.id}>{t.label}</option>)}
            </select>
          </div>
          <input placeholder="Target / Details" value={form.target} onChange={e => setForm(f => ({ ...f, target: e.target.value }))} style={{ width: '100%', marginBottom: 10 }} />
          <input placeholder="Notes (optional)" value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} style={{ width: '100%', marginBottom: 12 }} />
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={submit} className="btn-primary">Submit</button>
            <button onClick={() => setShowForm(false)} className="btn-ghost">Cancel</button>
          </div>
        </div>
      )}

      <div className="grid-2" style={{ marginBottom: 32 }}>
        {/* Top Players */}
        <div>
          <div className="section-label">Top players</div>
          <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
            {topPlayers.length === 0 ? (
              <div style={{ padding: 24, textAlign: 'center', color: 'var(--text-dim)', fontStyle: 'italic', fontSize: 13 }}>No entries yet</div>
            ) : topPlayers.map(([name, stats], i) => (
              <div key={name} style={{
                display: 'flex', alignItems: 'center', gap: 12, padding: '10px 16px',
                borderBottom: i < topPlayers.length - 1 ? '1px solid var(--border)' : 'none',
              }}>
                <span style={{
                  fontFamily: 'var(--font-mono)', fontSize: 14, fontWeight: 700, minWidth: 24,
                  color: i === 0 ? 'var(--accent)' : i === 1 ? 'var(--text-secondary)' : i === 2 ? '#b07040' : 'var(--text-dim)',
                }}>#{i + 1}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, color: 'var(--text-primary)' }}>{name}</div>
                </div>
                <div style={{ display: 'flex', gap: 12, fontSize: 11, fontFamily: 'var(--font-mono)' }}>
                  <span style={{ color: 'var(--red)' }}>{stats.kills} kills</span>
                  <span style={{ color: 'var(--green)' }}>{stats.survivals} surv</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div>
          <div className="section-label">Community stats</div>
          <div className="grid-2" style={{ gap: 10 }}>
            {[
              { label: 'Total entries', value: entries.length, color: 'var(--text-primary)' },
              { label: 'Total kills', value: entries.filter(e => e.type === 'kill').length, color: 'var(--red)' },
              { label: 'Survivals logged', value: entries.filter(e => e.type === 'survival').length, color: 'var(--green)' },
              { label: 'Achievements', value: entries.filter(e => e.type === 'achievement').length, color: 'var(--accent)' },
            ].map((s, i) => (
              <div key={i} className="card" style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 24, fontFamily: 'var(--font-display)', color: s.color, fontWeight: 700 }}>{s.value}</div>
                <div style={{ fontSize: 10, color: 'var(--text-dim)', fontFamily: 'var(--font-mono)', letterSpacing: 1 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Feed */}
      <div className="section-label">Activity feed</div>
      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        {[{ id: 'all', label: 'All' }, ...TYPES].map(t => (
          <button key={t.id} onClick={() => setFilterType(t.id)}
            className={filterType === t.id ? 'btn-primary' : 'btn-ghost'}
            style={{ fontSize: 11 }}
          >{t.label || t.id}</button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', color: 'var(--text-dim)', fontStyle: 'italic' }}>
          No entries yet. Be the first to log something!
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {filtered.slice(0, 50).map(e => (
            <div key={e.id} className="card" style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontSize: 20 }}>{e.dinoEmoji}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, color: 'var(--text-primary)' }}>
                  <strong style={{ color: e.dinoColor }}>{e.player}</strong>
                  <span style={{ color: 'var(--text-muted)' }}> as {e.dinoName}</span>
                  {e.target && <span style={{ color: 'var(--text-muted)' }}> — {e.target}</span>}
                </div>
                {e.notes && <div style={{ fontSize: 11, color: 'var(--text-dim)', marginTop: 2 }}>{e.notes}</div>}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 2 }}>
                <span className="badge" style={{
                  background: e.type === 'kill' ? 'rgba(192,80,58,0.15)' : e.type === 'survival' ? 'rgba(107,143,78,0.15)' : 'rgba(212,160,83,0.15)',
                  color: e.type === 'kill' ? 'var(--red)' : e.type === 'survival' ? 'var(--green)' : 'var(--accent)',
                }}>{e.type}</span>
                <span style={{ fontSize: 9, color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>{e.date}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
