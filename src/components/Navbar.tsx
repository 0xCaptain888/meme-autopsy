"use client";

import LanguageSwitcher from "./LanguageSwitcher";

interface NavbarProps {
  onNewCase?: () => void;
}

export default function Navbar({ onNewCase }: NavbarProps) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-40 border-b border-forensic-border/50 bg-forensic-black/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Logo mark */}
          <div className="w-7 h-7 border border-verdict-critical/60 rounded-sm flex items-center justify-center">
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              className="text-verdict-critical"
            >
              <path
                d="M7 1v12M1 7h12M3 3l8 8M11 3l-8 8"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <div>
            <span className="font-mono text-sm font-semibold tracking-widest text-bone">
              MEME AUTOPSY
            </span>
            <span className="hidden sm:inline ml-3 font-mono text-[10px] tracking-wider text-forensic-muted uppercase">
              Forensic Intelligence Engine
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={onNewCase}
            className="hidden sm:block font-mono text-xs text-forensic-text hover:text-bone transition-colors"
          >
            + NEW CASE
          </button>
          <LanguageSwitcher />
        </div>
      </div>
    </nav>
  );
}
