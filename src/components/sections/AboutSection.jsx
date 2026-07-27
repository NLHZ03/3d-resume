import Highlight from "../Highlight";
import { profile } from "../../content";

// Compact bottom-left capsule — About
// Deliberately small so the 3D model dominates the first impression.
// Only name + first paragraph + tags show; longer bio lives in the quote.
export default function AboutSection() {
  const { name, role, about } = profile;
  if (!about) return null;

  // Show only the first paragraph to keep the card compact
  const firstParagraph = about.paragraphs?.[0];

  return (
    <div className="pointer-events-auto absolute z-10 w-auto rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur-md md:p-5
                    left-4 bottom-4
                    md:left-8 md:bottom-8 md:w-full md:max-w-sm">
      {/* Name + role */}
      <p className="text-xs tracking-[0.3em] text-neutral-400 uppercase">
        Hello, I'm
      </p>
      <h1 className="mt-1 text-3xl font-bold tracking-tight text-neutral-50 md:text-4xl">
        {name}
      </h1>
      <p className="mt-0.5 text-sm font-medium text-violet-300">{role}</p>

      {/* One-line intro */}
      {firstParagraph && (
        <p className="mt-2 text-sm leading-relaxed text-neutral-300">
          <Highlight text={firstParagraph} />
        </p>
      )}

      {/* Tags */}
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
    </div>
  );
}
