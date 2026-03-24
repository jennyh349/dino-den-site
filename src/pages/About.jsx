import { useState } from 'react';

const STAFF = [
  { name: 'Dan', role: 'Owner / Developer', color: '#e23c3c', tag: 'OWNER', desc: 'Server infrastructure, development, and technical operations.' },
];

const RULES = [
  { num: '01', title: 'Be cool to each other', body: 'Treat people the way you\'d want to be treated. Trash talk in good fun is fine — targeted harassment, slurs, bigotry, or bullying is not. If someone asks you to stop, stop.' },
  { num: '02', title: 'No toxicity or drama-stirring', body: 'Don\'t bring personal beef into public channels. If you have an issue with someone, handle it privately or reach out to a mod. Starting drama or dragging people publicly will be addressed.' },
  { num: '03', title: 'Keep it clean-ish', body: 'We\'re not the language police, but keep things within reason. No NSFW content, no shock content, and nothing that would make someone uncomfortable scrolling through chat.' },
  { num: '04', title: 'No cheating or exploiting', body: 'Play fair. Using hacks, exploits, glitches, or third-party tools to gain an unfair advantage ruins the experience for everyone. Find a bug? Report it — don\'t abuse it.' },
  { num: '05', title: 'No spam or self-promotion', body: 'Don\'t flood chat with repeated messages, excessive caps, or copypastas. Advertising without permission from a mod is not allowed. We\'re happy to support creators — just ask first.' },
  { num: '06', title: 'Listen to the mods', body: 'Our mod team keeps things running smoothly. If a mod asks you to chill or drop a topic, please respect that. If you feel a decision was unfair, reach out to an admin privately.' },
  { num: '07', title: 'No impersonation', body: 'Don\'t pretend to be a mod, admin, or another community member. This includes misleading usernames, profile pictures, or roles.' },
  { num: '08', title: 'Use channels properly', body: 'Keep conversations in the right channels. Game discussion in game channels, off-topic in off-topic. It helps keep things organized for everyone.' },
];

const VALUES = [
  { icon: '🤝', title: 'Respect first', desc: 'Every member matters. We treat each other with respect regardless of skill level, playtime, or background.' },
  { icon: '🎮', title: 'Fair play', desc: 'No cheats, no exploits, no shortcuts. We earn our wins and our fun the honest way.' },
  { icon: '🌱', title: 'Growing together', desc: 'New players are welcome. Veterans help newcomers. We all started somewhere.' },
  { icon: '🛡️', title: 'Safe space', desc: 'Everyone should feel comfortable here. Zero tolerance for harassment, bigotry, or toxicity.' },
];

