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

// PC:右侧玻璃面板 / 移动端:底部横向铺满
export default function SkillsSection() {
  const { skills } = profile;
  if (!skills?.groups) return null;

  return (
    <div className="pointer-events-auto absolute z-10 w-auto rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md md:p-6
                    left-4 right-4 bottom-4
                    md:left-auto md:right-10 md:bottom-auto md:top-1/2 md:w-72 md:-translate-y-1/2">
      <h2 className="mb-4 text-xs font-semibold tracking-[0.2em] text-neutral-400 uppercase">
        Skills
      </h2>

      {/* 移动端:横向滚动;PC:纵向堆叠 */}
      <div className="flex gap-5 overflow-x-auto md:block md:space-y-5 md:overflow-visible">
        {skills.groups.map((group) => (
          <div key={group.title} className="min-w-[140px] md:min-w-0">
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
