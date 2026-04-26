'use client';
import { useState } from 'react';
import { COMPONENTS } from '@/lib/data';

export default function ComponentPalette() {
  const [filter, setFilter] = useState('');
  const fl = filter.toLowerCase();
  return (
    <aside style={{ background: 'var(--bg2)', borderRight: '1px solid var(--line)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <div style={{ padding: '.75rem', borderBottom: '1px solid var(--line)' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text3)', letterSpacing: '.12em', textTransform: 'uppercase', marginBottom: '.5rem' }}>Components</div>
        <input value={filter} onChange={e => setFilter(e.target.value)} placeholder="Search components…" style={{ width: '100%', background: 'var(--bg3)', border: '1px solid var(--line)', borderRadius: 5, padding: '.4rem .6rem', color: 'var(--text)', fontSize: 12, fontFamily: 'var(--font-sans)', outline: 'none' }} />
      </div>
      <div style={{ overflowY: 'auto', flex: 1, padding: '.5rem' }}>
        {COMPONENTS.map(cat => {
          const items = cat.items.filter(c => !fl || c.name.toLowerCase().includes(fl) || c.desc.toLowerCase().includes(fl));
          if (!items.length) return null;
          return (
            <div key={cat.cat} style={{ marginBottom: '.75rem' }}>
              <div style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: 'var(--text3)', letterSpacing: '.1em', textTransform: 'uppercase', padding: '.25rem .5rem', marginBottom: '.25rem' }}>{cat.cat}</div>
              {items.map(comp => (
                <div key={comp.id} draggable onDragStart={e => e.dataTransfer.setData('compId', comp.id)}
                  style={{ display: 'flex', alignItems: 'flex-start', gap: '.5rem', padding: '.45rem .6rem', borderRadius: 5, cursor: 'grab', marginBottom: 2, transition: 'background .15s' }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'var(--bg3)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                  <div style={{ width: 22, height: 22, borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, flexShrink: 0, background: comp.color + '22', color: comp.color, fontWeight: 700 }}>{comp.icon}</div>
                  <div>
                    <div style={{ fontSize: 12, color: 'var(--text)', fontWeight: 500 }}>{comp.name}</div>
                    <div style={{ fontSize: 10, color: 'var(--text3)', lineHeight: 1.4, marginTop: 1 }}>{comp.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </aside>
  );
}
