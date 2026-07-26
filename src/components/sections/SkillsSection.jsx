import { profile } from "../../content";

// level 1-5 渲染成小圆点
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

// 右侧玻璃面板 —— 技能(分组 + 熟练度圆点)
export default function SkillsSection() {
  const { skills } = profile;
  if (!skills?.groups) return null;

  return (
    <div className="pointer-events-auto absolute right-6 top-1/2 z-10 w-72 -translate-y-1/2 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md md:right-10">
      <h2 className="mb-4 text-xs font-semibold tracking-[0.2em] text-neutral-400 uppercase">
        Skills
      </h2>

      <div className="space-y-5">
        {skills.groups.map((group) => (
          <div key={group.title}>
            <p className="mb-2 text-sm font-medium text-neutral-200">
              {group.title}
            </p>
            <div className="space-y-1.5">
              {group.items.map((item) => (
                <div
                  key={item.name}
                  className="flex items-center justify-between"
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
