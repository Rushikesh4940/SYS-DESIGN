'use client';
interface Props {
  activeTab: string;
  onTabChange: (t: string) => void;
  onClear: () => void;
  onAutoLayout: () => void;
  onAnalyze: () => void;
  onExport: () => void;
}
export default function Topbar({ activeTab, onTabChange, onClear, onAutoLayout, onAnalyze, onExport }: Props) {
  const tabs = [
    { id: 'playground', label: '⬡ Canvas' },
    { id: 'prebuilt', label: '◈ Prebuilt Systems' },
    { id: 'learn', label: '◎ Learn' },
  ];
  return (
    <header style={{ gridColumn: '1/-1', background: 'var(--bg2)', borderBottom: '1px solid var(--line)', display: 'flex', alignItems: 'center', padding: '0 1rem', height: 48, gap: 0, zIndex: 50 }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--c1)', letterSpacing: '.1em', marginRight: '1.5rem', whiteSpace: 'nowrap' }}>SYS/DESIGN</div>
      <div style={{ display: 'flex', flex: 1 }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => onTabChange(t.id)} style={{ padding: '0 1rem', height: 48, display: 'flex', alignItems: 'center', fontSize: 12, fontWeight: 500, color: activeTab === t.id ? 'var(--text)' : 'var(--text3)', background: 'none', border: 'none', borderBottom: activeTab === t.id ? '2px solid var(--c1)' : '2px solid transparent', cursor: 'pointer', fontFamily: 'var(--font-sans)', whiteSpace: 'nowrap', transition: 'color .15s' }}>
            {t.label}
          </button>
        ))}
      </div>
      {activeTab === 'playground' && (
        <div style={{ display: 'flex', gap: '.5rem', marginLeft: 'auto' }}>
          {[['✕ Clear', onClear, 'ghost'], ['⊞ Auto', onAutoLayout, 'ghost'], ['⚡ Analyze', onAnalyze, 'success'], ['↓ Export', onExport, 'primary']].map(([label, fn, type]) => (
            <button key={label as string} onClick={fn as () => void} style={{ display: 'inline-flex', alignItems: 'center', gap: '.4rem', padding: '.35rem .9rem', borderRadius: 5, fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-sans)', background: type === 'primary' ? 'var(--c1)' : type === 'success' ? 'rgba(61,217,179,0.15)' : 'transparent', color: type === 'primary' ? '#fff' : type === 'success' ? 'var(--c3)' : 'var(--text2)', border: type === 'primary' ? 'none' : type === 'success' ? '1px solid rgba(61,217,179,0.25)' : '1px solid var(--line2)', transition: 'all .15s' }}>
              {label as string}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}
