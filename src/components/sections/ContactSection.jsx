import { useState } from "react";
import Highlight from "../Highlight";
import { profile } from "../../content";

// Bottom-center capsule — Contact
// WeChat ID shown with click-to-copy (no web protocol exists for WeChat)
export default function ContactSection() {
  const { contact } = profile;
  const [copied, setCopied] = useState(false);
  if (!contact) return null;

  const copyWeChat = async () => {
    try {
      await navigator.clipboard.writeText(contact.wechat);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback: do nothing, user can manually select
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

      {contact.email && (
        <a
          href={`mailto:${contact.email}`}
          className="mt-3 inline-block break-all text-lg font-medium text-neutral-50 transition-colors hover:text-violet-300 md:text-xl"
        >
          {contact.email}
        </a>
      )}

      {/* WeChat: click to copy ID */}
      {contact.wechat && (
        <div className="mt-3 flex items-center justify-center gap-2 text-sm">
          <span className="text-neutral-400">WeChat:</span>
          <button
            onClick={copyWeChat}
            className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-medium text-neutral-200 transition-colors hover:bg-white/10 hover:text-white"
          >
            {copied ? "Copied ✓" : contact.wechat}
          </button>
        </div>
      )}

      {contact.socials?.length > 0 && (
        <div className="mt-3 flex items-center justify-center gap-2">
          {contact.socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-neutral-300 transition-colors hover:bg-white/10 hover:text-white"
            >
              {social.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
