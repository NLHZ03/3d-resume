import Highlight from "../Highlight";
import { profile } from "../../content";

// 左下角玻璃卡片 —— 关于我(支持多段落 + 高亮 + 引言 + 标签云)
export default function AboutSection() {
  const { name, role, about } = profile;
  if (!about) return null;

  return (
    <div className="pointer-events-auto absolute bottom-6 left-6 z-10 max-w-md rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md md:bottom-10 md:left-10">
      {/* 姓名 + 职位 */}
      <p className="text-xs tracking-[0.2em] text-neutral-400 uppercase">
        Hello, I'm
      </p>
      <h1 className="mt-1 text-3xl font-bold text-neutral-50">{name}</h1>
      <p className="mt-0.5 text-sm font-medium text-violet-300">{role}</p>

      {/* 多段落正文,支持 {高亮} */}
      <div className="mt-4 space-y-2.5 text-sm leading-relaxed text-neutral-300">
        {about.paragraphs?.map((p, i) => (
          <p key={i}>
            <Highlight text={p} />
          </p>
        ))}
      </div>

      {/* 引言 */}
      {about.quote && (
        <blockquote className="mt-4 border-l-2 border-violet-400/50 pl-3 text-sm italic text-neutral-200">
          "{about.quote}"
        </blockquote>
      )}

      {/* 标签云 */}
      {about.tags?.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-1.5">
          {about.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-xs text-neutral-300"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
