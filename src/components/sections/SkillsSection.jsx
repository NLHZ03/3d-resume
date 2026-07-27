import { profile } from "../../content";

// Render level 1-5 as small dots
function LevelDots({ level }) {
  return (
    <span className="inline-flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          className={`h-1.5 w-1.5 rounded-full ${
            i <= level ? "bg-violet-400" : "bg-white/15"
          }`}
        />
      ))}
    </span>
  );
}

// Bottom-center capsule — Skills (horizontal groups)
export default function SkillsSection() {
  const { skills } = profile;
  if (!skills?.groups) return null;

  return (
    <div className="pointer-events-auto absolute z-10 w-auto rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-md md:p-6
                    left-4 right-4 bottom-4
                    md:bottom-8 md:left-1/2 md:right-auto md:w-full md:max-w-2xl md:-translate-x-1/2">
      <h2 className="mb-3 text-sm font-semibold tracking-[0.3em] text-neutral-400 uppercase">
        Skills
      </h2>

      {/* Horizontal groups, each scrolls if needed on mobile */}
      <div className="flex gap-6 overflow-x-auto md:justify-between md:overflow-visible">
        {skills.groups.map((group) => (
          <div key={group.title} className="min-w-[140px] md:min-w-0 md:flex-1">
            <p className="mb-2 text-sm font-medium text-neutral-200">
              {group.title}
            </p>
            <div className="space-y-1.5">
              {group.items.map((item) => (
                <div
                  key={item.name}
                  className="flex items-center justify-between gap-3"
                >
                  <span className="text-sm text-neutral-300">{item.name}</span>
                  <LevelDots level={item.level} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
