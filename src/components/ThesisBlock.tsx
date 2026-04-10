"use client";

export default function ThesisBlock() {
  return (
    <section className="relative py-24 px-4">
      <div className="max-w-3xl mx-auto text-center">
        {/* Decorative line */}
        <div className="w-12 h-px bg-verdict-critical mx-auto mb-8" />

        <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-verdict-critical block mb-4">
          // PRODUCT THESIS
        </span>

        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-bone mb-6 leading-tight">
          From generation to diagnosis
        </h2>

        <p className="font-body text-lg sm:text-xl text-forensic-text leading-relaxed max-w-xl mx-auto mb-8">
          Most meme tools help create narratives. Meme Autopsy helps explain why narratives fail.
        </p>

        {/* Decorative line */}
        <div className="w-12 h-px bg-forensic-border mx-auto" />
      </div>
    </section>
  );
}
