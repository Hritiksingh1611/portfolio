"use client";

import { Github, Linkedin, Mail, ArrowUpRight } from "lucide-react";

const XIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const links = [
  { label: "About",      href: "#about" },
  { label: "Skills",     href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects",   href: "#projects" },
  { label: "Contact",    href: "#contact" },
];

const socials = [
  { icon: Github,   label: "GitHub",   href: "https://github.com/Hritiksingh1611" },
  { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com/in/hritik-singh-304450206" },
  { icon: XIcon,    label: "X",        href: "https://x.com/Hritik1611" },
  { icon: Mail,     label: "Email",    href: "mailto:hritik16.work@gmail.com" },
];

export default function Footer() {
  const scrollTo = (href: string) => {
    const el = document.querySelector(href) as HTMLElement | null;
    if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: "smooth" });
  };

  return (
    <footer className="relative z-10 border-t border-white/8 mt-8">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid sm:grid-cols-3 gap-8 mb-10">
          {/* Brand */}
          <div>
            <span className="font-display font-black text-2xl text-gradient tracking-tight">HS</span>
            <p className="text-neutral-500 text-sm mt-2 leading-relaxed max-w-xs">
              Data Engineer based in Kolkata, India. Building scalable pipelines and cloud data solutions.
            </p>
          </div>

          {/* Nav links */}
          <div>
            <p className="text-xs text-neutral-600 uppercase tracking-widest mb-4">Navigation</p>
            <ul className="space-y-2">
              {links.map(({ label, href }) => (
                <li key={label}>
                  <button
                    onClick={() => scrollTo(href)}
                    className="text-sm text-neutral-500 hover:text-neutral-200 transition-colors"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-xs text-neutral-600 uppercase tracking-widest mb-4">Contact</p>
            <a
              href="mailto:hritik16.work@gmail.com"
              className="text-sm text-neutral-500 hover:text-indigo-400 transition-colors flex items-center gap-1 group"
            >
              hritik16.work@gmail.com
              <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
            <p className="text-sm text-neutral-600 mt-1">Kolkata, India</p>

            <div className="flex gap-3 mt-5">
              {socials.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="p-2 rounded-lg text-neutral-600 hover:text-neutral-300 hover:bg-white/8 transition-all duration-200 border border-white/6 hover:border-white/16"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/6 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-neutral-600">
          <span>© {new Date().getFullYear()} Hritik Singh. All rights reserved.</span>
          <span>Built with Next.js 15 · Tailwind CSS · Framer Motion</span>
        </div>
      </div>
    </footer>
  );
}
