import { useState, useEffect } from 'react';

function load(key, fb) { try { return JSON.parse(localStorage.getItem(key) || JSON.stringify(fb)); } catch { return fb; } }

export default function Apply() {
  const [applications, setApplications] = useState(() => load('dd-applications', []));
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    discordName: '', age: '', timezone: '', experience: '', favoritesDino: '',
    rpExperience: '', whyJoin: '', rules: false, mic: 'no',
  });

  useEffect(() => { localStorage.setItem('dd-applications', JSON.stringify(applications)); }, [applications]);

  const submit = () => {
    if (!form.discordName.trim() || !form.whyJoin.trim() || !form.rules) return;
    setApplications(prev => [{
      id: Date.now(), ...form, status: 'pending',
      submittedAt: new Date().toLocaleDateString(),
    }, ...prev]);
    setSubmitted(true);
  };

  const updateStatus = (id, status) => setApplications(prev => prev.map(a => a.id === id ? { ...a, status } : a));

  if (submitted) {
    return (
      <div className="page-container fade-in" style={{ textAlign: 'center', paddingTop: 80 }}>
        <span style={{ fontSize: 48 }}>✅</span>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontStyle: 'italic', color: 'var(--accent)', marginTop: 16 }}>
          Application submitted!
        </h2>
        <p style={{ fontSize: 14, color: 'var(--text-muted)', marginTop: 12, maxWidth: 400, margin: '12px auto', lineHeight: 1.7 }}>
          Thank you for applying to Dino Den. Our team will review your application and get back to you through Discord.
        </p>
        <button onClick={() => { setSubmitted(false); setForm({ discordName: '', age: '', timezone: '', experience: '', favoritesDino: '', rpExperience: '', whyJoin: '', rules: false, mic: 'no' }); }} className="btn-outline" style={{ marginTop: 20 }}>
          Submit another application
        </button>
      </div>
    );
  }

  return (
    <div className="page-container fade-in">
      <h1 className="page-title">Apply to Dino Den</h1>
      <p className="page-subtitle">Want to join our community? Fill out the application below and we'll review it.</p>

      <div className="grid-2" style={{ gap: 32 }}>
        {/* Application Form */}
        <div>
          <div className="section-label">Your application</div>
          <div className="card" style={{ borderLeft: '3px solid var(--accent)' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div>
                <label style={{ fontSize: 12, color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>Discord username *</label>
                <input value={form.discordName} onChange={e => setForm(f => ({ ...f, discordName: e.target.value }))} placeholder="YourName#1234" style={{ width: '100%' }} />
              </div>
              <div className="grid-2" style={{ gap: 10 }}>
                <div>
                  <label style={{ fontSize: 12, color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>Age</label>
                  <input value={form.age} onChange={e => setForm(f => ({ ...f, age: e.target.value }))} placeholder="18+" style={{ width: '100%' }} />
                </div>
                <div>
                  <label style={{ fontSize: 12, color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>Timezone</label>
                  <input value={form.timezone} onChange={e => setForm(f => ({ ...f, timezone: e.target.value }))} placeholder="EST, PST, GMT..." style={{ width: '100%' }} />
                </div>
              </div>
              <div>
                <label style={{ fontSize: 12, color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>Experience with The Isle</label>
                <select value={form.experience} onChange={e => setForm(f => ({ ...f, experience: e.target.value }))} style={{ width: '100%' }}>
                  <option value="">Select...</option>
                  <option value="new">Brand new — just bought it</option>
                  <option value="some">Some experience (under 100 hrs)</option>
                  <option value="experienced">Experienced (100-500 hrs)</option>
                  <option value="veteran">Veteran (500+ hrs)</option>
                </select>
              </div>
              <div>
                <label style={{ fontSize: 12, color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>Favorite dinosaur</label>
                <input value={form.favoritesDino} onChange={e => setForm(f => ({ ...f, favoritesDino: e.target.value }))} placeholder="What do you love to play?" style={{ width: '100%' }} />
              </div>
              <div>
                <label style={{ fontSize: 12, color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>Do you have a mic?</label>
                <select value={form.mic} onChange={e => setForm(f => ({ ...f, mic: e.target.value }))} style={{ width: '100%' }}>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                  <option value="sometimes">Sometimes</option>
                </select>
              </div>
              <div>
                <label style={{ fontSize: 12, color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>Why do you want to join Dino Den? *</label>
                <textarea value={form.whyJoin} onChange={e => setForm(f => ({ ...f, whyJoin: e.target.value }))} placeholder="Tell us about yourself and why you'd be a good fit..." style={{ width: '100%', minHeight: 100, resize: 'vertical' }} />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <input type="checkbox" checked={form.rules} onChange={e => setForm(f => ({ ...f, rules: e.target.checked }))} style={{ width: 16, height: 16 }} />
                <label style={{ fontSize: 12, color: 'var(--text-secondary)' }}>I have read and agree to follow the Dino Den server rules *</label>
              </div>
              <button onClick={submit} className="btn-primary" style={{ marginTop: 8 }}
                disabled={!form.discordName.trim() || !form.whyJoin.trim() || !form.rules}
              >
                Submit Application
              </button>
            </div>
          </div>
        </div>

        {/* Info Panel */}
        <div>
          <div className="section-label">What to expect</div>
          <div className="card" style={{ marginBottom: 16 }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontStyle: 'italic', color: 'var(--accent)', marginBottom: 10 }}>Our review process</div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.8 }}>
              Applications are reviewed by our mod team, usually within 24-48 hours. We'll reach out to you on Discord once a decision is made.
              We're looking for players who are chill, respectful, and want to be part of a positive community. Experience level doesn't matter — attitude does.
            </div>
          </div>
          <div className="card" style={{ marginBottom: 16 }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontStyle: 'italic', color: 'var(--green)', marginBottom: 10 }}>What we offer</div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.8 }}>
              Active community, organized events, pack/herd coordination, dedicated mod team,
              fair rules, and a welcoming environment for all experience levels.
            </div>
          </div>

          {/* Admin: Application List */}
          {applications.length > 0 && (
            <div>
              <div className="section-label" style={{ marginTop: 24 }}>Submitted applications ({applications.length})</div>
              {applications.map(app => (
                <div key={app.id} className="card" style={{ marginBottom: 8, padding: '12px 16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontSize: 13, color: 'var(--text-primary)', fontWeight: 600 }}>{app.discordName}</div>
                      <div style={{ fontSize: 10, color: 'var(--text-dim)' }}>{app.submittedAt} · {app.experience || 'No exp listed'}</div>
                    </div>
                    <div style={{ display: 'flex', gap: 4 }}>
                      <span className="badge" style={{
                        background: app.status === 'pending' ? 'rgba(212,160,83,0.15)' : app.status === 'approved' ? 'rgba(107,143,78,0.15)' : 'rgba(192,80,58,0.15)',
                        color: app.status === 'pending' ? 'var(--accent)' : app.status === 'approved' ? 'var(--green)' : 'var(--red)',
                      }}>{app.status}</span>
                    </div>
                  </div>
                  {app.status === 'pending' && (
                    <div style={{ display: 'flex', gap: 6, marginTop: 8 }}>
                      <button onClick={() => updateStatus(app.id, 'approved')} className="btn-ghost" style={{ fontSize: 10, color: 'var(--green)' }}>✓ Approve</button>
                      <button onClick={() => updateStatus(app.id, 'denied')} className="btn-ghost" style={{ fontSize: 10, color: 'var(--red)' }}>✕ Deny</button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
