import { useState, useEffect } from 'react';

function load(key, fb) { try { return JSON.parse(localStorage.getItem(key) || JSON.stringify(fb)); } catch { return fb; } }

const TICKET_TYPES = [
  { id: 'suggestion', label: 'Suggestion', icon: '💡', color: 'var(--accent)' },
  { id: 'bug', label: 'Bug Report', icon: '🐛', color: 'var(--red)' },
  { id: 'help', label: 'Help Request', icon: '❓', color: 'var(--blue)' },
  { id: 'report', label: 'Player Report', icon: '🚩', color: '#c0503a' },
];

const STATUSES = [
  { id: 'open', label: 'Open', color: 'var(--green)' },
  { id: 'in-progress', label: 'In Progress', color: 'var(--accent)' },
  { id: 'resolved', label: 'Resolved', color: 'var(--text-dim)' },
  { id: 'declined', label: 'Declined', color: 'var(--red)' },
];

export default function Tickets() {
  const [tickets, setTickets] = useState(() => load('dd-tickets', []));
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: '', type: 'suggestion', author: '', body: '', priority: 'normal' });
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => { localStorage.setItem('dd-tickets', JSON.stringify(tickets)); }, [tickets]);

  const submit = () => {
    if (!form.title.trim() || !form.author.trim()) return;
    const tType = TICKET_TYPES.find(t => t.id === form.type);
    setTickets(prev => [{
      id: Date.now(), ...form, icon: tType.icon, color: tType.color, typeLabel: tType.label,
      status: 'open', createdAt: new Date().toLocaleDateString(), votes: 0,
    }, ...prev]);
    setForm({ title: '', type: 'suggestion', author: '', body: '', priority: 'normal' });
    setShowForm(false);
  };

  const updateStatus = (id, status) => setTickets(prev => prev.map(t => t.id === id ? { ...t, status } : t));
  const vote = (id) => setTickets(prev => prev.map(t => t.id === id ? { ...t, votes: t.votes + 1 } : t));
  const deleteTicket = (id) => setTickets(prev => prev.filter(t => t.id !== id));

  const filtered = tickets.filter(t => {
    if (filterType !== 'all' && t.type !== filterType) return false;
    if (filterStatus !== 'all' && t.status !== filterStatus) return false;
    return true;
  });

  return (
    <div className="page-container fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
        <div>
          <h1 className="page-title">Suggestions & Tickets</h1>
          <p className="page-subtitle">Submit ideas, report issues, or request help. Your voice shapes the community.</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="btn-primary">+ New Ticket</button>
      </div>

      {showForm && (
        <div className="card fade-in" style={{ marginBottom: 24, borderLeft: '3px solid var(--accent)' }}>
          <div className="section-label">Submit a ticket</div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 10 }}>
            <input placeholder="Title" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} style={{ flex: 1, minWidth: 200 }} />
            <select value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))}>
              {TICKET_TYPES.map(t => <option key={t.id} value={t.id}>{t.icon} {t.label}</option>)}
            </select>
            <select value={form.priority} onChange={e => setForm(f => ({ ...f, priority: e.target.value }))}>
              <option value="low">Low Priority</option>
              <option value="normal">Normal</option>
              <option value="high">High Priority</option>
            </select>
          </div>
          <input placeholder="Your name" value={form.author} onChange={e => setForm(f => ({ ...f, author: e.target.value }))} style={{ width: '100%', marginBottom: 10 }} />
          <textarea placeholder="Describe your suggestion, issue, or request..." value={form.body} onChange={e => setForm(f => ({ ...f, body: e.target.value }))} style={{ width: '100%', minHeight: 80, marginBottom: 12, resize: 'vertical' }} />
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={submit} className="btn-primary">Submit</button>
            <button onClick={() => setShowForm(false)} className="btn-ghost">Cancel</button>
          </div>
        </div>
      )}

      {/* Filters */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 8, flexWrap: 'wrap' }}>
        {[{ id: 'all', label: 'All Types' }, ...TICKET_TYPES].map(t => (
          <button key={t.id} onClick={() => setFilterType(t.id)}
            className={filterType === t.id ? 'btn-primary' : 'btn-ghost'} style={{ fontSize: 11 }}
          >{t.icon || '📋'} {t.label}</button>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
        {[{ id: 'all', label: 'All' }, ...STATUSES].map(s => (
          <button key={s.id} onClick={() => setFilterStatus(s.id)}
            className={filterStatus === s.id ? 'btn-primary' : 'btn-ghost'} style={{ fontSize: 10 }}
          >{s.label}</button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', color: 'var(--text-dim)', fontStyle: 'italic', padding: 48 }}>
          No tickets found. Be the first to share your thoughts!
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {filtered.map(ticket => {
            const st = STATUSES.find(s => s.id === ticket.status);
            return (
              <div key={ticket.id} className="card" style={{ borderLeft: `3px solid ${ticket.color}` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                      <span style={{ fontSize: 16 }}>{ticket.icon}</span>
                      <span style={{ fontFamily: 'var(--font-display)', fontSize: 15, color: 'var(--text-primary)' }}>{ticket.title}</span>
                      <span className="badge" style={{ background: st.color + '18', color: st.color }}>{st.label}</span>
                      {ticket.priority === 'high' && <span className="badge" style={{ background: 'rgba(192,80,58,0.15)', color: 'var(--red)' }}>HIGH</span>}
                    </div>
                    <div style={{ fontSize: 11, color: 'var(--text-dim)', marginBottom: 6 }}>
                      by {ticket.author} · {ticket.createdAt} · {ticket.typeLabel}
                    </div>
                    {ticket.body && <p style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.6 }}>{ticket.body}</p>}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, minWidth: 50 }}>
                    <button onClick={() => vote(ticket.id)} className="btn-ghost" style={{ fontSize: 16, padding: 4 }}>▲</button>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 14, color: 'var(--accent)', fontWeight: 700 }}>{ticket.votes}</span>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 6, marginTop: 10 }}>
                  {STATUSES.filter(s => s.id !== ticket.status).map(s => (
                    <button key={s.id} onClick={() => updateStatus(ticket.id, s.id)} className="btn-ghost" style={{ fontSize: 10 }}>
                      → {s.label}
                    </button>
                  ))}
                  <button onClick={() => deleteTicket(ticket.id)} className="btn-ghost" style={{ fontSize: 10, color: 'var(--red)', marginLeft: 'auto' }}>Delete</button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
