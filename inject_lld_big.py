import re

with open('components/LearnView.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

start_marker = "<!-- ═══════════════════════════════ LOW LEVEL DESIGN ═══════════════════════════════ -->"
end_marker = "<!-- ═══════════════════════════════ FOUNDATIONS ═══════════════════════════════ -->"

if start_marker in content and end_marker in content:
    idx_start = content.find(start_marker)
    idx_end = content.find(end_marker)
    
    new_html = """<!-- ═══════════════════════════════ LOW LEVEL DESIGN ═══════════════════════════════ -->
<section id="lld" style="background:var(--bg)">
<div class="wrap section-pad">
  <div class="sh rev">
    <div class="sh-tag">00 — Low-Level Design</div>
    <h2 class="sh-title">Low Level <em>Design</em></h2>
    <p class="sh-sub">
      The bedrock of a robust system. Designing code that is built for <b>Extensibility</b>, <b>Modularity</b>, and extreme <b>Maintainability</b>.
    </p>
    
    <div style="margin-top:2rem; padding: 2rem; background: var(--bg2); border-radius: 12px; display:flex; flex-direction:column; align-items:center;">
       <div style="font-family:var(--font-mono); font-size:12px; color:var(--text3); margin-bottom:1rem; letter-spacing:0.1em; text-transform:uppercase;">Visualizing Modularity</div>
       <svg width="240" height="100" viewBox="0 0 240 100">
         <!-- Core Base -->
         <rect x="20" y="30" width="80" height="40" rx="4" fill="var(--c5)" opacity="0.8"/>
         <text x="60" y="55" fill="#000" font-family="sans-serif" font-size="12" font-weight="bold" text-anchor="middle">Core App</text>
         
         <!-- Module 1 snapping in -->
         <g>
           <animateTransform attributeName="transform" type="translate" values="100,0; 0,0; 0,0; 100,0" dur="4s" repeatCount="indefinite" />
           <animate attributeName="opacity" values="0; 1; 1; 0" dur="4s" repeatCount="indefinite" />
           <rect x="110" y="10" width="70" height="30" rx="4" fill="var(--c4)"/>
           <text x="145" y="30" fill="#000" font-family="sans-serif" font-size="10" font-weight="bold" text-anchor="middle">Plugin 1</text>
         </g>
         
         <!-- Module 2 snapping in -->
         <g>
           <animateTransform attributeName="transform" type="translate" values="100,0; 100,0; 0,0; 0,0; 100,0" dur="4s" repeatCount="indefinite" />
           <animate attributeName="opacity" values="0; 0; 1; 1; 0" dur="4s" repeatCount="indefinite" />
           <rect x="110" y="60" width="70" height="30" rx="4" fill="var(--c3)"/>
           <text x="145" y="80" fill="#000" font-family="sans-serif" font-size="10" font-weight="bold" text-anchor="middle">Plugin 2</text>
         </g>
       </svg>
    </div>
  </div>

  <div class="acc rev" style="--pip:var(--c5)">
    <div class="acc-head" onclick="tog(this)">
      <div class="acc-pip"></div>
      <div class="acc-title" style="font-size:1.1rem; padding: 0.5rem 0;">OOPS Concept (Object-Oriented Programming)</div>
      <div class="acc-chev">▼</div>
    </div>
    <div class="acc-body">
      <div class="acc-inner" style="grid-template-columns: 1fr;">
        <div class="acc-text">
        
          <!-- Encapsulation -->
          <div style="display:flex; flex-direction:column; gap: 1.5rem; margin-bottom: 3rem; padding: 2rem; background: var(--bg2); border: 1px solid var(--line); border-radius: 12px;">
            <div style="flex: 1;">
              <p style="font-size: 1.2rem; margin-bottom: 0.5rem;"><span class="hl">Encapsulation</span></p>
              <p>Bundling data and methods that operate on that data into one unit and restricting direct access to internal state. The outside world can only interact through a controlled public interface.</p>
              <p style="margin-left:1rem;color:var(--text3);font-family:var(--font-mono);font-size:11px;">Access Modifiers: Private, Protected, Public</p>
            </div>
            
            <div style="width:100%; display:flex; justify-content:center;">
              <svg width="240" height="140" viewBox="0 0 240 140">
                <!-- Inner Data Box (Private) -->
                <rect x="65" y="35" width="70" height="70" fill="var(--c4)" rx="8" />
                <text x="100" y="75" fill="#000" font-family="sans-serif" font-size="12" font-weight="bold" text-anchor="middle">Internal Data</text>
                
                <!-- Encapsulation Shield (Orbiting) -->
                <circle cx="100" cy="70" r="55" stroke="var(--c3)" stroke-width="4" fill="none" stroke-dasharray="350" stroke-dashoffset="350">
                  <animate attributeName="stroke-dashoffset" values="350;0;0;350" dur="4s" repeatCount="indefinite" />
                </circle>
                
                <!-- "Outside Attack" Arrow bouncing off -->
                <g>
                  <path d="M 0 0 L 25 25 M 15 25 L 25 25 L 25 15" stroke="var(--c2)" stroke-width="4" fill="none"/>
                  <animateTransform attributeName="transform" type="translate" values="10,10; 30,30; 10,10" dur="2s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0;1;0" dur="2s" repeatCount="indefinite" />
                </g>
                <text x="25" y="15" fill="var(--c2)" font-family="sans-serif" font-size="10" font-weight="bold" text-anchor="middle">Direct Access</text>
                
                <!-- "Public API" access allowed -->
                <path d="M 210 70 L 160 70 M 170 60 L 160 70 L 170 80" stroke="var(--c7)" stroke-width="4" fill="none"/>
                <text x="210" y="60" fill="var(--c7)" font-family="sans-serif" font-size="10" font-weight="bold" text-anchor="middle">Public Method()</text>
              </svg>
            </div>
          </div>

          <!-- Abstraction -->
          <div style="display:flex; flex-direction:column; gap: 1.5rem; margin-bottom: 3rem; padding: 2rem; background: var(--bg2); border: 1px solid var(--line); border-radius: 12px;">
            <div style="flex: 1;">
               <p style="font-size: 1.2rem; margin-bottom: 0.5rem;"><span class="hl">Abstraction</span></p>
              <p>Hiding implementation complexity and exposing only the essential feature. Think of a steering wheel: you don't need to know how the engine pistons fire just to turn left.</p>
            </div>
            <div style="width:100%; display:flex; justify-content:center; align-items:center; gap: 2rem;">
              
              <!-- Complexity -->
              <svg width="100" height="100" viewBox="0 0 100 100">
                <circle cx="30" cy="30" r="20" fill="none" stroke="var(--text3)" stroke-width="6" stroke-dasharray="10 4">
                  <animateTransform attributeName="transform" type="rotate" from="0 30 30" to="360 30 30" dur="4s" repeatCount="indefinite" />
                </circle>
                <circle cx="70" cy="65" r="25" fill="none" stroke="var(--bg4)" stroke-width="6" stroke-dasharray="10 4">
                  <animateTransform attributeName="transform" type="rotate" from="360 70 65" to="0 70 65" dur="4s" repeatCount="indefinite" />
                </circle>
                <text x="50" y="100" fill="var(--text3)" font-family="sans-serif" font-size="10" text-anchor="middle">Hidden Complexity</text>
              </svg>
              
              <!-- Arrow -->
              <div style="font-size:2rem;color:var(--line2)">→</div>
              
              <!-- Simple Interface -->
              <svg width="100" height="100" viewBox="0 0 100 100">
                <rect x="15" y="30" width="70" height="40" rx="20" fill="var(--c3)" cursor="pointer">
                  <animate attributeName="fill" values="var(--c3);var(--c7);var(--c3)" dur="2s" repeatCount="indefinite" />
                </rect>
                <text x="50" y="55" fill="#000" font-family="sans-serif" font-size="12" font-weight="bold" text-anchor="middle">Press Me</text>
                <text x="50" y="90" fill="var(--c3)" font-family="sans-serif" font-size="10" text-anchor="middle">Simple Interface</text>
              </svg>

            </div>
          </div>

          <!-- Inheritance -->
          <div style="display:flex; flex-direction:column; gap: 1.5rem; margin-bottom: 3rem; padding: 2rem; background: var(--bg2); border: 1px solid var(--line); border-radius: 12px;">
            <div style="flex: 1;">
               <p style="font-size: 1.2rem; margin-bottom: 0.5rem;"><span class="hl">Inheritance</span></p>
              <p>The process by which one class (the child or subclass) acquires the properties and behaviors (methods/attributes) of another class (the parent or superclass). Eliminates duplicate code!.</p>
            </div>
            <div style="width:100%; display:flex; justify-content:center;">
              <svg width="240" height="160" viewBox="0 0 240 160">
                <!-- Parent Box "Animal" -->
                <rect x="70" y="10" width="100" height="40" fill="var(--c5)" rx="4"/>
                <text x="120" y="32" fill="#000" font-family="sans-serif" font-size="12" font-weight="bold" text-anchor="middle">Class: Animal</text>
                <text x="120" y="45" fill="#000" font-family="sans-serif" font-size="9" text-anchor="middle">+ canBreathe()</text>
                
                <!-- Lines down -->
                <path d="M 120 50 V 80 M 60 80 H 180 M 60 80 V 100 M 180 80 V 100" stroke="var(--line2)" stroke-width="3" fill="none"/>
                
                <!-- Child 1 "Dog" -->
                <rect x="10" y="100" width="100" height="40" fill="none" stroke="var(--c5)" stroke-width="3" rx="4">
                  <animate attributeName="fill" values="transparent;color-mix(in srgb,var(--c5) 20%,transparent);transparent" dur="3s" repeatCount="indefinite" />
                </rect>
                <text x="60" y="122" fill="var(--text)" font-family="sans-serif" font-size="12" font-weight="bold" text-anchor="middle">Class: Dog</text>
                <text x="60" y="135" fill="var(--c5)" font-family="sans-serif" font-size="9" text-anchor="middle">+ canBreathe() (inherited)</text>
                
                <!-- Child 2 "Bird" -->
                <rect x="130" y="100" width="100" height="40" fill="none" stroke="var(--c5)" stroke-width="3" rx="4">
                  <animate attributeName="fill" values="transparent;color-mix(in srgb,var(--c5) 20%,transparent);transparent" dur="3s" repeatCount="indefinite" begin="1.5s"/>
                </rect>
                <text x="180" y="122" fill="var(--text)" font-family="sans-serif" font-size="12" font-weight="bold" text-anchor="middle">Class: Bird</text>
                <text x="180" y="135" fill="var(--c5)" font-family="sans-serif" font-size="9" text-anchor="middle">+ canBreathe() (inherited)</text>
              </svg>
            </div>
          </div>

          <!-- Polymorphism -->
          <div style="display:flex; flex-direction:column; gap: 1.5rem; margin-bottom: 3rem; padding: 2rem; background: var(--bg2); border: 1px solid var(--line); border-radius: 12px;">
            <div style="flex: 1;">
              <p style="font-size: 1.2rem; margin-bottom: 0.5rem;"><span class="hl">Polymorphism</span></p>
              <p>Means "many forms." It allows a single shared method interface to behave radically differently depending on the specific object invoking it.</p>
              <ul style="margin-left: 2rem; font-size:12px; color:var(--text2); line-height: 1.8; margin-top: 0.5rem;">
                <li><b>Compile-time</b> (Method Overloading: same function name, different argument amounts)</li>
                <li><b>Runtime</b> (Method Overriding: same function name, different class implementations)</li>
              </ul>
            </div>
            
            <div style="width:100%; display:flex; justify-content:center;">
              <svg width="240" height="120" viewBox="0 0 240 120">
                <text x="120" y="20" fill="var(--c6)" font-family="sans-serif" font-size="14" font-weight="bold" text-anchor="middle">Shape.Draw()</text>
                
                <path d="M 80 100 L 120 40 L 160 100 Z" fill="var(--c6)">
                   <!-- Triangle -> Square -> Circle -> Triangle -->
                   <animate attributeName="d" values="M 80 100 L 120 40 L 160 100 Z; M 90 50 L 150 50 L 150 100 L 90 100 Z; M 120 40 A 30 30 0 1 1 119.9 40; M 80 100 L 120 40 L 160 100 Z" dur="6s" repeatCount="indefinite"/>
                   <animate attributeName="fill" values="var(--c6);var(--c1);var(--c3);var(--c6)" dur="6s" repeatCount="indefinite"/>
                </path>
              </svg>
            </div>
          </div>

          <div id="flashcard-oop"></div>
        </div>
      </div>
    </div>
  </div>

  <div class="acc rev" style="--pip:var(--c1)">
    <div class="acc-head" onclick="tog(this)">
      <div class="acc-pip"></div>
      <div class="acc-title" style="font-size:1.1rem; padding: 0.5rem 0;">SOLID Principles</div>
      <div class="acc-chev">▼</div>
    </div>
    <div class="acc-body">
      <div class="acc-inner" style="grid-template-columns: 1fr;">
        <div class="acc-text">
          
          <!-- SRP -->
          <div style="display:flex; flex-direction:column; gap: 1.5rem; margin-bottom: 3rem; border: 1px solid var(--line); border-radius: 12px; padding: 2rem; background: var(--bg2);">
            <div style="flex: 1;">
              <p><span class="hl" style="color:var(--c1);font-size:24px; font-weight: bold;">S</span> — <span class="hl" style="font-size:1.2rem;">Single Responsibility (SRP)</span></p>
              <p style="margin-top: 0.5rem;">It is a guideline, but it is subjective. A class should have one, and only one reason to change. Separate UI rendering from Database fetching.</p>
            </div>
            <div style="width:100%; display:flex; justify-content:center;">
              <svg width="260" height="100" viewBox="0 0 260 100">
                 <!-- God Object -->
                 <rect x="20" y="20" width="60" height="60" rx="8" fill="var(--c2)" opacity="0.8"/>
                 <text x="50" y="55" fill="#000" font-family="sans-serif" font-size="12" font-weight="bold" text-anchor="middle">God Class</text>
                 
                 <!-- Splitting Animation -->
                 <path d="M 90 50 L 120 50" stroke="var(--line2)" stroke-width="3" stroke-dasharray="5 5">
                   <animate attributeName="stroke-dashoffset" values="10;0" dur="1s" repeatCount="indefinite"/>
                 </path>
                 
                 <!-- Separated Models -->
                 <rect x="140" y="10" width="40" height="30" rx="4" fill="var(--c3)">
                   <animateTransform attributeName="transform" type="translate" values="-40,20; 0,0; 0,0" dur="3s" repeatCount="indefinite" />
                   <animate attributeName="opacity" values="0;1;1" dur="3s" repeatCount="indefinite"/>
                 </rect>
                 <text x="160" y="30" fill="#000" font-family="sans-serif" font-size="10" text-anchor="middle">Auth</text>

                 <rect x="190" y="55" width="40" height="30" rx="4" fill="var(--c5)">
                   <animateTransform attributeName="transform" type="translate" values="-90,-15; 0,0; 0,0" dur="3s" repeatCount="indefinite" />
                   <animate attributeName="opacity" values="0;1;1" dur="3s" repeatCount="indefinite"/>
                 </rect>
                 <text x="210" y="75" fill="#000" font-family="sans-serif" font-size="10" text-anchor="middle">DB Logic</text>
              </svg>
            </div>
          </div>

          <!-- OCP -->
          <div style="display:flex; flex-direction:column; gap: 1.5rem; margin-bottom: 3rem; border: 1px solid var(--line); border-radius: 12px; padding: 2rem; background: var(--bg2);">
            <div style="flex: 1;">
              <p><span class="hl" style="color:var(--c1);font-size:24px; font-weight: bold;">O</span> — <span class="hl" style="font-size:1.2rem;">Open/Closed Principle</span></p>
              <p style="margin-top: 0.5rem;">Modules should be <b>Open For Extension</b>, but strictly <b>Closed For Modification</b>.</p>
            </div>
            <div style="width:100%; display:flex; justify-content:center;">
              <svg width="240" height="120" viewBox="0 0 240 120">
                <!-- Base class (Locked) -->
                <rect x="80" y="60" width="80" height="50" rx="4" fill="var(--c1)" opacity="0.3"/>
                <text x="120" y="85" fill="var(--text)" font-family="sans-serif" font-size="10" text-anchor="middle">Base Class ("Locked")</text>
                
                <rect x="105" y="45" width="30" height="15" fill="none" stroke="var(--c3)" stroke-width="3" stroke-dasharray="2 2" rx="2" />
                <text x="120" y="35" fill="var(--c3)" font-family="sans-serif" font-size="10" text-anchor="middle">Plugin Port</text>

                <!-- Plug arriving -->
                <rect x="110" y="-10" width="20" height="40" rx="2" fill="var(--c3)">
                  <animate attributeName="y" values="-10; 40; -10" dur="4s" repeatCount="indefinite" />
                </rect>
              </svg>
            </div>
          </div>

          <!-- LSP -->
          <div style="display:flex; flex-direction:column; gap: 1.5rem; margin-bottom: 3rem; border: 1px solid var(--line); border-radius: 12px; padding: 2rem; background: var(--bg2);">
            <div style="flex: 1;">
              <p><span class="hl" style="color:var(--c1);font-size:24px; font-weight: bold;">L</span> — <span class="hl" style="font-size:1.2rem;">Liskov Substitution</span></p>
              <p style="margin-top: 0.5rem;">Wherever you use a base class, you must be able to securely substitute it with any derived class without breaking the host application.</p>
            </div>
            <div style="width:100%; display:flex; justify-content:center;">
              <svg width="240" height="100" viewBox="0 0 240 100">
                <rect x="60" y="70" width="120" height="15" fill="var(--line2)" rx="4"/>
                <text x="120" y="96" fill="var(--text3)" font-family="sans-serif" font-size="10" text-anchor="middle">App Execution Pipeline</text>
                
                <!-- Seamless Drop-in replacement -->
                <rect x="100" y="10" width="40" height="40" fill="var(--c4)" rx="4">
                  <animate attributeName="opacity" values="1;0;0;1" dur="4s" repeatCount="indefinite" />
                  <animate attributeName="y" values="10;70;70;10" dur="4s" repeatCount="indefinite" />
                </rect>
                <circle cx="120" cy="30" r="20" fill="var(--c6)" opacity="0">
                  <animate attributeName="opacity" values="0;1;1;0" dur="4s" repeatCount="indefinite" />
                  <animate attributeName="cy" values="10;75;75;10" dur="4s" repeatCount="indefinite" />
                </circle>
              </svg>
            </div>
          </div>

          <!-- ISP -->
          <div style="display:flex; flex-direction:column; gap: 1.5rem; margin-bottom: 3rem; border: 1px solid var(--line); border-radius: 12px; padding: 2rem; background: var(--bg2);">
            <div style="flex: 1;">
              <p><span class="hl" style="color:var(--c1);font-size:24px; font-weight: bold;">I</span> — <span class="hl" style="font-size:1.2rem;">Interface Segregation</span></p>
              <p style="margin-top: 0.5rem;">Smaller and specific interfaces. Never force a client to depend on an interface featuring massive methods it doesn't need to use.</p>
            </div>
            <div style="width:100%; display:flex; justify-content:center;">
              <svg width="240" height="100" viewBox="0 0 240 100">
                 <!-- Big Interface breaking into 3 small ones -->
                 <rect x="40" y="50" width="160" height="30" rx="4" fill="var(--c2)">
                    <animate attributeName="width" values="160;40;160" dur="4s" repeatCount="indefinite" />
                    <animate attributeName="x" values="40;40;40" dur="4s" repeatCount="indefinite" />
                 </rect>
                 <text x="120" y="70" fill="#000" font-family="sans-serif" font-size="10" font-weight="bold" text-anchor="middle">
                   <animate attributeName="opacity" values="1;0;1" dur="4s" repeatCount="indefinite" />
                   Massive Interface Wrapper
                 </text>

                 <rect x="100" y="50" width="40" height="30" rx="4" fill="var(--c5)" opacity="0">
                    <animate attributeName="opacity" values="0;1;0" dur="4s" repeatCount="indefinite" />
                 </rect>
                 <rect x="160" y="50" width="40" height="30" rx="4" fill="var(--c3)" opacity="0">
                    <animate attributeName="opacity" values="0;1;0" dur="4s" repeatCount="indefinite" />
                 </rect>
                 
                 <text x="60" y="40" fill="var(--c2)" font-family="sans-serif" font-size="10" text-anchor="middle" opacity="0">
                   <animate attributeName="opacity" values="0;1;0" dur="4s" repeatCount="indefinite" />
                   Small I
                 </text>
                 <text x="120" y="40" fill="var(--c5)" font-family="sans-serif" font-size="10" text-anchor="middle" opacity="0">
                   <animate attributeName="opacity" values="0;1;0" dur="4s" repeatCount="indefinite" />
                   Method
                 </text>
                 <text x="180" y="40" fill="var(--c3)" font-family="sans-serif" font-size="10" text-anchor="middle" opacity="0">
                   <animate attributeName="opacity" values="0;1;0" dur="4s" repeatCount="indefinite" />
                   Only
                 </text>
              </svg>
            </div>
          </div>

          <!-- DIP -->
          <div style="display:flex; flex-direction:column; gap: 1.5rem; margin-bottom: 1rem; border: 1px solid var(--line); border-radius: 12px; padding: 2rem; background: var(--bg2);">
            <div style="flex: 1;">
              <p><span class="hl" style="color:var(--c1);font-size:24px; font-weight: bold;">D</span> — <span class="hl" style="font-size:1.2rem;">Dependency Inversion</span></p>
              <p style="margin-top: 0.5rem;">Your high-level module should not depend on your low-level module. Instead, there should be an abstraction layer in between.</p>
            </div>
            <div style="width:100%; display:flex; justify-content:center;">
              <svg width="240" height="150" viewBox="0 0 240 150">
                 <!-- High level -->
                 <rect x="70" y="20" width="100" height="30" rx="4" fill="var(--text)" opacity="0.9"/>
                 <text x="120" y="40" fill="#000" font-family="sans-serif" font-size="12" font-weight="bold" text-anchor="middle">High-Level Flow</text>
                 
                 <!-- Low level -->
                 <rect x="70" y="100" width="100" height="30" rx="4" fill="var(--text2)"/>
                 <text x="120" y="120" fill="#000" font-family="sans-serif" font-size="12" font-weight="bold" text-anchor="middle">Low-Level Module</text>
                 
                 <!-- Hard Dependency Line (Bad) -->
                 <circle cx="120" cy="75" r="4" fill="var(--c2)" opacity="1">
                    <animate attributeName="opacity" values="1;0;1" dur="5s" repeatCount="indefinite"/>
                 </circle>
                 <line x1="120" y1="50" x2="120" y2="100" stroke="var(--c2)" stroke-width="4">
                    <animate attributeName="opacity" values="1;0;1" dur="5s" repeatCount="indefinite"/>
                 </line>
                 
                 <!-- Abstraction Interface Layer (Good) -->
                 <rect x="50" y="65" width="140" height="20" rx="10" fill="none" stroke="var(--c3)" stroke-width="3" stroke-dasharray="4 4" opacity="0">
                     <animate attributeName="opacity" values="0;1;0" dur="5s" repeatCount="indefinite"/>
                 </rect>
                 <text x="120" y="80" fill="var(--c3)" font-family="sans-serif" font-size="10" font-weight="bold" text-anchor="middle" opacity="0">
                   <animate attributeName="opacity" values="0;1;0" dur="5s" repeatCount="indefinite"/>
                   Abstraction (Interface) Layer
                 </text>
              </svg>
            </div>
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

    with open('components/LearnView.tsx', 'w', encoding='utf-8') as f:
        f.write(content)
    print("Replaced LLD blocks with huge animations successfully.")
else:
    print("Markers not found!")
