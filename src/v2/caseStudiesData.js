import studioAbstract from "../assets/studio-abstract.png";
import evaAiVideo from "../assets/EvaAIV2.mov";
import pureFiVideo from "../assets/PureFi.MOV";
import outfitWorkVideo from "../assets/work/OutfixV2.mp4";
import outfitWorkPoster from "../assets/work/outfixHero.png";
import florenceWorkImage from "../assets/work/Florence.png";
import ollieWorkVideo from "../assets/work/OllieAIDemo.mp4";
import ollieWorkPoster from "../assets/work/OllieAIV1.png";
import balanceTransferWorkVideo from "../assets/work/BT.mp4";
import balanceTransferWorkPoster from "../assets/work/BT1.png";
import noScrollWorkImage from "../assets/work/NoScrollApp.png";
import dcbWorkImage from "../assets/work/DCB.png";
import ultraMockWorkVideo from "../assets/work/UltraMock.mp4";
import ultraMockWorkPoster from "../assets/work/UltraMock.png";
import aiAcademyWorkVideo from "../assets/work/AIAcademy.mp4";
import aiAcademyWorkPoster from "../assets/work/AIAcademy.png";

export const caseStudies = [
  {
    slug: "florence",
    title: "Florence",
    label: "Agent-Ready Design System",
    overview:
      "Agent-ready design system so AI and product UI reuse the same components, not parallel, invented UI.",
    problem:
      "As agents entered the product, UI patterns, states, and handoffs started drifting. The system needed to support human and agent workflows without fragmenting the experience.",
    outcome:
      "An agent-ready design system, so AI reuses real components instead of inventing UI. Early eval: 95% query accuracy on catalog matches, with potential $10M+ in yearly savings at enterprise scale.",
    image: florenceWorkImage,
    position: "center",
    offerUrl: "/florence",
    ctaLabel: "Learn more"
  },
  {
    slug: "purefi",
    title: "PureFi",
    label: "Native Mobile Redesign · AI-Ready Design System",
    overview:
      "A full native mobile redesign paired with an AI-ready design system so PureFi could ship clearer product experiences without slowing the team down.",
    problem:
      "The product UI and system couldn’t keep up with AI-driven features. Screens felt fragmented, and every new flow meant reinventing patterns from scratch.",
    outcome:
      "A coherent mobile experience and reusable system that made AI-ready interfaces faster to design, build, and ship with clarity.",
    video: pureFiVideo,
    image: studioAbstract,
    position: "72% 46%"
  },
  {
    slug: "digital-commercial-banking",
    title: "Digital Commercial Banking",
    label: "JPMorgan Chase · B2B SaaS Platform",
    overview:
      "Institutional B2B banking platform for commercial users at JPMorgan Chase, designed as a SaaS-style product surface for complex money movement and operations.",
    problem:
      "Commercial banking workflows were fragmented across tools and roles. Teams needed a clearer platform to manage accounts, payments, and operational tasks without enterprise clutter.",
    outcome:
      "A cohesive digital commercial banking experience that improved visibility across product areas and gave commercial users a calmer, more usable platform to work in.",
    image: dcbWorkImage,
    position: "center"
  },
  {
    slug: "outfit-ai",
    title: "Outfit AI",
    label: "AI Styling · 0→1 Product",
    overview:
      "A 0→1 AI styling product taken from concept to a working experience people could try, trust, and iterate on.",
    problem:
      "The idea was strong, but there was no clear product path from prompt to styled outcome that felt useful, credible, and ready to use.",
    outcome:
      "A working Outfit experience with a clear interaction model, so users could go from intent to styled results without friction.",
    video: outfitWorkVideo,
    image: outfitWorkPoster,
    position: "center",
    fit: "contain",
    containTone: "light"
  },
  {
    slug: "orbi-agent",
    title: "Orbi Agent",
    label: "Voice Todo",
    overview:
      "A voice-first agent experience that turns spoken intent into organized action with a calm, focused interface.",
    problem:
      "Voice capture alone wasn’t enough. Users needed the agent to structure what they said into clear, actionable todos without noise.",
    outcome:
      "A focused voice-to-action flow that captures intent quickly and turns it into organized tasks people can act on.",
    video: evaAiVideo,
    image: studioAbstract,
    position: "44% 50%"
  },
  {
    slug: "ollie-ai",
    title: "Ollie AI",
    label: "Figma Plugin · Claude Code",
    overview:
      "A Figma plugin workflow that brings Claude Code into the design process for faster production-ready output.",
    problem:
      "Design-to-code handoffs were slow and brittle. Designers needed a way to move from canvas decisions into usable implementation without losing fidelity.",
    outcome:
      "A plugin workflow that shortens the path from Figma to production-ready output while keeping designers in control.",
    video: ollieWorkVideo,
    image: ollieWorkPoster,
    position: "center"
  },
  {
    slug: "balance-transfer",
    title: "Balance Transfer",
    label: "Citi · Consumer Banking",
    overview:
      "A Citi Mobile balance transfer experience redesigned around clearer value, terms, and next steps — built to raise conversion through the transfer flow.",
    problem:
      "The existing transfer journey was dense and easy to abandon. Customers stalled before understanding the offer or finishing the transfer.",
    outcome:
      "Higher conversion on balance transfers: a clearer, trust-building journey that helped more customers complete the flow without losing compliance or confidence.",
    video: balanceTransferWorkVideo,
    image: balanceTransferWorkPoster,
    position: "center",
    fit: "contain",
    containTone: "light",
    mediaScale: 1.12
  },
  {
    slug: "ai-academy",
    title: "AI Academy",
    label: "Website Design · AI Academy",
    overview:
      "Workshops, courses, and a weekly publication for designers and builders leveling up with AI.",
    problem:
      "The Academy needed one marketing site that could present live workshops, self-paced learning, and the publication without feeling fragmented or generic.",
    outcome:
      "A focused academy site that turns visitors into readers, workshop signups, and self-paced learners.",
    video: aiAcademyWorkVideo,
    image: aiAcademyWorkPoster,
    position: "center",
    fit: "contain",
    containTone: "light",
    appUrl: "/academy",
    builtWith: ["React"],
    collections: ["websites"]
  },
  {
    slug: "olo",
    title: "Olo",
    label: "Website Design · olo.app",
    overview:
      "A calm, immersive marketing site for Olo's sound-as-medicine product at olo.app.",
    problem:
      "The brand needed a marketing site that could carry the “Olo Effect” — alertness and calm — without feeling clinical, noisy, or hard to understand.",
    outcome:
      "A live marketing website at olo.app that presents the product story, science, and download path with a calmer, more immersive narrative.",
    video: ultraMockWorkVideo,
    image: ultraMockWorkPoster,
    position: "center",
    fit: "contain",
    containTone: "light",
    appUrl: "https://www.olo.app/",
    collections: ["websites"]
  },
  {
    slug: "no-scroll",
    title: "No Scroll",
    label: "iOS · 4.6★ · 50K Users",
    overview:
      "Product design for an iOS focus app that helps people pause distracting apps and rebuild healthier phone habits.",
    problem:
      "The experience needed to feel calm and motivating, not punitive, while still making limits and sessions clear enough to stick.",
    outcome:
      "A refined product experience that reached 50K users with a 4.6★ App Store rating and a brand-new feel for the app.",
    image: noScrollWorkImage,
    position: "center",
    fit: "contain",
    containTone: "light",
    appUrl: "https://apps.apple.com/us/app/no-scroll-limit-screen-time/id6474079216"
  }
];

export const websiteProjects = caseStudies.filter((study) =>
  study.collections?.includes("websites")
);
