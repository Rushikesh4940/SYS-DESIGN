'use client';
import { useState } from 'react';
import { getComp, COLORS, PREBUILT_SYSTEMS } from '@/lib/data';

interface CanvasNode { id: string; type: string; x: number; y: number; label: string; color: string; w: number; }
interface CanvasEdge { id: string; from: string; to: string; label: string; }

interface Props {
  selectedId: string | null;
  nodes: CanvasNode[];
  edges: CanvasEdge[];
  onRename: (id: string, label: string) => void;
  onChangeColor: (id: string, color: string) => void;
  onLoadSystem: (id: string) => void;
  forceAnalysis: number;
}

export default function RightPanel({ selectedId, nodes, edges, onRename, onChangeColor, onLoadSystem, forceAnalysis }: Props) {
  const [tab, setTab] = useState('props');
  const tabs = ['props', 'analysis', 'templates'];
  const tabLabels = ['Properties', 'Analysis', 'Templates'];

  const node = nodes.find(n => n.id === selectedId);
  const comp = node ? getComp(node.type) : null;

  function renderProps() {
    if (!node || !comp) return (
      <div style={{ textAlign: 'center', padding: '2rem 1rem', color: 'var(--text3)' }}>
        <div style={{ fontSize: '2rem', marginBottom: '.5rem', opacity: .4 }}>◎</div>
        <div style={{ fontSize: 11, lineHeight: 1.6 }}>Select a component to<br />view and edit its properties</div>
      </div>
    );
    const connectedEdges = edges.filter(e => e.from === selectedId || e.to === selectedId);
    return (
      <div>
        <div style={{ marginBottom: '1rem' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--text3)', letterSpacing: '.12em', textTransform: 'uppercase', marginBottom: '.4rem', paddingBottom: '.25rem', borderBottom: '1px solid var(--line)' }}>Component</div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '.3rem 0' }}>
            <span style={{ fontSize: 11, color: 'var(--text2)' }}>Name</span>
            <input defaultValue={node.label} onBlur={e => onRename(node.id, e.target.value)} onKeyDown={e => e.key === 'Enter' && onRename(node.id, (e.target as HTMLInputElement).value)}
              style={{ flex: 1, marginLeft: '.5rem', background: 'var(--bg3)', border: '1px solid var(--line)', borderRadius: 4, padding: '.25rem .5rem', color: 'var(--text)', fontSize: 11, fontFamily: 'var(--font-sans)', outline: 'none', minWidth: 0 }} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '.3rem 0' }}>
            <span style={{ fontSize: 11, color: 'var(--text2)' }}>Type</span>
            <span style={{ fontSize: 10, fontFamily: 'var(--font-mono)', padding: '2px 6px', borderRadius: 3, background: 'rgba(139,120,245,0.12)', color: 'var(--c1)' }}>{comp.name}</span>
          </div>
          <div style={{ marginTop: '.5rem' }}>
            <span style={{ fontSize: 11, color: 'var(--text2)' }}>Color</span>
            <div style={{ display: 'flex', gap: '.3rem', flexWrap: 'wrap', marginTop: '.35rem' }}>
              {COLORS.map(c => (
                <div key={c} onClick={() => onChangeColor(node.id, c)} style={{ width: 18, height: 18, borderRadius: '50%', background: c, cursor: 'pointer', border: node.color === c ? '2px solid #fff' : '2px solid transparent', transition: 'transform .15s', transform: node.color === c ? 'scale(1.2)' : 'scale(1)' }} />
              ))}
            </div>
          </div>
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--text3)', letterSpacing: '.12em', textTransform: 'uppercase', marginBottom: '.4rem', paddingBottom: '.25rem', borderBottom: '1px solid var(--line)' }}>About</div>
          <div style={{ fontSize: 11, color: 'var(--text2)', lineHeight: 1.65 }}>{comp.desc}</div>
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--text3)', letterSpacing: '.12em', textTransform: 'uppercase', marginBottom: '.4rem', paddingBottom: '.25rem', borderBottom: '1px solid var(--line)' }}>Metrics</div>
          {Object.entries(comp.metrics).map(([k, v]) => (
            <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '.25rem 0', fontSize: 11 }}>
              <span style={{ color: 'var(--text2)' }}>{k}</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: node.color }}>{v}</span>
            </div>
          ))}
        </div>
        <div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--text3)', letterSpacing: '.12em', textTransform: 'uppercase', marginBottom: '.4rem', paddingBottom: '.25rem', borderBottom: '1px solid var(--line)' }}>Connections ({connectedEdges.length})</div>
          {connectedEdges.length ? connectedEdges.map(e => {
            const other = nodes.find(n => n.id === (e.from === selectedId ? e.to : e.from));
            const dir = e.from === selectedId ? '→' : '←';
            return (
              <div key={e.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '.25rem 0', fontSize: 11, borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--text2)' }}>{dir} {other?.label || '?'}</span>
                {e.label && <span style={{ fontSize: 10, color: 'var(--text3)' }}>{e.label}</span>}
              </div>
            );
          }) : <div style={{ fontSize: 11, color: 'var(--text3)' }}>No connections yet</div>}
        </div>
      </div>
    );
  }

  function renderAnalysis() {
    if (!nodes.length) return (
      <div style={{ textAlign: 'center', padding: '2rem 1rem', color: 'var(--text3)' }}>
        <div style={{ fontSize: '2rem', marginBottom: '.5rem', opacity: .4 }}>⚡</div>
        <div style={{ fontSize: 11, lineHeight: 1.6 }}>Add components to your<br />system to run analysis</div>
      </div>
    );
    const inDeg: Record<string, number> = {}, outDeg: Record<string, number> = {};
    nodes.forEach(n => { inDeg[n.id] = 0; outDeg[n.id] = 0; });
    edges.forEach(e => { outDeg[e.from] = (outDeg[e.from] || 0) + 1; inDeg[e.to] = (inDeg[e.to] || 0) + 1; });
    const spofs = nodes.filter(n => (inDeg[n.id] || 0) + (outDeg[n.id] || 0) >= 3 && !nodes.some(m => m.id !== n.id && m.type === n.type));
    const hasLB = nodes.some(n => ['lb','api-gw'].includes(n.type));
    const hasCache = nodes.some(n => ['redis','memcached','local-cache'].includes(n.type));
    const hasDB = nodes.some(n => ['postgres','mysql','mongo','cassandra','dynamo'].includes(n.type));
    const hasQueue = nodes.some(n => ['kafka','rabbitmq','sqs','pubsub'].includes(n.type));
    const hasMonitor = nodes.some(n => n.type === 'monitor');
    const apiCount = nodes.filter(n => ['api','grpc'].includes(n.type)).length;
    const score = [hasLB, hasCache, hasDB, hasQueue, hasMonitor, apiCount > 1, spofs.length === 0].filter(Boolean).length;
    const checks = [['Load balancer present', hasLB],['Caching layer', hasCache],['Persistent storage', hasDB],['Async messaging', hasQueue],['Multiple API servers', apiCount > 1],['Observability', hasMonitor],['No SPOF detected', spofs.length === 0]];
    return (
      <div>
        <div style={{ background: 'var(--bg3)', borderRadius: 6, padding: '.75rem', marginBottom: '.6rem', border: '1px solid var(--line)' }}>
          <div style={{ fontSize: 11, fontWeight: 600, marginBottom: '.4rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            System Health Score
            <span style={{ fontSize: 9, fontFamily: 'var(--font-mono)', padding: '1px 6px', borderRadius: 20, background: score >= 6 ? 'rgba(61,217,179,0.15)' : score >= 4 ? 'rgba(245,200,66,0.15)' : 'rgba(242,135,90,0.15)', color: score >= 6 ? 'var(--c3)' : score >= 4 ? 'var(--c4)' : 'var(--c2)' }}>{score}/7</span>
          </div>
          <div style={{ fontSize: 11, color: 'var(--text2)' }}>{nodes.length} components, {edges.length} connections</div>
        </div>
        <div style={{ background: 'var(--bg3)', borderRadius: 6, padding: '.75rem', marginBottom: '.6rem', border: '1px solid var(--line)' }}>
          <div style={{ fontSize: 11, fontWeight: 600, marginBottom: '.5rem' }}>Checklist</div>
          {checks.map(([label, ok]) => (
            <div key={label as string} style={{ display: 'flex', alignItems: 'center', gap: '.4rem', padding: '.18rem 0', fontSize: 11 }}>
              <span style={{ color: ok ? 'var(--c3)' : 'var(--c2)' }}>{ok ? '✓' : '✗'}</span>
              <span style={{ color: ok ? 'var(--text2)' : 'var(--text3)' }}>{label as string}</span>
            </div>
          ))}
        </div>
        {spofs.length > 0 && (
          <div style={{ background: 'var(--bg3)', borderRadius: 6, padding: '.75rem', border: '1px solid rgba(245,200,66,0.2)' }}>
            <div style={{ fontSize: 11, fontWeight: 600, marginBottom: '.4rem', color: 'var(--c4)' }}>⚠ Potential SPOFs</div>
            {spofs.map(n => (
              <div key={n.id} style={{ display: 'flex', gap: '.4rem', alignItems: 'flex-start', padding: '.2rem 0', fontSize: 11, color: 'var(--text2)' }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: n.color, flexShrink: 0, marginTop: 4 }} />
                {n.label} — {getComp(n.type).desc}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  function renderTemplates() {
    return (
      <div>
        {PREBUILT_SYSTEMS.map(sys => (
          <div key={sys.id} onClick={() => onLoadSystem(sys.id)} style={{ background: 'var(--bg3)', border: '1px solid var(--line)', borderRadius: 8, padding: '.85rem', marginBottom: '.6rem', cursor: 'pointer', transition: 'border-color .15s' }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = sys.color)}
            onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--line)')}>
            <div style={{ fontSize: 12, fontWeight: 600, marginBottom: '.3rem', display: 'flex', alignItems: 'center', gap: '.4rem' }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: sys.color }} />
              {sys.name}
              <span style={{ fontSize: 9, fontFamily: 'var(--font-mono)', padding: '1px 6px', borderRadius: 20, background: sys.color + '18', color: sys.color, marginLeft: 'auto' }}>{sys.difficulty}</span>
            </div>
            <div style={{ fontSize: 11, color: 'var(--text2)', lineHeight: 1.55, marginBottom: '.5rem' }}>{sys.desc}</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.25rem' }}>
              {sys.tags.map(t => <span key={t} style={{ fontSize: 9, fontFamily: 'var(--font-mono)', padding: '1px 6px', borderRadius: 3, background: 'var(--bg)', color: 'var(--text3)', border: '1px solid var(--line)' }}>{t}</span>)}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <aside style={{ background: 'var(--bg2)', borderLeft: '1px solid var(--line)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <div style={{ display: 'flex', borderBottom: '1px solid var(--line)' }}>
        {tabs.map((t, i) => (
          <button key={t} onClick={() => setTab(t)} style={{ flex: 1, padding: '.5rem', textAlign: 'center', fontSize: 11, fontWeight: 500, color: tab === t ? 'var(--text)' : 'var(--text3)', cursor: 'pointer', background: 'none', border: 'none', borderBottom: tab === t ? '2px solid var(--c1)' : '2px solid transparent', fontFamily: 'var(--font-sans)', transition: 'color .15s' }}>{tabLabels[i]}</button>
        ))}
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: '.75rem' }}>
        {tab === 'props' && renderProps()}
        {tab === 'analysis' && renderAnalysis()}
        {tab === 'templates' && renderTemplates()}
      </div>
    </aside>
  );
}
