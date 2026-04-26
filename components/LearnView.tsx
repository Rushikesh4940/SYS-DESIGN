'use client';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import QuizWidget from './QuizWidget';
import FlashcardWidget from './FlashcardWidget';

function QuizPortal() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const qf = document.getElementById('quiz-foundations');
  const qi = document.getElementById('quiz-infrastructure');
  const fcNfx = document.getElementById('flashcard-netflix');
  const fcWa = document.getElementById('flashcard-whatsapp');
  const fcCap = document.getElementById('flashcard-cap');
  const fcOop = document.getElementById('flashcard-oop');
  const fcSolid = document.getElementById('flashcard-solid');

  return (
    <>
      {qf && createPortal(<QuizWidget title="Foundations Quiz" questions={[
        { q: "Which system type prioritizes availability over strict consistency during a partition?", options: ["CP", "AP", "CA"], ans: 1 },
        { q: "What does PACELC analyze that CAP misses?", options: ["Read speed", "Network partitions", "Normal operation latency/consistency"], ans: 2 }
      ]} />, qf)}
      {qi && createPortal(<QuizWidget title="Infrastructure Quiz" questions={[
        { q: "Which caching strategy writes to DB and Cache simultaneously?", options: ["Write-behind", "Cache-aside", "Write-through"], ans: 2 },
        { q: "What is the primary benefit of Consistent Hashing?", options: ["Faster lookups", "Minimizes key movement on rebalance", "Uses less memory"], ans: 1 }
      ]} />, qi)}
      
      {fcNfx && createPortal(<FlashcardWidget category="Stateless vs Stateful" question="Why does Netflix run its control plane on AWS, but its video distribution on custom bare-metal Open Connect appliances?" answer="Video distribution is bandwidth-heavy and predictable, requiring vast storage near ISPs. Control plane auth/browsing involves high compute variability, matching AWS's elastic microservice strengths." />, fcNfx)}
      {fcWa && createPortal(<FlashcardWidget category="Network Protocols" question="Why didn't WhatsApp use standard REST/HTTP polling for chat?" answer="HTTP polling adds immense overhead (headers, connection resets) which would cripple battery life and server sockets. They used persistent long-lived TCP connections (XMPP) for real-time bidirectional push." />, fcWa)}
      {fcCap && createPortal(<FlashcardWidget category="CAP Theorem" question="If a network partition isolates a datacenter, how does an AP system respond compared to a CP system?" answer="An AP system returns the local (potentially stale) data to remain available. A CP system returns a timeout/error because it cannot guarantee the data is up-to-date with the rest of the cluster." />, fcCap)}
    
      {fcOop && createPortal(<FlashcardWidget category="OOP Concepts" question="What is the critical difference between Encapsulation and Abstraction?" answer="Encapsulation is information hiding (protecting internal state from external tampering via private variables). Abstraction is complexity hiding (providing a simple interface like 'turnOn()' while hiding the complex wirings)." />, fcOop)}
      {fcSolid && createPortal(<FlashcardWidget category="SOLID Principles" question="Under the Open/Closed Principle, how do you add a new feature without modifying existing code?" answer="Through Polymorphism. Instead of adding 'if/else' statements inside an existing class to handle a new type, you create a new class that implements an existing Interface, allowing the system to use it dynamically." />, fcSolid)}
    </>
  );
}

export default function LearnView({ onLoadSystem }: { onLoadSystem?:(id:string)=>void }) {
  useEffect(() => {
    (window as any).onLoadSystemGlobal = onLoadSystem;


// Progress bar
window.addEventListener('scroll', () => {
  const pct = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
  document.getElementById('pb').style.width = Math.min(pct, 100) + '%';
});

// Toggle accordion
window.tog = function(head) {
  const acc = head.closest('.acc');
  const wasOpen = acc.classList.contains('open');
  acc.classList.toggle('open', !wasOpen);
}

// Reveal on scroll
const io = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      const els = e.target.querySelectorAll ? [e.target, ...e.target.querySelectorAll('.rev')] : [e.target];
      els.forEach((el, j) => {
        setTimeout(() => el.classList.add('in'), j * 60);
      });
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.07, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.rev').forEach(el => {
  io.observe(el);
});

// Smooth nav active state
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let cur = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 80) cur = s.id;
  });
  navLinks.forEach(a => {
    a.style.color = a.getAttribute('href') === '#' + cur ? 'var(--text)' : '';
  });
}, { passive: true });

