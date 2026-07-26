import { useEffect, useState } from "react";
import { profile } from "../content";
import Highlight from "./Highlight";

// Detect whether the current environment supports WebGL
function detectWebGL() {
  if (typeof window === "undefined") return true; // SSR fallback
  try {
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    return !!gl;
  } catch {
    return false;
  }
}

// Fallback UI: plain-text resume (read from content.js)
function FallbackResume() {
  const { name, role, about, skills, projects, contact } = profile;
  return (
    <div className="mx-auto max-w-2xl px-6 py-12 text-neutral-200">
      <p className="text-xs uppercase tracking-widest text-neutral-500">
        Hello, I'm
      </p>
      <h1 className="mt-1 text-3xl font-bold text-neutral-50">{name}</h1>
      <p className="text-violet-300">{role}</p>

      <p className="mt-6 text-sm text-neutral-400">
        Your browser doesn't support WebGL. Here's the plain-text version of the resume.
      </p>

      {about?.paragraphs && (
        <section className="mt-6">
          <h2 className="mb-2 text-sm font-semibold uppercase tracking-widest text-neutral-400">
            About
          </h2>
          <div className="space-y-2 text-sm leading-relaxed">
            {about.paragraphs.map((p, i) => (
              <p key={i}>
                <Highlight text={p} />
              </p>
            ))}
          </div>
        </section>
      )}

      {skills?.groups && (
        <section className="mt-8">
          <h2 className="mb-2 text-sm font-semibold uppercase tracking-widest text-neutral-400">
            Skills
          </h2>
          {skills.groups.map((g) => (
            <div key={g.title} className="mb-3">
              <p className="text-sm font-medium text-neutral-200">{g.title}</p>
              <p className="text-sm text-neutral-400">
                {g.items.map((i) => i.name).join(" · ")}
              </p>
            </div>
          ))}
        </section>
      )}

      {projects?.length > 0 && (
        <section className="mt-8">
          <h2 className="mb-2 text-sm font-semibold uppercase tracking-widest text-neutral-400">
            Projects
          </h2>
          <div className="space-y-3">
            {projects.map((p, i) => (
              <div key={i}>
                <p className="text-sm font-medium text-neutral-100">{p.title}</p>
                <p className="text-sm text-neutral-400">{p.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {contact && (
        <section className="mt-8">
          <h2 className="mb-2 text-sm font-semibold uppercase tracking-widest text-neutral-400">
            Contact
          </h2>
          <a
            href={`mailto:${contact.email}`}
            className="text-sm text-violet-300"
          >
            {contact.email}
          </a>
        </section>
      )}
    </div>
  );
}

// Wrapper component: falls back to text version when WebGL is unavailable
export default function WebGLGuard({ children }) {
  const [supported, setSupported] = useState(null);

  useEffect(() => {
    setSupported(detectWebGL());
  }, []);

  // Initial state: render null to avoid flicker
  if (supported === null) return null;
  if (!supported) {
    return (
      <div className="h-screen w-screen overflow-auto bg-neutral-950">
        <FallbackResume />
      </div>
    );
  }
  return children;
}
