---
title: "AI-Ready Design System Playbook"
description: "The complete playbook from the AI-Ready Design System Workshop, grouped into five parts: the idea, the work, where it lives, putting it in, and keeping it."
author: "John Rodrigues"
organization: "Human AI Studio"
source: "AI-Ready Design System Workshop"
date: 2026-08-29
---

# AI-Ready Design System Playbook

**Human AI Studio · AI-Ready Design System Workshop · 29 August 2026**

Everything from the four hours: the definitions, the eval, the two guardrails, the workflows, and the honest limits. Grouped by what you're trying to do, not by the order we covered it.

Written by John Rodrigues.

---

## 00 · How to use this

You don't have to read this front to back. It's a reference. Find the thing that's broken and go to that part.

### Three ways in

- **I need to prove there's a problem before anyone will fund the fix.** Go to Part 04. Run the eval, get a number, show the number.
- **My team's builds keep drifting off the system.** Parts 05, 06 and 07: tokens, contracts, harness. That's the heart of it.
- **I'm starting from nothing.** Part 11, then come back to 06 before you add your second component.

### How it's grouped

| Group | What's in it |
| --- | --- |
| The idea | Why the second audience changes things, what AI-ready actually means, and how the parts connect. |
| The work | The four things you build: a baseline score, semantic tokens, a contract per component, a harness at the root. |
| Where it lives | Which surface is the authority, and how to move between Figma and code. |
| Putting it in | Applying it to a system that exists, a system that doesn't, and knowing when a single markdown file is enough. |
| Keeping it | The nine-step framework, what to study, and what I still owe you. |

Questions you asked on the day sit inside the section they belong to, marked **Asked in the room**.

> **On the material**
>
> Everything here is Human AI Studio internal IP. Use it inside your company, teach it to your team, run it on your own systems. Don't resell it, repackage it, or teach it as your own.

### What you also got

