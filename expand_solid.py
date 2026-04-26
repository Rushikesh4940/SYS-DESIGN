import re

with open('components/LearnView.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# SRP
srp_target = """<p style="margin-top: 0.5rem;">It is a guideline, but it is subjective. A class should have one, and only one reason to change. Separate UI rendering from Database fetching.</p>"""
srp_expand = """<p style="margin-top: 0.5rem;">It is a guideline, but it is highly situational. The core rule is: <b>A class should have one, and only one reason to change</b>. <br><br><i>Beginner Analogy</i>: Instead of building a messy "Swiss Army Knife" module that handles formatting, email dispatching, and database writing all at once, you should build highly specialized tools. If the email API changes, ONLY the EmailModule should need updating, your core Database logic should remain untouched.</p>"""
content = content.replace(srp_target, srp_expand)

# OCP
ocp_target = """<p style="margin-top: 0.5rem;">Modules should be <b>Open For Extension</b>, but strictly <b>Closed For Modification</b>.</p>"""
ocp_expand = """<p style="margin-top: 0.5rem;">Modules should be <b>Open For Extension</b>, but strictly <b>Closed For Modification</b>. You should be able to alter system behavior without tearing into the guts of existing, working code.<br><br><i>Beginner Analogy</i>: Imagine your code is a power strip. You don't carefully unscrew and rewire the internal chassis of the power strip just to plug in a new TV. You just plug the TV into an existing, defined socket (an Interface). We utilize polymorphism to let the system dynamically adopt new plugins!</p>"""
content = content.replace(ocp_target, ocp_expand)

# LSP
lsp_target = """<p style="margin-top: 0.5rem;">Wherever you use a base class, you must be able to securely substitute it with any derived class without breaking the host application.</p>"""
lsp_expand = """<p style="margin-top: 0.5rem;">Wherever you use a base class, you must be able to securely substitute it with any derived child class without breaking the host application. A child must honor the exact contract guarantees of its parent.<br><br><i>Beginner Analogy</i>: If you write a generic `Bird` base class representing all birds, and it features a `fly()` method, you shouldn't create a `Penguin` subclass that randomly throws an error or crashes the app when `fly()` is called. That violates LSP and destroys the predictability of your pipeline!</p>"""
content = content.replace(lsp_target, lsp_expand)

# ISP
isp_target = """<p style="margin-top: 0.5rem;">Smaller and specific interfaces. Never force a client to depend on an interface featuring massive methods it doesn't need to use.</p>"""
isp_expand = """<p style="margin-top: 0.5rem;">Smaller, laser-focused interfaces are vastly superior to massive global ones. Never force a client object to depend on or implement massive methods it doesn't even need to use.<br><br><i>Beginner Analogy</i>: Don't force a computer mouse component to implement an `outputVideo()` behavior just because both a mouse and a monitor plug into the same PC interface. Break a massive bloated `IMachine` interface down into hyper-specific `ICanClick` and `ICanDisplay` contracts.</p>"""
content = content.replace(isp_target, isp_expand)

# DIP
dip_target = """<p style="margin-top: 0.5rem;">Your high-level module should not depend on your low-level module. Instead, there should be an abstraction layer in between.</p>"""
dip_expand = """<p style="margin-top: 0.5rem;">Your high-level module (business rules) should <b>never</b> depend tightly on your low-level module (database drivers/APIs). Both should depend on a neutral abstraction layer in between them.<br><br><i>Beginner Analogy</i>: Never permanently hard-wire a lamp directly into the interior conduits of a wall. That makes it impossible to swap out later! Instead, the wall should feature a standard Outlet Socket, and the lamp should feature a standard Plug. Neither care about each other's complex insides; they only care about connecting to the standard physical Interface.</p>"""
content = content.replace(dip_target, dip_expand)

with open('components/LearnView.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("SOLID Definitions Expanded.")
