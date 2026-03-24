import { useState, useEffect, useRef } from 'react';
import { DINOS, TIER_COLORS, TIER_LABELS } from '../../data/dinos.js';

function parseGrowthHours(str) {
  const m = str.match(/~?([\d.]+)/);
  return m ? parseFloat(m[1]) : 3;
}

export default function Timers() {
  const [activeTimers, setActiveTimers] = useState(() => {
    try { return JSON.parse(localStorage.getItem('dd-timers') || '[]'); } catch { return []; }
  });
  const [selectedDino, setSelectedDino] = useState(DINOS[0].id);
  const [, forceUpdate] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => forceUpdate(n => n + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    localStorage.setItem('dd-timers', JSON.stringify(activeTimers));
  }, [activeTimers]);

  const startTimer = () => {
    const dino = DINOS.find(d => d.id === selectedDino);
    if (!dino) return;
    setActiveTimers(prev => [...prev, {
      id: Date.now(),
      dinoId: dino.id,
      dinoName: dino.name,
      dinoEmoji: dino.emoji,
      dinoColor: dino.color,
      totalHours: parseGrowthHours(dino.growthTime),
      startedAt: Date.now(),
      paused: false,
      pausedElapsed: 0,
    }]);
  };

  const removeTimer = (id) => setActiveTimers(prev => prev.filter(t => t.id !== id));

  const togglePause = (id) => {
    setActiveTimers(prev => prev.map(t => {
      if (t.id !== id) return t;
      if (t.paused) {
        return { ...t, paused: false, startedAt: Date.now() - t.pausedElapsed };
      } else {
        return { ...t, paused: true, pausedElapsed: Date.now() - t.startedAt };
      }
    }));
  };

  const getProgress = (timer) => {
    const elapsed = timer.paused ? timer.pausedElapsed : Date.now() - timer.startedAt;
    const totalMs = timer.totalHours * 3600000;
    return Math.min(1, elapsed / totalMs);
  };

  const getTimeRemaining = (timer) => {
    const elapsed = timer.paused ? timer.pausedElapsed : Date.now() - timer.startedAt;
    const totalMs = timer.totalHours * 3600000;
    const remaining = Math.max(0, totalMs - elapsed);
    const hrs = Math.floor(remaining / 3600000);
    const mins = Math.floor((remaining % 3600000) / 60000);
    const secs = Math.floor((remaining % 60000) / 1000);
    return `${hrs}h ${mins}m ${secs}s`;
  };

  const getStage = (timer) => {
    const p = getProgress(timer);
    if (p >= 1) return 'Adult ✓';
    if (p >= 0.6) return 'Sub-Adult';
    if (p >= 0.25) return 'Juvenile';
    return 'Hatchling';
  };

  return (
    <div className="page-container fade-in">
      <h1 className="page-title">Growth Timers</h1>
      <p className="page-subtitle">Track your dinosaur's growth in real time. Start a timer when you begin growing and never guess again.</p>

      {/* Start Timer */}
      <div className="card" style={{ marginBottom: 24, display: 'flex', gap: 12, alignItems: 'flex-end', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: 200 }}>
          <div className="section-label">Start a new timer</div>
          <select value={selectedDino} onChange={e => setSelectedDino(e.target.value)} style={{ width: '100%' }}>
            {DINOS.map(d => (
              <option key={d.id} value={d.id}>{d.emoji} {d.name} ({d.growthTime})</option>
            ))}
          </select>
        </div>
        <button onClick={startTimer} className="btn-primary" style={{ whiteSpace: 'nowrap' }}>
          ⏱ Start Timer
        </button>
      </div>

      {/* Active Timers */}
      {activeTimers.length === 0 ? (
        <div style={{
          textAlign: 'center', padding: 48, color: 'var(--text-dim)',
          fontStyle: 'italic', fontSize: 14,
        }}>
          No active timers. Select a dinosaur and start growing!
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {activeTimers.map(timer => {
            const progress = getProgress(timer);
            const done = progress >= 1;
            return (
              <div key={timer.id} className="card" style={{
                borderLeft: `3px solid ${timer.dinoColor}`,
                opacity: done ? 0.7 : 1,
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ fontSize: 24 }}>{timer.dinoEmoji}</span>
                    <div>
                      <div style={{ fontFamily: 'var(--font-display)', fontSize: 16, color: timer.dinoColor }}>{timer.dinoName}</div>
                      <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>
                        Stage: <span style={{ color: done ? 'var(--green)' : 'var(--accent)' }}>{getStage(timer)}</span>
                      </div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 6 }}>
                    <button onClick={() => togglePause(timer.id)} className="btn-ghost">
                      {timer.paused ? '▶ Resume' : '⏸ Pause'}
                    </button>
                    <button onClick={() => removeTimer(timer.id)} className="btn-ghost" style={{ color: 'var(--red)' }}>
                      ✕
                    </button>
                  </div>
                </div>

                {/* Progress bar */}
                <div style={{
                  height: 8, background: 'var(--bg-deep)', borderRadius: 4,
                  overflow: 'hidden', marginBottom: 8,
                }}>
                  <div style={{
                    height: '100%', width: `${progress * 100}%`,
                    background: done ? 'var(--green)' : `linear-gradient(90deg, ${timer.dinoColor}88, ${timer.dinoColor})`,
                    borderRadius: 4, transition: 'width 1s linear',
                  }} />
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
                  <span style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                    {Math.round(progress * 100)}%
                  </span>
                  <span style={{ color: done ? 'var(--green)' : 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>
                    {done ? 'Fully grown!' : getTimeRemaining(timer)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Quick Reference */}
      <div style={{ marginTop: 40 }}>
        <div className="section-label">Growth time reference</div>
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          {DINOS.sort((a, b) => parseGrowthHours(a.growthTime) - parseGrowthHours(b.growthTime)).map((d, i) => (
            <div key={d.id} style={{
              display: 'flex', alignItems: 'center', gap: 12, padding: '10px 16px',
              borderBottom: i < DINOS.length - 1 ? '1px solid var(--border)' : 'none',
            }}>
              <span style={{ fontSize: 16, width: 28 }}>{d.emoji}</span>
              <span style={{ flex: 1, fontSize: 13, fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>{d.name}</span>
              <span className="badge" style={{ background: TIER_COLORS[d.tier] + '18', color: TIER_COLORS[d.tier] }}>{TIER_LABELS[d.tier]}</span>
              <span style={{ fontSize: 12, color: 'var(--accent)', fontFamily: 'var(--font-mono)', minWidth: 60, textAlign: 'right' }}>{d.growthTime}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