document.addEventListener('click', (e) => {
  const target = e.target;
  if (target && target.classList && target.classList.contains('viz-btn')) {
    const sysId = target.getAttribute('data-sys');
    if (window.onLoadSystemGlobal) {
      window.onLoadSystemGlobal(sysId);
    }
  }
});

  }, [onLoadSystem]);

  return (
    <div style={{ overflowY: 'auto', background: 'var(--bg)', gridColumn: '1/-1', height: '100%', position: 'relative' }}>
      <div suppressHydrationWarning dangerouslySetInnerHTML={{ __html: `

<div class="progress-bar" id="pb"></div>

<nav>
  <div class="nav-brand"></div>
  <ul class="nav-links">
    <li><a href="#code-design">Code Design</a></li>
    <li><a href="#foundations">Foundations</a></li>
    <li><a href="#infrastructure">Infra</a></li>
    <li><a href="#databases">Databases</a></li>
    <li><a href="#patterns">Patterns</a></li>
    <li><a href="#problems">Problems</a></li>
    <li><a href="#case-studies">Cases</a></li>
    <li><a href="#reliability">Reliability</a></li>
    <li><a href="#security">Security</a></li>
    <li><a href="#advanced">Advanced</a></li>
    <li><a href="#interview">Interview</a></li>
    <li><a href="#cheatsheet">Ref</a></li>
  </ul>
</nav>

<!-- ═══════════════════════════════ HERO ═══════════════════════════════ -->
<section class="hero">
  <div class="hero-left">
    <div class="hero-eyebrow">The Complete System Design Reference</div>
    <h1>Build systems<br>that <em>scale</em> to<br>billions.</h1>
    <p class="hero-sub">From CAP theorem to CRDT, from rate limiting to multi-region active-active — every concept, pattern, and trade-off you need to design production systems at any scale.</p>
    <div class="hero-cta">
      <a href="#foundations" class="btn btn-fill">Start learning →</a>
      <a href="#cheatsheet" class="btn btn-ghost">Quick reference</a>
    </div>
    <div class="hero-stats">
      <div><div class="stat-val">12</div><div class="stat-lab">Topic Areas</div></div>
      <div><div class="stat-val">60+</div><div class="stat-lab">Concepts</div></div>
      <div><div class="stat-val">20+</div><div class="stat-lab">Design Problems</div></div>
      <div><div class="stat-val">∞</div><div class="stat-lab">Trade-offs</div></div>
    </div>
  </div>
  <div class="hero-right">
    <svg class="hero-canvas" viewBox="0 0 600 700" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- grid lines -->
      <line x1="0" y1="100" x2="600" y2="100" stroke="rgba(139,120,245,0.07)" stroke-width="1"/>
      <line x1="0" y1="200" x2="600" y2="200" stroke="rgba(139,120,245,0.05)" stroke-width="1"/>
      <line x1="0" y1="300" x2="600" y2="300" stroke="rgba(139,120,245,0.07)" stroke-width="1"/>
      <line x1="0" y1="400" x2="600" y2="400" stroke="rgba(139,120,245,0.05)" stroke-width="1"/>
      <line x1="0" y1="500" x2="600" y2="500" stroke="rgba(139,120,245,0.07)" stroke-width="1"/>
      <line x1="0" y1="600" x2="600" y2="600" stroke="rgba(139,120,245,0.05)" stroke-width="1"/>
      <line x1="100" y1="0" x2="100" y2="700" stroke="rgba(139,120,245,0.05)" stroke-width="1"/>
      <line x1="200" y1="0" x2="200" y2="700" stroke="rgba(139,120,245,0.07)" stroke-width="1"/>
      <line x1="300" y1="0" x2="300" y2="700" stroke="rgba(139,120,245,0.05)" stroke-width="1"/>
      <line x1="400" y1="0" x2="400" y2="700" stroke="rgba(139,120,245,0.07)" stroke-width="1"/>
      <line x1="500" y1="0" x2="500" y2="700" stroke="rgba(139,120,245,0.05)" stroke-width="1"/>
      <!-- Glow orbs -->
      <ellipse cx="300" cy="350" rx="180" ry="180" fill="rgba(139,120,245,0.04)"/>
      <ellipse cx="400" cy="200" rx="100" ry="80" fill="rgba(61,217,179,0.05)"/>
      <!-- Nodes -->
      <rect x="220" y="60" width="160" height="48" rx="9" fill="rgba(139,120,245,0.1)" stroke="rgba(139,120,245,0.45)" stroke-width="1"/>
      <text x="300" y="89" text-anchor="middle" fill="#a895f8" font-family="Geist Mono" font-size="13" font-weight="500">Client</text>
      <!-- LB -->
      <rect x="180" y="160" width="240" height="48" rx="9" fill="rgba(96,200,240,0.08)" stroke="rgba(96,200,240,0.4)" stroke-width="1"/>
      <text x="300" y="189" text-anchor="middle" fill="#60c8f0" font-family="Geist Mono" font-size="12">Load Balancer</text>
      <!-- API Servers -->
      <rect x="60" y="270" width="130" height="44" rx="8" fill="rgba(61,217,179,0.07)" stroke="rgba(61,217,179,0.35)" stroke-width="1"/>
      <text x="125" y="296" text-anchor="middle" fill="#3dd9b3" font-family="Geist Mono" font-size="11">API Server 1</text>
      <rect x="235" y="270" width="130" height="44" rx="8" fill="rgba(61,217,179,0.07)" stroke="rgba(61,217,179,0.35)" stroke-width="1"/>
      <text x="300" y="296" text-anchor="middle" fill="#3dd9b3" font-family="Geist Mono" font-size="11">API Server 2</text>
      <rect x="410" y="270" width="130" height="44" rx="8" fill="rgba(61,217,179,0.07)" stroke="rgba(61,217,179,0.35)" stroke-width="1"/>
      <text x="475" y="296" text-anchor="middle" fill="#3dd9b3" font-family="Geist Mono" font-size="11">API Server 3</text>
      <!-- Cache -->
      <rect x="60" y="370" width="130" height="44" rx="8" fill="rgba(245,200,66,0.07)" stroke="rgba(245,200,66,0.3)" stroke-width="1"/>
      <text x="125" y="396" text-anchor="middle" fill="#f5c842" font-family="Geist Mono" font-size="11">Redis Cache</text>
      <!-- Message Queue -->
      <rect x="235" y="370" width="130" height="44" rx="8" fill="rgba(240,96,144,0.07)" stroke="rgba(240,96,144,0.3)" stroke-width="1"/>
      <text x="300" y="396" text-anchor="middle" fill="#f06090" font-family="Geist Mono" font-size="11">Msg Queue</text>
      <!-- DB Primary -->
      <rect x="60" y="470" width="130" height="44" rx="8" fill="rgba(242,135,90,0.07)" stroke="rgba(242,135,90,0.3)" stroke-width="1"/>
      <text x="125" y="496" text-anchor="middle" fill="#f2875a" font-family="Geist Mono" font-size="11">Primary DB</text>
      <!-- DB Replica -->
      <rect x="235" y="470" width="130" height="44" rx="8" fill="rgba(242,135,90,0.04)" stroke="rgba(242,135,90,0.18)" stroke-width="1"/>
      <text x="300" y="496" text-anchor="middle" fill="#a06040" font-family="Geist Mono" font-size="11">DB Replica</text>
      <!-- CDN -->
      <rect x="410" y="370" width="130" height="44" rx="8" fill="rgba(144,208,96,0.07)" stroke="rgba(144,208,96,0.3)" stroke-width="1"/>
      <text x="475" y="396" text-anchor="middle" fill="#90d060" font-family="Geist Mono" font-size="11">CDN / Edge</text>
      <!-- Object Store -->
      <rect x="410" y="470" width="130" height="44" rx="8" fill="rgba(139,120,245,0.07)" stroke="rgba(139,120,245,0.25)" stroke-width="1"/>
      <text x="475" y="496" text-anchor="middle" fill="#8b78f5" font-family="Geist Mono" font-size="11">Object Store</text>
      <!-- Workers -->
      <rect x="235" y="570" width="130" height="44" rx="8" fill="rgba(240,96,144,0.07)" stroke="rgba(240,96,144,0.25)" stroke-width="1"/>
      <text x="300" y="596" text-anchor="middle" fill="#f06090" font-family="Geist Mono" font-size="11">Workers</text>
      <!-- Connections -->
      <defs>
        <marker id="mh" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 L1.5,3Z" fill="rgba(139,120,245,0.4)"/></marker>
        <marker id="mg" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 L1.5,3Z" fill="rgba(61,217,179,0.4)"/></marker>
        <marker id="my" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 L1.5,3Z" fill="rgba(245,200,66,0.4)"/></marker>
        <marker id="mp" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 L1.5,3Z" fill="rgba(240,96,144,0.4)"/></marker>
      </defs>
      <line x1="300" y1="108" x2="300" y2="160" stroke="rgba(96,200,240,0.35)" stroke-width="1" marker-end="url(#mh)"/>
      <line x1="240" y1="184" x2="155" y2="270" stroke="rgba(61,217,179,0.3)" stroke-width="1" marker-end="url(#mg)"/>
      <line x1="300" y1="208" x2="300" y2="270" stroke="rgba(61,217,179,0.3)" stroke-width="1" marker-end="url(#mg)"/>
      <line x1="360" y1="184" x2="445" y2="270" stroke="rgba(61,217,179,0.3)" stroke-width="1" marker-end="url(#mg)"/>
      <line x1="125" y1="314" x2="125" y2="370" stroke="rgba(245,200,66,0.25)" stroke-width="1" marker-end="url(#my)"/>
      <line x1="285" y1="314" x2="270" y2="370" stroke="rgba(240,96,144,0.25)" stroke-width="1" marker-end="url(#mp)"/>
      <line x1="125" y1="414" x2="125" y2="470" stroke="rgba(242,135,90,0.25)" stroke-width="1" marker-end="url(#mh)"/>
      <line x1="192" y1="492" x2="235" y2="492" stroke="rgba(242,135,90,0.2)" stroke-width="1" stroke-dasharray="3 2" marker-end="url(#mh)"/>
      <line x1="300" y1="414" x2="300" y2="570" stroke="rgba(240,96,144,0.2)" stroke-width="1" marker-end="url(#mp)"/>
      <line x1="475" y1="314" x2="475" y2="370" stroke="rgba(144,208,96,0.25)" stroke-width="1" marker-end="url(#mg)"/>
      <line x1="475" y1="414" x2="475" y2="470" stroke="rgba(139,120,245,0.25)" stroke-width="1" marker-end="url(#mh)"/>
      <!-- animated dot -->
      <circle cx="300" cy="130" r="3.5" fill="rgba(96,200,240,0.9)">
        <animate attributeName="cy" values="108;160" dur="2.4s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="1;0" dur="2.4s" repeatCount="indefinite"/>
      </circle>
      <circle cx="125" cy="340" r="3" fill="rgba(61,217,179,0.9)">
        <animate attributeName="cy" values="314;370" dur="1.8s" repeatCount="indefinite" begin="0.6s"/>
        <animate attributeName="opacity" values="1;0" dur="1.8s" repeatCount="indefinite" begin="0.6s"/>
      </circle>
      <!-- legend -->
      <text x="30" y="660" fill="rgba(139,120,245,0.3)" font-family="Geist Mono" font-size="10">← Distributed System Architecture →</text>
    </svg>
  </div>
</section>


<!-- ═══════════════════════════════ CODE DESIGN ═══════════════════════════════ -->
<section id="code-design" style="background:var(--bg)">
<div class="wrap section-pad">
  <div class="sh rev">
    <div class="sh-tag">00 — Software Design</div>
    <h2 class="sh-title">Code-Level <em>Architecture</em></h2>
    <p class="sh-sub">Before you scale systems to millions, you must structure your code to scale to dozens of engineers. The foundational rules of cleanly structured code.</p>
  </div>

  <div class="acc rev" style="--pip:var(--c5)">
    <div class="acc-head" onclick="tog(this)">
      <div class="acc-pip"></div>
      <div class="acc-title">The 4 Pillars of Object-Oriented Programming (OOP)</div>
      <div class="acc-chev">▼</div>
    </div>
    <div class="acc-body">
      <div class="acc-inner">
        <div class="acc-text">
          <p><span class="hl">Encapsulation</span>: Bundling data (attributes) and the methods that operate on that data into a single unit (class). Critically, it restricts direct access to some of the object's components (using access modifiers like private/protected), preventing external code from accidentally mutating internal state.</p>
          <p><span class="hl">Abstraction</span>: Hiding the complex implementation details of a system and exposing only the necessary parts. If encapsulation is about "hiding state", abstraction is about "hiding complexity". A user presses a gas pedal without knowing how the fuel injector works.</p>
          <p><span class="hl">Inheritance</span>: Mechanism where a new class derives properties and characteristics from an existing class. Promotes code reusability. "A Dog IS-A Animal". (Though modern design often prefers <em>composition over inheritance</em>).</p>
          <p><span class="hl">Polymorphism</span>: "Many forms". Treating objects of different classes through the same interface. This allows functions to use objects of different types at runtime without knowing their exact type beforehand. (e.g., <code>animal.speak()</code> calling Bark or Meow depending on the overriding child).</p>
          <div id="flashcard-oop"></div>
        </div>
      </div>
    </div>
  </div>

  <div class="acc rev" style="--pip:var(--c4)">
    <div class="acc-head" onclick="tog(this)">
      <div class="acc-pip"></div>
      <div class="acc-title">SOLID Principles — Building maintainable systems</div>
      <div class="acc-chev">▼</div>
    </div>
    <div class="acc-body">
      <div class="acc-inner">
        <div class="acc-text">
          <p><span class="hl">Single Responsibility (SRP)</span>: A class should have one, and only one, reason to change. If a module both fetches data from an API and formats the UI, it violates SRP.</p>
          <p><span class="hl">Open/Closed (OCP)</span>: Software entities should be open for extension, but closed for modification. You should be able to add new functionality without tearing into existing, working code (often achieved via interfaces and polymorphism).</p>
          <p><span class="hl">Liskov Substitution (LSP)</span>: Objects of a superclass should be replaceable with objects of its subclasses without breaking the application. If a <code>Square</code> inherits from <code>Rectangle</code> but behaves differently when setting width vs height, it violates LSP.</p>
          <p><span class="hl">Interface Segregation (ISP)</span>: No client should be forced to depend on methods it does not use. Large, bulky interfaces should be split into smaller, hyper-specific ones.</p>
          <p><span class="hl">Dependency Inversion (DIP)</span>: High-level modules should not depend on low-level modules. Both should depend on abstractions (interfaces). "Depend on abstractions, not on concretions." This is the core of modern Dependency Injection.</p>
          <pre class="code">// Example of Dependency Inversion:
// BAD:
// class NotificationService {
//    private emailSender = new EmailSender(); // Tightly coupled!
// }
// 
// GOOD:
// class NotificationService {
//    constructor(private sender: ISender) {} // Depends on interface
// }</pre>
          <div id="flashcard-solid"></div>
        </div>
      </div>
    </div>
  </div>
</div>
</section>

<!-- ═══════════════════════════════ FOUNDATIONS ═══════════════════════════════ -->
<section id="foundations" style="background:var(--bg2)">
<div class="wrap section-pad">
  <div class="sh rev">
    <div class="sh-tag">01 — Foundations</div>
    <h2 class="sh-title">Core Mental Models</h2>
    <p class="sh-sub">The conceptual bedrock every distributed systems engineer must internalize. These aren't entry-level — they're timeless.</p>
  </div>

  <div class="topic-grid rev" style="margin-bottom:2.5rem">
    <div class="topic-card" style="--tc:var(--c1)"><div class="tc-num">01</div><div class="tc-icon">△</div><div class="tc-name">CAP Theorem</div><div class="tc-desc">Consistency, Availability, Partition Tolerance — pick two in any distributed system</div><div class="tc-badge">Core Theory</div></div>
    <div class="topic-card" style="--tc:var(--c3)"><div class="tc-num">02</div><div class="tc-icon">≈</div><div class="tc-name">PACELC Theorem</div><div class="tc-desc">Extension of CAP — also considers latency vs consistency trade-off even without partitions</div><div class="tc-badge">Advanced</div></div>
    <div class="topic-card" style="--tc:var(--c4)"><div class="tc-num">03</div><div class="tc-icon">⟳</div><div class="tc-name">Eventual Consistency</div><div class="tc-desc">Nodes will converge to the same state given no new updates — models, guarantees, conflicts</div><div class="tc-badge">Core Theory</div></div>
    <div class="topic-card" style="--tc:var(--c2)"><div class="tc-num">04</div><div class="tc-icon">∿</div><div class="tc-name">Fallacies of Distributed Computing</div><div class="tc-desc">8 assumptions that will break your system: reliable network, zero latency, infinite bandwidth…</div><div class="tc-badge">Must Know</div></div>
  </div>

  <!-- CAP ACCORDION -->
  <div class="acc rev" style="--pip:var(--c1)">
    <div class="acc-head" onclick="tog(this)">
      <div class="acc-pip"></div>
      <div class="acc-title">CAP Theorem — The fundamental impossibility<span class="lbadge beg">Foundation</span></div>
      <div class="acc-meta">Eric Brewer, 2000</div>
      <div class="acc-chev">▼</div>
    </div>
    <div class="acc-body">
      <div class="acc-inner">
        <div class="acc-text">
          <p>In any distributed system, network partitions (P) are a fact of life — messages get lost, delayed, duplicated. The question becomes: when a partition occurs, do you preserve <span class="hl">Consistency</span> or <span class="hl">Availability</span>?</p>
          <p><span class="hl">CP systems</span> (HBase, Zookeeper, etcd): refuse to serve stale data. Return errors during partitions. Used for financial ledgers, configuration stores, leader election.</p>
          <p><span class="hl">AP systems</span> (Cassandra, CouchDB, DynamoDB): stay up and serve best-effort data. Resolve conflicts later with LWW, vector clocks, or CRDTs. Used for social feeds, carts, counters.</p>
          <p><span class="hl">PACELC goes further</span>: even without partitions, you face a latency (L) vs consistency (C) trade-off. Cassandra is PA/EL — it sacrifices consistency for both availability and latency.</p>
          <pre class="code">// Real classifications:
// MySQL single node → CA (not partition tolerant)
// Cassandra         → AP (eventual consistency)
// HBase / Zookeeper → CP (strong consistency)
// DynamoDB          → AP by default, CP with option
// MongoDB           → CP (primary reads default)
// CockroachDB       → CP (distributed SQL)</pre>
<div id="flashcard-cap" style="margin-top:1.5rem"></div>
        </div>
        <div class="acc-visual">
          <svg viewBox="0 0 300 260">
            <defs>
              <radialGradient id="rg1" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="rgba(139,120,245,0.35)"/><stop offset="100%" stop-color="rgba(139,120,245,0)"/></radialGradient>
              <radialGradient id="rg2" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="rgba(61,217,179,0.35)"/><stop offset="100%" stop-color="rgba(61,217,179,0)"/></radialGradient>
              <radialGradient id="rg3" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="rgba(242,135,90,0.35)"/><stop offset="100%" stop-color="rgba(242,135,90,0)"/></radialGradient>
            </defs>
            <polygon points="150,18 18,220 282,220" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>
            <circle cx="150" cy="18" r="34" fill="url(#rg1)"/>
            <circle cx="18" cy="220" r="34" fill="url(#rg2)"/>
            <circle cx="282" cy="220" r="34" fill="url(#rg3)"/>
            <text x="150" y="13" text-anchor="middle" fill="#b0a2f8" font-family="Geist Mono" font-size="12" font-weight="600">C</text>
            <text x="150" y="27" text-anchor="middle" fill="#8b78f5" font-family="Geist Mono" font-size="8">Consistency</text>
            <text x="18" y="215" text-anchor="middle" fill="#3dd9b3" font-family="Geist Mono" font-size="12" font-weight="600">A</text>
            <text x="18" y="229" text-anchor="middle" fill="#3dd9b3" font-family="Geist Mono" font-size="8">Availability</text>
            <text x="282" y="215" text-anchor="middle" fill="#f2875a" font-family="Geist Mono" font-size="12" font-weight="600">P</text>
            <text x="282" y="229" text-anchor="middle" fill="#f2875a" font-family="Geist Mono" font-size="8">Partition</text>
            <text x="72" y="130" text-anchor="middle" fill="#60c8f0" font-family="Geist Mono" font-size="9">HBase</text>
            <text x="72" y="142" text-anchor="middle" fill="#60c8f0" font-family="Geist Mono" font-size="8">Zookeeper</text>
            <text x="228" y="130" text-anchor="middle" fill="#f5c842" font-family="Geist Mono" font-size="9">Cassandra</text>
            <text x="228" y="142" text-anchor="middle" fill="#f5c842" font-family="Geist Mono" font-size="8">DynamoDB</text>
            <text x="150" y="238" text-anchor="middle" fill="#8b78f5" font-family="Geist Mono" font-size="9">MySQL (single)</text>
          </svg>
        </div>
      </div>
    </div>
  </div>

  <!-- PACELC -->
  <div class="acc rev" style="--pip:var(--c3)">
    <div class="acc-head" onclick="tog(this)">
      <div class="acc-pip"></div>
      <div class="acc-title">PACELC Theorem — Beyond CAP<span class="lbadge adv">Advanced</span></div>
      <div class="acc-meta">Daniel Abadi, 2012</div>
      <div class="acc-chev">▼</div>
    </div>
    <div class="acc-body">
      <div class="acc-inner">
        <div class="acc-text">
          <p>CAP only deals with partition scenarios. PACELC adds: <span class="hl">even when the system is running normally (Else), there's a trade-off between Latency and Consistency</span>.</p>
          <p>Full model: <span class="tag-inline">if Partition → (A or C) else (L or C)</span>. Every system makes both choices.</p>
          <p>Dynamo-style systems (Cassandra, Riak) are <span class="hl">PA/EL</span> — sacrifice consistency for availability and latency.</p>
          <p>VoltDB, Spanner are <span class="hl">PC/EC</span> — sacrifice availability and latency for strong consistency always.</p>
          <pre class="code">// PACELC Classification:
// Cassandra    → PA/EL (tunable consistency)
// DynamoDB     → PA/EL (strong consistency opt-in)
// MongoDB      → PA/EC (replica set w/ write concern)
// Spanner      → PC/EC (TrueTime, external consistency)
// MySQL Cluster→ PC/EC
// PNUTS (Yahoo)→ PA/EL</pre>
        </div>
        <div class="acc-visual">
          <svg viewBox="0 0 280 200">
            <rect x="10" y="40" width="260" height="120" rx="10" fill="rgba(61,217,179,0.06)" stroke="rgba(61,217,179,0.2)" stroke-width="1"/>
            <text x="140" y="32" text-anchor="middle" fill="#3dd9b3" font-family="Geist Mono" font-size="10" font-weight="600">if PARTITION</text>
            <rect x="20" y="60" width="100" height="80" rx="7" fill="rgba(139,120,245,0.1)" stroke="rgba(139,120,245,0.3)" stroke-width="1"/>
            <text x="70" y="95" text-anchor="middle" fill="#a895f8" font-family="Geist Mono" font-size="11">Choose</text>
            <text x="70" y="110" text-anchor="middle" fill="#a895f8" font-family="Geist Mono" font-size="11">A or C</text>
            <rect x="160" y="60" width="100" height="80" rx="7" fill="rgba(242,135,90,0.1)" stroke="rgba(242,135,90,0.3)" stroke-width="1"/>
            <text x="210" y="95" text-anchor="middle" fill="#f2875a" font-family="Geist Mono" font-size="11">Else</text>
            <text x="210" y="110" text-anchor="middle" fill="#f2875a" font-family="Geist Mono" font-size="11">L or C</text>
            <text x="140" y="170" text-anchor="middle" fill="rgba(255,255,255,0.2)" font-family="Geist Mono" font-size="9">Latency vs Consistency always</text>
          </svg>
        </div>
      </div>
    </div>
  </div>

  <!-- CONSISTENCY MODELS -->
  <div class="acc rev" style="--pip:var(--c4)">
    <div class="acc-head" onclick="tog(this)">
      <div class="acc-pip"></div>
      <div class="acc-title">Consistency Models — The full spectrum<span class="lbadge int">Intermediate</span></div>
      <div class="acc-meta">Strong → Weak</div>
      <div class="acc-chev">▼</div>
    </div>
    <div class="acc-body">
      <div class="acc-inner">
        <div class="acc-text">
          <p><span class="hl">Linearizability (Strict)</span>: Every read reflects the most recent write globally. Gold standard. Very expensive. Used in etcd, Zookeeper.</p>
          <p><span class="hl">Sequential Consistency</span>: All operations appear in the same sequential order across nodes, but not necessarily real-time order. Used in multi-processor memory models.</p>
          <p><span class="hl">Causal Consistency</span>: Operations that are causally related appear in the correct order. Concurrent operations can be seen in any order. Practical sweet spot.</p>
          <p><span class="hl">Read Your Own Writes</span>: After a write, that same client is guaranteed to see it. Simple, common requirement.</p>
          <p><span class="hl">Eventual Consistency</span>: Nodes will converge. No timing guarantees. Highest availability. Used in DNS, Cassandra default, S3.</p>
          <pre class="code">// Linearizable: Spanner, etcd, ZooKeeper
// Sequential:   Multi-CPU RAM (TSO model)  
// Causal:       MongoDB (causal sessions)
// Read-my-writes: DynamoDB (same session)
// Monotonic read: Cassandra with consistency=ONE
// Eventual:     DNS, S3, Cassandra default</pre>
        </div>
        <div class="acc-visual">
          <svg viewBox="0 0 280 230">
            <rect x="20" y="10" width="240" height="34" rx="7" fill="rgba(139,120,245,0.15)" stroke="rgba(139,120,245,0.5)" stroke-width="1"/>
            <text x="140" y="31" text-anchor="middle" fill="#a895f8" font-family="Geist Mono" font-size="11">Linearizable ← strongest</text>
            <rect x="30" y="52" width="220" height="32" rx="7" fill="rgba(96,200,240,0.1)" stroke="rgba(96,200,240,0.4)" stroke-width="1"/>
            <text x="140" y="72" text-anchor="middle" fill="#60c8f0" font-family="Geist Mono" font-size="11">Sequential Consistency</text>
            <rect x="40" y="92" width="200" height="32" rx="7" fill="rgba(61,217,179,0.1)" stroke="rgba(61,217,179,0.35)" stroke-width="1"/>
            <text x="140" y="112" text-anchor="middle" fill="#3dd9b3" font-family="Geist Mono" font-size="11">Causal Consistency</text>
            <rect x="50" y="132" width="180" height="32" rx="7" fill="rgba(245,200,66,0.08)" stroke="rgba(245,200,66,0.3)" stroke-width="1"/>
            <text x="140" y="152" text-anchor="middle" fill="#f5c842" font-family="Geist Mono" font-size="11">Read Your Own Writes</text>
            <rect x="60" y="172" width="160" height="32" rx="7" fill="rgba(242,135,90,0.08)" stroke="rgba(242,135,90,0.25)" stroke-width="1"/>
            <text x="140" y="192" text-anchor="middle" fill="#f2875a" font-family="Geist Mono" font-size="11">Eventual → weakest</text>
            <text x="270" y="30" fill="rgba(139,120,245,0.4)" font-family="Geist Mono" font-size="9" text-anchor="end">← high cost</text>
            <text x="270" y="192" fill="rgba(242,135,90,0.4)" font-family="Geist Mono" font-size="9" text-anchor="end">← high perf</text>
          </svg>
        </div>
      </div>
    </div>
  </div>
</div>
<div id="quiz-foundations" style="margin-top: 2rem;"></div>
</section>

<!-- ═══════════════════════════════ INFRASTRUCTURE ═══════════════════════════════ -->
<section id="infrastructure" style="background:var(--bg)">
<div class="wrap section-pad">
  <div class="sh rev">
    <div class="sh-tag">02 — Infrastructure</div>
    <h2 class="sh-title">Scaling & <em>Traffic</em></h2>
    <p class="sh-sub">The building blocks of every high-scale system — load balancing, caching, CDNs, and the math behind scaling decisions.</p>
  </div>

  <!-- SCALING -->
  <div class="acc rev" style="--pip:var(--c3)">
    <div class="acc-head" onclick="tog(this)">
      <div class="acc-pip"></div>
      <div class="acc-title">Scaling Strategies — Vertical, Horizontal, and beyond</div>
      <div class="acc-chev">▼</div>
    </div>
    <div class="acc-body">
      <div class="acc-inner">
        <div class="acc-text">
          <p><span class="hl">Vertical scaling</span>: More RAM, CPU, faster disk on one machine. Simple, no code change. Hard ceiling. Single point of failure.</p>
          <p><span class="hl">Horizontal scaling</span>: More machines, distribute load. Requires stateless services, distributed session, consistent hashing. Linear cost scaling.</p>
          <p><span class="hl">Stateless vs Stateful</span>: Stateless services (REST APIs, compute) scale horizontally trivially. Stateful services (databases, sessions) require sharding, replication, or external state stores.</p>
          <p><span class="hl">Read replicas</span>: Scale read traffic independently. Writes go to primary, reads distributed across replicas. 80% of workloads are read-heavy — this is high leverage.</p>
          <p><span class="hl">Functional decomposition</span>: Split a monolith by business domain into services. Each can scale independently. The cost is operational complexity.</p>
          <pre class="code">// Scaling ladder (rough heuristics):
// 1K users   → 1 server + DB
// 10K users  → Read replica + cache
// 100K users → Horizontal API + CDN
// 1M users   → Microservices + sharding
// 10M+ users → Multi-region + async everywhere</pre>
        </div>
        <div class="acc-visual">
          <svg viewBox="0 0 280 190">
            <text x="70" y="16" text-anchor="middle" fill="#60c8f0" font-family="Geist Mono" font-size="9">VERTICAL</text>
            <rect x="30" y="25" width="80" height="130" rx="8" fill="rgba(139,120,245,0.08)" stroke="rgba(139,120,245,0.35)" stroke-width="1"/>
            <text x="70" y="60" text-anchor="middle" fill="#8b78f5" font-family="Geist Mono" font-size="9">256 GB</text>
            <text x="70" y="75" text-anchor="middle" fill="#8b78f5" font-family="Geist Mono" font-size="9">128-core</text>
            <text x="70" y="90" text-anchor="middle" fill="#8b78f5" font-family="Geist Mono" font-size="9">10TB NVMe</text>
            <text x="70" y="170" text-anchor="middle" fill="#4a4668" font-family="Geist Mono" font-size="8">1 big box</text>
            <line x1="140" y1="10" x2="140" y2="185" stroke="rgba(255,255,255,0.04)" stroke-width="1" stroke-dasharray="4 3"/>
            <text x="210" y="16" text-anchor="middle" fill="#3dd9b3" font-family="Geist Mono" font-size="9">HORIZONTAL</text>
            <rect x="160" y="25" width="50" height="38" rx="6" fill="rgba(61,217,179,0.08)" stroke="rgba(61,217,179,0.3)" stroke-width="1"/>
            <rect x="220" y="25" width="50" height="38" rx="6" fill="rgba(61,217,179,0.08)" stroke="rgba(61,217,179,0.3)" stroke-width="1"/>
            <rect x="160" y="72" width="50" height="38" rx="6" fill="rgba(61,217,179,0.08)" stroke="rgba(61,217,179,0.3)" stroke-width="1"/>
            <rect x="220" y="72" width="50" height="38" rx="6" fill="rgba(61,217,179,0.08)" stroke="rgba(61,217,179,0.3)" stroke-width="1"/>
            <rect x="160" y="119" width="50" height="38" rx="6" fill="rgba(61,217,179,0.05)" stroke="rgba(61,217,179,0.2)" stroke-width="1" stroke-dasharray="3 2"/>
            <rect x="220" y="119" width="50" height="38" rx="6" fill="rgba(61,217,179,0.05)" stroke="rgba(61,217,179,0.2)" stroke-width="1" stroke-dasharray="3 2"/>
            <text x="210" y="170" text-anchor="middle" fill="#4a4668" font-family="Geist Mono" font-size="8">+ add more →</text>
          </svg>
        </div>
      </div>
    </div>
  </div>

  <!-- LOAD BALANCING -->
  <div class="acc rev" style="--pip:var(--c5)">
    <div class="acc-head" onclick="tog(this)">
      <div class="acc-pip"></div>
      <div class="acc-title">Load Balancing — Algorithms, layers, and health checking</div>
      <div class="acc-chev">▼</div>
    </div>
    <div class="acc-body">
      <div class="acc-inner">
        <div class="acc-text">
          <p><span class="hl">L4 Load Balancing</span>: Routes by IP/TCP. Faster, no content inspection. Used for raw TCP, UDP, non-HTTP. AWS NLB, HAProxy (TCP mode).</p>
          <p><span class="hl">L7 Load Balancing</span>: Routes by HTTP content — headers, cookies, path, query params. Enables path-based routing, A/B testing, sticky sessions. Nginx, AWS ALB.</p>
          <p><span class="hl">Round Robin</span>: Simple rotation. Works when servers are homogeneous.</p>
          <p><span class="hl">Weighted Round Robin</span>: Servers get traffic proportional to their capacity.</p>
          <p><span class="hl">Least Connections</span>: New request goes to server with fewest active connections. Better for variable-duration requests.</p>
          <p><span class="hl">Consistent Hashing</span>: Same client → same server. Essential for caching layers, session affinity. Virtual nodes handle unequal distribution.</p>
          <p><span class="hl">Health checking</span>: Active (periodic HTTP pings) or passive (track error rates). Remove unhealthy nodes automatically.</p>
          <pre class="code">// Session stickiness options:
// 1. Client IP hash (inaccurate with NAT)
// 2. Cookie-based (LB injects cookie)
// 3. Application-level token (preferred)
// 4. Shared session store (Redis) ← best</pre><br><button class="viz-btn" data-sys="lb" style="background:var(--c5);color:#000;margin-top:1rem;padding:0.4rem 0.8rem;border-radius:5px;font-family:var(--font-sans);font-weight:600;font-size:11px;cursor:pointer;border:none;">⬡ Visualize in Playground →</button>
        </div>
        <div class="acc-visual">
          <svg viewBox="0 0 280 180">
            <rect x="100" y="10" width="80" height="36" rx="6" fill="rgba(96,200,240,0.1)" stroke="rgba(96,200,240,0.4)" stroke-width="1"/>
            <text x="140" y="32" text-anchor="middle" fill="#60c8f0" font-family="Geist Mono" font-size="10">LB</text>
            <line x1="110" y1="46" x2="50" y2="90" stroke="rgba(61,217,179,0.35)" stroke-width="1"/>
            <line x1="140" y1="46" x2="140" y2="90" stroke="rgba(61,217,179,0.35)" stroke-width="1"/>
            <line x1="170" y1="46" x2="230" y2="90" stroke="rgba(61,217,179,0.35)" stroke-width="1"/>
            <rect x="10" y="90" width="80" height="34" rx="6" fill="rgba(61,217,179,0.08)" stroke="rgba(61,217,179,0.35)" stroke-width="1"/>
            <text x="50" y="111" text-anchor="middle" fill="#3dd9b3" font-family="Geist Mono" font-size="9">srv-1 ✓</text>
            <rect x="100" y="90" width="80" height="34" rx="6" fill="rgba(61,217,179,0.08)" stroke="rgba(61,217,179,0.35)" stroke-width="1"/>
            <text x="140" y="111" text-anchor="middle" fill="#3dd9b3" font-family="Geist Mono" font-size="9">srv-2 ✓</text>
            <rect x="190" y="90" width="80" height="34" rx="6" fill="rgba(242,135,90,0.05)" stroke="rgba(242,135,90,0.25)" stroke-width="1" stroke-dasharray="3 2"/>
            <text x="230" y="111" text-anchor="middle" fill="#a06040" font-family="Geist Mono" font-size="9">srv-3 ✗</text>
            <text x="140" y="158" text-anchor="middle" fill="#4a4668" font-family="Geist Mono" font-size="9">srv-3 excluded by health check</text>
          </svg>
        </div>
      </div>
    </div>
  </div>

  <!-- CACHING -->
  <div class="acc rev" style="--pip:var(--c4)">
    <div class="acc-head" onclick="tog(this)">
      <div class="acc-pip"></div>
      <div class="acc-title">Caching — Strategies, eviction, invalidation<span class="lbadge int">Intermediate</span></div>
      <div class="acc-chev">▼</div>
    </div>
    <div class="acc-body">
      <div class="acc-inner">
        <div class="acc-text">
          <p><span class="hl">Cache-aside (lazy loading)</span>: App checks cache → miss → load from DB → write to cache. Handles cache failures gracefully. Data only cached when needed. Most common.</p>
          <p><span class="hl">Write-through</span>: Write to cache and DB in same operation. Always consistent. Higher write latency. Wastes space if data is never read.</p>
          <p><span class="hl">Write-back (write-behind)</span>: Write to cache, async flush to DB. Lowest latency. Risk of data loss on crash. Used for high-write counters.</p>
          <p><span class="hl">Read-through</span>: Cache handles fetching from DB on miss. Simpler app code. Used in CDNs, ORM-level caches.</p>
          <p><span class="hl">Eviction policies</span>: LRU (most common), LFU (frequency), TTL (time-based), FIFO. Redis supports LRU, LFU, TTL, and random.</p>
          <p><span class="hl">Cache invalidation</span>: The hardest problem. Strategies: TTL-based expiry, event-driven invalidation, cache versioning, two-phase invalidation.</p>
          <p><span class="hl">Cache stampede (thundering herd)</span>: Many requests miss simultaneously on the same key. Solutions: mutex locking, probabilistic early expiration, background refresh.</p>
          <pre class="code">// Cache sizing: target &gt;90% hit rate
// Cold start: pre-warm from DB dumps
// Stampede: lock-based or staggered TTL
// Hotspot: local in-process L1 cache +
//          distributed Redis L2 cache</pre>
        </div>
        <div class="acc-visual">
          <svg viewBox="0 0 280 200">
            <rect x="100" y="10" width="80" height="34" rx="6" fill="rgba(139,120,245,0.1)" stroke="rgba(139,120,245,0.35)" stroke-width="1"/>
            <text x="140" y="31" text-anchor="middle" fill="#a895f8" font-family="Geist Mono" font-size="10">App</text>
            <rect x="180" y="80" width="85" height="34" rx="6" fill="rgba(245,200,66,0.1)" stroke="rgba(245,200,66,0.4)" stroke-width="1"/>
            <text x="222" y="101" text-anchor="middle" fill="#f5c842" font-family="Geist Mono" font-size="10">Cache</text>
            <rect x="15" y="80" width="85" height="34" rx="6" fill="rgba(242,135,90,0.1)" stroke="rgba(242,135,90,0.35)" stroke-width="1"/>
            <text x="57" y="101" text-anchor="middle" fill="#f2875a" font-family="Geist Mono" font-size="10">Database</text>
            <path d="M175 30 L222 80" stroke="rgba(245,200,66,0.5)" stroke-width="1" fill="none"/>
            <path d="M105 30 L57 80" stroke="rgba(242,135,90,0.4)" stroke-width="1" fill="none" stroke-dasharray="4 3"/>
            <path d="M100 114 L265 114" stroke="rgba(61,217,179,0.35)" stroke-width="1" fill="none" stroke-dasharray="3 2"/>
            <text x="222" y="130" text-anchor="middle" fill="#3dd9b3" font-family="Geist Mono" font-size="8">~0.1ms HIT</text>
            <text x="57" y="130" text-anchor="middle" fill="#f2875a" font-family="Geist Mono" font-size="8">~5ms MISS</text>
            <text x="175" y="64" text-anchor="middle" fill="#f5c842" font-family="Geist Mono" font-size="8">check first</text>
            <text x="80" y="64" text-anchor="middle" fill="#f2875a" font-family="Geist Mono" font-size="8">fallback</text>
            <rect x="80" y="155" width="120" height="30" rx="5" fill="rgba(139,120,245,0.06)" stroke="rgba(139,120,245,0.2)" stroke-width="1"/>
            <text x="140" y="172" text-anchor="middle" fill="#8b78f5" font-family="Geist Mono" font-size="9">Populate on miss</text>
          </svg>
        </div>
      </div>
    </div>
  </div>

  <!-- CDN -->
  <div class="acc rev" style="--pip:var(--c7)">
    <div class="acc-head" onclick="tog(this)">
      <div class="acc-pip"></div>
      <div class="acc-title">CDN & Edge Computing — Push vs Pull, global distribution</div>
      <div class="acc-chev">▼</div>
    </div>
    <div class="acc-body">
      <div class="acc-inner">
        <div class="acc-text">
          <p><span class="hl">CDN (Content Delivery Network)</span>: Geographically distributed cache servers (PoPs — Points of Presence). Serve static assets, cached API responses, and now even serverless functions at the edge.</p>
          <p><span class="hl">Push CDN</span>: You push content to CDN proactively. Good for static content that doesn't change often. Control over what's cached. Used by streaming platforms.</p>
          <p><span class="hl">Pull CDN</span>: CDN fetches from origin on first request, then caches. Simpler to manage. Potential cold start delay. Most common.</p>
          <p><span class="hl">Edge Computing</span>: Run code at CDN PoPs (Cloudflare Workers, AWS Lambda@Edge). Sub-5ms latency for auth, routing, A/B testing. Can't do heavy compute — stateless, limited CPU.</p>
          <p><span class="hl">Cache purging</span>: How to invalidate CDN cache? URL versioning (/v2/app.js), cache-control headers, purge API calls, surrogate keys (Fastly, Varnish).</p>
          <pre class="code">// CDN use cases:
// Static assets     → JS, CSS, images
// API responses     → public, read-only, cacheable
// Video streaming   → chunked, edge-cached
// Auth at edge      → JWT verification, rate limiting
// Geographic routing→ serve closest region</pre>
        </div>
        <div class="acc-visual">
          <svg viewBox="0 0 280 180">
            <rect x="105" y="10" width="70" height="30" rx="5" fill="rgba(144,208,96,0.1)" stroke="rgba(144,208,96,0.35)" stroke-width="1"/>
            <text x="140" y="29" text-anchor="middle" fill="#90d060" font-family="Geist Mono" font-size="9">Origin</text>
            <circle cx="140" cy="90" r="45" fill="none" stroke="rgba(144,208,96,0.15)" stroke-width="1" stroke-dasharray="4 3"/>
            <circle cx="140" cy="90" r="28" fill="none" stroke="rgba(144,208,96,0.1)" stroke-width="1" stroke-dasharray="3 3"/>
            <circle cx="50" cy="90" r="14" fill="rgba(144,208,96,0.1)" stroke="rgba(144,208,96,0.35)" stroke-width="1"/>
            <text x="50" y="94" text-anchor="middle" fill="#90d060" font-family="Geist Mono" font-size="7">PoP</text>
            <circle cx="230" cy="90" r="14" fill="rgba(144,208,96,0.1)" stroke="rgba(144,208,96,0.35)" stroke-width="1"/>
            <text x="230" y="94" text-anchor="middle" fill="#90d060" font-family="Geist Mono" font-size="7">PoP</text>
            <circle cx="140" cy="150" r="14" fill="rgba(144,208,96,0.1)" stroke="rgba(144,208,96,0.35)" stroke-width="1"/>
            <text x="140" y="154" text-anchor="middle" fill="#90d060" font-family="Geist Mono" font-size="7">PoP</text>
            <circle cx="90" cy="55" r="10" fill="rgba(144,208,96,0.07)" stroke="rgba(144,208,96,0.25)" stroke-width="1"/>
            <text x="90" y="59" text-anchor="middle" fill="#90d060" font-family="Geist Mono" font-size="6">PoP</text>
            <circle cx="190" cy="55" r="10" fill="rgba(144,208,96,0.07)" stroke="rgba(144,208,96,0.25)" stroke-width="1"/>
            <text x="190" y="59" text-anchor="middle" fill="#90d060" font-family="Geist Mono" font-size="6">PoP</text>
            <line x1="140" y1="40" x2="50" y2="76" stroke="rgba(144,208,96,0.2)" stroke-width="1"/>
            <line x1="140" y1="40" x2="230" y2="76" stroke="rgba(144,208,96,0.2)" stroke-width="1"/>
            <line x1="140" y1="40" x2="140" y2="136" stroke="rgba(144,208,96,0.2)" stroke-width="1"/>
          </svg>
        </div>
      </div>
    </div>
  </div>

  <!-- RATE LIMITING -->
  <div class="acc rev" style="--pip:var(--c2)">
    <div class="acc-head" onclick="tog(this)">
      <div class="acc-pip"></div>
      <div class="acc-title">Rate Limiting — Algorithms, distributed state<span class="lbadge int">Intermediate</span></div>
      <div class="acc-chev">▼</div>
    </div>
    <div class="acc-body">
      <div class="acc-inner">
        <div class="acc-text">
          <p><span class="hl">Fixed Window Counter</span>: Count requests per fixed time window. Simple. Allows 2x burst at window boundary.</p>
          <p><span class="hl">Sliding Window Log</span>: Store timestamps of all requests. Accurate but memory-intensive. O(n) per request.</p>
          <p><span class="hl">Sliding Window Counter</span>: Approximate sliding window using two fixed buckets. Good accuracy with O(1) space.</p>
          <p><span class="hl">Token Bucket</span>: Tokens added at fixed rate, consumed per request. Allows controlled bursting. AWS API Gateway default.</p>
          <p><span class="hl">Leaky Bucket</span>: Requests queued and processed at fixed rate. Smooths bursts. Adds latency under load. Good for outbound API calls.</p>
          <p><span class="hl">Distributed rate limiting</span>: Share counters in Redis with atomic INCR + EXPIRE. Or use Redis Cell (CL.THROTTLE) which implements GCRA. For very high throughput, use local approximation + centralized reconciliation.</p>
          <pre class="code">// Redis token bucket (Lua for atomicity):
// KEYS[1] = rate_limit:{user_id}
// ARGV = {capacity, refill_rate, tokens_requested}
// Use EVALSHA for performance
// 
// Distributed: local counters per node
//   + periodic sync to Redis ~1s
//   = ~1% error acceptable for rate limiting</pre>
        </div>
        <div class="acc-visual">
          <svg viewBox="0 0 280 200">
            <text x="140" y="16" text-anchor="middle" fill="#f2875a" font-family="Geist Mono" font-size="10">Token Bucket</text>
            <rect x="70" y="25" width="140" height="90" rx="8" fill="rgba(242,135,90,0.06)" stroke="rgba(242,135,90,0.3)" stroke-width="1"/>
            <circle cx="95" cy="55" r="10" fill="rgba(242,135,90,0.4)"/>
            <circle cx="120" cy="55" r="10" fill="rgba(242,135,90,0.4)"/>
            <circle cx="145" cy="55" r="10" fill="rgba(242,135,90,0.4)"/>
            <circle cx="170" cy="55" r="10" fill="rgba(242,135,90,0.15)" stroke="rgba(242,135,90,0.2)" stroke-width="1"/>
            <circle cx="195" cy="55" r="10" fill="rgba(242,135,90,0.15)" stroke="rgba(242,135,90,0.2)" stroke-width="1"/>
            <text x="140" y="90" text-anchor="middle" fill="#a06040" font-family="Geist Mono" font-size="9">3 tokens available</text>
            <text x="140" y="104" text-anchor="middle" fill="#a06040" font-family="Geist Mono" font-size="8">capacity: 5</text>
            <path d="M40 70 L70 70" stroke="rgba(242,135,90,0.5)" stroke-width="1.5" fill="none"/>
            <text x="35" y="66" text-anchor="end" fill="#f2875a" font-family="Geist Mono" font-size="8">+1/s</text>
            <path d="M210 70 L240 70" stroke="rgba(61,217,179,0.5)" stroke-width="1.5" fill="none"/>
            <text x="245" y="66" fill="#3dd9b3" font-family="Geist Mono" font-size="8">req</text>
            <text x="140" y="145" text-anchor="middle" fill="#4a4668" font-family="Geist Mono" font-size="9">allow if token available,</text>
            <text x="140" y="158" text-anchor="middle" fill="#4a4668" font-family="Geist Mono" font-size="9">else reject with 429</text>
          </svg>
        </div>
      </div>
    </div>
  </div>
</div>
<div id="quiz-infrastructure" style="margin-top: 2rem;"></div>
</section>

<!-- ═══════════════════════════════ DATABASES ═══════════════════════════════ -->
<section id="databases" style="background:var(--bg2)">
<div class="wrap section-pad">
  <div class="sh rev">
    <div class="sh-tag">03 — Databases</div>
    <h2 class="sh-title">Storage & <em>Persistence</em></h2>
    <p class="sh-sub">Choosing the right database is the most impactful design decision you'll make. SQL, NoSQL, NewSQL, and everything in between.</p>
  </div>

  <div class="acc rev" style="--pip:var(--c2)">
    <div class="acc-head" onclick="tog(this)">
      <div class="acc-pip"></div>
      <div class="acc-title">SQL vs NoSQL — Decision framework, not dogma</div>
      <div class="acc-chev">▼</div>
    </div>
    <div class="acc-body">
      <div class="acc-inner">
        <div class="acc-text">
          <p>This is never "which is better" — it's "which fits this workload." Many systems use both.</p>
          <div class="cmp">
            <div class="cmp-card" style="background:rgba(96,200,240,0.05);border-color:rgba(96,200,240,0.2)">
              <div class="cmp-title" style="color:var(--c5)">Relational (SQL)</div>
              <ul class="cmp-list">
                <li>ACID transactions</li>
                <li>Complex JOINs</li>
                <li>Schema enforcement</li>
                <li>Foreign key constraints</li>
                <li>Vertical scaling primary</li>
                <li>Use: banking, e-commerce, ERP</li>
              </ul>
            </div>
            <div class="cmp-card" style="background:rgba(61,217,179,0.05);border-color:rgba(61,217,179,0.2)">
              <div class="cmp-title" style="color:var(--c3)">NoSQL</div>
              <ul class="cmp-list">
                <li>Flexible schema</li>
                <li>Horizontal scale native</li>
                <li>High write throughput</li>
                <li>Eventual consistency</li>
                <li>No JOINs (denormalize)</li>
                <li>Use: social, IoT, catalogs</li>
              </ul>
            </div>
          </div>
          <pre class="code">// NoSQL subtypes & use cases:
// Key-Value   → Redis, DynamoDB (sessions, carts)
// Document    → MongoDB, Firestore (user profiles)
// Wide-column → Cassandra, HBase (time-series, logs)
// Graph       → Neo4j, Neptune (social graph, fraud)
// Time-series → InfluxDB, TimescaleDB (metrics)
// Search      → Elasticsearch (full-text search)</pre>
        </div>
        <div class="acc-visual">
          <table class="tbl" style="font-size:11px">
            <thead><tr><th>Factor</th><th>SQL</th><th>NoSQL</th></tr></thead>
            <tbody>
              <tr><td style="color:var(--text2)">Consistency</td><td class="ok">Strong ACID</td><td class="no">Eventual</td></tr>
              <tr><td style="color:var(--text2)">Scale writes</td><td class="no">Hard</td><td class="ok">Native</td></tr>
              <tr><td style="color:var(--text2)">Flexible schema</td><td class="no">Migrations</td><td class="ok">Yes</td></tr>
              <tr><td style="color:var(--text2)">Complex queries</td><td class="ok">SQL, JOINs</td><td class="no">Limited</td></tr>
              <tr><td style="color:var(--text2)">Throughput</td><td class="neu">~10K QPS</td><td class="ok">~100K+ QPS</td></tr>
              <tr><td style="color:var(--text2)">Transactions</td><td class="ok">Full ACID</td><td class="no">Partial</td></tr>
              <tr><td style="color:var(--text2)">Relationships</td><td class="ok">Foreign keys</td><td class="no">Denormalize</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>

  <div class="acc rev" style="--pip:var(--c4)">
    <div class="acc-head" onclick="tog(this)">
      <div class="acc-pip"></div>
      <div class="acc-title">Sharding & Partitioning — Splitting data across nodes<span class="lbadge adv">Advanced</span></div>
      <div class="acc-chev">▼</div>
    </div>
    <div class="acc-body">
      <div class="acc-inner">
        <div class="acc-text">
          <p><span class="hl">Horizontal sharding</span>: Split rows across multiple DB instances. Each shard holds a subset of the data. Scale writes and storage independently.</p>
          <p><span class="hl">Hash-based sharding</span>: shard = hash(key) % N. Even distribution. Hard to add nodes (requires resharding). Consistent hashing solves the resharding problem — only K/N keys move when adding a node.</p>
          <p><span class="hl">Range-based sharding</span>: Shard by value range (A-M on shard 1, N-Z on shard 2). Natural for time-series data. Risk: hot shards if access is not uniform.</p>
          <p><span class="hl">Directory-based sharding</span>: A lookup service maps keys to shards. Maximum flexibility. Single point of failure (mitigate with replication + caching).</p>
          <p><span class="hl">Problems with sharding</span>: Cross-shard JOINs become application-level. Transactions across shards require 2PC (slow) or saga pattern. Resharding requires careful migration.</p>
          <pre class="code">// Consistent hashing ring:
// - Place nodes + virtual nodes on ring
// - Key hashes to nearest clockwise node
// - Add node → only adjacent keys move
// - Virtual nodes → more even distribution
// 
// Used by: Cassandra, DynamoDB, Redis Cluster</pre><br><button class="viz-btn" data-sys="sharding" style="background:var(--c4);color:#000;margin-top:1rem;padding:0.4rem 0.8rem;border-radius:5px;font-family:var(--font-sans);font-weight:600;font-size:11px;cursor:pointer;border:none;">⬡ Visualize Sharding →</button>
        </div>
        <div class="acc-visual">
          <svg viewBox="0 0 280 220">
            <circle cx="140" cy="110" r="80" fill="none" stroke="rgba(245,200,66,0.15)" stroke-width="1.5"/>
            <!-- Shard nodes on ring -->
            <circle cx="140" cy="30" r="18" fill="rgba(245,200,66,0.12)" stroke="rgba(245,200,66,0.4)" stroke-width="1"/>
            <text x="140" y="34" text-anchor="middle" fill="#f5c842" font-family="Geist Mono" font-size="9">DB1</text>
            <circle cx="220" cy="110" r="18" fill="rgba(245,200,66,0.12)" stroke="rgba(245,200,66,0.4)" stroke-width="1"/>
            <text x="220" y="114" text-anchor="middle" fill="#f5c842" font-family="Geist Mono" font-size="9">DB2</text>
            <circle cx="140" cy="190" r="18" fill="rgba(245,200,66,0.12)" stroke="rgba(245,200,66,0.4)" stroke-width="1"/>
            <text x="140" y="194" text-anchor="middle" fill="#f5c842" font-family="Geist Mono" font-size="9">DB3</text>
            <circle cx="60" cy="110" r="18" fill="rgba(245,200,66,0.12)" stroke="rgba(245,200,66,0.4)" stroke-width="1"/>
            <text x="60" y="114" text-anchor="middle" fill="#f5c842" font-family="Geist Mono" font-size="9">DB4</text>
            <!-- Keys on ring -->
            <circle cx="183" cy="53" r="5" fill="rgba(139,120,245,0.6)"/>
            <circle cx="200" cy="160" r="5" fill="rgba(61,217,179,0.6)"/>
            <circle cx="95" cy="170" r="5" fill="rgba(242,135,90,0.6)"/>
            <circle cx="80" cy="55" r="5" fill="rgba(240,96,144,0.6)"/>
            <text x="140" y="110" text-anchor="middle" fill="#4a4668" font-family="Geist Mono" font-size="8">consistent</text>
            <text x="140" y="122" text-anchor="middle" fill="#4a4668" font-family="Geist Mono" font-size="8">hash ring</text>
          </svg>
        </div>
      </div>
    </div>
  </div>

  <div class="acc rev" style="--pip:var(--c1)">
    <div class="acc-head" onclick="tog(this)">
      <div class="acc-pip"></div>
      <div class="acc-title">Replication — Leader-follower, multi-leader, leaderless<span class="lbadge adv">Advanced</span></div>
      <div class="acc-chev">▼</div>
    </div>
    <div class="acc-body">
      <div class="acc-inner">
        <div class="acc-text">
          <p><span class="hl">Leader-follower (master-replica)</span>: All writes go to leader. Followers replicate asynchronously. Reads can go to any. Simple, most common. MySQL, PostgreSQL default.</p>
          <p><span class="hl">Synchronous vs async replication</span>: Sync = durable, high latency. Async = fast, risk of data loss on leader failure. Semi-sync = at least one follower ACKs (MySQL semi-sync).</p>
          <p><span class="hl">Multi-leader replication</span>: Multiple leaders accept writes. Complex conflict resolution required. Use cases: multi-datacenter writes, offline-first apps (CouchDB).</p>
          <p><span class="hl">Leaderless replication</span>: Any node accepts writes. Quorum reads/writes (W + R > N) for consistency. Read repair + anti-entropy for convergence. Dynamo, Cassandra.</p>
          <p><span class="hl">Replication lag</span>: Followers can be seconds or minutes behind. Read-after-write inconsistency is real. Solutions: read from leader for writes, route by session, compare timestamps.</p>
          <pre class="code">// Quorum math (Dynamo-style):
// N = replication factor (e.g., 3)
// W = write quorum  (e.g., 2)
// R = read quorum   (e.g., 2)
// If W + R > N: strong consistency
// If W = 1, R = N: fast writes, slow reads
// If W = N, R = 1: fast reads, slow writes</pre>
        </div>
        <div class="acc-visual">
          <svg viewBox="0 0 280 190">
            <rect x="90" y="10" width="100" height="36" rx="7" fill="rgba(139,120,245,0.12)" stroke="rgba(139,120,245,0.45)" stroke-width="1.5"/>
            <text x="140" y="32" text-anchor="middle" fill="#a895f8" font-family="Geist Mono" font-size="11">Leader</text>
            <rect x="10" y="110" width="90" height="36" rx="7" fill="rgba(61,217,179,0.08)" stroke="rgba(61,217,179,0.3)" stroke-width="1"/>
            <text x="55" y="132" text-anchor="middle" fill="#3dd9b3" font-family="Geist Mono" font-size="10">Replica 1</text>
            <rect x="180" y="110" width="90" height="36" rx="7" fill="rgba(61,217,179,0.08)" stroke="rgba(61,217,179,0.3)" stroke-width="1"/>
            <text x="225" y="132" text-anchor="middle" fill="#3dd9b3" font-family="Geist Mono" font-size="10">Replica 2</text>
            <line x1="110" y1="46" x2="60" y2="110" stroke="rgba(61,217,179,0.35)" stroke-width="1" stroke-dasharray="5 3"/>
            <line x1="170" y1="46" x2="220" y2="110" stroke="rgba(61,217,179,0.35)" stroke-width="1" stroke-dasharray="5 3"/>
            <text x="140" y="82" text-anchor="middle" fill="#4a4668" font-family="Geist Mono" font-size="8">async replicate</text>
            <text x="55" y="165" text-anchor="middle" fill="#f5c842" font-family="Geist Mono" font-size="8">reads ✓</text>
            <text x="225" y="165" text-anchor="middle" fill="#f5c842" font-family="Geist Mono" font-size="8">reads ✓</text>
            <text x="140" y="165" text-anchor="middle" fill="#8b78f5" font-family="Geist Mono" font-size="8">writes → leader</text>
          </svg>
        </div>
      </div>
    </div>
  </div>

  <div class="acc rev" style="--pip:var(--c3)">
    <div class="acc-head" onclick="tog(this)">
      <div class="acc-pip"></div>
      <div class="acc-title">Database Internals — B-trees, LSM trees, WAL, MVCC<span class="lbadge adv">Advanced</span></div>
      <div class="acc-chev">▼</div>
    </div>
    <div class="acc-body">
      <div class="acc-inner">
        <div class="acc-text">
          <p><span class="hl">B-tree (OLTP standard)</span>: Balanced tree, pages of 4–16KB. Good for reads and range queries. In-place updates. Random writes are slow on disk. Used by MySQL InnoDB, PostgreSQL.</p>
          <p><span class="hl">LSM tree (Log-Structured Merge)</span>: All writes go to in-memory MemTable → flushed to immutable SSTables on disk → compaction merges SSTables. High write throughput. Read amplification mitigated by Bloom filters. Used by Cassandra, RocksDB, LevelDB.</p>
          <p><span class="hl">WAL (Write-Ahead Log)</span>: Every change written to log before the actual write. Enables crash recovery and replication. PostgreSQL WAL, MySQL binlog/redo log.</p>
          <p><span class="hl">MVCC (Multi-Version Concurrency Control)</span>: Each transaction sees a snapshot. No read-write conflicts. Multiple versions of rows maintained. Old versions garbage collected. PostgreSQL, MySQL InnoDB, CockroachDB.</p>
          <pre class="code">// B-tree: read O(log n), write O(log n)
// LSM:    read O(log² n), write O(1) amortized
// 
// Read amplification: how many pages per read
// Write amplification: how many disk writes per write
// Space amplification: storage overhead
//
// B-tree: low read amp, high write amp
// LSM:    high read amp, low write amp</pre>
        </div>
        <div class="acc-visual">
          <svg viewBox="0 0 280 200">
            <text x="60" y="14" text-anchor="middle" fill="#60c8f0" font-family="Geist Mono" font-size="9">B-Tree</text>
            <rect x="35" y="24" width="50" height="22" rx="4" fill="rgba(96,200,240,0.1)" stroke="rgba(96,200,240,0.35)" stroke-width="1"/>
            <text x="60" y="39" text-anchor="middle" fill="#60c8f0" font-family="Geist Mono" font-size="8">Root</text>
            <rect x="10" y="64" width="44" height="18" rx="3" fill="rgba(96,200,240,0.07)" stroke="rgba(96,200,240,0.25)" stroke-width="1"/>
            <rect x="66" y="64" width="44" height="18" rx="3" fill="rgba(96,200,240,0.07)" stroke="rgba(96,200,240,0.25)" stroke-width="1"/>
            <line x1="45" y1="46" x2="32" y2="64" stroke="rgba(96,200,240,0.2)" stroke-width="1"/>
            <line x1="75" y1="46" x2="88" y2="64" stroke="rgba(96,200,240,0.2)" stroke-width="1"/>
            <text x="32" y="77" text-anchor="middle" fill="#60c8f0" font-family="Geist Mono" font-size="7">leaf</text>
            <text x="88" y="77" text-anchor="middle" fill="#60c8f0" font-family="Geist Mono" font-size="7">leaf</text>

            <line x1="140" y1="10" x2="140" y2="200" stroke="rgba(255,255,255,0.04)" stroke-width="1" stroke-dasharray="4 3"/>

            <text x="210" y="14" text-anchor="middle" fill="#f2875a" font-family="Geist Mono" font-size="9">LSM Tree</text>
            <rect x="155" y="24" width="110" height="18" rx="3" fill="rgba(242,135,90,0.15)" stroke="rgba(242,135,90,0.4)" stroke-width="1"/>
            <text x="210" y="37" text-anchor="middle" fill="#f2875a" font-family="Geist Mono" font-size="8">MemTable (RAM)</text>
            <rect x="155" y="50" width="110" height="16" rx="3" fill="rgba(242,135,90,0.1)" stroke="rgba(242,135,90,0.3)" stroke-width="1"/>
            <text x="210" y="62" text-anchor="middle" fill="#f2875a" font-family="Geist Mono" font-size="8">L0 SSTables</text>
            <rect x="155" y="74" width="110" height="16" rx="3" fill="rgba(242,135,90,0.07)" stroke="rgba(242,135,90,0.2)" stroke-width="1"/>
            <text x="210" y="86" text-anchor="middle" fill="#f2875a" font-family="Geist Mono" font-size="8">L1 SSTables</text>
            <rect x="155" y="98" width="110" height="16" rx="3" fill="rgba(242,135,90,0.04)" stroke="rgba(242,135,90,0.15)" stroke-width="1"/>
            <text x="210" y="110" text-anchor="middle" fill="#f2875a" font-family="Geist Mono" font-size="8">L2 SSTables</text>
            <text x="210" y="135" text-anchor="middle" fill="#4a4668" font-family="Geist Mono" font-size="8">↑ flush + compact</text>
            <text x="210" y="148" text-anchor="middle" fill="#3dd9b3" font-family="Geist Mono" font-size="8">writes: O(1) fast</text>
          </svg>
        </div>
      </div>
    </div>
  </div>

  <div class="acc rev" style="--pip:var(--c6)">
    <div class="acc-head" onclick="tog(this)">
      <div class="acc-pip"></div>
      <div class="acc-title">Indexing — B-tree, hash, composite, partial, covering</div>
      <div class="acc-chev">▼</div>
    </div>
    <div class="acc-body">
      <div class="acc-inner">
        <div class="acc-text">
          <p><span class="hl">B-tree index</span>: Ordered. Supports range queries (>, <, BETWEEN, LIKE 'x%'). Default index type. O(log n) lookup.</p>
          <p><span class="hl">Hash index</span>: O(1) exact lookups. No range queries. Used internally by some engines, explicitly in PostgreSQL (hash index type).</p>
          <p><span class="hl">Composite index</span>: Index on multiple columns (a, b, c). Usable for prefix queries: (a), (a, b), (a, b, c). NOT usable for just (b) or (c). Column order matters — put high-cardinality, high-equality columns first.</p>
          <p><span class="hl">Partial index</span>: Index only rows matching a WHERE clause. Smaller, faster. e.g., index on (email) WHERE status = 'active'.</p>
          <p><span class="hl">Covering index</span>: Index includes all columns the query needs. No table lookup required. Maximum read performance.</p>
          <p><span class="hl">Write trade-off</span>: Every index slows down writes (INSERT/UPDATE/DELETE must update all indexes). For write-heavy tables, fewer indexes.</p>
          <pre class="code">// Query optimization checklist:
// 1. EXPLAIN ANALYZE the slow query
// 2. Add index on WHERE, JOIN, ORDER BY cols
// 3. Composite: equality cols first, range cols last
// 4. Covering: include SELECT cols in index
// 5. Avoid: functions on indexed columns
//    BAD:  WHERE YEAR(created_at) = 2024
//    GOOD: WHERE created_at BETWEEN ... AND ...</pre>
        </div>
        <div class="acc-visual">
          <svg viewBox="0 0 280 190">
            <text x="140" y="14" text-anchor="middle" fill="#f06090" font-family="Geist Mono" font-size="10">Composite Index (a, b, c)</text>
            <rect x="10" y="24" width="260" height="130" rx="8" fill="rgba(240,96,144,0.04)" stroke="rgba(240,96,144,0.2)" stroke-width="1"/>
            <rect x="20" y="34" width="240" height="24" rx="4" fill="rgba(240,96,144,0.12)" stroke="rgba(240,96,144,0.3)" stroke-width="1"/>
            <text x="140" y="50" text-anchor="middle" fill="#f06090" font-family="Geist Mono" font-size="9">WHERE a = X              ✓</text>
            <rect x="20" y="62" width="240" height="24" rx="4" fill="rgba(240,96,144,0.09)" stroke="rgba(240,96,144,0.25)" stroke-width="1"/>
            <text x="140" y="78" text-anchor="middle" fill="#f06090" font-family="Geist Mono" font-size="9">WHERE a = X AND b = Y     ✓</text>
            <rect x="20" y="90" width="240" height="24" rx="4" fill="rgba(240,96,144,0.06)" stroke="rgba(240,96,144,0.2)" stroke-width="1"/>
            <text x="140" y="106" text-anchor="middle" fill="#f06090" font-family="Geist Mono" font-size="9">WHERE a = X AND b = Y AND c = Z ✓</text>
            <rect x="20" y="118" width="240" height="24" rx="4" fill="rgba(61,217,179,0.04)" stroke="rgba(242,135,90,0.2)" stroke-width="1"/>
            <text x="140" y="134" text-anchor="middle" fill="#a06040" font-family="Geist Mono" font-size="9">WHERE b = Y              ✗ skip col</text>
            <text x="140" y="172" text-anchor="middle" fill="#4a4668" font-family="Geist Mono" font-size="8">leftmost prefix rule</text>
          </svg>
        </div>
      </div>
    </div>
  </div>

  <div class="acc rev" style="--pip:var(--c5)">
    <div class="acc-head" onclick="tog(this)">
      <div class="acc-pip"></div>
      <div class="acc-title">NewSQL & Distributed SQL — Spanner, CockroachDB, TiDB<span class="lbadge adv">Advanced</span></div>
      <div class="acc-chev">▼</div>
    </div>
    <div class="acc-body">
      <div class="acc-inner">
        <div class="acc-text">
          <p>NewSQL combines the SQL interface and ACID transactions of relational databases with the horizontal scalability of NoSQL. The holy grail.</p>
          <p><span class="hl">Google Spanner</span>: Globally distributed, externally consistent. Uses <span class="hl">TrueTime</span> (atomic clocks + GPS) to assign globally monotonic timestamps. Enables serializable transactions across data centers.</p>
          <p><span class="hl">CockroachDB</span>: Open-source Spanner-inspired. Uses HLC (Hybrid Logical Clocks). PostgreSQL-compatible wire protocol. Multi-region active-active.</p>
          <p><span class="hl">TiDB</span>: MySQL-compatible. Separates storage (TiKV) from compute (TiDB). OLTP + HTAP (hybrid transactional/analytical).</p>
          <p><span class="hl">YugabyteDB</span>: PostgreSQL + Cassandra APIs. Raft for consensus. Strong consistency by default.</p>
          <pre class="code">// When to choose NewSQL:
// ✓ Need SQL + transactions + horizontal scale
// ✓ Multi-region writes required
// ✓ PostgreSQL/MySQL migration desired
// ✗ Ultra-low latency (adds ~10-50ms overhead)
// ✗ Extreme cost sensitivity (expensive to run)
// ✗ Simple key-value (overkill, use DynamoDB)</pre>
        </div>
        <div class="acc-visual">
          <svg viewBox="0 0 280 190">
            <text x="140" y="16" text-anchor="middle" fill="#60c8f0" font-family="Geist Mono" font-size="10">Spanner Architecture</text>
            <rect x="80" y="25" width="120" height="30" rx="6" fill="rgba(96,200,240,0.1)" stroke="rgba(96,200,240,0.35)" stroke-width="1"/>
            <text x="140" y="44" text-anchor="middle" fill="#60c8f0" font-family="Geist Mono" font-size="10">SQL / API Layer</text>
            <rect x="80" y="68" width="120" height="30" rx="6" fill="rgba(139,120,245,0.1)" stroke="rgba(139,120,245,0.3)" stroke-width="1"/>
            <text x="140" y="87" text-anchor="middle" fill="#a895f8" font-family="Geist Mono" font-size="10">Paxos Groups</text>
            <rect x="20" y="115" width="72" height="28" rx="5" fill="rgba(242,135,90,0.08)" stroke="rgba(242,135,90,0.25)" stroke-width="1"/>
            <text x="56" y="133" text-anchor="middle" fill="#f2875a" font-family="Geist Mono" font-size="9">Region US</text>
            <rect x="104" y="115" width="72" height="28" rx="5" fill="rgba(242,135,90,0.08)" stroke="rgba(242,135,90,0.25)" stroke-width="1"/>
            <text x="140" y="133" text-anchor="middle" fill="#f2875a" font-family="Geist Mono" font-size="9">Region EU</text>
            <rect x="188" y="115" width="72" height="28" rx="5" fill="rgba(242,135,90,0.08)" stroke="rgba(242,135,90,0.25)" stroke-width="1"/>
            <text x="224" y="133" text-anchor="middle" fill="#f2875a" font-family="Geist Mono" font-size="9">Region AS</text>
            <line x1="140" y1="55" x2="140" y2="68" stroke="rgba(255,255,255,0.15)" stroke-width="1"/>
            <line x1="110" y1="98" x2="56" y2="115" stroke="rgba(242,135,90,0.2)" stroke-width="1"/>
            <line x1="140" y1="98" x2="140" y2="115" stroke="rgba(242,135,90,0.2)" stroke-width="1"/>
            <line x1="170" y1="98" x2="224" y2="115" stroke="rgba(242,135,90,0.2)" stroke-width="1"/>
            <text x="140" y="165" text-anchor="middle" fill="#4a4668" font-family="Geist Mono" font-size="8">TrueTime: globally consistent commits</text>
          </svg>
        </div>
      </div>
    </div>
  </div>
</div>
</section>

<!-- ═══════════════════════════════ MESSAGING & PATTERNS ═══════════════════════════════ -->
<section id="patterns" style="background:var(--bg)">
<div class="wrap section-pad">
  <div class="sh rev">
    <div class="sh-tag">04 — Messaging & Patterns</div>
    <h2 class="sh-title">Communication <em>Patterns</em></h2>
    <p class="sh-sub">Message queues, event streaming, sync vs async, and the architectural patterns that let services talk without coupling.</p>
  </div>

  <div class="acc rev" style="--pip:var(--c6)">
    <div class="acc-head" onclick="tog(this)">
      <div class="acc-pip"></div>
      <div class="acc-title">Message Queues vs Event Streaming — Kafka vs RabbitMQ</div>
      <div class="acc-chev">▼</div>
    </div>
    <div class="acc-body">
      <div class="acc-inner">
        <div class="acc-text">
          <p><span class="hl">Message Queue (RabbitMQ, SQS)</span>: Messages are tasks. Consumers compete. Once consumed, message deleted. Point-to-point or pub/sub. Good for job queues, task distribution.</p>
          <p><span class="hl">Event Streaming (Kafka)</span>: Messages are events. Retained for configurable time. Any consumer can read at any offset independently. Consumer groups for parallel processing. Used for event sourcing, audit logs, stream processing.</p>
          <p><span class="hl">Kafka key concepts</span>: Topics → Partitions → Offsets. Producers write to partitions. Consumer groups share partitions (one partition per consumer in a group). Retention: time-based or size-based.</p>
          <p><span class="hl">Exactly-once semantics</span>: At-most-once (lose some), at-least-once (duplicates), exactly-once (hard, requires idempotent consumers + transactions). Kafka ≥0.11 supports EOS with producer transactions.</p>
          <pre class="code">// Kafka throughput tuning:
// - Batch size: 16KB default, tune up for throughput
// - Compression: snappy or lz4 for network efficiency
// - Partitions: parallelism = min(partitions, consumers)
// - Replication factor: 3 for production
// - acks=all + min.insync.replicas=2 for durability</pre>
        </div>
        <div class="acc-visual">
          <svg viewBox="0 0 280 195">
            <text x="70" y="14" text-anchor="middle" fill="#f06090" font-family="Geist Mono" font-size="9">Queue (delete on consume)</text>
            <rect x="10" y="24" width="120" height="30" rx="5" fill="rgba(240,96,144,0.08)" stroke="rgba(240,96,144,0.25)" stroke-width="1"/>
            <rect x="10" y="24" width="24" height="30" rx="4" fill="rgba(240,96,144,0.25)" stroke="none"/>
            <rect x="37" y="24" width="24" height="30" rx="4" fill="rgba(240,96,144,0.18)" stroke="none" style="margin-left:2px"/>
            <text x="70" y="42" text-anchor="middle" fill="#f06090" font-family="Geist Mono" font-size="8">→ msg msg msg</text>
            <text x="70" y="70" text-anchor="middle" fill="#f06090" font-family="Geist Mono" font-size="8">consumer → msg gone</text>

            <line x1="140" y1="10" x2="140" y2="195" stroke="rgba(255,255,255,0.04)" stroke-width="1" stroke-dasharray="4 3"/>

            <text x="210" y="14" text-anchor="middle" fill="#3dd9b3" font-family="Geist Mono" font-size="9">Kafka (persist + replay)</text>
            <rect x="150" y="24" width="120" height="24" rx="4" fill="rgba(61,217,179,0.08)" stroke="rgba(61,217,179,0.25)" stroke-width="1"/>
            <text x="210" y="40" text-anchor="middle" fill="#3dd9b3" font-family="Geist Mono" font-size="8">Topic: orders</text>
            <rect x="150" y="52" width="54" height="16" rx="3" fill="rgba(61,217,179,0.12)" stroke="rgba(61,217,179,0.3)" stroke-width="1"/>
            <text x="177" y="64" text-anchor="middle" fill="#3dd9b3" font-family="Geist Mono" font-size="7">partition 0</text>
            <rect x="216" y="52" width="54" height="16" rx="3" fill="rgba(61,217,179,0.12)" stroke="rgba(61,217,179,0.3)" stroke-width="1"/>
            <text x="243" y="64" text-anchor="middle" fill="#3dd9b3" font-family="Geist Mono" font-size="7">partition 1</text>
            <text x="177" y="86" text-anchor="middle" fill="#3dd9b3" font-family="Geist Mono" font-size="7">consumer A: offset 4</text>
            <text x="243" y="86" text-anchor="middle" fill="#3dd9b3" font-family="Geist Mono" font-size="7">consumer B: offset 7</text>
            <text x="210" y="102" text-anchor="middle" fill="#4a4668" font-family="Geist Mono" font-size="7">each reads independently</text>
            <text x="210" y="114" text-anchor="middle" fill="#4a4668" font-family="Geist Mono" font-size="7">data retained N days</text>
          </svg>
        </div>
      </div>
    </div>
  </div>

  <!-- SAGA PATTERN -->
  <div class="acc rev" style="--pip:var(--c4)">
    <div class="acc-head" onclick="tog(this)">
      <div class="acc-pip"></div>
      <div class="acc-title">Saga Pattern — Distributed transactions without 2PC<span class="lbadge adv">Advanced</span></div>
      <div class="acc-chev">▼</div>
    </div>
    <div class="acc-body">
      <div class="acc-inner">
        <div class="acc-text">
          <p>When a transaction spans multiple services, you can't use a single ACID transaction. The Saga pattern breaks it into a sequence of local transactions with compensating transactions on failure.</p>
          <p><span class="hl">Choreography-based</span>: Each service publishes events. Other services react. No central coordinator. Decoupled. Hard to trace, risk of cyclic dependencies.</p>
          <p><span class="hl">Orchestration-based</span>: A central orchestrator (saga) tells services what to do step by step. Easier to reason about, single place to trace failure. Temporal.io, AWS Step Functions.</p>
          <p><span class="hl">Compensating transactions</span>: Each step must have a rollback. "Cancel reservation" compensates "reserve seat". Compensations must be idempotent.</p>
          <pre class="code">// Order saga example:
// 1. Create order       → compensate: cancel order
// 2. Reserve inventory  → compensate: release stock
// 3. Charge payment     → compensate: issue refund
// 4. Schedule delivery  → compensate: cancel delivery
//
// If step 3 fails → run 2C, 1C in reverse order</pre>
        </div>
        <div class="acc-visual">
          <svg viewBox="0 0 280 190">
            <rect x="10" y="20" width="70" height="28" rx="5" fill="rgba(245,200,66,0.1)" stroke="rgba(245,200,66,0.35)" stroke-width="1"/>
            <text x="45" y="37" text-anchor="middle" fill="#f5c842" font-family="Geist Mono" font-size="9">Order</text>
            <rect x="105" y="20" width="70" height="28" rx="5" fill="rgba(245,200,66,0.1)" stroke="rgba(245,200,66,0.35)" stroke-width="1"/>
            <text x="140" y="37" text-anchor="middle" fill="#f5c842" font-family="Geist Mono" font-size="9">Inventory</text>
            <rect x="200" y="20" width="70" height="28" rx="5" fill="rgba(245,200,66,0.1)" stroke="rgba(245,200,66,0.35)" stroke-width="1"/>
            <text x="235" y="37" text-anchor="middle" fill="#f5c842" font-family="Geist Mono" font-size="9">Payment</text>
            <line x1="80" y1="34" x2="105" y2="34" stroke="rgba(245,200,66,0.4)" stroke-width="1"/>
            <line x1="175" y1="34" x2="200" y2="34" stroke="rgba(245,200,66,0.4)" stroke-width="1"/>
            <text x="140" y="68" text-anchor="middle" fill="#f5c842" font-family="Geist Mono" font-size="8">✓ success path</text>
            <text x="140" y="90" text-anchor="middle" fill="#f2875a" font-family="Geist Mono" font-size="8">✗ payment fails</text>
            <rect x="105" y="105" width="70" height="28" rx="5" fill="rgba(242,135,90,0.08)" stroke="rgba(242,135,90,0.3)" stroke-width="1" stroke-dasharray="4 2"/>
            <text x="140" y="122" text-anchor="middle" fill="#f2875a" font-family="Geist Mono" font-size="8">↩ release stock</text>
            <rect x="10" y="105" width="70" height="28" rx="5" fill="rgba(242,135,90,0.08)" stroke="rgba(242,135,90,0.3)" stroke-width="1" stroke-dasharray="4 2"/>
            <text x="45" y="122" text-anchor="middle" fill="#f2875a" font-family="Geist Mono" font-size="8">↩ cancel order</text>
            <line x1="105" y1="119" x2="80" y2="119" stroke="rgba(242,135,90,0.4)" stroke-width="1" stroke-dasharray="3 2"/>
            <text x="140" y="160" text-anchor="middle" fill="#4a4668" font-family="Geist Mono" font-size="8">compensating transactions</text>
          </svg>
        </div>
      </div>
    </div>
  </div>

  <!-- CQRS & EVENT SOURCING -->
  <div class="acc rev" style="--pip:var(--c1)">
    <div class="acc-head" onclick="tog(this)">
      <div class="acc-pip"></div>
      <div class="acc-title">CQRS & Event Sourcing — Separating reads from writes<span class="lbadge adv">Advanced</span></div>
      <div class="acc-chev">▼</div>
    </div>
    <div class="acc-body">
      <div class="acc-inner">
        <div class="acc-text">
          <p><span class="hl">CQRS (Command Query Responsibility Segregation)</span>: Separate models for reading and writing. Write side handles commands, updates the write model, publishes events. Read side consumes events, maintains optimized read models (projections) for each use case.</p>
          <p><span class="hl">Benefits</span>: Scale reads and writes independently. Read models optimized per query. Avoids complex JOINs on the write side.</p>
          <p><span class="hl">Event Sourcing</span>: Never store current state. Store the sequence of events that led to it. Current state = replay of events. Complete audit trail. Time travel. But: eventual consistency, complex queries, storage growth.</p>
          <p><span class="hl">Projection (read model)</span>: A derived view rebuilt by replaying events. Can be rebuilt at any time. Supports multiple views from the same event log.</p>
          <pre class="code">// Event Sourcing example (bank account):
// Events: Opened, Deposited(100), Withdrawn(30)
// Current state = sum of all events = 70
//
// Benefits: audit log, time travel debugging,
//           rebuild any view from scratch
// Drawbacks: querying current state = replay all
//            events (mitigate with snapshots)</pre>
        </div>
        <div class="acc-visual">
          <svg viewBox="0 0 280 190">
            <rect x="10" y="10" width="100" height="36" rx="6" fill="rgba(139,120,245,0.1)" stroke="rgba(139,120,245,0.35)" stroke-width="1"/>
            <text x="60" y="32" text-anchor="middle" fill="#a895f8" font-family="Geist Mono" font-size="9">Command Side</text>
            <rect x="170" y="10" width="100" height="36" rx="6" fill="rgba(61,217,179,0.08)" stroke="rgba(61,217,179,0.3)" stroke-width="1"/>
            <text x="220" y="32" text-anchor="middle" fill="#3dd9b3" font-family="Geist Mono" font-size="9">Query Side</text>
            <rect x="80" y="80" width="120" height="30" rx="6" fill="rgba(245,200,66,0.1)" stroke="rgba(245,200,66,0.35)" stroke-width="1"/>
            <text x="140" y="99" text-anchor="middle" fill="#f5c842" font-family="Geist Mono" font-size="9">Event Log / Kafka</text>
            <line x1="60" y1="46" x2="100" y2="80" stroke="rgba(139,120,245,0.35)" stroke-width="1"/>
            <text x="72" y="68" text-anchor="start" fill="#8b78f5" font-family="Geist Mono" font-size="7">emit</text>
            <line x1="180" y1="80" x2="210" y2="46" stroke="rgba(61,217,179,0.35)" stroke-width="1" stroke-dasharray="4 3"/>
            <text x="198" y="68" text-anchor="start" fill="#3dd9b3" font-family="Geist Mono" font-size="7">subscribe</text>
            <rect x="40" y="135" width="100" height="28" rx="5" fill="rgba(61,217,179,0.07)" stroke="rgba(61,217,179,0.2)" stroke-width="1"/>
            <text x="90" y="152" text-anchor="middle" fill="#3dd9b3" font-family="Geist Mono" font-size="8">Read Model (projection)</text>
            <line x1="140" y1="110" x2="90" y2="135" stroke="rgba(61,217,179,0.2)" stroke-width="1"/>
            <text x="220" y="155" text-anchor="middle" fill="#4a4668" font-family="Geist Mono" font-size="8">rebuild anytime</text>
          </svg>
        </div>
      </div>
    </div>
  </div>

  <!-- API DESIGN -->
  <div class="acc rev" style="--pip:var(--c5)">
    <div class="acc-head" onclick="tog(this)">
      <div class="acc-pip"></div>
      <div class="acc-title">API Design — REST, GraphQL, gRPC, WebSockets</div>
      <div class="acc-chev">▼</div>
    </div>
    <div class="acc-body">
      <div class="acc-inner">
        <div class="acc-text">
          <p><span class="hl">REST</span>: Stateless, resource-based, HTTP verbs. Simple. Over-fetching and under-fetching issues. Good for public APIs, CRUD services.</p>
          <p><span class="hl">GraphQL</span>: Client specifies exactly what data it needs. Solves over/under-fetching. Complex server-side resolvers. N+1 query problem (mitigate with DataLoader). Good for complex data graphs, BFF pattern.</p>
          <p><span class="hl">gRPC</span>: Binary protocol (Protocol Buffers), strongly typed, HTTP/2. 5-10x faster than REST. Bidirectional streaming. Good for internal service-to-service, mobile clients where bandwidth matters.</p>
          <p><span class="hl">WebSockets</span>: Full-duplex persistent connection. Real-time bidirectional. Good for chat, live collaboration, gaming. Scale with sticky sessions or pub/sub fanout.</p>
          <p><span class="hl">Server-Sent Events (SSE)</span>: Unidirectional server → client stream over HTTP. Simpler than WebSockets for one-way push (notifications, feeds).</p>
          <pre class="code">// Pagination patterns:
// Offset: ?page=3&limit=20 (simple, drift issues)
// Cursor: ?after=ID123 (stable, efficient for DB)
// Keyset: WHERE id > last_id ORDER BY id LIMIT 20
//
// API versioning: URL /v2/ vs header vs content-type
// Rate limiting: per-user, per-IP, per-endpoint</pre>
        </div>
        <div class="acc-visual">
          <table class="tbl" style="font-size:11px">
            <thead><tr><th>Protocol</th><th>Latency</th><th>Streaming</th><th>Use Case</th></tr></thead>
            <tbody>
              <tr><td style="color:var(--c5)">REST</td><td class="neu">Medium</td><td class="no">No</td><td style="color:var(--text2)">Public APIs</td></tr>
              <tr><td style="color:var(--c3)">GraphQL</td><td class="neu">Medium</td><td class="ok">Subscriptions</td><td style="color:var(--text2)">Complex data</td></tr>
              <tr><td style="color:var(--c4)">gRPC</td><td class="ok">Low</td><td class="ok">Bidirectional</td><td style="color:var(--text2)">Internal</td></tr>
              <tr><td style="color:var(--c6)">WebSocket</td><td class="ok">Very Low</td><td class="ok">Full-duplex</td><td style="color:var(--text2)">Real-time</td></tr>
              <tr><td style="color:var(--c2)">SSE</td><td class="ok">Low</td><td class="neu">Server→Client</td><td style="color:var(--text2)">Live feeds</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</div>
</section>

<!-- ═══════════════════════════════ DESIGN PROBLEMS ═══════════════════════════════ -->
<section id="problems" style="background:var(--bg2)">
<div class="wrap section-pad">
  <div class="sh rev">
    <div class="sh-tag">05 — Design Problems</div>
    <h2 class="sh-title">Classic Problems <em>Deconstructed</em></h2>
    <p class="sh-sub">The most common interview problems, with architecture, key decisions, and advanced angles.</p>
  </div>

  <div class="prob-grid rev">
    <div class="prob-card" style="--pc:var(--c1);--dc:var(--c3)">
      <div class="prob-top"><div class="prob-name">URL Shortener</div><div class="prob-diff">Beginner</div></div>
      <div class="prob-desc">bit.ly — 100M URLs, billions of redirects/day. 100:1 read/write ratio. 301 vs 302 redirect. Custom aliases. Analytics tracking.</div>
      <div class="prob-tags"><span class="prob-tag">Hashing</span><span class="prob-tag">Redis</span><span class="prob-tag">NoSQL</span><span class="prob-tag">CDN</span></div>
      <div class="prob-key">→ base62(counter) vs hash collision handling vs UUID</div>
    </div>
    <div class="prob-card" style="--pc:var(--c4);--dc:var(--c3)">
      <div class="prob-top"><div class="prob-name">Rate Limiter</div><div class="prob-diff">Beginner</div></div>
      <div class="prob-desc">API gateway rate limiter. Multiple algorithms (token bucket, sliding window). Distributed across servers. Redis Lua atomicity. Whitelist/blacklist.</div>
      <div class="prob-tags"><span class="prob-tag">Algorithms</span><span class="prob-tag">Redis</span><span class="prob-tag">Distributed</span></div>
      <div class="prob-key">→ token bucket for bursting, sliding window for accuracy</div>
    </div>
    <div class="prob-card" style="--pc:var(--c3);--dc:var(--c3)">
      <div class="prob-top"><div class="prob-name">Notification System</div><div class="prob-diff">Beginner</div></div>
      <div class="prob-desc">Push/email/SMS at 1M/day. Fan-out, retries, deduplication, priority queues, device token management, opt-out tracking.</div>
      <div class="prob-tags"><span class="prob-tag">Message Queue</span><span class="prob-tag">Fan-out</span><span class="prob-tag">Retry</span></div>
      <div class="prob-key">→ fan-out service + per-channel worker pool</div>
    </div>
    <div class="prob-card" style="--pc:var(--c6);--dc:var(--c4)">
      <div class="prob-top"><div class="prob-name">Twitter / News Feed</div><div class="prob-diff" style="--dc:var(--c4)">Intermediate</div></div>
      <div class="prob-desc">Social feed for 300M users. Fan-out on write vs read. Celebrity user problem. Timeline pre-generation. Read heavy (read/write 100:1).</div>
      <div class="prob-tags"><span class="prob-tag">Fan-out</span><span class="prob-tag">Cassandra</span><span class="prob-tag">Social Graph</span><span class="prob-tag">Redis</span></div>
      <div class="prob-key">→ hybrid: pre-generate for normal users, pull for celebrities</div>
    </div>
    <div class="prob-card" style="--pc:var(--c5);--dc:var(--c4)">
      <div class="prob-top"><div class="prob-name">Google Drive</div><div class="prob-diff" style="--dc:var(--c4)">Intermediate</div></div>
      <div class="prob-desc">File storage & sync. Chunking (4MB blocks), delta sync, conflict resolution, offline support, metadata vs blob separation.</div>
      <div class="prob-tags"><span class="prob-tag">S3/Blob</span><span class="prob-tag">Chunking</span><span class="prob-tag">Sync Protocol</span></div>
      <div class="prob-key">→ block-level dedup + operational transform for conflicts</div>
    </div>
    <div class="prob-card" style="--pc:var(--c2);--dc:var(--c4)">
      <div class="prob-top"><div class="prob-name">Web Crawler</div><div class="prob-diff" style="--dc:var(--c4)">Intermediate</div></div>
      <div class="prob-desc">Crawl 1B pages/month. BFS queue, robots.txt politeness, URL dedup with Bloom filter, distributed fetchers, HTML parsing workers.</div>
      <div class="prob-tags"><span class="prob-tag">BFS/DFS</span><span class="prob-tag">Bloom Filter</span><span class="prob-tag">Crawl Policy</span></div>
      <div class="prob-key">→ Bloom filter for URL seen + priority queue by PageRank</div>
    </div>
    <div class="prob-card" style="--pc:var(--c7);--dc:var(--c2)">
      <div class="prob-top"><div class="prob-name">YouTube / Netflix</div><div class="prob-diff" style="--dc:var(--c2)">Advanced</div></div>
      <div class="prob-desc">Video upload, transcoding pipeline (multi-resolution), adaptive bitrate streaming (HLS/DASH), global CDN, recommendation engine hooks.</div>
      <div class="prob-tags"><span class="prob-tag">Transcoding</span><span class="prob-tag">HLS/DASH</span><span class="prob-tag">CDN</span><span class="prob-tag">S3</span></div>
      <div class="prob-key">→ async transcoding pipeline + edge caching per segment</div>
    </div>
    <div class="prob-card" style="--pc:var(--c1);--dc:var(--c2)">
      <div class="prob-top"><div class="prob-name">Uber / Lyft</div><div class="prob-diff" style="--dc:var(--c2)">Advanced</div></div>
      <div class="prob-desc">Real-time location tracking, geospatial indexing, dynamic pricing, matching algorithm, ETA computation, surge zone detection.</div>
      <div class="prob-tags"><span class="prob-tag">Geospatial</span><span class="prob-tag">WebSocket</span><span class="prob-tag">Real-time</span><span class="prob-tag">Quadtree</span></div>
      <div class="prob-key">→ S2 cells / Geohash for spatial indexing, OSRM for routing</div>
    </div>
    <div class="prob-card" style="--pc:var(--c4);--dc:var(--c2)">
      <div class="prob-top"><div class="prob-name">Distributed Cache (Redis)</div><div class="prob-diff" style="--dc:var(--c2)">Advanced</div></div>
      <div class="prob-desc">Build Redis from scratch. In-memory storage, persistence (AOF/RDB), replication, cluster mode, pub/sub, data structures.</div>
      <div class="prob-tags"><span class="prob-tag">Key-Value</span><span class="prob-tag">In-Memory</span><span class="prob-tag">Cluster</span><span class="prob-tag">AOF/RDB</span></div>
      <div class="prob-key">→ Redis Cluster: 16384 hash slots, gossip protocol</div>
    </div>
    <div class="prob-card" style="--pc:var(--c6);--dc:var(--c2)">
      <div class="prob-top"><div class="prob-name">Distributed Message Queue</div><div class="prob-diff" style="--dc:var(--c2)">Advanced</div></div>
      <div class="prob-desc">Build Kafka from scratch. Partitioned log, producers/consumers, replication, leader election, exactly-once delivery, compaction.</div>
      <div class="prob-tags"><span class="prob-tag">Log-structured</span><span class="prob-tag">Raft</span><span class="prob-tag">EOS</span><span class="prob-tag">Compaction</span></div>
      <div class="prob-key">→ partitioned log + ISR-based replication + ZAB/Raft</div>
    </div>
    <div class="prob-card" style="--pc:var(--c3);--dc:var(--c2)">
      <div class="prob-top"><div class="prob-name">Search Autocomplete</div><div class="prob-diff" style="--dc:var(--c4)">Intermediate</div></div>
      <div class="prob-desc">Google search suggestions. Trie data structure, prefix matching, personalization, trending queries, latency &lt;100ms, aggregation pipeline.</div>
      <div class="prob-tags"><span class="prob-tag">Trie</span><span class="prob-tag">Prefix Index</span><span class="prob-tag">Real-time</span></div>
      <div class="prob-key">→ serialized trie in Redis + top-K heap per prefix</div>
    </div>
    <div class="prob-card" style="--pc:var(--c2);--dc:var(--c2)">
      <div class="prob-top"><div class="prob-name">Distributed Key-Value Store</div><div class="prob-diff" style="--dc:var(--c2)">Advanced</div></div>
      <div class="prob-desc">Build DynamoDB/Dynamo. Consistent hashing, virtual nodes, vector clocks, quorum reads/writes, gossip protocol, hinted handoff.</div>
      <div class="prob-tags"><span class="prob-tag">Consistent Hashing</span><span class="prob-tag">Vector Clocks</span><span class="prob-tag">Quorum</span></div>
      <div class="prob-key">→ Amazon Dynamo paper is essential reading</div>
    </div>
  </div>
</div>
</section>

<!-- ═══════════════════════════════ RELIABILITY ═══════════════════════════════ -->
<section id="reliability" style="background:var(--bg)">
<div class="wrap section-pad">
  <div class="sh rev">
    <div class="sh-tag">06 — Reliability</div>
    <h2 class="sh-title">Fault Tolerance & <em>Resilience</em></h2>
    <p class="sh-sub">How to build systems that survive failures — because they will fail. Circuit breakers, bulkheads, chaos engineering, and SLOs.</p>
  </div>

  <div class="sr-grid rev">
    <div class="sr-card" style="--sp:var(--c2)">
      <div class="sr-title"><div class="sr-pip"></div>Failure Patterns & Mitigations</div>
      <ul class="sr-list">
        <li>Cascade failure <span class="tag">→ circuit breaker</span></li>
        <li>Thundering herd <span class="tag">→ jitter + backoff</span></li>
        <li>Split brain <span class="tag">→ fencing tokens</span></li>
        <li>Slow consumer <span class="tag">→ bulkhead isolation</span></li>
        <li>Disk full <span class="tag">→ log rotation, alerts</span></li>
        <li>Memory leak <span class="tag">→ OOM limits + restart</span></li>
        <li>Network partition <span class="tag">→ timeouts + retry</span></li>
      </ul>
    </div>
    <div class="sr-card" style="--sp:var(--c3)">
      <div class="sr-title"><div class="sr-pip"></div>Resilience Patterns</div>
      <ul class="sr-list">
        <li>Circuit Breaker <span class="tag">Hystrix, Resilience4j</span></li>
        <li>Retry with backoff <span class="tag">exp + jitter</span></li>
        <li>Bulkhead <span class="tag">thread pool isolation</span></li>
        <li>Timeout <span class="tag">fail fast, not hang</span></li>
        <li>Fallback <span class="tag">cache, default, graceful</span></li>
        <li>Health check <span class="tag">liveness + readiness</span></li>
        <li>Chaos engineering <span class="tag">Chaos Monkey</span></li>
      </ul>
    </div>
    <div class="sr-card" style="--sp:var(--c4)">
      <div class="sr-title"><div class="sr-pip"></div>SLO / SLA / SLI</div>
      <ul class="sr-list">
        <li>SLI: latency p99 <span class="tag">measured metric</span></li>
        <li>SLO: p99 &lt; 200ms <span class="tag">internal target</span></li>
        <li>SLA: 99.9% uptime <span class="tag">external contract</span></li>
        <li>Error budget: 1 - SLO <span class="tag">burn rate alerts</span></li>
        <li>99.9% = 8.7h downtime/yr <span class="tag">three nines</span></li>
        <li>99.99% = 52min/yr <span class="tag">four nines</span></li>
        <li>99.999% = 5min/yr <span class="tag">five nines</span></li>
      </ul>
    </div>
    <div class="sr-card" style="--sp:var(--c1)">
      <div class="sr-title"><div class="sr-pip"></div>Distributed Consensus</div>
      <ul class="sr-list">
        <li>Paxos <span class="tag">original, complex</span></li>
        <li>Raft <span class="tag">understandable Paxos</span></li>
        <li>ZAB <span class="tag">ZooKeeper Atomic Broadcast</span></li>
        <li>Leader election <span class="tag">via consensus</span></li>
        <li>Quorum majority <span class="tag">floor(N/2)+1</span></li>
        <li>etcd / ZooKeeper <span class="tag">consensus services</span></li>
        <li>Split-brain <span class="tag">fencing tokens</span></li>
      </ul>
    </div>
  </div>

  <div class="acc rev" style="--pip:var(--c2); margin-top:1.5rem">
    <div class="acc-head" onclick="tog(this)">
      <div class="acc-pip"></div>
      <div class="acc-title">Circuit Breaker Pattern — Preventing cascade failures<span class="lbadge int">Intermediate</span></div>
      <div class="acc-chev">▼</div>
    </div>
    <div class="acc-body">
      <div class="acc-inner">
        <div class="acc-text">
          <p>When a downstream service is failing, continuing to send requests doesn't help — it makes things worse by exhausting threads and increasing load on a struggling system. The circuit breaker acts like an electrical breaker: <span class="hl">open the circuit when failures exceed a threshold</span>.</p>
          <p><span class="hl">Closed state</span>: Normal operation. Requests pass through. Track failure rate.</p>
          <p><span class="hl">Open state</span>: Failure threshold exceeded. Requests fail immediately (or use fallback). No calls to downstream.</p>
          <p><span class="hl">Half-open state</span>: After a timeout, allow one probe request. If successful → close. If failed → reopen.</p>
          <pre class="code">// Hystrix / Resilience4j config:
// - failure threshold: 50% in 10s window
// - wait in open state: 60s
// - half-open: 5 probe calls
// - thread pool isolation: separate pool per dep
// - fallback: return cached data or default</pre>
        </div>
        <div class="acc-visual">
          <svg viewBox="0 0 280 180">
            <circle cx="60" cy="90" r="45" fill="rgba(61,217,179,0.06)" stroke="rgba(61,217,179,0.3)" stroke-width="1"/>
            <text x="60" y="85" text-anchor="middle" fill="#3dd9b3" font-family="Geist Mono" font-size="9" font-weight="600">CLOSED</text>
            <text x="60" y="99" text-anchor="middle" fill="#3dd9b3" font-family="Geist Mono" font-size="7">normal ops</text>
            <circle cx="220" cy="90" r="45" fill="rgba(242,135,90,0.06)" stroke="rgba(242,135,90,0.3)" stroke-width="1"/>
            <text x="220" y="85" text-anchor="middle" fill="#f2875a" font-family="Geist Mono" font-size="9" font-weight="600">OPEN</text>
            <text x="220" y="99" text-anchor="middle" fill="#f2875a" font-family="Geist Mono" font-size="7">fail fast</text>
            <circle cx="140" cy="155" r="22" fill="rgba(245,200,66,0.08)" stroke="rgba(245,200,66,0.35)" stroke-width="1"/>
            <text x="140" y="151" text-anchor="middle" fill="#f5c842" font-family="Geist Mono" font-size="7">HALF</text>
            <text x="140" y="162" text-anchor="middle" fill="#f5c842" font-family="Geist Mono" font-size="7">OPEN</text>
            <path d="M105 72 L175 72" stroke="rgba(242,135,90,0.5)" stroke-width="1" fill="none"/>
            <text x="140" y="65" text-anchor="middle" fill="#f2875a" font-family="Geist Mono" font-size="7">failure &gt; threshold</text>
            <path d="M200 128 L160 145" stroke="rgba(245,200,66,0.4)" stroke-width="1" fill="none"/>
            <text x="195" y="145" text-anchor="middle" fill="#f5c842" font-family="Geist Mono" font-size="7">timeout</text>
            <path d="M120 145 L80 120" stroke="rgba(61,217,179,0.4)" stroke-width="1" fill="none"/>
            <text x="88" y="140" text-anchor="middle" fill="#3dd9b3" font-family="Geist Mono" font-size="7">success</text>
          </svg>
        </div>
      </div>
    </div>
  </div>
</div>
</section>

<!-- ═══════════════════════════════ SECURITY ═══════════════════════════════ -->
<section id="security" style="background:var(--bg2)">
<div class="wrap section-pad">
  <div class="sh rev">
    <div class="sh-tag">07 — Security</div>
    <h2 class="sh-title">Security by <em>Design</em></h2>
    <p class="sh-sub">Authentication, authorization, encryption at rest and in transit, and the attack surfaces you must design against.</p>
  </div>
  <div class="sr-grid rev">
    <div class="sr-card" style="--sp:var(--c2)">
      <div class="sr-title"><div class="sr-pip"></div>Authentication Patterns</div>
      <ul class="sr-list">
        <li>Session + cookie <span class="tag">server-side state</span></li>
        <li>JWT access tokens <span class="tag">stateless, short-lived</span></li>
        <li>Refresh token rotation <span class="tag">revocation support</span></li>
        <li>OAuth 2.0 + OIDC <span class="tag">third-party auth</span></li>
        <li>PKCE flow <span class="tag">SPA / mobile safe</span></li>
        <li>mTLS <span class="tag">service-to-service</span></li>
        <li>API keys <span class="tag">machine-to-machine</span></li>
      </ul>
    </div>
    <div class="sr-card" style="--sp:var(--c4)">
      <div class="sr-title"><div class="sr-pip"></div>Authorization Models</div>
      <ul class="sr-list">
        <li>RBAC <span class="tag">role-based access control</span></li>
        <li>ABAC <span class="tag">attribute-based (policy)</span></li>
        <li>ReBAC <span class="tag">relationship-based (Zanzibar)</span></li>
        <li>OPA (Open Policy Agent) <span class="tag">policy as code</span></li>
        <li>Zanzibar (Google) <span class="tag">Google Docs ACLs</span></li>
        <li>PBAC <span class="tag">permission-based</span></li>
        <li>Zero Trust <span class="tag">verify every request</span></li>
      </ul>
    </div>
    <div class="sr-card" style="--sp:var(--c3)">
      <div class="sr-title"><div class="sr-pip"></div>Encryption</div>
      <ul class="sr-list">
        <li>TLS 1.3 in transit <span class="tag">mandatory</span></li>
        <li>AES-256 at rest <span class="tag">per-field or disk</span></li>
        <li>Envelope encryption <span class="tag">DEK + KEK + KMS</span></li>
        <li>Key rotation <span class="tag">KMS: AWS, GCP, Vault</span></li>
        <li>E2E encryption <span class="tag">Signal protocol</span></li>
        <li>HSM <span class="tag">hardware security module</span></li>
        <li>FIPS 140-2 <span class="tag">compliance level</span></li>
      </ul>
    </div>
    <div class="sr-card" style="--sp:var(--c6)">
      <div class="sr-title"><div class="sr-pip"></div>Attack Surfaces</div>
      <ul class="sr-list">
        <li>SQL injection <span class="tag">parameterized queries</span></li>
        <li>XSS <span class="tag">CSP + output encoding</span></li>
        <li>CSRF <span class="tag">SameSite cookie + token</span></li>
        <li>SSRF <span class="tag">allowlist outbound URLs</span></li>
        <li>DDoS <span class="tag">rate limit + WAF + CDN</span></li>
        <li>Broken auth <span class="tag">OWASP Top 10 #1</span></li>
        <li>Supply chain <span class="tag">SBOM + pin deps</span></li>
      </ul>
    </div>
  </div>
</div>
</section>

<!-- ═══════════════════════════════ ADVANCED TOPICS ═══════════════════════════════ -->
<section id="advanced" style="background:var(--bg)">
<div class="wrap section-pad">
  <div class="sh rev">
    <div class="sh-tag">08 — Advanced</div>
    <h2 class="sh-title">Senior & Staff <em>Level</em> Topics</h2>
    <p class="sh-sub">Consensus algorithms, CRDTs, multi-region architectures, and the concepts that differentiate senior from staff-level thinking.</p>
  </div>

  <div class="pat-grid rev">
    <div class="pat-card" style="--pc:var(--c1)">
      <div class="pat-label">Consensus</div>
      <div class="pat-name">Raft Algorithm</div>
      <div class="pat-desc">Leader election, log replication, safety. Used by etcd, CockroachDB, TiDB. Simpler than Paxos but equivalent. Leader receives writes, replicates to followers, commits when quorum ACKs.</div>
      <div class="pat-when">Must understand for: distributed DB design, service coordination questions</div>
    </div>
    <div class="pat-card" style="--pc:var(--c3)">
      <div class="pat-label">Conflict Resolution</div>
      <div class="pat-name">CRDTs</div>
      <div class="pat-desc">Conflict-free Replicated Data Types — data structures that merge automatically without conflict. G-Counter, PN-Counter, LWW-Element-Set, OR-Set. Used by Redis, Riak, collaborative editors.</div>
      <div class="pat-when">Must understand for: real-time collaboration, offline-first, distributed counters</div>
    </div>
    <div class="pat-card" style="--pc:var(--c4)">
      <div class="pat-label">Clocks</div>
      <div class="pat-name">Vector Clocks & HLC</div>
      <div class="pat-desc">Vector clocks track causality: each node maintains a vector of logical clocks. HLC (Hybrid Logical Clock) combines physical and logical time. Used for conflict detection, causal ordering.</div>
      <div class="pat-when">Must understand for: multi-master, conflict detection, event ordering</div>
    </div>
    <div class="pat-card" style="--pc:var(--c2)">
      <div class="pat-label">Global Scale</div>
      <div class="pat-name">Multi-Region Active-Active</div>
      <div class="pat-desc">Multiple regions serve writes simultaneously. Requires conflict resolution (last-write-wins, CRDTs, application logic). Geo-routing sends users to nearest region. Async cross-region replication.</div>
      <div class="pat-when">Must understand for: global SaaS, latency-sensitive apps, disaster recovery</div>
    </div>
    <div class="pat-card" style="--pc:var(--c5)">
      <div class="pat-label">Data Processing</div>
      <div class="pat-name">Lambda & Kappa Architecture</div>
      <div class="pat-desc">Lambda: batch layer (Hadoop/Spark) + speed layer (Flink/Storm) + serving layer. Kappa: replace batch with replayable stream (Kafka). Kappa is simpler; Lambda has stronger batch guarantees.</div>
      <div class="pat-when">Must understand for: analytics pipelines, real-time + historical data</div>
    </div>
    <div class="pat-card" style="--pc:var(--c6)">
      <div class="pat-label">Observability</div>
      <div class="pat-name">Metrics, Logs, Traces</div>
      <div class="pat-desc">The three pillars: Metrics (Prometheus, time-series counters/gauges/histograms), Logs (structured JSON, ELK/Loki), Distributed Tracing (OpenTelemetry, Jaeger, correlation IDs). Essential for debugging distributed systems.</div>
      <div class="pat-when">Must understand for: production operations, debugging latency in microservices</div>
    </div>
    <div class="pat-card" style="--pc:var(--c7)">
      <div class="pat-label">Microservices</div>
      <div class="pat-name">Service Mesh</div>
      <div class="pat-desc">Sidecar proxies (Envoy) handle cross-cutting concerns: mTLS, retries, circuit breaking, observability, traffic splitting. Control plane (Istio, Linkerd) manages config. Removes concerns from app code.</div>
      <div class="pat-when">Must understand for: large microservice deployments, zero-trust networking</div>
    </div>
    <div class="pat-card" style="--pc:var(--c1)">
      <div class="pat-label">Storage</div>
      <div class="pat-name">Data Lake & Lakehouse</div>
      <div class="pat-desc">Data Lake: raw data in object storage (S3/GCS). Data Warehouse: structured, optimized for analytics (Redshift, BigQuery). Lakehouse (Delta Lake, Iceberg): ACID transactions on lake format = best of both.</div>
      <div class="pat-when">Must understand for: analytics systems, data pipeline design</div>
    </div>
    <div class="pat-card" style="--pc:var(--c4)">
      <div class="pat-label">Search</div>
      <div class="pat-name">Inverted Index & Relevance</div>
      <div class="pat-desc">Elasticsearch/Lucene: tokenize → stem → inverted index (term → doc list). TF-IDF and BM25 for relevance scoring. Sharding by doc range. Refresh interval: near-real-time 1s. Used for full-text, log search.</div>
      <div class="pat-when">Must understand for: search feature, log analysis, Elasticsearch design</div>
    </div>
  </div>

  <!-- TWO PHASE COMMIT vs SAGA -->
  <div class="acc rev" style="--pip:var(--c4); margin-top:2rem">
    <div class="acc-head" onclick="tog(this)">
      <div class="acc-pip"></div>
      <div class="acc-title">Two-Phase Commit vs Saga — Distributed transaction strategies<span class="lbadge adv">Advanced</span></div>
      <div class="acc-chev">▼</div>
    </div>
    <div class="acc-body">
      <div class="acc-inner">
        <div class="acc-text">
          <p><span class="hl">2PC (Two-Phase Commit)</span>: Phase 1 (Prepare): coordinator asks all participants to prepare and lock resources. Phase 2 (Commit/Abort): if all prepared → commit; else → abort all.</p>
          <p><span class="hl">Problems with 2PC</span>: Blocking protocol — if coordinator crashes after prepare but before commit, all participants are locked indefinitely. Severely limits availability and throughput.</p>
          <p><span class="hl">3PC</span>: Adds a pre-commit phase to reduce blocking. Still not partition-tolerant. Rarely used in practice.</p>
          <p><span class="hl">Saga vs 2PC</span>: Sagas are non-blocking and partition-tolerant but require compensating transactions and accept eventual consistency. 2PC is strongly consistent but blocking. For microservices: Saga almost always preferred.</p>
          <pre class="code">// When to use 2PC (rare):
// ✓ Same datacenter, known participants
// ✓ XA transactions across heterogeneous DBs
// ✓ Short transactions (&lt;100ms)
// ✗ Cross-region (high latency locks)
// ✗ Microservices (too many services to coordinate)
//
// When to use Saga (common):
// ✓ Microservices with independent DBs
// ✓ Long-running business processes
// ✓ Need availability over strong consistency</pre>
        </div>
        <div class="acc-visual">
          <svg viewBox="0 0 280 200">
            <text x="140" y="16" text-anchor="middle" fill="#f5c842" font-family="Geist Mono" font-size="10">2PC Timeline</text>
            <rect x="10" y="25" width="60" height="155" rx="5" fill="rgba(245,200,66,0.06)" stroke="rgba(245,200,66,0.2)" stroke-width="1"/>
            <text x="40" y="43" text-anchor="middle" fill="#f5c842" font-family="Geist Mono" font-size="8">Coordinator</text>
            <rect x="110" y="25" width="50" height="155" rx="5" fill="rgba(61,217,179,0.04)" stroke="rgba(61,217,179,0.15)" stroke-width="1"/>
            <text x="135" y="43" text-anchor="middle" fill="#3dd9b3" font-family="Geist Mono" font-size="8">DB1</text>
            <rect x="220" y="25" width="50" height="155" rx="5" fill="rgba(61,217,179,0.04)" stroke="rgba(61,217,179,0.15)" stroke-width="1"/>
            <text x="245" y="43" text-anchor="middle" fill="#3dd9b3" font-family="Geist Mono" font-size="8">DB2</text>
            <line x1="70" y1="60" x2="110" y2="60" stroke="rgba(245,200,66,0.45)" stroke-width="1"/>
            <line x1="70" y1="70" x2="220" y2="70" stroke="rgba(245,200,66,0.45)" stroke-width="1"/>
            <text x="165" y="58" text-anchor="middle" fill="#f5c842" font-family="Geist Mono" font-size="7">PREPARE →</text>
            <line x1="110" y1="95" x2="70" y2="95" stroke="rgba(61,217,179,0.4)" stroke-width="1" stroke-dasharray="3 2"/>
            <line x1="220" y1="105" x2="70" y2="105" stroke="rgba(61,217,179,0.4)" stroke-width="1" stroke-dasharray="3 2"/>
            <text x="165" y="93" text-anchor="middle" fill="#3dd9b3" font-family="Geist Mono" font-size="7">← PREPARED</text>
            <line x1="70" y1="130" x2="110" y2="130" stroke="rgba(139,120,245,0.45)" stroke-width="1"/>
            <line x1="70" y1="140" x2="220" y2="140" stroke="rgba(139,120,245,0.45)" stroke-width="1"/>
            <text x="165" y="128" text-anchor="middle" fill="#a895f8" font-family="Geist Mono" font-size="7">COMMIT →</text>
            <text x="40" y="180" text-anchor="middle" fill="#f2875a" font-family="Geist Mono" font-size="7">crash here = locks!</text>
          </svg>
        </div>
      </div>
    </div>
  </div>

  <div class="acc rev" style="--pip:var(--c1)">
    <div class="acc-head" onclick="tog(this)">
      <div class="acc-pip"></div>
      <div class="acc-title">Raft Consensus Algorithm — Leader election and log replication<span class="lbadge adv">Advanced</span></div>
      <div class="acc-chev">▼</div>
    </div>
    <div class="acc-body">
      <div class="acc-inner">
        <div class="acc-text">
          <p>Raft guarantees that a cluster of N nodes can tolerate floor((N-1)/2) failures while remaining strongly consistent. A 3-node cluster tolerates 1 failure; a 5-node cluster tolerates 2.</p>
          <p><span class="hl">Leader election</span>: Nodes start as followers. Election timeout (150-300ms random). Candidate increments term, requests votes. Winner becomes leader, sends heartbeats to prevent re-election.</p>
          <p><span class="hl">Log replication</span>: Client writes go to leader. Leader appends to log, sends AppendEntries to followers. Once majority ACK → entry committed → leader responds to client → followers apply.</p>
          <p><span class="hl">Safety</span>: Only nodes with up-to-date log can win election. Ensures committed entries never lost.</p>
          <p><span class="hl">Log compaction</span>: Snapshot state + truncate log to prevent unbounded growth. Nodes can catch up via snapshot transfer.</p>
          <pre class="code">// Raft guarantees:
// - Election safety: ≤1 leader per term
// - Leader append-only: never overwrites
// - Log matching: same index+term → same entry
// - Leader completeness: committed entries present
// - State machine safety: apply same commands same order
//
// Used by: etcd, CockroachDB, TiKV, Consul</pre>
        </div>
        <div class="acc-visual">
          <svg viewBox="0 0 280 190">
            <circle cx="140" cy="80" r="32" fill="rgba(139,120,245,0.12)" stroke="rgba(139,120,245,0.45)" stroke-width="1.5"/>
            <text x="140" y="76" text-anchor="middle" fill="#a895f8" font-family="Geist Mono" font-size="9" font-weight="600">LEADER</text>
            <text x="140" y="90" text-anchor="middle" fill="#8b78f5" font-family="Geist Mono" font-size="7">term: 4</text>
            <circle cx="50" cy="155" r="25" fill="rgba(61,217,179,0.08)" stroke="rgba(61,217,179,0.3)" stroke-width="1"/>
            <text x="50" y="151" text-anchor="middle" fill="#3dd9b3" font-family="Geist Mono" font-size="8">Follower</text>
            <text x="50" y="163" text-anchor="middle" fill="#3dd9b3" font-family="Geist Mono" font-size="7">log[0..5]</text>
            <circle cx="140" cy="165" r="25" fill="rgba(61,217,179,0.08)" stroke="rgba(61,217,179,0.3)" stroke-width="1"/>
            <text x="140" y="161" text-anchor="middle" fill="#3dd9b3" font-family="Geist Mono" font-size="8">Follower</text>
            <text x="140" y="173" text-anchor="middle" fill="#3dd9b3" font-family="Geist Mono" font-size="7">log[0..5]</text>
            <circle cx="230" cy="155" r="25" fill="rgba(61,217,179,0.08)" stroke="rgba(61,217,179,0.3)" stroke-width="1"/>
            <text x="230" y="151" text-anchor="middle" fill="#3dd9b3" font-family="Geist Mono" font-size="8">Follower</text>
            <text x="230" y="163" text-anchor="middle" fill="#3dd9b3" font-family="Geist Mono" font-size="7">log[0..4]</text>
            <line x1="115" y1="106" x2="68" y2="132" stroke="rgba(245,200,66,0.35)" stroke-width="1" stroke-dasharray="4 3"/>
            <line x1="140" y1="112" x2="140" y2="140" stroke="rgba(245,200,66,0.35)" stroke-width="1" stroke-dasharray="4 3"/>
            <line x1="165" y1="106" x2="212" y2="132" stroke="rgba(245,200,66,0.25)" stroke-width="1" stroke-dasharray="4 3"/>
            <text x="92" y="118" fill="#f5c842" font-family="Geist Mono" font-size="7">heartbeat + log</text>
          </svg>
        </div>
      </div>
    </div>
  </div>
</div>
</section>

<!-- ═══════════════════════════════ INTERVIEW FRAMEWORK ═══════════════════════════════ -->
<section id="interview" style="background:var(--bg2)">
<div class="wrap section-pad">
  <div class="sh rev">
    <div class="sh-tag">09 — Interview Strategy</div>
    <h2 class="sh-title">The Framework That <em>Wins</em></h2>
    <p class="sh-sub">A structured, repeatable approach for every system design interview — from SDE-2 to Principal level.</p>
  </div>
  <div class="fw-grid rev">
    <div class="steps">
      <div class="step">
        <div class="step-n" style="--sn:var(--c1)">1</div>
        <div class="step-body">
          <div class="step-title">Clarify Requirements (5 min)</div>
          <div class="step-desc">Never design without asking. Functional requirements (what it does), non-functional (scale, latency, availability). Ask about DAU, read/write ratio, geography, SLA.</div>
          <div class="step-eg">→ "100M DAU, read-heavy 100:1, 99.99% uptime, global users?"</div>
        </div>
      </div>
      <div class="step">
        <div class="step-n" style="--sn:var(--c3)">2</div>
        <div class="step-body">
          <div class="step-title">Capacity Estimation (5 min)</div>
          <div class="step-desc">Back-of-envelope. QPS, storage, bandwidth. This drives your database choice, caching strategy, and server count. Know your powers of 10.</div>
          <div class="step-eg">→ "100M × 10 req/day = 11.5K RPS, 100:1 ratio = 115 write/s"</div>
        </div>
      </div>
      <div class="step">
        <div class="step-n" style="--sn:var(--c4)">3</div>
        <div class="step-body">
          <div class="step-title">API Design (5 min)</div>
          <div class="step-desc">Define the public interface. REST endpoints or gRPC. Input/output schemas. Pagination strategy. This forces you to think about the data model before the architecture.</div>
          <div class="step-eg">→ "POST /tweets, GET /feed?user_id&cursor, DELETE /tweets/:id"</div>
        </div>
      </div>
      <div class="step">
        <div class="step-n" style="--sn:var(--c5)">4</div>
        <div class="step-body">
          <div class="step-title">High-Level Design (10 min)</div>
          <div class="step-desc">Draw the block diagram. Client → CDN → LB → services → DB → cache. Walk through the happy path. Make explicit DB schema and key decisions. Get interviewer buy-in before diving deep.</div>
          <div class="step-eg">→ Draw boxes + arrows, name every component, show data flow</div>
        </div>
      </div>
      <div class="step">
        <div class="step-n" style="--sn:var(--c2)">5</div>
        <div class="step-body">
          <div class="step-title">Deep Dive (15 min)</div>
          <div class="step-desc">Pick the hardest/most interesting part and go deep. Or follow the interviewer's lead. DB schema, scaling a bottleneck, failure handling, algorithmic core. This is where senior candidates shine.</div>
          <div class="step-eg">→ "Let's talk about how you'd handle the celebrity user problem"</div>
        </div>
      </div>
      <div class="step">
        <div class="step-n" style="--sn:var(--c6)">6</div>
        <div class="step-body">
          <div class="step-title">Trade-offs & Bottlenecks (5 min)</div>
          <div class="step-desc">Proactively identify what breaks at 10x scale. What's the single point of failure? What would you do differently with infinite time? Strong candidates think critically about their own design.</div>
          <div class="step-eg">→ "The fanout approach breaks for celebrities — I'd use a hybrid model"</div>
        </div>
      </div>
    </div>
    <div>
      <div class="cs-card rev" style="--ch:var(--c1); margin-bottom:1rem">
        <div class="cs-head">Time allocation (45 min)</div>
        <div class="cs-row"><span class="cs-key">Clarify requirements</span><span class="cs-val">5 min</span></div>
        <div class="cs-row"><span class="cs-key">Capacity estimation</span><span class="cs-val">5 min</span></div>
        <div class="cs-row"><span class="cs-key">API design</span><span class="cs-val">5 min</span></div>
        <div class="cs-row"><span class="cs-key">High-level design</span><span class="cs-val">10 min</span></div>
        <div class="cs-row"><span class="cs-key">Deep dive</span><span class="cs-val">15 min</span></div>
        <div class="cs-row"><span class="cs-key">Trade-offs & wrap</span><span class="cs-val">5 min</span></div>
      </div>
      <div class="cs-card rev" style="--ch:var(--c2); margin-bottom:1rem">
        <div class="cs-head">Red flags (never do these)</div>
        <div class="cs-row"><span class="cs-key">Design without asking questions</span><span class="cs-val" style="color:var(--c2)">✗</span></div>
        <div class="cs-row"><span class="cs-key">Jump to code immediately</span><span class="cs-val" style="color:var(--c2)">✗</span></div>
        <div class="cs-row"><span class="cs-key">Ignore scale & non-functional reqs</span><span class="cs-val" style="color:var(--c2)">✗</span></div>
        <div class="cs-row"><span class="cs-key">Say "just use microservices"</span><span class="cs-val" style="color:var(--c2)">✗</span></div>
        <div class="cs-row"><span class="cs-key">Not acknowledge trade-offs</span><span class="cs-val" style="color:var(--c2)">✗</span></div>
        <div class="cs-row"><span class="cs-key">Over-engineer a simple problem</span><span class="cs-val" style="color:var(--c2)">✗</span></div>
        <div class="cs-row"><span class="cs-key">Silence for more than 30 seconds</span><span class="cs-val" style="color:var(--c2)">✗</span></div>
      </div>
      <div class="cs-card rev" style="--ch:var(--c3)">
        <div class="cs-head">Level expectations</div>
        <div class="cs-row"><span class="cs-key">SDE-2: Design the happy path</span><span class="cs-val" style="color:var(--c3)">Core</span></div>
        <div class="cs-row"><span class="cs-key">SDE-3: Proactively find edge cases</span><span class="cs-val" style="color:var(--c4)">Senior</span></div>
        <div class="cs-row"><span class="cs-key">Staff: Drive to unknown requirements</span><span class="cs-val" style="color:var(--c2)">Staff</span></div>
        <div class="cs-row"><span class="cs-key">Principal: Challenge the problem itself</span><span class="cs-val" style="color:var(--c6)">Principal</span></div>
      </div>
    </div>
  </div>
</div>
</section>

<!-- ═══════════════════════════════ CHEATSHEET ═══════════════════════════════ -->
<section id="cheatsheet" style="background:var(--bg)">
<div class="wrap section-pad">
  <div class="sh rev">
    <div class="sh-tag">10 — Quick Reference</div>
    <h2 class="sh-title">Numbers & <em>Decisions</em></h2>
    <p class="sh-sub">The facts you must have memorized going into any interview. No Googling allowed.</p>
  </div>

  <div class="cs-grid rev">
    <div class="cs-card" style="--ch:var(--c1)">
      <div class="cs-head">Latency Numbers</div>
      <div class="cs-row"><span class="cs-key">L1 cache</span><span class="cs-val">~0.5 ns</span></div>
      <div class="cs-row"><span class="cs-key">L2 cache</span><span class="cs-val">~7 ns</span></div>
      <div class="cs-row"><span class="cs-key">RAM read</span><span class="cs-val">~100 ns</span></div>
      <div class="cs-row"><span class="cs-key">Redis GET</span><span class="cs-val">~0.1 ms</span></div>
      <div class="cs-row"><span class="cs-key">SSD random read</span><span class="cs-val">~0.15 ms</span></div>
      <div class="cs-row"><span class="cs-key">DB query (local)</span><span class="cs-val">~5 ms</span></div>
      <div class="cs-row"><span class="cs-key">HDD seek</span><span class="cs-val">~10 ms</span></div>
      <div class="cs-row"><span class="cs-key">Same-DC round-trip</span><span class="cs-val">~0.5 ms</span></div>
      <div class="cs-row"><span class="cs-key">Cross-region</span><span class="cs-val">~150 ms</span></div>
    </div>
    <div class="cs-card" style="--ch:var(--c3)">
      <div class="cs-head">Throughput Benchmarks</div>
      <div class="cs-row"><span class="cs-key">Redis ops/sec</span><span class="cs-val">~100K</span></div>
      <div class="cs-row"><span class="cs-key">Kafka msgs/sec</span><span class="cs-val">~1M+</span></div>
      <div class="cs-row"><span class="cs-key">MySQL writes</span><span class="cs-val">~5K QPS</span></div>
      <div class="cs-row"><span class="cs-key">MySQL reads</span><span class="cs-val">~50K QPS</span></div>
      <div class="cs-row"><span class="cs-key">Cassandra writes</span><span class="cs-val">~50K QPS</span></div>
      <div class="cs-row"><span class="cs-key">Nginx requests</span><span class="cs-val">~100K/s</span></div>
      <div class="cs-row"><span class="cs-key">S3 req/bucket</span><span class="cs-val">~5.5K/s</span></div>
      <div class="cs-row"><span class="cs-key">HTTP req/server</span><span class="cs-val">~10K/s</span></div>
    </div>
    <div class="cs-card" style="--ch:var(--c4)">
      <div class="cs-head">Estimation Math</div>
      <div class="cs-row"><span class="cs-key">1B req/month</span><span class="cs-val">~400 RPS</span></div>
      <div class="cs-row"><span class="cs-key">1M users × 100 req/day</span><span class="cs-val">~1.2K RPS</span></div>
      <div class="cs-row"><span class="cs-key">Seconds per day</span><span class="cs-val">~86.4K</span></div>
      <div class="cs-row"><span class="cs-key">1KB × 1M rows</span><span class="cs-val">1 GB</span></div>
      <div class="cs-row"><span class="cs-key">1KB × 1B rows</span><span class="cs-val">1 TB</span></div>
      <div class="cs-row"><span class="cs-key">Avg photo</span><span class="cs-val">~300 KB</span></div>
      <div class="cs-row"><span class="cs-key">Avg tweet</span><span class="cs-val">~300 B</span></div>
      <div class="cs-row"><span class="cs-key">Video 1hr 720p</span><span class="cs-val">~1 GB</span></div>
    </div>
    <div class="cs-card" style="--ch:var(--c2)">
      <div class="cs-head">Database Decision</div>
      <div class="cs-row"><span class="cs-key">Relational + ACID</span><span class="cs-val">PostgreSQL</span></div>
      <div class="cs-row"><span class="cs-key">Key-value cache</span><span class="cs-val">Redis</span></div>
      <div class="cs-row"><span class="cs-key">Document store</span><span class="cs-val">MongoDB</span></div>
      <div class="cs-row"><span class="cs-key">Wide-column</span><span class="cs-val">Cassandra</span></div>
      <div class="cs-row"><span class="cs-key">Time-series</span><span class="cs-val">InfluxDB</span></div>
      <div class="cs-row"><span class="cs-key">Graph</span><span class="cs-val">Neo4j</span></div>
      <div class="cs-row"><span class="cs-key">Full-text search</span><span class="cs-val">Elasticsearch</span></div>
      <div class="cs-row"><span class="cs-key">Blob storage</span><span class="cs-val">S3 / GCS</span></div>
    </div>
    <div class="cs-card" style="--ch:var(--c5)">
      <div class="cs-head">Common Patterns</div>
      <div class="cs-row"><span class="cs-key">Scale reads</span><span class="cs-val">Read replica + cache</span></div>
      <div class="cs-row"><span class="cs-key">Scale writes</span><span class="cs-val">Sharding</span></div>
      <div class="cs-row"><span class="cs-key">Reduce latency</span><span class="cs-val">CDN + cache</span></div>
      <div class="cs-row"><span class="cs-key">Async work</span><span class="cs-val">Message queue</span></div>
      <div class="cs-row"><span class="cs-key">Real-time push</span><span class="cs-val">WebSocket + pub/sub</span></div>
      <div class="cs-row"><span class="cs-key">Distributed txn</span><span class="cs-val">Saga pattern</span></div>
      <div class="cs-row"><span class="cs-key">Data consistency</span><span class="cs-val">CRDT / vector clock</span></div>
      <div class="cs-row"><span class="cs-key">High write throughput</span><span class="cs-val">LSM + Kafka</span></div>
    </div>
    <div class="cs-card" style="--ch:var(--c7)">
      <div class="cs-head">Availability Numbers</div>
      <div class="cs-row"><span class="cs-key">99% (two nines)</span><span class="cs-val">87.6h/yr down</span></div>
      <div class="cs-row"><span class="cs-key">99.9% (three nines)</span><span class="cs-val">8.76h/yr</span></div>
      <div class="cs-row"><span class="cs-key">99.99% (four nines)</span><span class="cs-val">52.6 min/yr</span></div>
      <div class="cs-row"><span class="cs-key">99.999% (five nines)</span><span class="cs-val">5.26 min/yr</span></div>
      <div class="cs-row"><span class="cs-key">Raft: N nodes, tolerate</span><span class="cs-val">⌊N/2⌋ failures</span></div>
      <div class="cs-row"><span class="cs-key">Quorum majority</span><span class="cs-val">⌊N/2⌋ + 1</span></div>
      <div class="cs-row"><span class="cs-key">Replication factor</span><span class="cs-val">3 (production)</span></div>
      <div class="cs-row"><span class="cs-key">Error budget 99.9%</span><span class="cs-val">0.1% = 8.76h</span></div>
    </div>
    <div class="cs-card" style="--ch:var(--c6)">
      <div class="cs-head">Scalability Heuristics</div>
      <div class="cs-row"><span class="cs-key">&lt;10K users</span><span class="cs-val">1 server ok</span></div>
      <div class="cs-row"><span class="cs-key">&lt;100K users</span><span class="cs-val">Add read replica</span></div>
      <div class="cs-row"><span class="cs-key">&lt;1M users</span><span class="cs-val">Cache + CDN</span></div>
      <div class="cs-row"><span class="cs-key">&lt;10M users</span><span class="cs-val">Horizontal scale</span></div>
      <div class="cs-row"><span class="cs-key">&lt;100M users</span><span class="cs-val">Sharding + async</span></div>
      <div class="cs-row"><span class="cs-key">1B+ users</span><span class="cs-val">Multi-region</span></div>
      <div class="cs-row"><span class="cs-key">Write:Read ratio</span><span class="cs-val">Typically 1:10</span></div>
      <div class="cs-row"><span class="cs-key">Cache hit rate target</span><span class="cs-val">&gt; 90%</span></div>
    </div>
    <div class="cs-card" style="--ch:var(--c1)">
      <div class="cs-head">Key Paper References</div>
      <div class="cs-row"><span class="cs-key">Google Bigtable (2006)</span><span class="cs-val">wide-column</span></div>
      <div class="cs-row"><span class="cs-key">Amazon Dynamo (2007)</span><span class="cs-val">KV store, AP</span></div>
      <div class="cs-row"><span class="cs-key">Google Spanner (2012)</span><span class="cs-val">NewSQL</span></div>
      <div class="cs-row"><span class="cs-key">Google Chubby (2006)</span><span class="cs-val">distributed lock</span></div>
      <div class="cs-row"><span class="cs-key">Raft (2014)</span><span class="cs-val">consensus</span></div>
      <div class="cs-row"><span class="cs-key">Kafka (2011)</span><span class="cs-val">log-based queue</span></div>
      <div class="cs-row"><span class="cs-key">MapReduce (2004)</span><span class="cs-val">batch processing</span></div>
      <div class="cs-row"><span class="cs-key">Zanzibar (2019)</span><span class="cs-val">authz at scale</span></div>
    </div>
  </div>
</div>
</section>

<footer>
  <div class="brand">SYS/DESIGN — THE COMPLETE REFERENCE</div>
  <div>Every concept, pattern, and trade-off. Build systems that matter.</div>
</footer>


` }} />
      <QuizPortal />
    </div>
  );
}
