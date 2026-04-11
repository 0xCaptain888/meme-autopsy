import { useI18n } from "@/lib/i18n";

export default function ThesisBlock() {
  const { t } = useI18n();
  return (
    <section className="relative py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="w-10 h-px bg-verdict-critical mb-8" />
        <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-verdict-critical block mb-4">
          {`// ${t("thesis.label")}`}
        </span>
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-bone mb-5 leading-tight">
          {t("thesis.title")}
        </h2>
        <p className="font-body text-base text-forensic-text leading-relaxed max-w-xl mb-8">
          {t("thesis.body")}
        </p>
        <div className="w-10 h-px bg-forensic-border" />
      </div>
    </section>
  );
}
