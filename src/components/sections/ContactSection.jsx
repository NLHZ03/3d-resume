import Highlight from "../Highlight";
import { profile } from "../../content";

// Centered card — contact (large email + social links row + invite line)
export default function ContactSection() {
  const { contact } = profile;
  if (!contact) return null;

  return (
    <div className="pointer-events-auto absolute left-1/2 top-1/2 z-10 w-full max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-md">
      <h2 className="text-xs font-semibold tracking-[0.2em] text-neutral-400 uppercase">
        Get in Touch
      </h2>

      {contact.invite && (
        <p className="mt-3 text-sm leading-relaxed text-neutral-300">
          <Highlight text={contact.invite} />
        </p>
      )}

      {contact.email && (
        <a
          href={`mailto:${contact.email}`}
          className="mt-5 block break-all text-lg font-medium text-neutral-50 transition-colors hover:text-violet-300"
        >
          {contact.email}
        </a>
      )}

      {contact.socials?.length > 0 && (
        <div className="mt-5 flex items-center justify-center gap-2">
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
