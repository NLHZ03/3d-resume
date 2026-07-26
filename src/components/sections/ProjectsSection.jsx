import { profile } from "../../content";

// PC:左侧大块面板 / 移动端:底部铺满(占下半屏可滚动)
export default function ProjectsSection() {
  const { projects } = profile;
  if (!projects?.length) return null;

  return (
    <div className="pointer-events-auto absolute z-10 w-auto rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md md:p-6
                    left-4 right-4 bottom-4 max-h-[55vh]
                    md:left-10 md:right-auto md:top-1/2 md:w-full md:max-w-md md:max-h-[60vh] md:-translate-y-1/2">
      <h2 className="mb-4 text-xs font-semibold tracking-[0.2em] text-neutral-400 uppercase">
        Projects
      </h2>

      <div className="max-h-[calc(55vh-3rem)] space-y-3 overflow-y-auto pr-1 md:max-h-[calc(60vh-3rem)]">
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
