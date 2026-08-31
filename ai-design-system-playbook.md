# AI-ready design system playbook

Depth guide for the August 29 cohort. Open a module, then read the chapter. Live at /workshop/playbook.

---

## 01 What is an AI-ready design system

A design system that agents can understand and retrieve. Humans were the first audience. Agents are the second.

**Key outcome.** You can say what an AI-ready design system is, and spot the difference between a system an agent can build from and one it cannot.

### What is an AI-ready design system?

An AI-ready design system is a design system that agents can understand and retrieve.

Design systems were built for one audience: humans. There is another layer now. Agents. To Claude Code, Cursor, or Codex, the design system is a context layer. It is what the agent reads before it builds.

Most systems cannot be read that way. Agents cannot understand them and cannot retrieve them, which defeats the purpose of having a system at all. The result is prototypes and products with no connection to the brand, and teams prompting their way around the system instead of through it.

An AI-ready design system closes that gap with clear guardrails, architecture, and structure an agent can follow.

What the agent actually reads is structure: component names, type signatures, token roles, contracts, and AGENTS.md. It does not browse a docs site. It retrieves. If the rule lives only in prose, it cannot reach it.

### What is the difference between an AI-ready system and one that is not?

**The difference at a glance.** The same team, the same components, two very different outcomes.

| | Not AI-ready | AI-ready |
| --- | --- | --- |
| 01 Where it lives | Scattered across files, tools, and people's heads | One repo, documented, in one place |
| 02 Retrieval | Low. The agent guesses from what it can see | High. The agent pulls the exact record it needs |
| 03 Prompting | More prompting. You describe the system every time | Less prompting. The system carries the context |
| 04 Component contracts | None. The rules are implied | Defined. What it is for, its states, when to use it |
| 05 Accessibility | Not documented on the component | Documented in the contract. It ships accessible |
| 06 Consistency | Inconsistent. Every screen drifts a little | Consistent. Every build resolves to the same system |
| 07 Missing from the catalog | The agent invents generic UI | The agent asks instead of inventing |
| 08 What you get out | Generic, off-brand UI | On-brand UI composed from components you own |

The agent starts to drift when context is scattered. Something lives in Storybook. Something lives in Figma. Something lives in the GitHub repo. A ready system has one source of truth. The recommendation is the repo. Figma is the surface. Some teams flip that. Figma leads, the repo follows. That is a company choice. Agents still understand the repo better.

Not ready means low retrieval. The agent cannot pull the right component. It generates slop. Ready means high retrieval. Florence hit 73% retrievability on the first shot of prompting.

Not ready means more prompting. You describe the system every time. Ready means less prompting. The system carries the context. That also cuts token cost. That is a real sell inside a company.

On the not-ready side, component contracts almost do not exist. Consistency is weak. The output is generic UI. On the ready side you get UI connected to the brand, and the path from Figma to code gets faster because the team can actually get the component.

AI is probabilistic. It makes things up. The job is to make the system deterministic. When you say build a checkout, it comes from the design system. Guardrails, architecture, and structure the agent can follow.

### What do the key terms actually mean?

These words are not decoration. Mix them up and you fix the wrong layer. Use this as the glossary for the rest of the playbook.

**System.** Purpose, interconnectedness, and elements. Not one component. Content guidelines, accessibility, tokens, and components, connected so people can build on them.

**Context layer.** What Claude Code, Cursor, or Codex reads before it builds. The design system is that layer for agents. Humans were the first audience. Agents are the second.

**Ambiguity.** Humans handle a gap by asking someone. Agents do not. If the rule is not written, they invent.

**Probabilistic.** AI makes things up. It hallucinates. It generates what was not asked for. That is the default.

**Deterministic.** When you say build a checkout, it comes from the design system. Guardrails, architecture, and structure the agent can follow.

**Source of truth.** One place the system lives. The recommendation is the GitHub repo. Figma is the surface. Some teams flip that. Agents still understand the repo better.

**Retrieval.** Can the agent pull the right component. Low retrieval generates slop. High retrieval is the point. Florence hit 73% on the first shot of prompting.

**Slop.** Generic UI that is not yours. What you get when the agent cannot retrieve.

