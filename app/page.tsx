'use client';
import { useState } from 'react';
import Topbar from '@/components/Topbar';
import ComponentPalette from '@/components/ComponentPalette';
import Canvas, { CanvasNode, CanvasEdge } from '@/components/Canvas';
import RightPanel from '@/components/RightPanel';
import PrebuiltView from '@/components/PrebuiltView';
import LearnView from '@/components/LearnView';
import { PREBUILT_SYSTEMS } from '@/lib/data';

export default function Home() {
  const [activeTab, setActiveTab] = useState('learn'); // Use learn as default to show the user!
  const [nodes, setNodes] = useState<CanvasNode[]>([]);
  const [edges, setEdges] = useState<CanvasEdge[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [forceAnalysis, setForceAnalysis] = useState(0);

  const handleSelect = (id: string | null) => setSelectedId(id);
  
  const handleMove = (id: string, x: number, y: number) => {
    setNodes(ns => ns.map(n => n.id === id ? { ...n, x, y } : n));
  };
  
  const handleAddEdge = (from: string, to: string, label: string) => {
    setEdges(es => [...es, { id: `e-${Date.now()}`, from, to, label }]);
  };
  
  const handleDeleteNode = (id: string) => {
    setNodes(ns => ns.filter(n => n.id !== id));
    setEdges(es => es.filter(e => e.from !== id && e.to !== id));
    if (selectedId === id) setSelectedId(null);
  };
  
  const handleRename = (id: string, label: string) => {
    setNodes(ns => ns.map(n => n.id === id ? { ...n, label } : n));
  };
  
  const handleDrop = (typeId: string, x: number, y: number) => {
    const defaultColor = '#8b78f5';
    setNodes(ns => [...ns, { id: `n-${Date.now()}`, type: typeId, x, y, label: typeId, color: defaultColor, w: 160 }]);
  };
  
  const handleResize = (id: string, w: number) => {
    setNodes(ns => ns.map(n => n.id === id ? { ...n, w } : n));
  };

  const handleChangeColor = (id: string, color: string) => {
    setNodes(ns => ns.map(n => n.id === id ? { ...n, color } : n));
  };

  const handleLoadSystem = (id: string) => {
    const sys = PREBUILT_SYSTEMS.find(s => s.id === id);
    if (sys && sys.nodes) {
      setNodes(sys.nodes as CanvasNode[]);
      setEdges((sys.edges || []) as CanvasEdge[]);
      setSelectedId(null);
      setActiveTab('playground');
    }
  };

  const handleClear = () => {
    setNodes([]);
    setEdges([]);
    setSelectedId(null);
  };

  const handleAutoLayout = () => {
    alert("Auto-layout in development!");
  };

  const handleAnalyze = () => {
    setForceAnalysis(f => f + 1);
  };

  const handleExport = () => {
    alert("Export in development!");
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '250px 1fr 300px', gridTemplateRows: '48px 1fr', height: '100vh', width: '100vw', background: 'var(--bg)', overflow: 'hidden' }}>
      <Topbar 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
        onClear={handleClear} 
        onAutoLayout={handleAutoLayout} 
        onAnalyze={handleAnalyze} 
        onExport={handleExport} 
      />
      
      {activeTab === 'playground' && (
        <>
          <ComponentPalette />
          <Canvas 
            nodes={nodes} 
            edges={edges} 
            selectedId={selectedId}
            onSelect={handleSelect}
            onMove={handleMove}
            onAddEdge={handleAddEdge}
            onDeleteNode={handleDeleteNode}
            onRename={handleRename}
            onDrop={handleDrop}
            onResize={handleResize}
          />
          <RightPanel 
            nodes={nodes}
            edges={edges}
            selectedId={selectedId}
            onRename={handleRename}
            onChangeColor={handleChangeColor}
            onLoadSystem={handleLoadSystem}
            forceAnalysis={forceAnalysis}
          />
        </>
      )}
      {activeTab === 'prebuilt' && <PrebuiltView onLoad={handleLoadSystem} />}
      {activeTab === 'learn' && <LearnView onLoadSystem={handleLoadSystem} />}
    </div>
  );
}
