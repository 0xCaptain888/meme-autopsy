import { useI18n } from "@/lib/i18n";

interface NavbarProps {
  onNewCase?: () => void;
}

export default function Navbar({ onNewCase }: NavbarProps) {
  const { t } = useI18n();
  return (
    <nav className="fixed top-0 left-0 right-0 z-40 border-b border-forensic-border/50 bg-background/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 border border-verdict-critical/60 rounded-sm flex items-center justify-center">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-verdict-critical">
              <path d="M7 1v12M1 7h12M3 3l8 8M11 3l-8 8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
          </div>
          <div>
            <span className="font-mono text-sm font-semibold tracking-widest text-bone">
              {t("nav.title")}
            </span>
            <span className="hidden sm:inline ml-3 font-mono text-[10px] tracking-wider text-forensic-muted uppercase">
              {t("nav.tagline")}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {onNewCase && (
            <button
              onClick={onNewCase}
              className="font-mono text-xs text-forensic-text hover:text-bone transition-colors"
            >
              + REGISTER NEW CASE
            </button>
          )}
          <LanguageSwitcher />
        </div>
      </div>
    </nav>
  );
}

function LanguageSwitcher() {
  const { lang, setLang } = useI18n();
  return (
    <button
      onClick={() => setLang(lang === "en" ? "zh" : "en")}
      className="font-mono text-[10px] tracking-wider text-forensic-muted hover:text-bone transition-colors uppercase border border-forensic-border rounded-sm px-2 py-1"
    >
      {lang === "en" ? "中文" : "EN"}
    </button>
  );
}
