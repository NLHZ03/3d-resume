// ============================================================
//  内容中枢 —— 你的所有信息都在这里
//  改这一个文件,网站立刻反映。组件代码不用动。
// ============================================================
//
//  ✦ About 段落里用 {关键词} 语法,会被渲染成彩色高亮
//  ✦ level 用 1-5 的数字,会渲染成小圆点(熟练度可视化)
//  ✦ 任何字段都可以删除/留空,组件会自动跳过
//  ✦ 想加更多项目/技能/标签?直接往数组里加对象即可

export const profile = {
  name: "Eric Wang",
  role: "Creative Frontend Engineer",
  location: "Shanghai, China",

  // ─────────────────────────────────────────────
  // 关于我 —— 用 {关键词} 做高亮,写得像散文也没关系
  // ─────────────────────────────────────────────
  about: {
    paragraphs: [
      "我是 {Eric},一名沉迷于 {Web 3D} 与 {交互叙事} 的前端工程师。",
      "我相信代码不只是解决问题的工具,更是 {表达的媒介} —— 把抽象的想法变成可触摸的体验,是我最享受的事。",
      "这里是我的数字分身,你可以转动它、和它互动。这个网站本身,就是我能给你的最好的名片。",
    ],
    quote: "用技术把想象力,变成可触摸的体验。",
    tags: ["WebGL", "React", "Design", "Storytelling", "Animation"],
  },

  // ─────────────────────────────────────────────
  // 技能 —— 分组 + 熟练度(1-5 圆点)
  // ─────────────────────────────────────────────
  skills: {
    groups: [
      {
        title: "Frontend",
        items: [
          { name: "React", level: 5 },
          { name: "TypeScript", level: 4 },
          { name: "Next.js", level: 4 },
          { name: "Tailwind CSS", level: 5 },
        ],
      },
      {
        title: "3D / Graphics",
        items: [
          { name: "Three.js", level: 4 },
          { name: "React Three Fiber", level: 4 },
          { name: "GLSL Shaders", level: 3 },
          { name: "Blender", level: 3 },
        ],
      },
      {
        title: "Tools & Others",
        items: [
          { name: "Vite", level: 4 },
          { name: "Git", level: 5 },
          { name: "Node.js", level: 4 },
          { name: "Figma", level: 4 },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 项目作品 —— highlight: true 会加强调边框
  // ─────────────────────────────────────────────
  projects: [
    {
      title: "3D Digital Resume",
      description:
        "你正在看的这个网站。一个以数字分身为载体的沉浸式个人主页,集成了 React Three Fiber、Meshopt 压缩、章节叙事相机联动。",
      tech: ["React 19", "R3F", "Three.js", "Tailwind"],
      link: "#",
      tags: ["3D", "WebGL", "Portfolio"],
      highlight: true,
    },
    {
      title: "Interactive Data Visualization",
      description:
        "基于 D3 + Three.js 的三维数据看板,支持千万级数据点的实时渲染与交互探索。",
      tech: ["Three.js", "D3.js", "WebGL", "TypeScript"],
      link: "#",
      tags: ["Data Viz", "Performance"],
      highlight: false,
    },
    {
      title: "Generative Art Playground",
      description:
        "用 GLSL shader 生成的艺术作品集,每一帧都是数学与美学的对话。",
      tech: ["GLSL", "WebGL", "React"],
      link: "#",
      tags: ["Creative Coding", "Shader"],
      highlight: false,
    },
  ],

  // ─────────────────────────────────────────────
  // 联系方式 —— invite 是引导语,体现你的语气
  // ─────────────────────────────────────────────
  contact: {
    invite: "如果你也对 {Web 3D}、{创造性表达} 感兴趣,或者只是想聊聊 ——",
    email: "hello@ericwang.dev",
    socials: [
      { label: "GitHub", href: "https://github.com", icon: "github" },
      { label: "Twitter", href: "https://twitter.com", icon: "twitter" },
      { label: "Email", href: "mailto:hello@ericwang.dev", icon: "mail" },
    ],
  },
};
