import { useState } from "react";
import Highlight from "../Highlight";
import { profile } from "../../content";

// Compact bottom-left capsule — About
// Collapsed by default (name + role + tags only) so the 3D model dominates.
// Click "More" to expand the full bio + quote.
export default function AboutSection() {
  const { name, role, about } = profile;
  const [expanded, setExpanded] = useState(false);
  if (!about) return null;

  return (
    <div className="pointer-events-auto absolute z-10 w-auto rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur-md md:p-5
                    left-4 bottom-4
                    md:left-8 md:bottom-8 md:w-full md:max-w-sm">
      {/* Name + role (always visible) */}
      <p className="text-xs tracking-[0.3em] text-neutral-400 uppercase">
        Hello, I'm
      </p>
      <h1 className="mt-1 text-3xl font-bold tracking-tight text-neutral-50 md:text-4xl">
        {name}
      </h1>
      <p className="mt-0.5 text-sm font-medium text-violet-300">{role}</p>

      {/* Tags (always visible) */}
      {about.tags?.length > 0 && (
        <div className="mt-2.5 flex flex-wrap gap-1.5">
          {about.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-xs text-neutral-300"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Expandable: full bio + quote */}
      {expanded && (
        <div className="mt-3 space-y-2 border-t border-white/10 pt-3">
          {about.paragraphs?.map((p, i) => (
            <p key={i} className="text-sm leading-relaxed text-neutral-300">
              <Highlight text={p} />
            </p>
          ))}
          {about.quote && (
            <p className="pt-1 text-xs italic text-neutral-400">
              "{about.quote}"
            </p>
          )}
        </div>
      )}

      {/* Toggle button */}
      <button
        onClick={() => setExpanded((v) => !v)}
        className="mt-3 text-xs font-medium tracking-wide text-violet-300 transition-colors hover:text-violet-200"
      >
        {expanded ? "− Show less" : "+ More about me"}
      </button>
    </div>
  );
}
