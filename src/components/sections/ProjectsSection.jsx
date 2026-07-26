import { profile } from "../../content";

// 左侧大块面板 —— 项目作品(纵向卡片列表,highlight 加强调边框)
export default function ProjectsSection() {
  const { projects } = profile;
  if (!projects?.length) return null;

  return (
    <div className="pointer-events-auto absolute left-6 top-1/2 z-10 w-full max-w-md -translate-y-1/2 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md md:left-10">
      <h2 className="mb-4 text-xs font-semibold tracking-[0.2em] text-neutral-400 uppercase">
        Projects
      </h2>

      <div className="max-h-[60vh] space-y-3 overflow-y-auto pr-1">
        {projects.map((project, i) => (
          <a
            key={i}
            href={project.link || "#"}
            target={project.link && project.link !== "#" ? "_blank" : undefined}
            rel="noopener noreferrer"
            className={`block rounded-xl border p-4 transition-colors hover:bg-white/5 ${
              project.highlight
                ? "border-violet-400/40 bg-violet-500/5"
                : "border-white/10"
            }`}
          >
            <div className="flex items-start justify-between gap-2">
              <h3 className="text-base font-semibold text-neutral-50">
                {project.title}
              </h3>
              {project.link && project.link !== "#" && (
                <span className="text-xs text-neutral-500">↗</span>
              )}
            </div>

            {project.description && (
              <p className="mt-1.5 text-sm leading-relaxed text-neutral-300">
                {project.description}
              </p>
            )}

            {project.tech?.length > 0 && (
              <div className="mt-2.5 flex flex-wrap gap-1">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="rounded bg-white/5 px-1.5 py-0.5 text-xs text-neutral-400"
                  >
                    {t}
                  </span>
                ))}
              </div>
            )}
          </a>
        ))}
      </div>
    </div>
  );
}
