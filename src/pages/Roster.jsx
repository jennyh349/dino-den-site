import { useState, useEffect } from 'react';
import { DINOS } from '../data/dinos.js';

function load(key, fallback) {
  try { return JSON.parse(localStorage.getItem(key) || JSON.stringify(fallback)); } catch { return fallback; }
}

export default function Roster() {
  const [packs, setPacks] = useState(() => load('dd-packs', []));
  const [showForm, setShowForm] = useState(false);
  const [newPack, setNewPack] = useState({ name: '', type: 'pack', desc: '' });
  const [addMember, setAddMember] = useState({ packId: null, name: '', dino: DINOS[0].id, role: 'Member' });

  useEffect(() => { localStorage.setItem('dd-packs', JSON.stringify(packs)); }, [packs]);

  const createPack = () => {
    if (!newPack.name.trim()) return;
    setPacks(prev => [...prev, { id: Date.now(), ...newPack, members: [], createdAt: new Date().toLocaleDateString() }]);
    setNewPack({ name: '', type: 'pack', desc: '' });
    setShowForm(false);
  };

  const deletePack = (id) => setPacks(prev => prev.filter(p => p.id !== id));

  const addMemberToPack = (packId) => {
    if (!addMember.name.trim()) return;
    const dino = DINOS.find(d => d.id === addMember.dino);
    setPacks(prev => prev.map(p => p.id === packId ? {
      ...p, members: [...p.members, {
        id: Date.now(), name: addMember.name, dinoId: dino.id,
        dinoName: dino.name, dinoEmoji: dino.emoji, dinoColor: dino.color,
        role: addMember.role, joinedAt: new Date().toLocaleDateString(),
      }]
    } : p));
    setAddMember({ packId: null, name: '', dino: DINOS[0].id, role: 'Member' });
  };

  const removeMember = (packId, memberId) => {
    setPacks(prev => prev.map(p => p.id === packId ? { ...p, members: p.members.filter(m => m.id !== memberId) } : p));
  };

  return (
    <div className="page-container fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
        <div>
          <h1 className="page-title">Pack & Herd Roster</h1>
          <p className="page-subtitle">Organize your groups, track members, and coordinate your next hunt or migration.</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="btn-primary">
          + New Group
        </button>
      </div>

      {showForm && (
        <div className="card fade-in" style={{ marginBottom: 24, borderLeft: '3px solid var(--accent)' }}>
          <div className="section-label">Create a new group</div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 12 }}>
            <input placeholder="Group name" value={newPack.name} onChange={e => setNewPack(p => ({ ...p, name: e.target.value }))} style={{ flex: 1, minWidth: 200 }} />
            <select value={newPack.type} onChange={e => setNewPack(p => ({ ...p, type: e.target.value }))}>
              <option value="pack">🦷 Carnivore Pack</option>
              <option value="herd">🌿 Herbivore Herd</option>
              <option value="flock">🦅 Mixed Flock</option>
            </select>
          </div>
          <input placeholder="Description (optional)" value={newPack.desc} onChange={e => setNewPack(p => ({ ...p, desc: e.target.value }))} style={{ width: '100%', marginBottom: 12 }} />
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={createPack} className="btn-primary">Create</button>
            <button onClick={() => setShowForm(false)} className="btn-ghost">Cancel</button>
          </div>
        </div>
      )}

      {packs.length === 0 ? (
        <div style={{ textAlign: 'center', padding: 60, color: 'var(--text-dim)', fontStyle: 'italic' }}>
          No groups yet. Create your first pack or herd to get started.
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {packs.map(pack => (
            <div key={pack.id} className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 18 }}>{pack.type === 'pack' ? '🦷' : pack.type === 'herd' ? '🌿' : '🦅'}</span>
                    <span style={{ fontFamily: 'var(--font-display)', fontSize: 18, color: 'var(--text-primary)', fontStyle: 'italic' }}>{pack.name}</span>
                    <span className="badge" style={{ background: 'var(--bg-elevated)', color: 'var(--text-muted)' }}>
                      {pack.members.length} members
                    </span>
                  </div>
                  {pack.desc && <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>{pack.desc}</p>}
                </div>
                <button onClick={() => deletePack(pack.id)} className="btn-ghost" style={{ color: 'var(--red)' }}>Delete</button>
              </div>

              {/* Members */}
              {pack.members.length > 0 && (
                <div style={{ marginBottom: 16 }}>
                  {pack.members.map(m => (
                    <div key={m.id} style={{
                      display: 'flex', alignItems: 'center', gap: 12, padding: '8px 12px',
                      borderBottom: '1px solid var(--border)',
                    }}>
                      <span style={{ fontSize: 18 }}>{m.dinoEmoji}</span>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 13, color: 'var(--text-primary)' }}>{m.name}</div>
                        <div style={{ fontSize: 10, color: 'var(--text-dim)' }}>{m.dinoName} · {m.role}</div>
                      </div>
                      <button onClick={() => removeMember(pack.id, m.id)} className="btn-ghost" style={{ fontSize: 12, color: 'var(--text-dim)' }}>✕</button>
                    </div>
                  ))}
                </div>
              )}

              {/* Add Member */}
              {addMember.packId === pack.id ? (
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', padding: '8px 0' }}>
                  <input placeholder="Player name" value={addMember.name} onChange={e => setAddMember(p => ({ ...p, name: e.target.value }))} style={{ flex: 1, minWidth: 120 }} />
                  <select value={addMember.dino} onChange={e => setAddMember(p => ({ ...p, dino: e.target.value }))} style={{ minWidth: 140 }}>
                    {DINOS.map(d => <option key={d.id} value={d.id}>{d.emoji} {d.name}</option>)}
                  </select>
                  <select value={addMember.role} onChange={e => setAddMember(p => ({ ...p, role: e.target.value }))}>
                    <option>Leader</option><option>Member</option><option>Scout</option><option>Tank</option><option>Healer</option>
                  </select>
                  <button onClick={() => addMemberToPack(pack.id)} className="btn-primary" style={{ fontSize: 11 }}>Add</button>
                  <button onClick={() => setAddMember(p => ({ ...p, packId: null }))} className="btn-ghost">Cancel</button>
                </div>
              ) : (
                <button onClick={() => setAddMember(p => ({ ...p, packId: pack.id }))} className="btn-outline" style={{ fontSize: 11 }}>+ Add Member</button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