**Catalog.** The set of components that exist and should be retrieved. If it is not in the catalog, the agent should not invent a twin with a similar name.

**Component contract.** The file for one component. What it is for. When to use it. When not to use it. Its states. In Florence that is the JSON next to the component. Start with Button. Do not write twenty files on day one.

**Primitive.** The raw scale. Gray steps, spacing steps, radius steps. Paint. Agents should not pick from here.

**Semantic token.** Names the job, not the swatch. Text secondary. Border subtle. Surface raised. A gray number is a primitive. Only the job survives a rebrand.

**AGENTS.md.** House rules at the root of the repo. How we retrieve. What we never invent. Which folder is source of truth. The agent should read it without you pasting it.

**Drift.** The agent left the system and painted from the prompt. Scattered context causes it. Two sources of truth cause it.

**Eval.** You score a generated screen, not the repo. Same prompts, same model, fresh session. Then you go back to the repo and fix what broke.

**MCP.** How the agent reads Figma or the repo without you pasting frames into chat. Retrieval dies when it cannot see the file the humans use.

**Token cost.** Not-ready means more prompting. You describe the system every time. Ready means the system carries the context. That is a real sell inside a company.

### Three-part AI-ready design system video series

Watch these, then read the chapters. Same ideas, spoken.

01 Agentic Design Systems — https://youtu.be/OqrxSgWpRvs
02 Agentic Design Systems — https://youtu.be/O-F7nxE2IEo
03 Scattered context is breaking systems — https://youtu.be/2IYfsPch3a8

---

## 02 Working with an existing design system

Figma, code, and the gap between them. You walk into a library that already ships. You do not start from a blank file.

**Key outcome.** You can walk into any existing design system, in Figma or in code, and start fixing, extending, and shipping from it faster.

### How to build with an existing design system

Not everybody is building a design system from scratch. You connect to one that already exists and you build from it. In the workshop that model was shadcn. A public library you can install and open in Cursor.

Step one is install. Use the shadcn install. Get the components into a project you own. Do not skip this and paste a screenshot of the docs.

Drop that project into Cursor. Then vibe. Prompt from the catalog that is already there. Use @ to point at the right components. @ the button you mean. @ the card you ship. Do not describe the catalog in the prompt and hope it finds it.

Install. Vibe. Point. That is the path for an existing system. Your company library is the same idea later. First you learn it on a system you can actually open.

### How do you work with a design system when it is in code?

Find the exports. Find the deprecated ones that still compile. If three cards are legal, the agent will pick at random. Humans have a Slack channel that says “use the new card.” The agent does not.

Look at types the way you would look at a token name. A spacing prop typed as number invites invention. Typed as a scale, it teaches the system without a docs page. The test from foundations still applies: could someone violate the rule without anything breaking.

I pointed the room at shadcn as a public code model. Not because this studio should look like shadcn. Because you can see how variants get encoded when a library is mature. Install notes and the chart examples are what I pasted in chat. Inspect them. Then look at your own exports with the same eyes.

### How do you bridge the gap between Figma and code?

Kelly asked if we can connect the Figma design system to a git repo. Yes. That is the job. Figma is not the source of truth by itself.

Git holds tokens, contracts, and components. Figma mirrors them, or generates from them. MCP is how the agent reads the file the humans still design in. If Figma and git disagree, the agent will pick one and drift the other.

Same names. Same roles. Same constraints. If Figma has Button and code has BtnPrimary and CTA, the agent invents a fourth. The bridge is not a plugin you install and forget. It is a naming and ownership decision you keep making.

Jake is moving from enterprise teams to a solo agency. The encoding does not change. The blast radius does. You still own the contract in git so the next agent does not restyle a client brand from a prompt. You just do not need a committee to delete a deprecated card.

---

## 03 Making a design system AI-ready

Audit the system you have. Restructure components and tokens. Run the eval. Hand the agent one source of truth.

**Key outcome.** You can audit your own system, restructure its components and tokens, run the eval, and hand AI a single source of truth it builds from without drift.

### What does the AI-ready framework actually look like?

Four moves, nine steps. The order matters: each one makes the next cheaper.

**Measure — where you are**
01 Audit and baseline. Run the five prompts once. Write down S. Done when a number you can beat.

