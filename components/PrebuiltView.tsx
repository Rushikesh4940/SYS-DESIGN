'use client';
import { PREBUILT_SYSTEMS } from '@/lib/data';

interface Props { onLoad: (id: string) => void; }

export default function PrebuiltView({ onLoad }: Props) {
  return (
    <div style={{ overflow: 'auto', padding: '2.5rem 3rem', background: 'var(--bg)', gridColumn: '1/-1' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text3)', letterSpacing: '.15em', textTransform: 'uppercase', marginBottom: '.5rem' }}>Prebuilt Systems</div>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', lineHeight: 1.1, marginBottom: '.5rem' }}>Classic Architectures <em style={{ fontStyle: 'italic', color: 'var(--c1)', fontWeight: 300 }}>Explained</em></h1>
          <p style={{ color: 'var(--text2)', fontSize: '.95rem', maxWidth: 600, lineHeight: 1.7 }}>Click any system to explore its architecture and load it into the playground.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1rem' }}>
          {PREBUILT_SYSTEMS.map(sys => (
            <div key={sys.id} style={{ background: 'var(--bg2)', border: '1px solid var(--line)', borderRadius: 12, overflow: 'hidden', cursor: 'pointer', transition: 'border-color .2s, transform .2s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = sys.color; (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-3px)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--line)'; (e.currentTarget as HTMLDivElement).style.transform = ''; }}>
              <div style={{ padding: '1.25rem', borderBottom: '1px solid var(--line)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '.6rem', marginBottom: '.5rem' }}>
                  <div style={{ width: 32, height: 32, borderRadius: 7, background: sys.color + '18', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>{sys.icon}</div>
                  <div>
                    <div style={{ fontSize: '.875rem', fontWeight: 600 }}>{sys.name}</div>
                    <div style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: sys.color, marginTop: 1 }}>{sys.difficulty}</div>
                  </div>
                </div>
                <div style={{ fontSize: 12, color: 'var(--text2)', lineHeight: 1.65, marginBottom: '.6rem' }}>{sys.desc}</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.25rem' }}>
                  {sys.tags.map(t => <span key={t} style={{ fontSize: 9, fontFamily: 'var(--font-mono)', padding: '1px 6px', borderRadius: 3, background: 'var(--bg3)', color: 'var(--text3)', border: '1px solid var(--line)' }}>{t}</span>)}
                </div>
              </div>
              <div style={{ padding: '1rem 1.25rem' }}>
                <div style={{ fontSize: 11, fontWeight: 600, marginBottom: '.35rem' }}>The Problem</div>
                <div style={{ fontSize: 11, color: 'var(--text2)', lineHeight: 1.65, marginBottom: '.75rem' }}>{sys.problem}</div>
                <div style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: sys.color, letterSpacing: '.06em', textTransform: 'uppercase', marginBottom: '.3rem' }}>Key decisions</div>
                {sys.keyDecisions.slice(0, 2).map((d, i) => (
                  <div key={i} style={{ fontSize: 11, color: 'var(--text3)', padding: '.15rem 0 .15rem .5rem', borderLeft: `2px solid ${sys.color}33` }}>→ {d}</div>
                ))}
                {sys.keyDecisions.length > 2 && <div style={{ fontSize: 10, color: 'var(--text3)', marginTop: '.25rem' }}>+{sys.keyDecisions.length - 2} more…</div>}
                <div style={{ marginTop: '.75rem', fontSize: 10, fontFamily: 'var(--font-mono)', color: sys.color, letterSpacing: '.06em', textTransform: 'uppercase', marginBottom: '.25rem' }}>Bottlenecks</div>
                {sys.bottlenecks.map((b, i) => <div key={i} style={{ fontSize: 11, color: 'var(--text3)', padding: '.1rem 0' }}>⚠ {b}</div>)}
              </div>
              <div style={{ padding: '.6rem 1.25rem', borderTop: '1px solid var(--line)' }}>
                <button onClick={() => onLoad(sys.id)} style={{ width: '100%', padding: '.4rem', borderRadius: 5, background: sys.color + '18', border: `1px solid ${sys.color}30`, color: sys.color, fontSize: 11, fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-sans)' }}>
                  Load in Playground →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
