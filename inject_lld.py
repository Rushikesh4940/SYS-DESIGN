import re

with open('components/LearnView.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Locate the exact bounds of the CODE DESIGN section
start_marker = "<!-- ═══════════════════════════════ CODE DESIGN ═══════════════════════════════ -->"
end_marker = "<!-- ═══════════════════════════════ FOUNDATIONS ═══════════════════════════════ -->"

if start_marker in content and end_marker in content:
    idx_start = content.find(start_marker)
    idx_end = content.find(end_marker)
    
    # We will replace everything between them with the new LLD content.
    # New LLD Content
    new_html = """<!-- ═══════════════════════════════ LOW LEVEL DESIGN ═══════════════════════════════ -->
<section id="lld" style="background:var(--bg)">
<div class="wrap section-pad">
  <div class="sh rev">
    <div class="sh-tag">00 — Low-Level Design</div>
    <h2 class="sh-title">Low Level <em>Design</em></h2>
    <p class="sh-sub" style="display:flex;align-items:center;gap:2rem;">
      <span>The bedrock of a robust system. Designing code that is built for <b>Extensibility</b>, <b>Modularity</b>, and extreme <b>Maintainability</b>.</span>
      <svg width="80" height="80" viewBox="0 0 100 100" style="flex-shrink:0;">
        <!-- Extensibility/Modularity Puzzle Snap Animation -->
        <rect x="20" y="20" width="30" height="30" rx="4" fill="var(--c5)" opacity="0.8"/>
        <rect x="60" y="20" width="30" height="30" rx="4" fill="var(--c4)" opacity="0">
          <animate attributeName="opacity" values="0;1;1;0" dur="3s" repeatCount="indefinite" />
          <animate attributeName="x" values="80;60;60;80" dur="3s" repeatCount="indefinite" />
        </rect>
        <rect x="20" y="60" width="30" height="30" rx="4" fill="var(--c3)" opacity="0">
          <animate attributeName="opacity" values="0;0;1;0" dur="3s" repeatCount="indefinite" />
          <animate attributeName="y" values="80;80;60;80" dur="3s" repeatCount="indefinite" />
        </rect>
        <rect x="60" y="60" width="30" height="30" rx="4" fill="var(--c1)" opacity="0">
          <animate attributeName="opacity" values="0;0;0;1" dur="3s" repeatCount="indefinite" />
        </rect>
      </svg>
    </p>
  </div>

  <div class="acc rev" style="--pip:var(--c5)">
    <div class="acc-head" onclick="tog(this)">
      <div class="acc-pip"></div>
      <div class="acc-title">OOPS Concept</div>
      <div class="acc-chev">▼</div>
    </div>
    <div class="acc-body">
      <div class="acc-inner" style="grid-template-columns: 1fr;">
        <div class="acc-text">
          <div style="display:flex; gap: 2rem; align-items: flex-start; margin-bottom: 2rem; padding: 1rem; background: var(--bg2); border-radius: 8px;">
            <div style="flex: 1;">
              <p><span class="hl">CLASS vs OBJECT</span>: A Class is a blueprint; an Object is an instance of that blueprint.</p>
              <p><span class="hl">Encapsulation</span>: Bundling data and methods that operate on that data into one unit and restricting direct access to internal state. The outside world can only interact through a controlled public interface.</p>
              <p style="margin-left:1rem;color:var(--text3);font-family:var(--font-mono);font-size:11px;">Access Modifiers: Private, Protected, Public</p>
            </div>
            <svg width="60" height="60" viewBox="0 0 100 100" style="flex-shrink:0;">
              <!-- Encapsulation Shield -->
              <rect x="30" y="30" width="40" height="40" fill="var(--c4)" rx="4" />
              <circle cx="50" cy="50" r="40" stroke="var(--c3)" stroke-width="4" fill="none" stroke-dasharray="251" stroke-dashoffset="251">
                <animate attributeName="stroke-dashoffset" values="251;0;0;251" dur="4s" repeatCount="indefinite" />
              </circle>
            </svg>
          </div>

          <div style="display:flex; gap: 2rem; align-items: flex-start; margin-bottom: 2rem; padding: 1rem; background: var(--bg2); border-radius: 8px;">
            <div style="flex: 1;">
              <p><span class="hl">Abstraction</span>: Hiding implementation complexity and exposing only the essential feature. (Abstract Class vs Interface)</p>
            </div>
            <svg width="60" height="60" viewBox="0 0 100 100" style="flex-shrink:0;">
              <!-- Abstraction Gear -> Button -->
              <circle cx="50" cy="50" r="30" fill="var(--text3)" opacity="0.3">
                <animateTransform attributeName="transform" type="rotate" from="0 50 50" to="360 50 50" dur="2s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.8;0" dur="3s" repeatCount="indefinite" />
              </circle>
              <rect x="35" y="40" width="30" height="20" rx="10" fill="var(--c1)" opacity="0">
                <animate attributeName="opacity" values="0;1" dur="3s" repeatCount="indefinite" />
              </rect>
            </svg>
          </div>

          <div style="display:flex; gap: 2rem; align-items: flex-start; margin-bottom: 2rem; padding: 1rem; background: var(--bg2); border-radius: 8px;">
            <div style="flex: 1;">
              <p><span class="hl">Inheritance</span>: The process by which one class (the child or subclass) acquires the properties and behaviors (methods/attributes) of another class (the parent or superclass).</p>
            </div>
            <svg width="60" height="60" viewBox="0 0 100 100" style="flex-shrink:0;">
              <!-- Inheritance Tree -->
              <rect x="40" y="10" width="20" height="15" fill="var(--c5)" rx="2"/>
              <path d="M 50 25 V 40 M 30 40 H 70 M 30 40 V 50 M 70 40 V 50" stroke="var(--line2)" stroke-width="2" fill="none"/>
              <rect x="20" y="50" width="20" height="15" fill="none" stroke="var(--c5)" stroke-width="2" rx="2">
                <animate attributeName="fill" values="transparent;var(--c5)" dur="2s" repeatCount="indefinite" />
              </rect>
              <rect x="60" y="50" width="20" height="15" fill="none" stroke="var(--c5)" stroke-width="2" rx="2">
                <animate attributeName="fill" values="transparent;var(--c5)" dur="2s" repeatCount="indefinite" begin="1s"/>
              </rect>
            </svg>
          </div>

          <div style="display:flex; gap: 2rem; align-items: flex-start; margin-bottom: 2rem; padding: 1rem; background: var(--bg2); border-radius: 8px;">
            <div style="flex: 1;">
              <p><span class="hl">Polymorphism</span>: Means "many forms." It allows a single method, function, or object to behave differently depending on the context.</p>
              <ul style="margin-left: 2rem; font-size:12px; color:var(--text2); line-height: 1.8;">
                <li>1. Compile-time (Method Overloading)</li>
                <li>2. Runtime (Method Overriding)</li>
              </ul>
            </div>
            <svg width="60" height="60" viewBox="0 0 100 100" style="flex-shrink:0;">
              <!-- Polymorphism Morph -->
              <path d="M 30 70 L 50 30 L 70 70 Z" fill="var(--c6)">
                 <animate attributeName="d" values="M 30 70 L 50 30 L 70 70 Z; M 30 30 L 70 30 L 70 70 L 30 70 Z; M 50 30 A 20 20 0 1 1 49.9 30; M 30 70 L 50 30 L 70 70 Z" dur="4s" repeatCount="indefinite"/>
                 <animate attributeName="fill" values="var(--c6);var(--c1);var(--c3);var(--c6)" dur="4s" repeatCount="indefinite"/>
              </path>
            </svg>
          </div>

          <div id="flashcard-oop"></div>
        </div>
      </div>
    </div>
  </div>

  <div class="acc rev" style="--pip:var(--c1)">
    <div class="acc-head" onclick="tog(this)">
      <div class="acc-pip"></div>
      <div class="acc-title">SOLID Principles</div>
      <div class="acc-chev">▼</div>
    </div>
    <div class="acc-body">
      <div class="acc-inner" style="grid-template-columns: 1fr;">
        <div class="acc-text">
          
          <div style="display:flex; gap: 2rem; align-items: flex-start; margin-bottom: 2rem; border-bottom: 1px solid var(--line); padding-bottom: 1rem;">
            <div style="flex: 1;">
              <p><span class="hl" style="color:var(--c1);font-size:18px;">S</span> — <span class="hl">Singularity (SRP)</span>: It is a guideline but it is subjective.</p>
            </div>
            <svg width="40" height="40" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="30" fill="var(--c1)" opacity="0.8">
                 <animate attributeName="r" values="30;15;30" dur="2s" repeatCount="indefinite"/>
              </circle>
            </svg>
          </div>

          <div style="display:flex; gap: 2rem; align-items: flex-start; margin-bottom: 2rem; border-bottom: 1px solid var(--line); padding-bottom: 1rem;">
            <div style="flex: 1;">
              <p><span class="hl" style="color:var(--c1);font-size:18px;">O</span> — <span class="hl">Open/Closed Principle</span>: Open for extension, closed for modification.</p>
            </div>
            <svg width="40" height="40" viewBox="0 0 100 100">
              <rect x="25" y="25" width="50" height="50" rx="5" fill="none" stroke="var(--c1)" stroke-width="4"/>
              <!-- "Extension" plug entering -->
              <rect x="40" y="-10" width="20" height="35" rx="2" fill="var(--c3)">
                <animate attributeName="y" values="-10;25;-10" dur="3s" repeatCount="indefinite" />
              </rect>
            </svg>
          </div>

          <div style="display:flex; gap: 2rem; align-items: flex-start; margin-bottom: 2rem; border-bottom: 1px solid var(--line); padding-bottom: 1rem;">
            <div style="flex: 1;">
              <p><span class="hl" style="color:var(--c1);font-size:18px;">L</span> — <span class="hl">Liskov Substitution Principle</span>: Wherever you use a base class, we should be able to add a derived class.</p>
            </div>
            <svg width="40" height="40" viewBox="0 0 100 100">
              <rect x="20" y="50" width="60" height="10" fill="var(--line2)"/>
              <circle cx="50" cy="40" r="10" fill="var(--c4)">
                <animate attributeName="fill" values="var(--c4);var(--c6);var(--c4)" dur="3s" repeatCount="indefinite" />
              </circle>
            </svg>
          </div>

          <div style="display:flex; gap: 2rem; align-items: flex-start; margin-bottom: 2rem; border-bottom: 1px solid var(--line); padding-bottom: 1rem;">
            <div style="flex: 1;">
              <p><span class="hl" style="color:var(--c1);font-size:18px;">I</span> — <span class="hl">Interface Segregation Principle</span>: Smaller and specific interfaces.</p>
            </div>
            <svg width="40" height="40" viewBox="0 0 100 100">
               <rect x="10" y="40" width="80" height="20" rx="4" fill="var(--c2)">
                  <animate attributeName="width" values="80;20;80" dur="2s" repeatCount="indefinite" />
               </rect>
               <rect x="40" y="40" width="20" height="20" rx="4" fill="var(--c5)" opacity="0">
                  <animate attributeName="opacity" values="0;1;0" dur="2s" repeatCount="indefinite" />
               </rect>
               <rect x="70" y="40" width="20" height="20" rx="4" fill="var(--c3)" opacity="0">
                  <animate attributeName="opacity" values="0;1;0" dur="2s" repeatCount="indefinite" />
               </rect>
            </svg>
          </div>

          <div style="display:flex; gap: 2rem; align-items: flex-start; margin-bottom: 2rem;">
            <div style="flex: 1;">
              <p><span class="hl" style="color:var(--c1);font-size:18px;">D</span> — <span class="hl">Dependency Inversion Principle</span>: Your high-level module should not depend on your low-level module. Instead, there should be an abstraction layer in between.</p>
            </div>
            <svg width="40" height="40" viewBox="0 0 100 100">
               <!-- High level -->
               <rect x="25" y="10" width="50" height="20" rx="4" fill="var(--text2)"/>
               <!-- Low level -->
               <rect x="25" y="70" width="50" height="20" rx="4" fill="var(--text2)"/>
               <!-- Missing link breaking -->
               <line x1="50" y1="30" x2="50" y2="70" stroke="var(--c2)" stroke-width="4">
                   <animate attributeName="opacity" values="1;0;1" dur="4s" repeatCount="indefinite"/>
               </line>
               <!-- Interface forming -->
               <circle cx="50" cy="50" r="10" fill="var(--c3)" opacity="0">
                   <animate attributeName="opacity" values="0;1;0" dur="4s" repeatCount="indefinite"/>
               </circle>
            </svg>
          </div>

          <div id="flashcard-solid"></div>
        </div>
      </div>
    </div>
  </div>
</div>
</section>
"""

    content = content[:idx_start] + new_html + content[idx_end:]

    # Also update the navigation link if it's there
    content = content.replace('<li><a href="#code-design">Code Design</a></li>', '<li><a href="#lld">Low-Level Design</a></li>')
    
    with open('components/LearnView.tsx', 'w', encoding='utf-8') as f:
        f.write(content)
    print("Replaced Code Design with new LLD block successfully.")
else:
    print("Markers not found!")