**Structure — make it legible**
02 Rename. Semantic names on both surfaces. Done when the name says what it is.
03 Tokenise. Raw values out of the UI layer. Done when no literals left in components.
04 Write the contract. One JSON per component. Done when Button, Link, Input all have one.

**Connect — make it reachable**
05 Mirror it in Figma. The same JSON in component config. Done when both sides, one card.
06 Add the harness. AGENTS.md at the root of the repo. Done when the agent reads it unprompted.
07 Expose it. MCP, Code Connect, an index it can query. Done when it retrieves instead of reading.

**Prove — keep it true**
08 Re-run the eval. Same prompts, same model, fresh session. Done when retrieved up, invented down.
09 Enforce. Lint, fail the build, re-run on release. Done when the build catches drift, not a person.

The score tells you what to fix next.

A system is purpose, interconnectedness, and elements. Not one component. Content guidelines, accessibility, tokens, components. One cohesive thing people build on.

The stack under those nine steps is what the agent reads. Primitives are the raw scale: gray steps, spacing steps, radius steps. Semantics are the jobs: text primary, border subtle, surface raised. Components consume semantics. Contracts tell the agent when a component is the answer. AGENTS.md holds the house rules. Skills hold the jobs you do not want to re-prompt every Monday.

Agents should consume semantics. If they consume primitives they are picking paint, and you will get a different gray every generation. Components should have one canonical path.

You do not run the eval on the repo and guess what to fix. You generate a screen the way a team would, score retrieval, then go back to the repo and fix what broke. Application layer first. Repo second.

If those layers disagree, the agent picks the loudest file. Keep one story. A pretty docs site that repeats rules the code does not enforce will train humans and fail agents.

### How do you audit a design system for AI readiness?

Walk the catalog with an agent in the loop, not only with your eyes. Your eyes already know which button is current. The agent does not.

The checklist is short on purpose. Can it find the component you already have. Is there a contract, or only a docs page. Are tokens semantic, or swatches. Is there one path, or three. Does the Figma name match the git export. Does AGENTS.md point at the contract, or repeat it.

Write the misses down in those labels: retrieval, empty contract, duplicate path, hardcoded color. That list is the audit. You do not need a forty-page report to start fixing.

We have said systems were agent-ready and then run the eval. Catalog match fell apart the moment the prompt left the happy path. Measure before you rewrite the whole library because one demo looked fine.

### What does good component architecture look like?

Good architecture is boring to describe and strict in the file. One intent. When not to use it. An enum, not a free string. The Florence Button contract is the model I want in your head: one primary path per view, quieter variants for secondary work, do not use it for in-page navigation or a switch.

It lives the same way in Figma and in code. Same name. Same variants. Same constraints. The workflows that actually help are the ones that remove choice: rename until they match, delete the extra, write the contract next to the component so retrieval has a place to land.

Connect Figma and GitHub so a rename in one place is a rename in the other. If only Figma moves, the agent will retrieve yesterday’s code. Kelly’s question from the first hour is the same question here.

Jake asked where guidelines live: AGENTS.md or the contract. AGENTS.md is the house rules. How we retrieve. What we never invent. Which folder is source of truth. A contract is the law for one component. Start the rule in AGENTS.md if it applies everywhere. Move it into the contract when you can name the component. Then point AGENTS.md at that file. Do not keep two copies.

You have to tell the agent which file to edit. Jake assumed that, and he was right. If you do not, it will pad AGENTS.md until the file is useless.

Sonika asked if you write contracts for templates and pages that say how components are used together. Kelly agreed. Yes, when the composition repeats. A settings page is a header, a form, a primary save, a quiet cancel. That is a recipe. No, when the page is a one-off marketing layout. Do not write a contract for every screen you might ship once.

Sonika also asked if the agent reads every contract to build a screen, and if that burns tokens. It will if you dump the library into the prompt. Retrieve the contracts for the components on that screen. Index the rest. A catalog with intent and path is cheap. Twenty full contracts in every chat is not.

### What are evals and benchmarks, and how do you run them?

An eval scores a generation against your catalog. Not “does it look nice.” Four labels matter: retrieved, invented, wrong component, hardcoded.

