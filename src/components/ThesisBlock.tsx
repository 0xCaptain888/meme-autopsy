import { useI18n } from "@/lib/i18n";

export default function ThesisBlock() {
  const { t } = useI18n();
  return (
    <section className="relative py-24 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <div className="w-12 h-px bg-verdict-critical mx-auto mb-8" />
        <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-verdict-critical block mb-4">
          {`// ${t("thesis.label")}`}
        </span>
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-bone mb-6 leading-tight">
          {t("thesis.title")}
        </h2>
        <p className="font-body text-lg sm:text-xl text-forensic-text leading-relaxed max-w-xl mx-auto mb-8">
          {t("thesis.body")}
        </p>
        <div className="w-12 h-px bg-forensic-border mx-auto" />
      </div>
    </section>
  );
}
