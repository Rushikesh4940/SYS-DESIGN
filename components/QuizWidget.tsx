'use client';
import { useState } from 'react';

interface Question {
  q: string;
  options: string[];
  ans: number;
}

interface Props {
  title: string;
  questions: Question[];
}

export default function QuizWidget({ title, questions }: Props) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showRes, setShowRes] = useState(false);
  const [score, setScore] = useState(0);

  const q = questions[activeIdx];
  const isDone = activeIdx >= questions.length;

  const handleSelect = (idx: number) => {
    if (showRes) return;
    setSelected(idx);
    setShowRes(true);
    if (idx === q.ans) setScore(s => s + 1);
  };

  const nextQuestion = () => {
    setSelected(null);
    setShowRes(false);
    setActiveIdx(i => i + 1);
  };

  if (isDone) {
    return (
      <div style={{ background: 'var(--bg3)', border: '1px solid var(--line)', borderRadius: 12, padding: '2rem', textAlign: 'center', maxWidth: 600, margin: '2rem auto' }}>
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{score === questions.length ? '🏆' : '📚'}</div>
        <div style={{ fontSize: 18, fontWeight: 600, marginBottom: '.5rem' }}>{title} Complete!</div>
        <div style={{ fontSize: 13, color: 'var(--text2)', marginBottom: '1.5rem' }}>You scored {score} out of {questions.length}</div>
        <button onClick={() => { setActiveIdx(0); setScore(0); setShowRes(false); setSelected(null); }} style={{ background: 'var(--c1)', color: '#fff', border: 'none', padding: '.5rem 1rem', borderRadius: 6, fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-sans)' }}>Retake Quiz</button>
      </div>
    );
  }

  return (
    <div style={{ background: 'var(--bg3)', border: '1px solid var(--c1)', borderRadius: 12, padding: '1.5rem 2rem', maxWidth: 600, margin: '2rem auto', boxShadow: '0 8px 32px rgba(139,120,245,0.05)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--c1)', textTransform: 'uppercase', letterSpacing: '.1em', fontWeight: 600 }}>Knowledge Check: {title}</div>
        <div style={{ fontSize: 11, color: 'var(--text3)' }}>{activeIdx + 1} / {questions.length}</div>
      </div>
      
      <div style={{ fontSize: 15, lineHeight: 1.6, marginBottom: '1.5rem', fontWeight: 500 }}>{q.q}</div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '.6rem' }}>
        {q.options.map((opt, i) => {
          let bg = 'var(--bg2)';
          let border = '1px solid var(--line)';
          let color = 'var(--text2)';
          
          if (showRes) {
            if (i === q.ans) { bg = 'rgba(61,217,179,0.1)'; border = '1px solid rgba(61,217,179,0.4)'; color = 'var(--c3)'; }
            else if (i === selected) { bg = 'rgba(242,135,90,0.1)'; border = '1px solid rgba(242,135,90,0.4)'; color = 'var(--c2)'; }
          } else if (i === selected) {
            border = '1px solid var(--c1)'; bg = 'rgba(139,120,245,0.1)'; color = 'var(--text)';
          }

          return (
            <button key={i} onClick={() => handleSelect(i)} style={{ background: bg, border, color, padding: '.8rem 1rem', borderRadius: 8, textAlign: 'left', fontFamily: 'var(--font-sans)', fontSize: 13, cursor: showRes ? 'default' : 'pointer', transition: 'all .2s' }}>
              <span style={{ display: 'inline-block', width: 24, fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--text3)' }}>{String.fromCharCode(65 + i)}</span> 
              {opt}
            </button>
          );
        })}
      </div>

      {showRes && (
        <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--line)', display: 'flex', justifyContent: 'flex-end' }}>
          <button onClick={nextQuestion} style={{ background: 'var(--text)', color: 'var(--bg)', border: 'none', padding: '.5rem 1.25rem', borderRadius: 6, fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-sans)', fontSize: 12 }}>
            Next Question →
          </button>
        </div>
      )}
    </div>
  );
}
