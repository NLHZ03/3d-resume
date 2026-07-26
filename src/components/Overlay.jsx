import TopNav from "./TopNav";
import AboutSection from "./sections/AboutSection";
import SkillsSection from "./sections/SkillsSection";
import ProjectsSection from "./sections/ProjectsSection";
import ContactSection from "./sections/ContactSection";

const SECTION_MAP = {
  about: AboutSection,
  skills: SkillsSection,
  projects: ProjectsSection,
  contact: ContactSection,
};

// UI 层:管理章节切换
// 容器 pointer-events-none 避免阻挡 3D,各章节卡片自己 pointer-events-auto
export default function Overlay({ activeSection, setActiveSection }) {
  const ActiveSection = SECTION_MAP[activeSection] || AboutSection;

  return (
    <div className="pointer-events-none absolute inset-0 z-10">
      <TopNav activeSection={activeSection} setActiveSection={setActiveSection} />

      {/* key 触发 transition 重渲染,实现章节切换的淡入动效 */}
      <div key={activeSection} className="animate-[fadeIn_0.4s_ease-out]">
        <ActiveSection />
      </div>
    </div>
  );
}
