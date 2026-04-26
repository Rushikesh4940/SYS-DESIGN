'use client';
import { useState } from 'react';

interface Props {
  question: string;
  answer: string;
  category: string;
}

export default function FlashcardWidget({ question, answer, category }: Props) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div 
      style={{ 
        perspective: 1000, 
        width: '100%', 
        maxWidth: 500, 
        height: 200, 
        margin: '1.5rem auto',
        cursor: 'pointer'
      }}
      onClick={() => setFlipped(!flipped)}
    >
      <div 
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
          transition: 'transform 0.6s cubic-bezier(0.4, 0.0, 0.2, 1)',
          transformStyle: 'preserve-3d',
          transform: flipped ? 'rotateY(180deg)' : 'rotateY(0)'
        }}
      >
        {/* Front */}
        <div style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          backfaceVisibility: 'hidden',
          background: 'var(--bg3)',
          border: '1px solid var(--line)',
          borderRadius: 12,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
        }}>
          <div style={{ position: 'absolute', top: 12, right: 16, fontSize: 10, fontFamily: 'var(--font-mono)', color: 'var(--c1)', textTransform: 'uppercase', letterSpacing: '.1em' }}>{category}</div>
          <div style={{ fontSize: 14, fontWeight: 500, color: 'var(--text)', textAlign: 'center', lineHeight: 1.6 }}>{question}</div>
          <div style={{ position: 'absolute', bottom: 12, fontSize: 10, color: 'var(--text3)', fontFamily: 'var(--font-mono)' }}>Click to flip ↻</div>
        </div>

        {/* Back */}
        <div style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          backfaceVisibility: 'hidden',
          background: 'rgba(139,120,245,0.05)',
          border: '1px solid var(--c1)',
          borderRadius: 12,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
          transform: 'rotateY(180deg)',
          boxShadow: '0 4px 24px rgba(139,120,245,0.1)'
        }}>
          <div style={{ position: 'absolute', top: 12, left: 16, fontSize: 16 }}>💡</div>
          <div style={{ fontSize: 13, color: 'var(--text)', textAlign: 'center', lineHeight: 1.6 }}>{answer}</div>
        </div>
      </div>
    </div>
  );
}
