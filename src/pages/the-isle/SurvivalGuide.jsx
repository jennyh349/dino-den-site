import { useState } from 'react';

const GUIDES = [
  {
    id: 'beginner', title: 'Beginner\'s field manual', icon: '📗',
    sections: [
      { title: 'Choosing your first dinosaur', content: 'Start with Dryosaurus (herbivore) or Ceratosaurus (carnivore). Both have short growth times and forgiving mechanics. Dryo teaches you the map through pure speed. Cerato teaches hunting through scent tracking.' },
      { title: 'Understanding growth', content: 'Every dino starts as a hatchling and grows to adult over time. Eating the right food (Perfect Diet) speeds this up. Dying means starting over — survival is everything.' },
      { title: 'The #1 rule', content: 'Water is life and death. You must drink regularly, but water sources are where Deinosuchus hunts. Always approach water cautiously — look for bubbles, listen for splashes, and never stand still at the edge.' },
      { title: 'Using calls wisely', content: 'Your calls can attract both friends and enemies. Use broadcast calls to find your species, but be aware predators can hear you too. Friendly calls are shorter range and safer for close communication.' },
    ]
  },
  {
    id: 'combat', title: 'Combat & hunting tactics', icon: '⚔️',
    sections: [
      { title: 'Bleed-and-run', content: 'The most effective hunting strategy for mid-tier carnivores. Bite your target to apply bleed, then disengage and follow at a safe distance. Repeat until the prey weakens. This minimizes your risk of taking damage.' },
      { title: 'Pack coordination', content: 'When hunting in packs, designate a chaser and flankers. The chaser applies pressure while flankers cut off escape routes. For pounce-capable dinos like Omniraptor, coordinate simultaneous pounces for quick kills.' },
      { title: 'Herbivore defense', content: 'Always keep your strongest side facing the threat — tail for Stego, horns for Diablo/Trike. Form circles with your herd, vulnerable members in the center. Never run unless you have a clear speed advantage.' },
      { title: 'Terrain advantage', content: 'Forests favor small agile dinos. Open plains favor pursuit predators like Carno. Water crossings are Deino territory. Hills and ridges give visibility advantage. Always fight on terrain that suits YOUR dino.' },
    ]
  },
  {
    id: 'survival', title: 'Advanced survival', icon: '🏕️',
    sections: [
      { title: 'Map knowledge is everything', content: 'Learn the water sources, food spawns, common travel routes, and danger zones. The island has predictable patterns — players cluster around central water and move along river paths. Use this knowledge to hunt or avoid hunters.' },
      { title: 'Night-time strategy', content: 'Nighttime favors Dilophosaurus and Troodon (night vision). If you don\'t have night vision, find a safe spot and stay still. Moving in the dark is how you walk into ambushes. If you must travel, stick to open areas where silhouettes are visible.' },
      { title: 'The grow-to-adult mindset', content: 'Your #1 goal is reaching adult. Don\'t take unnecessary fights as a juvenile or sub-adult. Play cautiously, eat consistently, and avoid high-traffic areas until you can defend yourself. A dead sub-adult means hours wasted.' },
      { title: 'Reading the environment', content: 'Listen for footsteps, calls, and water splashes. Watch for flock birds (they scatter when large dinos pass). Scent tracks on the ground tell you what passed through recently. Every environmental cue is information.' },
    ]
  },
  {
    id: 'herding', title: 'Herding & pack life', icon: '🦕',
    sections: [
      { title: 'Finding your group', content: 'Use broadcast calls to find your species. Approach slowly and use friendly calls to signal peaceful intent. Most players are open to grouping up — strength in numbers is real in The Isle.' },
      { title: 'Herd composition', content: 'The ideal herbivore herd has a Stego (rear defense), Diablo or Trike (frontal tank), and Maia (healing). Smaller herbivores can act as scouts. Mixed herds are stronger than single-species groups.' },
      { title: 'Pack hunting efficiency', content: 'Carnivore packs should mix body types when possible. A Carno for pursuit, a Cerato for scent tracking, and Omnis for pounce damage makes a versatile hunting unit.' },
      { title: 'Nesting together', content: 'Nesting allows you to invite new players into your group. Nest in protected areas away from common paths. Having adults guard the nest while hatchlings grow is the safest strategy.' },
    ]
  },
];

export default function SurvivalGuide() {
  const [activeGuide, setActiveGuide] = useState('beginner');
  const guide = GUIDES.find(g => g.id === activeGuide);

  return (
    <div className="page-container fade-in">
      <h1 className="page-title">Survival Field Guide</h1>
      <p className="page-subtitle">Field-tested strategies and wisdom from experienced survivors. From your first hatchling to apex dominance.</p>

      <div style={{ display: 'flex', gap: 8, marginBottom: 32, flexWrap: 'wrap' }}>
        {GUIDES.map(g => (
          <button key={g.id} onClick={() => setActiveGuide(g.id)}
            className={activeGuide === g.id ? 'btn-primary' : 'btn-outline'}
            style={{ fontSize: 12, display: 'flex', alignItems: 'center', gap: 6 }}
          >
            <span>{g.icon}</span> {g.title}
          </button>
        ))}
      </div>

      {guide && (
        <div className="fade-in">
          <h2 style={{
            fontFamily: 'var(--font-display)', fontSize: 22, fontStyle: 'italic',
            color: 'var(--accent)', marginBottom: 24,
          }}>
            {guide.icon} {guide.title}
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {guide.sections.map((s, i) => (
              <div key={i} className="card" style={{ borderLeft: '3px solid var(--accent)' }}>
                <div style={{
                  fontFamily: 'var(--font-display)', fontSize: 16,
                  color: 'var(--text-primary)', marginBottom: 8,
                  fontStyle: 'italic',
                }}>{s.title}</div>
                <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.8 }}>{s.content}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
