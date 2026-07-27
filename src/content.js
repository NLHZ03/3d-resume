// ============================================================
//  Content hub — Eric Wang's personal site
//  Edit this one file, the site updates instantly. No component changes needed.
// ============================================================
//
//  ✦ In About paragraphs, wrap keywords in {braces} to highlight them
//  ✦ level uses 1-5, rendered as dots (proficiency visualization)
//  ✦ Any field can be deleted/left empty — components skip it gracefully

export const profile = {
  name: "Eric · Wang Zichen",
  role: "Business student migrating from muscle-brained to AI-native",
  location: "Dongying → Singapore",

  // ─────────────────────────────────────────────
  // About — use {braces} to highlight keywords
  // ─────────────────────────────────────────────
  about: {
    paragraphs: [
      "I'm {Eric} — a business student in the middle of a brain transplant, going from {muscle-brained} to {AI-native} (and yes, I do consider that an upgrade).",
      "I live by one rule: {be here now}. Whether it's a heavy set at the gym, a late-night Python rabbit hole, or just staring at the ceiling thinking about the future — I'm all in.",
      "This site is my digital clone. Spin it, drag it, poke it. Honestly, it's the best business card I could give you — and the only one that won't get lost in a drawer.",
    ],
    quote: "I don't need alcohol or drugs — I prefer my suffering raw and unfiltered.",
    tags: ["Create Value", "Become Myself", "AI", "Be Here Now", "Fitness"],
  },

  // ─────────────────────────────────────────────
  // Skills — three domains: Personal Growth / Fitness / AI
  // ─────────────────────────────────────────────
  skills: {
    groups: [
      {
        title: "🌱 Personal Growth",
        items: [
          { name: "Emotional Regulation", level: 5 },
          { name: "Habit Building", level: 4 },
          { name: "Self-Reflection", level: 4 },
          { name: "Happiness Threshold", level: 4 },
          { name: "Time Management", level: 3 },
        ],
      },
      {
        title: "💪 Fitness",
        items: [
          { name: "Gym Attendance", level: 5 },
          { name: "Diet Discipline", level: 5 },
          { name: "Strength", level: 4 },
          { name: "Endurance", level: 4 },
          { name: "Form Precision", level: 4 },
        ],
      },
      {
        title: "🤖 AI Capabilities",
        items: [
          { name: "AI Thinking", level: 4 },
          { name: "AI News Tracking", level: 4 },
          { name: "Agent / Workflows", level: 3 },
          { name: "Python Basics", level: 3 },
          { name: "Prompt Engineering", level: 2 },
          { name: "AI Experience", level: 1 },
          { name: "Math Foundations", level: 1 },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────
  // Projects — highlight: true adds an emphasized border
  // ─────────────────────────────────────────────
  projects: [
    {
      title: "Fitness AI Coach · Work in Progress",
      description:
        "Building an AI fitness coach / gym buddy — an external fitness brain that actually gets you, knows your preferences, and makes all the decisions for you. From muscles to AI: this is my own closed loop.",
      tech: ["AI", "Fitness", "Agent", "WIP"],
      link: "#",
      tags: ["AI", "Fitness", "Personal Project"],
      highlight: true,
    },
  ],

  // ─────────────────────────────────────────────
  // Fitness Reel — local mp4
  // ─────────────────────────────────────────────
  reel: {
    title: "A muscle bro showing off by the sea",
    caption: "Be here now. Build your body into the thing you're proudest of.",
    videoSrc: "/fitness-reel.mp4",
  },

  // ─────────────────────────────────────────────
  // Contact
  // ─────────────────────────────────────────────
  contact: {
    invite: "If you're also into {AI}, {fitness}, or {being here now} — or just wanna chat —",
    email: "zichen.wang.2026@mitb.smu.edu.sg",
    wechat: "wangzichen2003",
    socials: [
      { label: "Email", href: "mailto:zichen.wang.2026@mitb.smu.edu.sg", icon: "mail" },
    ],
  },
};
