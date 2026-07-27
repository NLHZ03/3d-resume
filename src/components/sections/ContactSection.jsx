import { useState } from "react";
import Highlight from "../Highlight";
import { profile } from "../../content";

// Bottom-center capsule — Contact
// Both email and WeChat are click-to-copy (email also remains a mailto link)
export default function ContactSection() {
  const { contact } = profile;
  const [copiedField, setCopiedField] = useState(null); // "email" | "wechat" | null
  if (!contact) return null;

  const copy = async (field, value) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    } catch {
      // fallback: do nothing
    }
  };

  return (
    <div className="pointer-events-auto absolute z-10 w-auto rounded-3xl border border-white/10 bg-white/5 p-5 text-center backdrop-blur-md md:p-6
                    left-4 right-4 bottom-4
                    md:bottom-8 md:left-1/2 md:right-auto md:w-full md:max-w-2xl md:-translate-x-1/2">
      <h2 className="text-sm font-semibold tracking-[0.3em] text-neutral-400 uppercase">
        Get in Touch
      </h2>

      {contact.invite && (
        <p className="mt-2 text-sm leading-relaxed text-neutral-300">
          <Highlight text={contact.invite} />
        </p>
      )}

      {/* Email: click to copy + still a mailto link */}
      {contact.email && (
        <div className="mt-3 flex items-center justify-center gap-2">
          <button
            onClick={() => copy("email", contact.email)}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-base font-medium text-neutral-50 transition-colors hover:bg-white/10 md:text-lg"
          >
            <span className="break-all">{contact.email}</span>
          </button>
          <a
            href={`mailto:${contact.email}`}
            className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-neutral-300 transition-colors hover:bg-white/10 hover:text-white"
            title="Open in mail app"
          >
            ✉
          </a>
        </div>
      )}
      {copiedField === "email" && (
        <p className="mt-1 text-xs text-violet-300">Email copied ✓</p>
      )}

      {/* WeChat: click to copy ID */}
      {contact.wechat && (
        <div className="mt-3 flex items-center justify-center gap-2 text-sm">
          <span className="text-neutral-400">WeChat:</span>
          <button
            onClick={() => copy("wechat", contact.wechat)}
            className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-medium text-neutral-200 transition-colors hover:bg-white/10 hover:text-white"
          >
            {copiedField === "wechat" ? "Copied ✓" : contact.wechat}
          </button>
        </div>
      )}
    </div>
  );
}
