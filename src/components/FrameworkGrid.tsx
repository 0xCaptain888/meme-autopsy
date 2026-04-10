"use client";

const dimensions = [
  {
    num: "01",
    name: "Symbolic Density",
    description: "How layered and resonant are the core symbols?",
  },
  {
    num: "02",
    name: "Lore Depth",
    description: "How rich and self-sustaining is the mythology?",
  },
  {
    num: "03",
    name: "Ritual Repeatability",
    description: "Can community behaviors become recurring rituals?",
  },
  {
    num: "04",
    name: "Community Cohesion",
    description: "How strong is the in-group identity and belonging?",
  },
  {
    num: "05",
    name: "Belief Elasticity",
    description: "Can the narrative absorb contradiction and evolve?",
  },
  {
    num: "06",
    name: "Narrative Survivability",
    description: "Will the story endure beyond the initial wave?",
  },
];

export default function FrameworkGrid() {
  return (
    <section className="relative py-20 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-verdict-critical">
            // FORENSIC FRAMEWORK
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold mt-3 mb-4">
            Six-Dimension Diagnostic Engine
          </h2>
          <p className="font-body text-forensic-text max-w-xl mx-auto">
            Every meme project is evaluated across six structural dimensions that determine its cultural survivability.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {dimensions.map((dim, i) => (
            <div
              key={dim.num}
              className="reveal group relative bg-forensic-panel border border-forensic-border rounded-sm p-6 hover:border-verdict-critical/30 transition-all duration-500"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              {/* Number */}
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-3xl font-bold text-forensic-border group-hover:text-verdict-critical/40 transition-colors">
                  {dim.num}
                </span>
                <div className="w-2 h-2 rounded-full bg-verdict-critical/30 group-hover:bg-verdict-critical/60 transition-colors" />
              </div>

              {/* Name */}
              <h3 className="font-mono text-sm font-medium text-bone mb-2 tracking-tight">
                {dim.name}
              </h3>

              {/* Description */}
              <p className="font-body text-xs text-forensic-text leading-relaxed">
                {dim.description}
              </p>

              {/* Bottom accent on hover */}
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-verdict-critical/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