Retrieved means it used what you have. Invented means it made a twin. Wrong component means it found the catalog and picked the neighbor. Hardcoded means it skipped tokens and wrote a hex.

The one number is catalog match on prompts that are not the demo. A strong score holds after you change the ask. A weak score only works on the happy path we showed in the room.

You also get the eval and benchmark skill: a markdown file you drop into Cursor or Claude Code so the agent scores its own output against your catalog. I dropped that repo in chat. Kara hit a 404. Jake said it was working a few minutes later. If a repo is private, wait or ask. Do not rebuild the skill from memory.

### What causes drift, and how do you prevent it?

Drift is what it looks like when the agent left your system. Two sources of truth cause it. Empty contracts cause it. Deprecated exports cause it. A Storybook page that holds a rule the code does not enforce causes it. An AGENTS.md that disagrees with the Button contract causes it.

Prevent it by encoding the rule once and pointing everything else at that file. Then run the eval when you change a name. Drift is not a model problem first. It is a catalog problem.

If you only test the demo prompt, you do not have prevention. You have a demo.

### Where does your single source of truth live?

Git for tokens, contracts, and code. Figma as the working file the team can see. Storybook or a preview as the human viewing surface. Not three laws.

Jake asked what Storybook is for in a design system workflow. Then he had it: a visual documentation tool. Kara asked the next question. In a world of agents, do you still need Storybook. Can the repo be expressed as the viewing surface.

You need a place humans can see states. That can be Storybook. It can be a preview app. Florence preview is the repo expressed as a gallery. The agent does not need Storybook to retrieve. It needs the contract. Do not make Storybook the only place the rule lives.

I dropped Astryx in the chat as another surface to look at. Other visual layers — Paper, shaders, the marketing site — get a DESIGN.md if you do not want the look invented. They do not become a second component catalog.

Jake noticed DESIGN.md was not on the slides and asked if it is needed. Yes, when the visual language is its own surface. This studio site has a DESIGN.md. Florence has foundations. They are not the same file. DESIGN.md says how it should look here. AGENTS.md says how to work. I dropped getdesign.md as the pattern. Do not paste Florence primitives into the studio file.

---

## 04 Tooling and a full system end to end

The tools are how the agent reaches the system you encoded. Setup, MCP, and what a complete system looks like when you ship it.

**Key outcome.** You have seen a full system built end to end in Cursor and Figma, and you leave with the setup and structure to ship your own.

### Which tools do we use, and why?

Figma, because that is where the team already has a library. Cursor or Claude Code, because that is where the agent retrieves and writes. MCP, because that is the bridge.

I also dropped Paper when you need a canvas that is not Figma, and shadcn when you need a public code model you can inspect without a seat. Florence is the system behind the workshop. Jake asked if you get Florence or if you should study shadcn. Both. Browse Florence here and in the Figma demo. Inspect shadcn for how a public library encodes variants.

The tool is not the readiness. A messy catalog with MCP attached is still a messy catalog.

### Claude Code and Cursor setup

Kara asked for a setup doc. This is it.

Open the workshop FigJam. Open the Florence demo as the model file. Read Figma’s MCP guide. Install figma-console-mcp from GitHub if plugin search does not show a desktop bridge. Point the agent at a sandbox file you own. Not the company library.

In the repo: AGENTS.md with house rules, one component contract, then generate one screen. Score it with the four labels. Only then rename tokens or delete a deprecated export.

Kara said she would reach out for a 1:1 once she tried a sandbox. That is the right time. Not before you have a miss in front of you.

### What is MCP, and why does it matter here?

MCP is how the agent reads Figma or a console without you pasting frames. It matters here because retrieval dies when the agent cannot see the file the humans use.

Kara searched plugins and widgets for “Figma desktop bridge” and did not get the same result I had on screen. Use Figma’s own MCP guide first. The console MCP is a GitHub install. I pasted the repo twice, including the .git URL. Clone it if Community search fails.

She also asked whether Figma will cripple MCP now that they want people inside their ecosystem. I will not pretend I know that roadmap. Encode in git anyway. If a bridge moves, the contract should still be in the repo.

### What does a full design system look like end to end?

