import { useState, useEffect } from 'react';

function load(key, fb) { try { return JSON.parse(localStorage.getItem(key) || JSON.stringify(fb)); } catch { return fb; } }

const EVENT_TYPES = [
  { id: 'hunt', label: 'Group Hunt', icon: '🦷', color: 'var(--red)' },
  { id: 'migration', label: 'Migration', icon: '🗺️', color: 'var(--blue)' },
  { id: 'tournament', label: 'Tournament', icon: '🏆', color: 'var(--accent)' },
  { id: 'social', label: 'Social Gathering', icon: '🦕', color: 'var(--green)' },
  { id: 'nesting', label: 'Nesting Event', icon: '🥚', color: 'var(--purple)' },
  { id: 'other', label: 'Other', icon: '📅', color: 'var(--text-muted)' },
];

export default function Events() {
  const [events, setEvents] = useState(() => load('dd-events', []));
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: '', type: 'hunt', date: '', time: '', desc: '', host: '' });

  useEffect(() => { localStorage.setItem('dd-events', JSON.stringify(events)); }, [events]);

  const submit = () => {
    if (!form.title.trim() || !form.date) return;
    const evType = EVENT_TYPES.find(t => t.id === form.type);
    setEvents(prev => [...prev, {
      id: Date.now(), ...form, icon: evType.icon, color: evType.color, typeLabel: evType.label,
      createdAt: new Date().toLocaleDateString(),
    }].sort((a, b) => new Date(a.date) - new Date(b.date)));
    setForm({ title: '', type: 'hunt', date: '', time: '', desc: '', host: '' });
    setShowForm(false);
  };

  const deleteEvent = (id) => setEvents(prev => prev.filter(e => e.id !== id));

  const now = new Date();
  const upcoming = events.filter(e => new Date(e.date + 'T' + (e.time || '23:59')) >= now);
  const past = events.filter(e => new Date(e.date + 'T' + (e.time || '23:59')) < now);

  return (
    <div className="page-container fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
        <div>
          <h1 className="page-title">Event Schedule</h1>
          <p className="page-subtitle">Upcoming server events, community hunts, and gatherings. Never miss a moment.</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="btn-primary">+ Schedule Event</button>
      </div>

      {showForm && (
        <div className="card fade-in" style={{ marginBottom: 24, borderLeft: '3px solid var(--accent)' }}>
          <div className="section-label">Schedule a new event</div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 10 }}>
            <input placeholder="Event name" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} style={{ flex: 1, minWidth: 200 }} />
            <select value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))}>
              {EVENT_TYPES.map(t => <option key={t.id} value={t.id}>{t.icon} {t.label}</option>)}
            </select>
          </div>
          <div style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
            <input type="date" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} style={{ flex: 1 }} />
            <input type="time" value={form.time} onChange={e => setForm(f => ({ ...f, time: e.target.value }))} style={{ flex: 1 }} />
            <input placeholder="Hosted by" value={form.host} onChange={e => setForm(f => ({ ...f, host: e.target.value }))} style={{ flex: 1 }} />
          </div>
          <textarea placeholder="Description (optional)" value={form.desc} onChange={e => setForm(f => ({ ...f, desc: e.target.value }))} style={{ width: '100%', minHeight: 60, marginBottom: 12, resize: 'vertical' }} />
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={submit} className="btn-primary">Create Event</button>
            <button onClick={() => setShowForm(false)} className="btn-ghost">Cancel</button>
          </div>
        </div>
      )}

      {/* Upcoming */}
      <div className="section-label" style={{ color: 'var(--green)' }}>Upcoming events ({upcoming.length})</div>
      {upcoming.length === 0 ? (
        <div className="card" style={{ marginBottom: 32, textAlign: 'center', color: 'var(--text-dim)', fontStyle: 'italic' }}>No upcoming events scheduled.</div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 32 }}>
          {upcoming.map(ev => (
            <div key={ev.id} className="card" style={{ borderLeft: `3px solid ${ev.color}` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <span style={{ fontSize: 28, marginTop: 2 }}>{ev.icon}</span>
                  <div>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontStyle: 'italic', color: 'var(--text-primary)' }}>{ev.title}</div>
                    <div style={{ display: 'flex', gap: 12, marginTop: 4, fontSize: 12 }}>
                      <span className="badge" style={{ background: 'var(--bg-elevated)', color: ev.color }}>{ev.typeLabel}</span>
                      <span style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)' }}>{ev.date} {ev.time && `at ${ev.time}`}</span>
                      {ev.host && <span style={{ color: 'var(--text-dim)' }}>Hosted by {ev.host}</span>}
                    </div>
                    {ev.desc && <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 8, lineHeight: 1.6 }}>{ev.desc}</p>}
                  </div>
                </div>
                <button onClick={() => deleteEvent(ev.id)} className="btn-ghost" style={{ color: 'var(--text-dim)' }}>✕</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {past.length > 0 && (
        <>
          <div className="section-label" style={{ color: 'var(--text-dim)' }}>Past events ({past.length})</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, opacity: 0.6 }}>
            {past.map(ev => (
              <div key={ev.id} className="card" style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ fontSize: 18 }}>{ev.icon}</span>
                <span style={{ flex: 1, fontSize: 13, color: 'var(--text-muted)' }}>{ev.title}</span>
                <span style={{ fontSize: 11, color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>{ev.date}</span>
                <button onClick={() => deleteEvent(ev.id)} className="btn-ghost" style={{ fontSize: 11, color: 'var(--text-dim)' }}>✕</button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
