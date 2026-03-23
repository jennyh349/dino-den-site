import { useState } from 'react';
import { DINOS, TIER_LABELS, TIER_COLORS, TIER_ORDER } from '../data/dinos.js';

function Section({ title, children }) {
  return (
    <div style={{ marginBottom: 24 }}>
      <div className="section-label" style={{ color: 'var(--accent)', marginBottom: 10 }}>{title}</div>
      {children}
    </div>
  );
}

export default function Encyclopedia() {
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('tier');

  const filtered = DINOS.filter(d => {
    if (filter !== 'all' && d.category !== filter) return false;
    if (search && !d.name.toLowerCase().includes(search.toLowerCase()) && !d.aka.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  }).sort((a, b) => {
    if (sortBy === 'tier') return (TIER_ORDER[a.tier] ?? 99) - (TIER_ORDER[b.tier] ?? 99);
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    if (sortBy === 'growth') return parseFloat(a.growthTime) - parseFloat(b.growthTime);
    return 0;
  });

  const dino = selected ? DINOS.find(d => d.id === selected) : null;

  return (
    <div className="fade-in" style={{ display: 'flex', minHeight: 'calc(100vh - 97px)' }}>
      {/* List */}
      <div style={{
        width: dino ? 320 : '100%', maxWidth: dino ? 320 : '100%', minWidth: 280,
        borderRight: dino ? '1px solid var(--border)' : 'none',
        display: 'flex', flexDirection: 'column', transition: 'width 0.3s',
      }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)' }}>
          <h2 className="page-title" style={{ fontSize: 22, marginBottom: 12 }}>Species Catalog</h2>
          <input
            placeholder="Search species..." value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ width: '100%', marginBottom: 10 }}
          />
          <div style={{ display: 'flex', gap: 4, marginBottom: 8 }}>
            {[
              { id: 'all', label: 'All' },
              { id: 'carnivore', label: '🦷 Carni' },
              { id: 'herbivore', label: '🌿 Herbi' },
              { id: 'omnivore', label: '🍽️ Omni' },
            ].map(f => (
              <button key={f.id} onClick={() => setFilter(f.id)}
                className={filter === f.id ? 'btn-primary' : 'btn-ghost'}
                style={{ flex: 1, fontSize: 10, padding: '5px 4px' }}
              >{f.label}</button>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 4 }}>
            {[
              { id: 'tier', label: 'By Tier' },
              { id: 'name', label: 'A–Z' },
              { id: 'growth', label: 'Growth ⏱' },
            ].map(s => (
              <button key={s.id} onClick={() => setSortBy(s.id)}
                style={{
                  flex: 1, fontSize: 9, padding: '4px', borderRadius: 'var(--radius)',
                  background: sortBy === s.id ? 'var(--bg-elevated)' : 'transparent',
                  color: sortBy === s.id ? 'var(--accent)' : 'var(--text-dim)',
                  border: 'none', fontFamily: 'var(--font-mono)', letterSpacing: 0.5,
                }}
              >{s.label}</button>
            ))}
          </div>
        </div>

        <div style={{ flex: 1, overflow: 'auto', padding: 8 }}>
          {filtered.map(d => (
            <button key={d.id} onClick={() => setSelected(d.id === selected ? null : d.id)}
              style={{
                width: '100%', display: 'flex', alignItems: 'center', gap: 12,
                padding: '10px 12px', marginBottom: 3, border: 'none',
                borderLeft: selected === d.id ? `3px solid ${d.color}` : '3px solid transparent',
                background: selected === d.id ? 'var(--bg-elevated)' : 'transparent',
                borderRadius: 'var(--radius)', textAlign: 'left',
              }}
            >
              <span style={{ fontSize: 20, width: 30, textAlign: 'center' }}>{d.emoji}</span>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ color: 'var(--text-primary)', fontSize: 13, fontFamily: 'var(--font-display)' }}>{d.name}</span>
                  <span style={{ color: 'var(--text-dim)', fontSize: 10 }}>({d.aka})</span>
                </div>
                <div style={{ display: 'flex', gap: 6, marginTop: 3, alignItems: 'center' }}>
                  <span className="badge" style={{
                    background: TIER_COLORS[d.tier] + '18',
                    color: TIER_COLORS[d.tier],
                  }}>{TIER_LABELS[d.tier]}</span>
                  <span style={{ fontSize: 9, color: 'var(--text-dim)' }}>{d.growthTime}</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Detail */}
      {dino && (
        <div style={{ flex: 1, overflow: 'auto' }} className="fade-in">
          <div style={{
            padding: '32px', borderBottom: '1px solid var(--border)',
            background: `linear-gradient(135deg, ${dino.color}08, transparent 60%)`,
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <span style={{ fontSize: 36 }}>{dino.emoji}</span>
                <div>
                  <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 28, color: dino.color, fontWeight: 400, fontStyle: 'italic' }}>{dino.name}</h2>
                  <p style={{ fontSize: 12, color: 'var(--text-muted)', fontStyle: 'italic' }}>"{dino.aka}"</p>
                </div>
              </div>
              <button onClick={() => setSelected(null)} className="btn-ghost">✕ Close</button>
            </div>
            <div style={{ display: 'flex', gap: 10, marginTop: 20, flexWrap: 'wrap' }}>
              {[
                { l: 'Tier', v: TIER_LABELS[dino.tier], c: TIER_COLORS[dino.tier] },
                { l: 'Size', v: dino.size },
                { l: 'Weight', v: dino.weight },
                { l: 'Growth', v: dino.growthTime, c: 'var(--accent)' },
                { l: 'Speed', v: dino.speed },
              ].map((s, i) => (
                <div key={i} style={{
                  padding: '8px 14px', background: 'var(--bg-secondary)',
                  borderRadius: 'var(--radius)', border: '1px solid var(--border)',
                }}>
                  <div style={{ fontSize: 8, color: 'var(--text-dim)', letterSpacing: 1.5, fontFamily: 'var(--font-mono)', marginBottom: 3 }}>{s.l}</div>
                  <div style={{ fontSize: 13, color: s.c || 'var(--text-primary)', fontWeight: 600 }}>{s.v}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ padding: 32 }}>
            <Section title="Playstyle">
              <p style={{ fontSize: 13, lineHeight: 1.8, color: 'var(--text-secondary)' }}>{dino.playstyle}</p>
            </Section>

            <Section title="Abilities">
              {dino.abilities.map((a, i) => (
                <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 8 }}>
                  <span style={{ color: dino.color, fontSize: 10, marginTop: 4, fontFamily: 'var(--font-mono)' }}>▸</span>
                  <span style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5 }}>{a}</span>
                </div>
              ))}
            </Section>

            <Section title="Diet">
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {dino.dietItems.map((d, i) => (
                  <span key={i} className="badge" style={{ background: 'var(--bg-elevated)', color: 'var(--text-secondary)', fontSize: 10, padding: '4px 10px' }}>{d}</span>
                ))}
              </div>
            </Section>

            <Section title="Growth Stages">
              {Object.entries(dino.growthStages).map(([stage, time]) => (
                <div key={stage} className="stat-row">
                  <span className="stat-label" style={{ textTransform: 'capitalize' }}>{stage}</span>
                  <span className="stat-value">{time}</span>
                </div>
              ))}
            </Section>

            <div className="grid-2">
              <Section title="Strengths">
                {dino.strengths.map((s, i) => (
                  <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 6 }}>
                    <span style={{ color: 'var(--green)', fontSize: 10, marginTop: 3, fontFamily: 'var(--font-mono)' }}>+</span>
                    <span style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.5 }}>{s}</span>
                  </div>
                ))}
              </Section>
              <Section title="Weaknesses">
                {dino.weaknesses.map((w, i) => (
                  <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 6 }}>
                    <span style={{ color: 'var(--red)', fontSize: 10, marginTop: 3, fontFamily: 'var(--font-mono)' }}>−</span>
                    <span style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.5 }}>{w}</span>
                  </div>
                ))}
              </Section>
            </div>

            <Section title="Survival Tips">
              {dino.tips.map((t, i) => (
                <div key={i} style={{
                  display: 'flex', gap: 10, marginBottom: 8, padding: '8px 12px',
                  background: 'var(--bg-secondary)', borderRadius: 'var(--radius)',
                  border: '1px solid var(--border)',
                }}>
                  <span style={{ color: 'var(--accent)', fontSize: 12, fontWeight: 700, minWidth: 20, fontFamily: 'var(--font-mono)' }}>{i + 1}.</span>
                  <span style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{t}</span>
                </div>
              ))}
            </Section>
          </div>
        </div>
      )}
    </div>
  );
}
