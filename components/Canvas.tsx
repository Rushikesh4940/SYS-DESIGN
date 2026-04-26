'use client';
import { useRef, useEffect, useCallback, useState } from 'react';
import { getComp, COLORS } from '@/lib/data';

export interface CanvasNode { id: string; type: string; x: number; y: number; label: string; color: string; w: number; }
export interface CanvasEdge { id: string; from: string; to: string; label: string; }

interface Props {
  nodes: CanvasNode[];
  edges: CanvasEdge[];
  selectedId: string | null;
  onSelect: (id: string | null) => void;
  onMove: (id: string, x: number, y: number) => void;
  onAddEdge: (from: string, to: string, label: string) => void;
  onDeleteNode: (id: string) => void;
  onRename: (id: string, label: string) => void;
  onDrop: (typeId: string, x: number, y: number) => void;
  onResize: (id: string, w: number) => void;
}

export default function Canvas({ nodes, edges, selectedId, onSelect, onMove, onAddEdge, onDeleteNode, onRename, onDrop, onResize }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [scale, setScaleState] = useState(1);
  const scaleRef = useRef(1);
  const offsetRef = useRef({ x: 0, y: 0 });
  const [conn, setConn] = useState<{ active: boolean; fromId: string; mx: number; my: number; fx: number; fy: number } | null>(null);
  const dragging = useRef<{ id: string; ox: number; oy: number } | null>(null);
  const panning = useRef<{ ox: number; oy: number } | null>(null);
  const resizing = useRef<{ id: string; startX: number; startW: number } | null>(null);
  const [hintVisible, setHintVisible] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editVal, setEditVal] = useState('');

  useEffect(() => { if (nodes.length > 0) setHintVisible(false); else setHintVisible(true); }, [nodes.length]);

  const applyTx = useCallback((o: { x: number; y: number }, s: number) => {
    offsetRef.current = o; scaleRef.current = s;
    setOffset({ ...o }); setScaleState(s);
  }, []);

  const nodeCenter = useCallback((id: string) => {
    const n = nodes.find(n => n.id === id);
    const el = document.getElementById('cnode-' + id);
    if (!n || !el) return null;
    return { x: n.x + el.offsetWidth / 2, y: n.y + el.offsetHeight / 2 };
  }, [nodes]);

  // Wheel zoom
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const rect = el.getBoundingClientRect();
      const mx = e.clientX - rect.left, my = e.clientY - rect.top;
      const prev = scaleRef.current;
      const next = Math.min(2, Math.max(0.3, prev + (e.deltaY > 0 ? -0.08 : 0.08)));
      const nx = mx - (mx - offsetRef.current.x) * (next / prev);
      const ny = my - (my - offsetRef.current.y) * (next / prev);
      applyTx({ x: nx, y: ny }, next);
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, [applyTx]);

  // Mouse events
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (panning.current) {
        applyTx({ x: e.clientX - panning.current.ox, y: e.clientY - panning.current.oy }, scaleRef.current);
      }
      if (dragging.current) {
        const n = nodes.find(n => n.id === dragging.current!.id);
        if (n) onMove2(dragging.current.id, (e.clientX - dragging.current.ox) / scaleRef.current, (e.clientY - dragging.current.oy) / scaleRef.current);
      }
      if (resizing.current) {
        const r = resizing.current;
        const newW = Math.max(130, r.startW + e.clientX - r.startX);
        onResize(r.id, newW);
      }
      if (conn) {
        const rect = wrapRef.current!.getBoundingClientRect();
        setConn(c => c ? { ...c, mx: (e.clientX - rect.left - offsetRef.current.x) / scaleRef.current, my: (e.clientY - rect.top - offsetRef.current.y) / scaleRef.current } : null);
      }
    };
    const onUp = () => {
      panning.current = null;
      dragging.current = null;
      resizing.current = null;
      setConn(null);
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    return () => { window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseup', onUp); };
  }, [nodes, conn, onMove, onResize, applyTx]);

  function onMove2(id: string, x: number, y: number) { onMove(id, Math.round(x), Math.round(y)); }

  // Drop
  const onDragOver = (e: React.DragEvent) => { e.preventDefault(); };
  const onDropCanvas = (e: React.DragEvent) => {
    e.preventDefault();
    const compId = e.dataTransfer.getData('compId');
    if (!compId) return;
    const rect = wrapRef.current!.getBoundingClientRect();
    const x = (e.clientX - rect.left - offsetRef.current.x) / scaleRef.current - 70;
    const y = (e.clientY - rect.top - offsetRef.current.y) / scaleRef.current - 40;
    onDrop(compId, x, y);
  };

  // SVG path between two centers
  function makePath(fx: number, fy: number, tx: number, ty: number) {
    const dx = tx - fx;
    return `M${fx},${fy} C${fx + dx * 0.4},${fy} ${tx - dx * 0.4},${ty} ${tx},${ty}`;
  }

  return (
    <div ref={wrapRef} onDragOver={onDragOver} onDrop={onDropCanvas}
      onMouseDown={e => {
        if (e.target === wrapRef.current || (e.target as HTMLElement).closest('#canvas-inner') === null) {
          onSelect(null);
          panning.current = { ox: e.clientX - offsetRef.current.x, oy: e.clientY - offsetRef.current.y };
        }
      }}
      style={{ position: 'relative', overflow: 'hidden', background: 'var(--bg)', backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)', backgroundSize: '28px 28px', cursor: 'default' }}>

      {/* SVG connections */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', overflow: 'visible', transform: `translate(${offset.x}px,${offset.y}px) scale(${scale})`, transformOrigin: '0 0', zIndex: 5 }}>
        <defs>
          <marker id="arr" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
            <polygon points="0 0, 8 3, 0 6" fill="rgba(139,120,245,0.6)" />
          </marker>
        </defs>
        {edges.map(edge => {
          const fc = nodeCenter(edge.from), tc = nodeCenter(edge.to);
          if (!fc || !tc) return null;
          const mx = (fc.x + tc.x) / 2, my = (fc.y + tc.y) / 2;
          return (
            <g key={edge.id}>
              <path d={makePath(fc.x, fc.y, tc.x, tc.y)} fill="none" stroke="rgba(139,120,245,0.4)" strokeWidth={2} markerEnd="url(#arr)" />
              {edge.label && (<>
                <rect x={mx - edge.label.length * 3.2 - 4} y={my - 9} width={edge.label.length * 6.4 + 8} height={16} rx={3} fill="#0e0e18" opacity={0.9} />
                <text x={mx} y={my} textAnchor="middle" dominantBaseline="middle" style={{ fontFamily: 'var(--font-mono)', fontSize: 10, fill: 'var(--text2)' }}>{edge.label}</text>
              </>)}
            </g>
          );
        })}
        {conn && <path d={makePath(conn.fx, conn.fy, conn.mx, conn.my)} fill="none" stroke="var(--c1)" strokeWidth={1.5} strokeDasharray="5 3" opacity={0.7} />}
      </svg>

      {/* Nodes */}
      <div id="canvas-inner" style={{ position: 'absolute', inset: 0, transform: `translate(${offset.x}px,${offset.y}px) scale(${scale})`, transformOrigin: '0 0', zIndex: 10 }}>
        {nodes.map(node => {
          const comp = getComp(node.type);
          const isSelected = selectedId === node.id;
          return (
            <div key={node.id} id={'cnode-' + node.id}
              onMouseDown={e => {
                if ((e.target as HTMLElement).classList.contains('port') || (e.target as HTMLElement).classList.contains('resize-h') || (e.target as HTMLElement).classList.contains('del-btn')) return;
                e.stopPropagation();
                onSelect(node.id);
                dragging.current = { id: node.id, ox: e.clientX - node.x * scaleRef.current, oy: e.clientY - node.y * scaleRef.current };
              }}
              onDoubleClick={e => {
                if ((e.target as HTMLElement).classList.contains('port')) return;
                setEditingId(node.id); setEditVal(node.label);
              }}
              style={{ position: 'absolute', left: node.x, top: node.y, width: node.w, borderRadius: 8, border: `1.5px solid ${isSelected ? node.color : node.color + '33'}`, background: node.color + '09', cursor: 'pointer', userSelect: 'none', boxShadow: isSelected ? `0 0 0 2px ${node.color}, 0 8px 24px rgba(0,0,0,0.4)` : 'none', zIndex: isSelected ? 30 : 10 }}>
              {/* Header */}
              <div style={{ padding: '.5rem .7rem', borderRadius: '6px 6px 0 0', display: 'flex', alignItems: 'center', gap: '.4rem', borderBottom: '1px solid rgba(255,255,255,0.06)', background: node.color + '12' }}>
                <span style={{ fontSize: 13, width: 20, textAlign: 'center' }}>{comp.icon}</span>
                {editingId === node.id ? (
                  <input autoFocus value={editVal} onChange={e => setEditVal(e.target.value)}
                    onBlur={() => { onRename(node.id, editVal || node.label); setEditingId(null); }}
                    onKeyDown={e => { if (e.key === 'Enter' || e.key === 'Escape') { onRename(node.id, editVal || node.label); setEditingId(null); } }}
                    style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', color: 'var(--text)', fontSize: 12, fontFamily: 'var(--font-sans)', fontWeight: 600 }} />
                ) : (
                  <span style={{ fontSize: 12, fontWeight: 600, flex: 1, color: 'var(--text)' }}>{node.label}</span>
                )}
                <span className="del-btn" onClick={e => { e.stopPropagation(); onDeleteNode(node.id); }}
                  style={{ width: 16, height: 16, borderRadius: 3, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, color: 'var(--text3)', cursor: 'pointer' }}
                  onMouseEnter={e => { (e.target as HTMLElement).style.background = 'rgba(242,135,90,0.2)'; (e.target as HTMLElement).style.color = 'var(--c2)'; }}
                  onMouseLeave={e => { (e.target as HTMLElement).style.background = ''; (e.target as HTMLElement).style.color = 'var(--text3)'; }}>✕</span>
              </div>
              {/* Body */}
              <div style={{ padding: '.5rem .7rem' }}>
                {Object.entries(comp.metrics).map(([k, v]) => (
                  <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '2px 0', fontSize: 11 }}>
                    <span style={{ color: 'var(--text3)' }}>{k}</span>
                    <span style={{ fontFamily: 'var(--font-mono)', color: node.color, fontSize: 10 }}>{v}</span>
                  </div>
                ))}
              </div>
              {/* Ports */}
              {['right','left','top','bottom'].map(port => {
                const style: React.CSSProperties = { position: 'absolute', width: 10, height: 10, borderRadius: '50%', background: 'var(--bg3)', border: `2px solid ${node.color}`, cursor: 'crosshair', zIndex: 5,
                  ...(port === 'right' ? { right: -6, top: '50%', transform: 'translateY(-50%)' } : port === 'left' ? { left: -6, top: '50%', transform: 'translateY(-50%)' } : port === 'top' ? { top: -6, left: '50%', transform: 'translateX(-50%)' } : { bottom: -6, left: '50%', transform: 'translateX(-50%)' })
                };
                return (
                  <div key={port} className="port" style={style}
                    onMouseDown={e => {
                      e.stopPropagation();
                      const el = document.getElementById('cnode-' + node.id)!;
                      const w = el.offsetWidth, h = el.offsetHeight;
                      const fx = port === 'right' ? node.x + w : port === 'left' ? node.x : node.x + w / 2;
                      const fy = port === 'right' || port === 'left' ? node.y + h / 2 : port === 'top' ? node.y : node.y + h;
                      setConn({ active: true, fromId: node.id, mx: fx, my: fy, fx, fy });
                    }}
                    onMouseUp={e => {
                      e.stopPropagation();
                      if (conn && conn.fromId !== node.id) {
                        onAddEdge(conn.fromId, node.id, '');
                        setConn(null);
                      }
                    }}
                  />
                );
              })}
              {/* Resize handle */}
              <div className="resize-h"
                onMouseDown={e => { e.stopPropagation(); resizing.current = { id: node.id, startX: e.clientX, startW: node.w }; }}
                style={{ position: 'absolute', bottom: 0, right: 0, width: 12, height: 12, cursor: 'se-resize' }}>
                <div style={{ position: 'absolute', bottom: 3, right: 3, width: 6, height: 6, borderRight: '1.5px solid var(--text3)', borderBottom: '1.5px solid var(--text3)' }} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Hint */}
      {hintVisible && (
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', textAlign: 'center', pointerEvents: 'none', opacity: 0.25 }}>
          <div style={{ fontSize: '3rem', marginBottom: '.75rem' }}>⬡</div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text2)', lineHeight: 2 }}>Drag components from the left panel<br />or load a prebuilt system from Templates<br />Double-click to rename · Drag ports to connect</div>
        </div>
      )}

      {/* Zoom controls */}
      <div style={{ position: 'absolute', bottom: '1rem', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '.25rem', background: 'var(--bg2)', border: '1px solid var(--line)', borderRadius: 6, padding: '.25rem' }}>
        {[['−', () => applyTx(offsetRef.current, Math.max(0.3, scaleRef.current - 0.1))], [`${Math.round(scale * 100)}%`, null], ['+', () => applyTx(offsetRef.current, Math.min(2, scaleRef.current + 0.1))], ['⊙', () => applyTx({ x: 0, y: 0 }, 1)]].map(([label, fn], i) => (
          <button key={i} onClick={fn as (() => void) | null ?? undefined} style={{ padding: '.3rem .6rem', borderRadius: 4, background: 'none', border: 'none', color: fn ? 'var(--text2)' : 'var(--text3)', cursor: fn ? 'pointer' : 'default', fontSize: 12, fontFamily: 'var(--font-mono)', minWidth: 40, textAlign: 'center' }}>{label as string}</button>
        ))}
      </div>
    </div>
  );
}
