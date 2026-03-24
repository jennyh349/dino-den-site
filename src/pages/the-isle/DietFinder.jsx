import { useState } from 'react';
import { DINOS } from '../../data/dinos.js';

export default function DietFinder() {
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState('all');

  const filtered = DINOS.filter(d => filter === 'all' || d.category === filter);
  const dino = selected ? DINOS.find(d => d.id === selected) : null;

  return (
    <div className="page-container fade-in">
      <h1 className="page-title">Diet & Foraging Guide</h1>
      <p className="page-subtitle">Know exactly what your dinosaur eats and find the best food sources on the island.</p>

      <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
        {[
          { id: 'all', label: 'All Species' },
          { id: 'carnivore', label: '🦷 Carnivores' },
          { id: 'herbivore', label: '🌿 Herbivores' },
          { id: 'omnivore', label: '🍽️ Omnivores' },
        ].map(f => (
          <button key={f.id} onClick={() => setFilter(f.id)}
            className={filter === f.id ? 'btn-primary' : 'btn-outline'}
            style={{ fontSize: 12 }}
          >{f.label}</button>
        ))}
      </div>

      <div className="grid-3">
        {filtered.map(d => (
          <div key={d.id} className="card" style={{
            cursor: 'pointer',
            borderLeft: selected === d.id ? `3px solid ${d.color}` : '3px solid transparent',
          }} onClick={() => setSelected(d.id === selected ? null : d.id)}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
              <span style={{ fontSize: 22 }}>{d.emoji}</span>
              <div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 14, color: d.color }}>{d.name}</div>
                <div style={{ fontSize: 10, color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>{d.diet}</div>
              </div>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
              {d.dietItems.map((item, i) => (
                <span key={i} className="badge" style={{
                  background: 'var(--bg-elevated)',
                  color: 'var(--text-secondary)',
                  fontSize: 9,
                  padding: '3px 8px',
                }}>{item}</span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Diet Tips */}
      <div style={{ marginTop: 40 }}>
        <div className="section-label">Field notes on foraging</div>
        <div className="grid-2">
          <div className="card">
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 16, color: 'var(--accent)', marginBottom: 8, fontStyle: 'italic' }}>Carnivore diet tips</div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.8 }}>
              Fresh kills are always the best food source. Ceratosaurus is the only carnivore that can eat rotten meat without penalty.
              Approach water carefully — Deinos patrol every source. Fish can be a safer alternative for smaller carnivores like Pteranodon.
              Perfect diet bonuses (eating the right food for your stage) significantly reduce total growth time.
            </div>
          </div>
          <div className="card">
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 16, color: 'var(--green)', marginBottom: 8, fontStyle: 'italic' }}>Herbivore diet tips</div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.8 }}>
              Different plants spawn in different biomes — ferns are everywhere but specialized foods are regional.
              Stay with your herd while grazing since you're most vulnerable when eating.
              Berries and flowers often spawn near forest edges and clearings.
              Perfect diet is crucial for herbivores as it can cut hours off your growth time.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
