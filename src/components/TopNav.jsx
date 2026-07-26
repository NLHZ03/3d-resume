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
    <header className="pointer-events-auto absolute top-0 left-0 right-0 z-20 flex items-center justify-between gap-2 px-4 py-3 md:px-10 md:py-4">
      {/* Logo(点击回 about) */}
      <button
        onClick={() => setActiveSection("about")}
        className="shrink-0 text-[11px] font-semibold tracking-[0.15em] text-neutral-100 transition-opacity hover:opacity-70 md:text-sm md:tracking-[0.2em]"
      >
        {profile.name?.toUpperCase()} · 3D
      </button>

      {/* 导航胶囊:移动端紧凑 */}
      <nav className="flex items-center gap-0.5 rounded-full border border-white/10 bg-white/5 p-0.5 backdrop-blur-md md:gap-1 md:p-1">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveSection(item.id)}
            className={`rounded-full px-2.5 py-1 text-[10px] font-medium tracking-wide transition-colors md:px-4 md:py-1.5 md:text-xs ${
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