- The [skills library on GitHub](https://github.com/RodriguesJohn/ai-ready-design-system-workshop-skills-library), including the [benchmark skill](https://github.com/RodriguesJohn/ai-ready-design-system-workshop-skills-library/tree/main/agent-ready-benchmarks) you can drop straight into Cursor or Claude Code.
- The session recording, yours for life.
- The Slack channel, where the follow-up lessons and new workflows land.
- A Maven certificate.

---

## 01 · Why this matters

Design systems were built for one audience. Now there are two, and the second one can't read yours.

A system has three parts: purpose, interconnectedness, elements. It's never just the components. It's the content guidelines, the accessibility rules, the tokens, the patterns, all of it connected into something a team builds on top of.

For ten years the audience for that was humans. Designers, developers, PMs. Humans are excellent at ambiguity. When there's a gap in the system, a human notices it, asks someone, works around it, moves on. The gap costs a little time and nobody writes it down.

Now there's a second audience: agents. Claude Code, Cursor, Codex. To an agent, your design system isn't documentation. It's a **context layer**. It's what the agent reads before it builds. And agents are terrible at ambiguity. A gap doesn't get worked around, it gets filled with an invention.

### Probabilistic in, deterministic out

Agents are probabilistic by nature. They predict. They hallucinate. They make up a component and then present it with total confidence. That's the material you're working with, and you're not going to change it.

What you can change is the constraint around it. When someone says "build a checkout," you want the output to resolve to your system every time: same components, same tokens, same accessibility. That's turning a probabilistic system into a deterministic one, and it's the actual job. It's also one of the harder open problems in the whole AI space, which is why it's worth being good at.

> **Be honest about the ceiling**
>
> You will not get to 100%. Realistically you get drift down by something like 90% and then you're hand-fixing the rest. Don't promise a client or your leadership perfect accuracy. Promise 70 to 80% and mean it.

### The career argument

Everybody in your company is building right now. Marketing is building. PMs are building. The CTO is vibe-coding new features on a Friday. And almost none of it connects to the system, so it isn't accessible, isn't on brand, and isn't shippable.

The companies that survive the next five or ten years are the ones whose people supply infrastructure to the agents: the context layer, the data source, the guardrails. For designers, the design system *is* that layer. It's the piece where our judgment about people, hierarchy, and heuristics gets baked into something an agent consumes.

That's a much harder function to remove from an organization than pixel-pushing. If they take you out, the agent ships slop.

---

## 02 · What AI-ready actually means

A design system that agents can understand and retrieve. That's the whole definition.

Most systems fail on both halves. The context is scattered. Some lives in Figma, some in Storybook, some in the repo, some in a staff designer's head. The rules are implied rather than written. Nothing is named in a way that tells an agent where it goes. So retrieval is low, the agent guesses, and you get products with no connection to the brand and teams prompting their way *around* the system instead of through it.

An AI-ready system closes that gap with three things: guardrails, architecture, and structure the agent can follow.

### The difference at a glance

Same team, same components, two very different outcomes.

| | | Not AI-ready | AI-ready |
| --- | --- | --- | --- |
| 01 | Where it lives | Scattered across files, tools, and people's heads | One repo, documented, in one place |
| 02 | Retrieval | Low. The agent guesses from what it can see | High. The agent pulls the exact record it needs |
| 03 | Prompting | More. You describe the system every single time | Less. The system carries the context |
| 04 | Contracts | None. The rules are implied | Defined. What it's for, its states, when not to use it |
| 05 | Accessibility | Not documented on the component | In the contract. It ships accessible |
| 06 | Consistency | Every screen drifts a little | Every build resolves to the same system |
| 07 | When something's missing | The agent invents generic UI | The agent asks instead of inventing |
| 08 | What you get out | Generic, off-brand UI | On-brand UI composed from components you own |

### The words, plainly

| Term | What it means |
| --- | --- |
| Catalog | The list of what actually ships: component names, semantic tokens, contracts. It's the answer key you score against. |
| Component contract | A JSON record next to a component saying what it's for, when to use it, when not to, and what it relates to. A lease for the component. |
| Semantic token | A token named for its role, not its look. `color.action.primary`, not `blue-600`. |
| Retrieval | The agent pulling the real record instead of guessing. High retrieval is the goal. |
| Drift | The build wandering off the system. A hex where a token should be, a second Button, a one-off card. |
| Eval | Evaluating the agent's output against your catalog. Same idea as user testing, pointed at an agent. |
| Harness | The AGENTS.md file at the repo root. Global rules for how the agent behaves here. |
| MCP | A bridge from one tool to another. Figma to your coding agent, for example. |

---

## 03 · How the pieces fit together

Before the detail, the shape of the whole thing. Five stages, and everything in this playbook sits in one of them.

| Stage | What's there | What it does | Covered in |
| --- | --- | --- | --- |
| 01 · Where it lives | Your repo, your Figma library, Storybook | Holds the components that ship, the semantic tokens, and a contract per component | 05, 06, 08 |
| 02 · Retrieval | MCP or Code Connect | An index the agent can query, with docs that live in the repo | 09 |
| 03 · The agent | Claude Code, Cursor | Reads the harness and the contracts first. Asks instead of inventing | 07 |
| 04 · Output | The build | UI composed from your components. Tokens, not raw values | 10, 11 |
| 05 · Score | The benchmark skill | Retrieved, invented, wrong, hardcoded, to one number | 04 |

Your prompt goes in at the top as **intent**: what the screen does, never component names. What the agent couldn't retrieve becomes the next thing you fix. That's the loop, and it doesn't change whether your system is ten years old or three days old.

> **The order to do it in**
>
> Measure, then structure, then connect, then prove. You measure first because otherwise you walk into the repo with no idea which of a hundred imperfections is actually costing you anything. Part 13 lays this out as nine concrete steps. Read it now if you want the map, or at the end if you want the detail first.

---

## 04 · Measure first, the eval

Before you fix anything, get a number you can beat.

This is the same instinct as user testing. Define what you're testing, run a controlled test, read the result, fix the thing the result points at. The difference is you're evaluating the output of an agent instead of the behaviour of a person. In AI that's called an eval.

### The four benchmarks

These are the four we landed on. Your company can add more. If your designers are struggling with something specific, make that a fifth criterion and tell the agent to build the skill for it. But these four are enough to start, and adding metrics for the sake of it just muddies the score.

| Benchmark | Question | Direction |
| --- | --- | --- |
| **Retrieved** | Did it use a real component from the catalog, or did it guess? | Higher is better · 0 to 5 |
| **Invented** | Did it build UI that doesn't exist in your system? | Lower is better · count |
| **Wrong component** | Did it pick a real component for the wrong job? Button as a link, Card as a list. | Lower is better · count |
| **Hardcoded** | Raw colour, spacing, or type instead of tokens. The worst one. It looks finished and it's completely off-system. | Lower is better · count |

### The one number

```
S = 100 × r / (5 + I + W + H)
```

Perfect run: r = 5, no misses, so S = 100. No retrieval, S = 0. Every miss grows the denominator.

| Band | Score |
| --- | --- |
| Strong | 70 to 100 |
| Partial | 40 to 69 |
| Weak | 0 to 39 |

A right score is **S ≥ 70 and r ≥ 4**. The system is being followed. A low score is **S < 40 or r ≤ 1**. The agent is guessing. For reference, Florence hit roughly 73% retrievability on first-shot prompting once the contracts were in.

### How to run it, step by step

1. **Branch first.** Never run this on main. Take a branch off the design system repo, or work in a scratch project.
2. **Write down the catalog.** The component names that actually ship, the semantic tokens, the contracts if they exist. Anything with no name on that list counts as invented.
3. **Freeze five intent prompts.** Describe what the screen does, never the component names. Example: *"Build a settings section with a heading, a short description, a way to get to the billing page, and a save action."* Write four more like it.
4. **Run them fresh.** Same model, same wording, fresh session, no extra pasting, no coaching. If you change the prompts or the model, it's a new benchmark, not a comparison.
5. **Drop in the benchmark skill** and ask the agent to score its own output against your catalog. It writes the report.
6. **Read the report.** Count instances, not vibes. One fake Stack plus three hexes is `I = 1, H = 3`.
7. **Fix in the system, not the screen.** The report tells you what broke. Take that back to the repo and fix it there.
8. **Re-run the same five prompts** after the change. Retrieved should go up. Invented, wrong, and hardcoded should go down.

> **Asked in the room**
> **Is the eval run on a repository, or on one generated design?**
>
> On one generated design. You're not measuring how well a team has adopted the system. You're acting like that team. You generate a screen the way they would, score what comes out, and use the failures to find what to fix back in the system.
>
> If you run audits directly on the repo instead, you get a list of things that are technically imperfect with no signal about which of them actually cost you anything. The generated screen is what tells you where the pain is.

### Report format

```
Date:
Model:
Prompts: 5 (unchanged from last run)

Per prompt    retrieved(0/1)   invented   wrong   hardcoded
1
2
3
4
5

Totals    r = /5    I =    W =    H =
M = I + W + H =
S = 100 x r / (5 + M) =
Band:  strong 70-100  ·  partial 40-69  ·  weak 0-39
```

> **Getting the skill in**
>
> Claude Code: save it as `.claude/skills/agent-ready-benchmarks/SKILL.md` in your repo. Cursor: add it as a project rule, or paste it at the top of the session. Then ask: *score this output against our catalog using the agent-ready benchmarks.*

---

## 05 · Token naming

The foundation everything else sits on. Name by role, not by look. A primitive tells you the colour, a semantic tells the agent where it goes.

Do this before contracts. A contract that references `blue-600` has told the agent nothing it can reason about, so you'd only be writing it twice.

### Three layers

1. **Primitive.** The raw value. `blue-600`, `12px`
2. **Semantic.** The role. `color.action.primary`
3. **Component.** The use. `button.bg.primary`

| Rewrite this | To this | Agent should paint |
| --- | --- | --- |
| `blue-500` | `color.action.primary` | primary Button fill |
| `blue-700` | `color.interactive.primary-hover` | hover state |
| `gray-100` | `color.surface.subtle` | Card, quiet surfaces |
| `gray-900` | `color.text.primary` | body text |
| `white` | `color.text.on-interactive` | label on the primary Button |
| `red-100` | `color.bg.danger-subtle` | destructive Alert wash |
| `spacing-13` | `space.inset.md` | internal padding |
| `font-16-bold` | `type.label.strong` | control labels |

**Wrong. Looks documented, still invents:**

```css
.button { background: #2563eb; }          /* hex */
.button { background: var(--blue-600); }  /* primitive */
```

**Right. Survives a rebrand:**

```css
.button {
  background: var(--color-interactive-primary);
  color:      var(--color-text-on-interactive);
}
.button:hover {
  background: var(--color-interactive-primary-hover);
}

/* Tailwind: bg-interactive-primary / hover:bg-interactive-primary-hover */
```

> **The test**
>
> If an agent can't pick the right token from the name alone, the name is wrong. If the name says *which blue*, only you can use it. If it says *where it goes*, the agent can.

---

## 06 · Component contracts

The first of the two guardrails, and the one nobody else is shipping. One record per component, in both surfaces, saying what it's for and when not to use it.

Every time you buy a house, take a job, sign a lease, there's a contract. Rules you agree to abide by. Agents don't abide by anything unless you write it down, so each component gets one.

You're the lawyer. Your client is the Button.

### Anatomy of a component record

```
name:          Button
purpose:       Triggers an action on this page
when to use:   Primary or secondary action in a form or card
when NOT:      Navigation. Use Link.
states:        default, hover, focus, disabled, loading
variants:      primary, secondary, ghost · sm, md, lg
tokens:        color.action.primary, space.inset.md, type.label.strong
accessibility: role=button, focus ring, 44px target, aria-busy on loading
links:         figma://node-id · src/ui/Button.tsx · storybook/button
```

The hardest field is **intent**, because intent is hard to predict. But if you work on a design system you already have usage guidelines: when to use, when not to use. That's most of the contract. You're just moving it somewhere an agent can read it.

And you don't hand-write these. Give the agent your existing usage guidelines and the contract skill, and tell it to write the contract. Then you go in and correct the intent, because that's the part only you know.

### In code: three files, one folder

```
button/
  Button.jsx     the component
  button.css     the styles, tokens only, no raw hex
  button.json    the contract
```

**button.json**

```json
{
  "name": "Button",
  "kind": "primitive",
  "intent": "Take an action on this page.",
  "whenToUse": ["Submit a form", "Confirm a destructive action"],
  "whenNotToUse": ["Navigating to a URL, use Link"],
  "related": ["Link", "Switch"]
}
```

JSON, not a README. We tested YAML too and found JSON more reliable. It's structured data with categories, which is exactly what a model wants. Think of it like a spreadsheet: categories across the top, data underneath.

Keep props, slots, tokens, states and a11y in there too if you already have them. Don't invent a second schema.

**Code checklist**

- [ ] `intent` is one sentence
- [ ] `whenToUse` is filled in
- [ ] `whenNotToUse` names the other component
- [ ] `related` lists both ways: Button to Link, Link to Button
- [ ] The three files sit together in one folder
- [ ] Button, Link, Input and the few others people actually generate each have one

### In Figma: the same card, not a rewrite

Figma shipped Component configuration, and that's where the contract goes. Open the main component, find Component configuration, and paste the JSON into the description. Then link it to that JSON file in your repo.

The rule that matters: **paste the same file.** Same keys, same values. Do not rewrite it as "What it's for / When to use" prose, and do not invent a second schema for Figma.

**Figma checklist**

- [ ] Description is the JSON. Paste the file or wrap it in a code block
- [ ] Link points at that JSON in the repo
- [ ] The Figma component uses the same `name` as the JSON
- [ ] Variants match the code variants
- [ ] Variables bound, no loose styles
- [ ] Figma JSON and repo JSON match: same name, intent, whenNotToUse, related

> **If they don't match**
>
> That's two contracts. Fix one. Don't keep both stories.

> **Asked in the room**
> **shadcn is already AI-ready. How do I do this for components we designed ourselves, from the ground up?**
>
> This section is the answer. shadcn retrieves well because it's exhaustively documented and heavily represented in training data. You don't get that for free and you can't wait for it.
>
> Your components get there a different way: semantic names (Part 05), a contract per component in both surfaces (this part), and a harness at the root (Part 07). Then you prove it with the eval instead of assuming.

### Scope and cost

**One contract per component.** A Button with primary, secondary and tertiary variants gets *one* contract covering all of them. Splitting early creates more confusion than it solves. Only split when that specific component keeps drifting. Then chunk it, but keep the pieces in the same folder so they're still referenced together.

**Contracts above the component level.** They also work for pages, templates, and dashboards. Same JSON shape, same idea. Write the rules for how components get composed at that level. Keep the file inside the folder for that page, or the agent won't find it.

> **Asked in the room**
> **Should each variant get its own contract, or is that overloading one component?**
>
> One per component. Context windows are not your constraint. Models handle a million tokens and a contract is nothing next to that. Overload it happily. Split only when the drift tells you to.

> **Asked in the room**
> **Does the agent read every contract when it builds a screen? Doesn't that exhaust tokens?**
>
> It reads the harness first, then the contracts for the components it's actually pulling. And no. Reading is cheap. Generation is what burns tokens.
>
> Better-defined input means less regenerating, so contracts save you money rather than costing it. The expensive path is the one where you prompt, get slop, and fix it for an hour.

---

## 07 · The harness: AGENTS.md

The second guardrail. Contracts say what a component is. The harness says how to behave around all of them.

`AGENTS.md` is a markdown file at the root of your repo that the coding agent always reads before it builds. It's not the design system and it's not an agent. It's the map, so the agent doesn't wander.

Think of it as the conductor. Before anyone in the choir plays a note, they check the conductor. The name matters. Call it something else and the agent won't know to reference it.

### What it looks like

```markdown
# AGENTS.md

## Design system rules
- Read the component contract before generating UI.
- Use semantic token names. Never raw hex or magic numbers.
- Do not invent a component that already exists.
- If what you need is missing, ask. Do not build a one-off.
- Values live in CSS or Tailwind. Decisions live in the JSON.

## Where things live
- components: src/ui/<component>/
- contracts:  src/ui/<component>/<component>.json
- tokens:     src/styles/tokens.css

## Before you finish
- Every element maps to a catalog component or a token.
- Run the agent-ready benchmark.
```

### What it stops

- The agent reaching for a hex because nothing told it not to.
- A second Button appearing because it never checked the catalog.
- One-off spacing that no token will ever explain.
- Rules that lived in someone's head and never reached the build.

### How to actually write it

Don't hand-write it. Tell the agent. When you spot a drift (it generated off-grid layout, it used a blank avatar instead of the picture variant, it ignored your content), say *"I saw this issue, add it as a guardrail in AGENTS.md."* The agent writes the rule, you review it, you keep going.

It's iterative by design. You will never write the perfect harness up front, because you don't know what your agent gets wrong until you watch it get things wrong. Every drift you see becomes a line in this file. That's the whole method.

> **Asked in the room**
> **When I applied a design system to something I was working on, it changed a bunch of my content. How do I stop that?**
>
> That's a harness rule, something like "preserve existing copy, replace structure only." It's universal rather than tied to one component, so it belongs here rather than in a contract.
>
> And it's the method in miniature: you catch a behaviour you don't want once, you write it down, it stops happening.

> **Watch it**
>
> Agents will sometimes overwrite or delete this file while editing it. It's happened to me live. If it disappears, tell the agent to bring it back. But keep it in version control and don't work outside a branch.

### Which guardrail does a rule belong in?

Now that both exist, the question that always comes next.

| If the rule is… | It goes in | Example |
| --- | --- | --- |
| Universal to the system | `AGENTS.md` | "It's ignoring the 8pt grid." That's a layout problem, not a component problem |
| Specific to one component | the contract | "It defaults Button to secondary and I want primary" |

And if you put it in the wrong place, it's fine. The agent checks both before it builds. It's trial and error. You'll move things around as you learn what your system actually gets wrong.

---

## 08 · Where the source of truth lives

The honest answer designers don't want to hear: the repo.

Not because code is cooler. Because agents understand code better than they understand an abstraction. React in particular. There is an enormous amount of it in the training data, and models pull from it accurately. Frames, layer names and nested groups are a translation layer the agent has to guess its way through.

So: **the repo is the source of truth. Figma is a surface. Storybook is a surface.** Both surfaces exist for humans. Agents don't need either of them. They need the repo.

> **Asked in the room**
> **We have Figma, a repo, and the application layer. What's the source of truth, and how do I keep a colour change consistent across all three?**
>
> The repo. Change lands there and flows outward to the surfaces.
>
> If your company has already made Figma the authority, that's workable, but you have to earn it. Contracts in Component configuration, variables bound, components named the same as the code, and the whole thing genuinely well documented so engineers can work from it. Otherwise you've made the least agent-legible surface the authority.

Be clear-eyed about why this is the situation: Figma wasn't architected for the agent world. Tools like Paper are AI-native by construction. They render HTML, so what you design is what the agent builds, with no translation gap. Figma may get there. Until it does, the repo wins.

> **Asked in the room**
> **In a world of agents, do you still need Storybook?**
>
> Agents don't. Storybook is a visualisation layer for humans, and humans still need one.
>
> But it's genuinely optional now. I vibe-coded Florence's entire documentation site in minutes, with more control over the layout than Storybook gives me. That's the real anxiety in the tooling market: once you understand what AI-native means, you can delete half your toolbox.

### Keeping the surfaces in sync

This is a real problem and I'm not going to pretend it's solved. The tools don't want to talk to each other, because each one wants to be where you live.

```
Designer          →  Coding agent      →  DS repo branch  →  Engineer review  →  Main + Storybook
works in Figma       Cursor / Claude      the change          human in            reflects
                     Code, the bridge     lands here          the loop            the repo
```

You clone the design system branch into your coding agent, connect the agent to Figma via MCP, and work back and forth. An engineer reviews before anything reaches main. Storybook renders from the repo, so it follows for free.

> **Asked in the room**
> **If designers add new components in Figma, can I use Claude to push those into the repo and verify they landed in Storybook?**
>
> Yes, that's exactly the loop above. Today most teams run it manually: you change something in Figma, you check the repo, you talk to the engineer.
>
> You can automate the checking half with a scheduled agent. The blocker is trust, not capability: on a branch, let it write. On main, don't.

### Automating the check: the cron job

A cron job is just a schedule. Every morning at 9, an agent checks Figma, checks the repo, checks Storybook, and posts to Slack what's out of sync. Every tool in that loop has an MCP; you're connecting them and giving the agent a time to run.

A design manager I met has this fully automated, including tickets triggering the agent directly. It's real, practical, and buildable by prompting. This is agent development, not design system work, but it's not hard.

Two honest caveats. Agents drift and need babysitting, so expect trial and error before it's stable. And an agent isn't the only answer. You can keep these in sync by hand, or with tickets and a review ritual. The agent just offloads the legwork.

---

## 09 · Figma and code, both directions

The point of these workflows is that you stop doing mechanical work by hand.

### The Figma Desktop MCP

Built by TJ at Southleft. It connects your coding agent (Cursor, Claude Code, terminal, whatever you use) directly to your Figma file so the agent can take actions in it. It works on one file at a time.

It isn't in the Figma plugin store, because Figma would rather you stayed inside Figma. You install it manually.

1. Download the zip from the [Southleft Figma Desktop MCP repo](https://github.com/southleft/figma-desktop-mcp).
2. In Figma: right click → Plugins → Development → **Import plugin from manifest**.
3. Point it at the manifest file inside the folder you downloaded.
4. Run the plugin in your target file. It has to stay open.
5. Paste [the same repo link](https://github.com/southleft/figma-desktop-mcp) into your coding agent and tell it to set the connection up.

> **Asked in the room**
> **Can the Desktop MCP connect to Cursor? And does that mean I don't need a Git repo?**
>
> Yes to Cursor. Once it's set up you go back and forth between Figma and code through it.
>
> But you still want the repo. The MCP is a bridge, not a source of truth. It gives the agent access to one Figma file at a time; the repo is what holds the components, the tokens, and the contracts that make retrieval work in the first place.

### What to hand it

- Build the variable collections from a palette.
- Promote loose styles to variables.
- Rename layers and components semantically.
- Bind variables across every component.
- Audit the file and list everything still using a raw hex.
- Audit 200 screens for unbound tokens, the job nobody wants.

### Prompts that work

```
Create a Primitives collection: blue 50-900, gray 50-900,
and a 4px space scale up to 64.

Create a Semantic collection that references Primitives:
color.action.primary, color.surface.subtle, space.inset.sm|md|lg.

Rename every component to what it does, not what it looks like.
List the renames before you apply them.

Bind Button fills and padding to the semantic variables.

List every layer still using a raw hex.
```

> **Two habits**
>
> Ask it to **list before it applies**. You review, then it commits. And work on a duplicate of the file. Agents are probabilistic and they will occasionally make a mess.

### Figma to code

Simpler than it used to be. Select the screen in Figma, switch to Dev Mode, hit **Copy prompt**, paste it into Cursor. You don't need to write anything. "Implement this design from Figma" is already embedded in it.

**Go screen by screen.** Don't select the whole page and ask for the product. This is chunking: you break a large context into pieces the agent can hold. Same reason a workshop is split into modules.

> **The limitation to know about**
>
> The agent can only use components that live *in that Figma file*. If your library is elsewhere, pull the components you need into the file first. Otherwise it has nothing to retrieve and it will invent.

**Fixing drift by pointing.** When the build drifts, and it will, you don't re-prompt from scratch. In Cursor, select the element, @-mention the real component from your design system, and say *replace this with this.* You're pointing, not describing. That's the fastest correction loop there is.

### Code to Figma

The same bridge in reverse. Tell the agent to build screens, set up variables, create components, organise pages. We've built entire token and variable sets for client systems this way, in minutes rather than days. It works for Figma Slides too.

**Figma's own agent.** It's got decent, and it now supports skills. You can upload the ones from the library and run them in Figma. Worth knowing about. Two caveats: you're locked into Figma's tokens and ecosystem, and there's no agent in FigJam or Slides, so the Desktop MCP still covers more ground.

> **Safety: read this before you install anything**
>
> Prompt injection is real. People put instructions inside skills and repos. Before you pull someone's skill or plugin, check the stars and check who maintains it. If it has no history and no stars, don't run it against your repo.

---

## 10 · Applying it to a system that exists

Most of you aren't building from scratch. Here's the first afternoon.

If your design system has a public repo, a docs site, or an installation page, you don't install it by hand any more. Open a new project in Cursor or VS Code, drop the installation URL into the agent, and tell it to install the design system. It'll go read the page, pull the components, wire up the tokens, and set the folder structure.

Then build with it. Prompt for a dashboard, a settings screen, whatever your team actually builds. The components come out of the catalog instead of out of thin air, and the composition is yours to direct.

```
Install                →  Build                 →  Score               →  Fix
Drop the docs URL,        Prompt a real screen     Run the benchmark      Take the findings
let the agent pull        the way your team        skill on what          back to the repo
the catalog               would                    came out
```

What it couldn't retrieve becomes the next fix.

**Why we used shadcn/ui in the session.** Because it's unusually well documented. Clear component docs, Figma files, a public repo, and a huge amount of it in the models' training data. It retrieves well almost by accident, which made it a clean demo, and a slightly unfair one. Most systems are not that lucky, and that gap is what Parts 05 through 07 exist for.

**Then work the framework.** Once you have a score and a list of what broke, you're in Part 13. Rename, tokenise, contract, mirror, harness, expose, re-score. In that order, because each step makes the next one cheaper.

---

## 11 · Building from scratch

Nothing to retrofit. The only advantage you have is that nothing is wrong yet. Spend it on structure, not on volume.

### Order of operations

1. **Tokens before components.** Semantic names from day one.
2. **Eight components, not forty.** The ones people actually generate.
3. **A contract per component,** written as you build it, not after.
4. **AGENTS.md at the root** before the second component.
5. **Evals** once three components exist.

```
Tokens      →  Components  →  Contracts  →  Harness     →  Eval
semantic       eight          one each      AGENTS.md      score S
```

Each one makes the next cheaper.

### Path A: Figma first

Let the agent do the mechanical work in the file while you make the decisions. Figma desktop open with the Desktop MCP running, your coding agent connected to that file, one page and one component set to start. The setup and the prompts are all in Part 09.

Afterwards, Code Connect maps the published components back to the repo.

### Path B: code first

An empty repo, no legacy names to protect, and the eight components decided before you prompt anything.

```
Create src/styles/tokens.css with two layers: primitives and
semantics. Semantics reference primitives. No component names yet.

Create src/ui/button/ with Button.jsx, button.css, button.json.
Semantic tokens only. No raw values anywhere.

Write button.json: name, kind, intent, whenToUse, whenNotToUse,
related. One sentence for intent.

Write AGENTS.md at the root: read the contract before generating,
semantic names only, never invent a component that already exists.
```

Then Figma mirrors the same names, so both surfaces agree. Same shape every time. The second component should be boring to add.

Most teams end up running both paths in the same session, and that's fine.

> **Atomic thinking still applies**
>
> Foundations → primitives → components hasn't gone anywhere. It's how you chunk the work so the agent can hold it. Colour primitives and semantics, then type, then the first component. Little by little. That's how Florence got built.

**A shortcut worth knowing.** Point the agent at an existing well-built system and have it write a `reference.md` of the naming and structural conventions. Now it has a best-practices context to build against instead of inventing conventions as it goes.

---

## 12 · design.md, where it works and where it breaks

A single markdown file that holds your whole visual language. Great for websites. Wrong for products.

The pitch is appealing: one file, all your design decisions, drop it in and the agent builds on brand. And for a landing page or a marketing site it genuinely works. I pointed an agent at the Human AI Studio site, had it write a `design.md`, and generated a new page in the exact same visual language a minute later. For that job it's excellent.

For a real product system it falls over. A design.md is unstructured context. It's handing your intern a Wikipedia article and asking them to answer every question from it. There's no retrieval, no categorisation, no per-component rules. The agent gets a wall of text and starts drifting, which is the exact thing you were trying to prevent.

Clients ask for this constantly. "Can you just make us a .md file?" For a mobile app or a SaaS product, no. That's what Parts 06 and 07 are for.

| | design.md | Contracts + harness |
| --- | --- | --- |
| Good for | Landing pages, marketing sites, one-off campaigns | Products, apps, anything with real component reuse |
| Structure | One prose file | Per-component JSON records + global rules |
| Retrieval | None. It's all context, all the time | The agent pulls the record it needs |
| Fails when | The system gets complex enough to contradict itself | You skip the eval and never learn what's drifting |

One thing that *is* true of both: markdown travels. A .md file moves between Claude Code, Cursor, and anything else you use. That portability is why the format keeps winning.

---

## 13 · The framework

Four moves, nine steps. Everything in this playbook, in the order to do it.

### Measure: where you are · Part 04

| # | Step | What | Done when |
| --- | --- | --- | --- |
| 01 | Audit and baseline | Run the five prompts once. Write down S. | You have a number you can beat |

### Structure: make it legible · Parts 05 to 06

| # | Step | What | Done when |
| --- | --- | --- | --- |
| 02 | Rename | Semantic names on both surfaces. | The name says what it is |
| 03 | Tokenise | Raw values out of the UI layer. | No literals left in components |
| 04 | Write the contract | One JSON per component. | Button, Link and Input all have one |

### Connect: make it reachable · Parts 06 to 09

| # | Step | What | Done when |
| --- | --- | --- | --- |
| 05 | Mirror it in Figma | The same JSON in Component configuration. | Both sides, one card |
| 06 | Add the harness | AGENTS.md at the root of the repo. | The agent reads it unprompted |
| 07 | Expose it | MCP, Code Connect, an index it can query. | It retrieves instead of reading |

### Prove: keep it true · Part 04

| # | Step | What | Done when |
| --- | --- | --- | --- |
| 08 | Re-run the eval | Same prompts, same model, fresh session. | Retrieved up, invented down |
| 09 | Enforce | Lint, fail the build, re-run on release. | The build catches drift, not a person |

Then it loops. The score tells you what to fix next.

### Track it

- [ ] 01 · Audit and baseline
- [ ] 02 · Rename
- [ ] 03 · Tokenise
- [ ] 04 · Write the contract
- [ ] 05 · Mirror it in Figma
- [ ] 06 · Add the harness
- [ ] 07 · Expose it
- [ ] 08 · Re-run the eval
- [ ] 09 · Enforce

---

## 14 · Systems worth studying

Three I'd point you at, with an honest note about each.

**[shadcn/ui](https://ui.shadcn.com).** Open source, exhaustively documented, Figma files included, and enormously represented in training data. Clone it, modify it, do whatever you want with it. It retrieves well, but it has no component contracts.

**[Meta Asterisk](https://asterisk.meta.com).** Built explicitly as an agent-ready system, and it went viral for good reason. Started code-only with a CLI; Figma files have since landed. Also no component contracts.

**Florence · Human AI Studio.** Ours. Built from scratch on everything in this playbook: semantic tokens, contracts on every component, harness at the root, benchmarked. Roughly 73% retrievability on first-shot prompting. Demo is live; source isn't public yet while we figure out the business side.

> **Asked in the room**
> **Which public design system best models what you're teaching?**
>
> Two answers, and they're different. Which ones are agent-ready: shadcn and Asterisk. Which one follows everything in this playbook: neither.
>
> I checked Asterisk live during the session and it doesn't ship component contracts. None of the public systems do. They leave it to the developer. That's the gap our R&D sits in, and it's why this is worth learning now rather than in two years.

**A note on framework.** If your system is in React, retrieval is easier than you expect. There's a lot of React in the training data. The moment you move to SwiftUI or something less represented, hallucination goes up, and the contracts and harness stop being nice-to-have and start being the thing holding it together.

---

## 15 · Links

- **[Skills library](https://github.com/RodriguesJohn/ai-ready-design-system-workshop-skills-library)** — The benchmark skill, the component architecture audit, and everything else from the session.
- **[Agent-ready benchmarks](https://github.com/RodriguesJohn/ai-ready-design-system-workshop-skills-library/tree/main/agent-ready-benchmarks)** — Drop it in as `.claude/skills/agent-ready-benchmarks/SKILL.md`, or paste it into Cursor as a project rule. Part 04.
- **[Figma Desktop MCP](https://github.com/southleft/figma-desktop-mcp)** — Southleft. Download the zip, import the manifest through Plugins → Development. Setup steps in Part 09; guide coming to Slack.
- **[21st.dev](https://21st.dev)** — Component references with prompts attached. Useful for pulling patterns you don't want to build from zero.
- **[Workshop FigJam](https://www.figma.com/board/1xln4qdWM0IJxKxkMG0TWY/AI-Ready-Design-System-Workshop)** — The working board from the session. Everything on it is in this playbook.

> **Before you install any of it**
>
> Check the stars and the maintainer. Prompt injection through skills and repos is a real attack, and you're about to point these at your company's code.

---

## 16 · What's next

Things I owe you, and things you can take.

### Lessons I'm recording for the Slack channel

- **Building the sync agent.** The cron job from Part 08. It diffs Figma, the repo and Storybook every morning and posts what's out of sync.
- **Storybook.** How the repo pushes to it, and where it fits now.
- **Building a production component** properly, in Figma and in code.

### Yours already

- The Slack channel, and a week of hands-on support in it.
- A one-to-one with me. It says 15 minutes on the Calendly. Take 45.
- The Maven certificate. Put it on LinkedIn.
- Setup help with the Desktop MCP, one-to-one, whenever you want it.

### What I'd actually do this week

Pick a system you have access to. Run the five prompts. Write down S. That's it: one afternoon, one number. Everything in this playbook is downstream of having that number, and you can't argue for the work without it.

Then pick one component. Give it a contract in both surfaces, add three rules to AGENTS.md, and run the same five prompts again. Watch the number move. Once you've seen that happen once, the rest is repetition.

> **And**
>
> If your company wants help (an AI-readiness audit, component work, or someone embedded for a stretch), that's what the studio does. The audit is the right place to start.

---

*Human AI Studio · AI-Ready Design System Workshop · Cohort 01*
*Internal IP. Use it, teach your team, don't resell it.*