export default function About() {
  const [activeSection, setActiveSection] = useState('about');

  return (
    <div className="mfg-context fade-in">
      {/* Hero */}
      <div style={{
        padding: '56px 24px 40px', textAlign: 'center',
        borderBottom: '1px solid var(--mfg-border)',
      }}>
        <div style={{
          fontFamily: 'var(--font-main)', fontSize: 10, letterSpacing: 3,
          color: 'var(--mfg-text-dim)', textTransform: 'uppercase', marginBottom: 14,
        }}>About the community</div>
        <h1 style={{
          fontFamily: 'var(--font-main)', fontSize: 36, fontWeight: 800,
          color: 'var(--mfg-text-primary)', marginBottom: 12, lineHeight: 1.1,
        }}>
          MAX FORCE <span style={{ color: 'var(--mfg-red)' }}>GAMING</span>
        </h1>
        <p style={{
          fontSize: 15, color: 'var(--mfg-text-muted)', maxWidth: 520,
          margin: '0 auto', lineHeight: 1.7,
        }}>
          A community built on fair play, good vibes, and a shared love for gaming.
          We host game servers, build tools, and create a home for players who want
          something better than the average public lobby.
        </p>
      </div>

      {/* Section Nav */}
      <div style={{
        display: 'flex', justifyContent: 'center', gap: 4, padding: '12px 24px',
        borderBottom: '1px solid var(--mfg-border)', position: 'sticky', top: 48, zIndex: 50,
        background: 'rgba(8,8,12,0.95)', backdropFilter: 'blur(8px)',
      }}>
        {[
          { id: 'about', label: 'About Us' },
          { id: 'staff', label: 'Staff' },
          { id: 'rules', label: 'Community Rules' },
        ].map(s => (
          <button key={s.id} onClick={() => setActiveSection(s.id)} style={{
            padding: '8px 20px', borderRadius: 'var(--radius)', fontSize: 13,
            fontWeight: activeSection === s.id ? 600 : 400,
            background: activeSection === s.id ? 'var(--mfg-bg-elevated)' : 'transparent',
            color: activeSection === s.id ? 'var(--mfg-red)' : 'var(--mfg-text-muted)',
            border: activeSection === s.id ? '1px solid var(--mfg-border-light)' : '1px solid transparent',
          }}>{s.label}</button>
        ))}
      </div>

      <div style={{ maxWidth: 900, margin: '0 auto', padding: '40px 24px' }}>
        {/* === ABOUT === */}
        {activeSection === 'about' && (
          <div className="fade-in">
            {/* Origin story */}
            <div style={{ marginBottom: 48 }}>
              <div style={{
                fontSize: 10, letterSpacing: 2.5, color: 'var(--mfg-text-dim)',
                fontFamily: 'var(--font-mono)', marginBottom: 16, textTransform: 'uppercase',
              }}>Our story</div>
              <div style={{
                fontSize: 17, color: 'var(--mfg-text-secondary)', lineHeight: 1.9,
                maxWidth: 680,
              }}>
                Max Force Gaming started as a simple idea: <span style={{ color: 'var(--mfg-text-primary)', fontWeight: 600 }}>what if there was a gaming community that actually felt like home?</span>
                <br /><br />
                No toxic lobbies. No power-tripping admins. No pay-to-win nonsense.
                Just a group of gamers who respect each other and want to have a great time together.
                <br /><br />
                We host dedicated game servers with active moderation, build custom tools for our communities,
                and put in the work to make sure every player — whether you just joined or you've been here since day one — has
                the best experience possible.
              </div>
            </div>

            {/* Values */}
            <div style={{ marginBottom: 48 }}>
              <div style={{
                fontSize: 10, letterSpacing: 2.5, color: 'var(--mfg-text-dim)',
                fontFamily: 'var(--font-mono)', marginBottom: 16, textTransform: 'uppercase',
              }}>What we stand for</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
                {VALUES.map((v, i) => (
                  <div key={i} style={{
                    background: 'var(--mfg-bg-card)', border: '1px solid var(--mfg-border)',
                    borderRadius: 'var(--radius-lg)', padding: 24,
                  }}>
                    <div style={{ fontSize: 24, marginBottom: 12 }}>{v.icon}</div>
                    <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--mfg-text-primary)', marginBottom: 6 }}>{v.title}</div>
                    <div style={{ fontSize: 13, color: 'var(--mfg-text-muted)', lineHeight: 1.7 }}>{v.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Discord CTA */}
            <div style={{
              background: 'var(--mfg-bg-card)', border: '1px solid var(--mfg-border)',
              borderRadius: 'var(--radius-lg)', padding: 32, textAlign: 'center',
            }}>
              <div style={{ fontSize: 22, fontWeight: 700, color: 'var(--mfg-text-primary)', marginBottom: 8 }}>
                Ready to join?
              </div>
              <p style={{ fontSize: 14, color: 'var(--mfg-text-muted)', marginBottom: 20, lineHeight: 1.7 }}>
                Hop into our Discord and say hello. We don't bite — unless you're playing a Carnotaurus.
              </p>
              <a href="https://discord.gg/kGsvjxTzCZ" target="_blank" rel="noreferrer">
                <button className="mfg-btn-discord" style={{ fontSize: 14, padding: '10px 28px' }}>
                  Join the Discord
                </button>
              </a>
            </div>
          </div>
        )}

        {/* === STAFF === */}
        {activeSection === 'staff' && (
          <div className="fade-in">
            <div style={{
              fontSize: 10, letterSpacing: 2.5, color: 'var(--mfg-text-dim)',
              fontFamily: 'var(--font-mono)', marginBottom: 16, textTransform: 'uppercase',
            }}>The team</div>
            <p style={{ fontSize: 14, color: 'var(--mfg-text-muted)', marginBottom: 32, lineHeight: 1.7 }}>
              The people who keep Max Force Gaming running. Reach out to any of us if you need help.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16, marginBottom: 40 }}>
              {STAFF.map((s, i) => (
                <div key={i} style={{
                  background: 'var(--mfg-bg-card)', border: '1px solid var(--mfg-border)',
                  borderRadius: 'var(--radius-lg)', padding: 24,
                  borderTop: `3px solid ${s.color}`,
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 12 }}>
                    <div style={{
                      width: 48, height: 48, borderRadius: '50%',
                      background: s.color + '20', border: `2px solid ${s.color}40`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 18, fontWeight: 800, color: s.color, fontFamily: 'var(--font-main)',
                    }}>{s.name.charAt(0)}</div>
                    <div>
                      <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--mfg-text-primary)' }}>{s.name}</div>
                      <div style={{ display: 'flex', gap: 6, alignItems: 'center', marginTop: 2 }}>
                        <span style={{
                          fontSize: 9, padding: '2px 8px', borderRadius: 3,
                          background: s.color + '18', color: s.color,
                          fontFamily: 'var(--font-mono)', letterSpacing: 1.5, fontWeight: 600,
                        }}>{s.tag}</span>
                        <span style={{ fontSize: 12, color: 'var(--mfg-text-muted)' }}>{s.role}</span>
                      </div>
                    </div>
                  </div>
                  <p style={{ fontSize: 13, color: 'var(--mfg-text-muted)', lineHeight: 1.6 }}>{s.desc}</p>
                </div>
              ))}

              {/* Placeholder for more staff */}
              <div style={{
                background: 'var(--mfg-bg-card)', border: '1px dashed var(--mfg-border)',
                borderRadius: 'var(--radius-lg)', padding: 24,
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                minHeight: 140, opacity: 0.5,
              }}>
                <div style={{ fontSize: 20, marginBottom: 8 }}>➕</div>
                <div style={{ fontSize: 13, color: 'var(--mfg-text-dim)' }}>More staff coming soon</div>
                <div style={{ fontSize: 11, color: 'var(--mfg-text-dim)', marginTop: 4 }}>Interested? Apply in Discord</div>
              </div>
            </div>

            <div style={{
              background: 'var(--mfg-bg-card)', border: '1px solid var(--mfg-border)',
              borderRadius: 'var(--radius-lg)', padding: 24,
            }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--mfg-text-primary)', marginBottom: 8 }}>
                Want to join the team?
              </div>
              <p style={{ fontSize: 13, color: 'var(--mfg-text-muted)', lineHeight: 1.7 }}>
                We're always looking for mature, active community members who want to help out.
                If you're interested in becoming a moderator, reach out to any staff member in Discord
                or submit an application through the site.
              </p>
            </div>
          </div>
        )}

        {/* === RULES === */}
        {activeSection === 'rules' && (
          <div className="fade-in">
            <div style={{
              fontSize: 10, letterSpacing: 2.5, color: 'var(--mfg-text-dim)',
              fontFamily: 'var(--font-mono)', marginBottom: 16, textTransform: 'uppercase',
            }}>Community guidelines</div>
            <p style={{ fontSize: 14, color: 'var(--mfg-text-muted)', marginBottom: 32, lineHeight: 1.7 }}>
              We're here to have a good time. These rules exist to keep things fun and fair for everyone — not to be a buzzkill.
              Please give them a read.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 40 }}>
              {RULES.map((r, i) => (
                <div key={i} style={{
                  background: 'var(--mfg-bg-card)', border: '1px solid var(--mfg-border)',
                  borderRadius: 'var(--radius-lg)', padding: '20px 24px',
                  display: 'flex', gap: 20, alignItems: 'flex-start',
                }}>
                  <div style={{
                    fontFamily: 'var(--font-mono)', fontSize: 20, fontWeight: 700,
                    color: 'var(--mfg-red)', opacity: 0.6, minWidth: 36, paddingTop: 2,
                  }}>{r.num}</div>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--mfg-text-primary)', marginBottom: 6 }}>
                      {r.title}
                    </div>
                    <p style={{ fontSize: 13, color: 'var(--mfg-text-muted)', lineHeight: 1.7 }}>{r.body}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Enforcement */}
            <div style={{
              background: 'var(--mfg-bg-card)', border: '1px solid var(--mfg-border)',
              borderRadius: 'var(--radius-lg)', padding: 28,
              borderLeft: '3px solid var(--mfg-red)',
            }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--mfg-text-primary)', marginBottom: 10 }}>
                How we handle things
              </div>
              <p style={{ fontSize: 13, color: 'var(--mfg-text-muted)', lineHeight: 1.8 }}>
                We don't do rigid strike systems — our mods use their best judgment based on the situation.
                Minor stuff usually gets a friendly heads-up. Repeated or serious issues may lead to mutes,
                kicks, or bans depending on what happened. We're fair, but we prioritize keeping this a welcoming space.
              </p>
              <p style={{ fontSize: 13, color: 'var(--mfg-text-muted)', lineHeight: 1.8, marginTop: 12 }}>
                If you see something that breaks the rules, don't engage — just ping a mod or use the report feature.
              </p>
            </div>

            {/* Legal footer */}
            <div style={{
              marginTop: 24, padding: '16px 0', borderTop: '1px solid var(--mfg-border)',
              fontSize: 11, color: 'var(--mfg-text-dim)', lineHeight: 1.6,
            }}>
              By participating in Max Force Gaming communities, you agree to follow these rules as well as
              Discord's <a href="https://discord.com/terms" target="_blank" rel="noreferrer" style={{ color: 'var(--mfg-text-muted)' }}>Terms of Service</a> and <a href="https://discord.com/guidelines" target="_blank" rel="noreferrer" style={{ color: 'var(--mfg-text-muted)' }}>Community Guidelines</a>.
              Rules may be updated as needed — we'll always announce changes.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
