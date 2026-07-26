import { profile } from "../content";

const NAV_ITEMS = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

// 受控导航:点击切换 activeSection,当前项高亮
export default function TopNav({ activeSection, setActiveSection }) {
  return (
    <header className="pointer-events-auto absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-6 py-4 md:px-10">
      {/* Logo(点击回 about) */}
      <button
        onClick={() => setActiveSection("about")}
        className="text-sm font-semibold tracking-[0.2em] text-neutral-100 transition-opacity hover:opacity-70"
      >
        {profile.name?.toUpperCase()} · 3D
      </button>

      {/* 导航胶囊 */}
      <nav className="flex items-center gap-1 rounded-full border border-white/10 bg-white/5 p-1 backdrop-blur-md">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveSection(item.id)}
            className={`rounded-full px-4 py-1.5 text-xs font-medium tracking-wide transition-colors ${
              activeSection === item.id
                ? "bg-white/15 text-white"
                : "text-neutral-300 hover:bg-white/10 hover:text-white"
            }`}
          >
            {item.label}
          </button>
        ))}
      </nav>
    </header>
  );
}
