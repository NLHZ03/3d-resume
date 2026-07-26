import TopNav from "./TopNav";
import AboutSection from "./sections/AboutSection";
import SkillsSection from "./sections/SkillsSection";
import ReelSection from "./sections/ReelSection";
import ProjectsSection from "./sections/ProjectsSection";
import ContactSection from "./sections/ContactSection";

const SECTION_MAP = {
  about: AboutSection,
  skills: SkillsSection,
  reel: ReelSection,
  projects: ProjectsSection,
  contact: ContactSection,
};

// UI layer: manages section switching
// Container is pointer-events-none so it doesn't block 3D; each card sets its own pointer-events-auto
export default function Overlay({ activeSection, setActiveSection }) {
  const ActiveSection = SECTION_MAP[activeSection] || AboutSection;

  return (
    <div className="pointer-events-none absolute inset-0 z-10">
      <TopNav activeSection={activeSection} setActiveSection={setActiveSection} />

      {/* key triggers re-render for the fade-in transition on section switch */}
      <div key={activeSection} className="animate-[fadeIn_0.4s_ease-out]">
        <ActiveSection />
      </div>
    </div>
  );
}