Florence is the model I showed. Token-first. Contracts next to components. A preview so humans can browse. Agents retrieve the same source. Primitives, semantics, components, contracts, AGENTS.md, a preview. You ship from git.

Sonika asked if you get the contract files and AGENTS.md from the repo. Yes. Florence contracts live next to each component. Use those as the model. Then write the contract for your Button. Do not copy every Florence file on day one.

Jake asked where the playbook and skills would be shared. This playbook is the playbook. Skills and benchmarks are in the workshop skills library. Slack is the room after class.

The marketing site is not the system. Do not flatten Florence into humanaistudio.io styles. How you set it up is the stack in foundations. How you ship it is git, with Figma as the working file the team can still open.

---

## 05 Evals for design systems

You do not eval the repo and guess. You generate a screen, score retrieval, then go back and fix what broke.

### What are evals for a design system?

An eval scores one generated design against the design system. It is not a test of whether the team adopted the system. It is a test of whether this screen used what you already have.

You run it on the application layer. A dashboard. A checkout. The way a team would prompt. Then you take the misses back to the repo and fix them. You do not run the eval on the repo and guess what to change.

That is how you know where it is breaking. If you only look at the library, you do not know what to fix.

### What do you score?

Not “does it look nice.” Four labels.

**Retrieved.** It used a component you already have.

**Invented.** It made a twin. Slop.

**Wrong component.** It found the catalog and picked the neighbor.

**Hardcoded.** It skipped tokens and wrote a hex.

### How do you run them?

Same prompts. Same model. Fresh session. Write down the score. That is the baseline. Done when you have a number you can beat.

Then you change the system. Rename. Tokenise. Write a contract. Expose it. Re-run. Retrieved should go up. Invented should go down.

The eval and benchmark skill is a markdown file in the workshop skills library. Drop it into Cursor or Claude Code. Do not rebuild it from memory.

If you only test the demo prompt, you do not have an eval. You have a demo.

### What does a good score look like?

Florence hit 73% retrievability on the first shot of prompting. That is a starting number, not a finish line.

A strong score holds after you change the ask. A weak score only works on the happy path.

The score tells you what to fix next. Prove returns to Structure.

---

## 06 AI workflows

The system is the context layer. The workflow is how you and the agent use it every week without re-explaining the catalog.

### What is an AI workflow here?

A workflow is not a new tool. It is a path the team can repeat. Open the repo. The agent reads AGENTS.md. It retrieves a contract. It builds a screen. You score it. You fix the miss in the system, not in the prompt.

Cursor, Claude Code, or Codex is where the agent writes. Figma is the surface the humans still design in. Git is the source of truth. MCP is how the agent sees the file without you pasting frames.

Some of this bends tools that are not ready. Figma still has to catch up. You still run the path. Practical today. Ready for tomorrow.

### What is the weekly loop?

Skills hold the jobs you do not want to re-prompt every Monday. The eval skill. The audit. The contract write. Drop the file in. Do not rebuild it from memory.

Start in a sandbox file you own. Get retrieve, one contract, and MCP working. Then touch work files.

Generate one screen. Score it with the four labels. Only then rename tokens or delete a deprecated export.

### Figma and Claude Code workflow

Watch: [Claude Code + Figma Workflow](https://youtu.be/ktEXKpIg1_8)

Figma is where the library already lives. Claude Code is where the agent retrieves and writes. Git is the source of truth. MCP is the bridge. Without the bridge, you paste frames into chat and retrieval dies.

Open a sandbox file you own. Not the company library. Point Claude Code at the repo. Point MCP at that Figma file. AGENTS.md at the root. One component contract next to the component.

Ask for one screen. Claude Code should retrieve the contract, not invent a twin. Score it. Fix the miss in the repo or in the Figma name. Same names on both sides.

Use Figma’s MCP guide first. Encode in git anyway.

### How do you go from Figma to code with an agent?

Same names. Same variants. Same constraints. Connect Figma and the repo so a rename in one place is a rename in the other.

The time from Figma to code gets faster when the team can actually get the component. Designers are expected to go between design and code. You own the path the agent takes.

### How do you teach this to a team?

Give them the playbook and the skills library. Do not invent a second library in a private file. A 1:1 is useful after someone has a miss in front of them.

