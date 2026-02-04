import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Camera, Sparkles, ShieldCheck, Stars } from "lucide-react";

const Landing = () => {
  useEffect(() => {
    document.title = `is it healthy?`;
  });

  return (
    <div className="relative min-h-screen bg-black text-slate-100">
      <div className="pointer-events-none absolute -top-24 right-0 h-72 w-72 rounded-full bg-purple-600/20 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-64 w-64 rounded-full bg-fuchsia-500/10 blur-3xl" />

      <div className="mx-auto flex min-h-screen max-w-6xl flex-col justify-between px-6 py-14 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-purple-800/50 bg-purple-900/30 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-purple-200">
              Food Additives Intelligence
            </span>
            <h1 className="mt-5 text-4xl font-semibold tracking-tight text-slate-100 lg:text-5xl">
              Know what’s inside your food.
            </h1>
            <p className="mt-4 max-w-xl text-sm text-slate-400 lg:text-base">
              Scan ingredient labels or search additives to view safety notes,
              banned regions, and curated references in seconds.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/app"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-fuchsia-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-purple-900/40 transition hover:brightness-110"
              >
                <Camera className="h-4 w-4" />
                Open Scanner
              </Link>
              <Link
                to="/app"
                className="inline-flex items-center gap-2 rounded-xl border border-purple-800/50 bg-black/40 px-5 py-2.5 text-sm font-semibold text-purple-200 transition hover:border-purple-600/70 hover:bg-purple-900/20"
              >
                Browse additives
              </Link>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {[
                {
                  title: "Camera + OCR",
                  text: "Scan labels and auto-detect additives.",
                  icon: <Camera className="h-4 w-4" />,
                },
                {
                  title: "Clear Signals",
                  text: "Side effects, bans, and usage context.",
                  icon: <ShieldCheck className="h-4 w-4" />,
                },
                {
                  title: "Fast Lookup",
                  text: "Manual search with smart matching.",
                  icon: <Sparkles className="h-4 w-4" />,
                },
                {
                  title: "Curated Sources",
                  text: "Reference links you can trust.",
                  icon: <Stars className="h-4 w-4" />,
                },
              ].map((card) => (
                <div
                  key={card.title}
                  className="rounded-2xl border border-purple-900/40 bg-[#0f0f14] p-4 shadow-xl shadow-purple-900/20 transition hover:-translate-y-0.5 hover:border-purple-700/60"
                >
                  <div className="flex items-center gap-2 text-sm font-semibold text-slate-100">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-purple-900/30 text-purple-300">
                      {card.icon}
                    </span>
                    {card.title}
                  </div>
                  <p className="mt-2 text-xs text-slate-400">{card.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="rounded-3xl border border-purple-900/40 bg-[#0f0f14] p-6 shadow-2xl shadow-purple-900/30">
              <div className="flex items-center justify-between text-xs text-purple-300">
                <span>Live Preview</span>
                <span className="rounded-full border border-purple-800/50 bg-purple-900/30 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider">
                  Beta
                </span>
              </div>
              <div className="mt-6 rounded-2xl border border-purple-900/40 bg-black/60 p-5">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-purple-600 to-fuchsia-500 shadow-lg shadow-purple-900/40" />
                  <div>
                    <div className="text-sm font-semibold text-slate-100">INS 330</div>
                    <div className="text-xs text-slate-400">Citric Acid</div>
                  </div>
                </div>
                <div className="mt-4 space-y-2 text-xs text-slate-400">
                  <div className="h-2 w-4/5 rounded-full bg-purple-900/40">
                    <div className="h-2 w-1/2 rounded-full bg-purple-500" />
                  </div>
                  <div className="h-2 w-3/4 rounded-full bg-purple-900/40">
                    <div className="h-2 w-2/5 rounded-full bg-fuchsia-500" />
                  </div>
                  <div className="h-2 w-2/3 rounded-full bg-purple-900/40">
                    <div className="h-2 w-1/3 rounded-full bg-purple-400" />
                  </div>
                </div>
                <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-purple-800/50 bg-purple-900/30 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-purple-200">
                  Example Result
                </div>
              </div>
              <div className="mt-6 grid gap-3 text-xs text-slate-400 sm:grid-cols-2">
                <div className="rounded-xl border border-purple-900/40 bg-black/40 p-3">
                  <div className="text-slate-200">Scan an ingredient list</div>
                  <div className="mt-1">Get instant matches and suggestions.</div>
                </div>
                <div className="rounded-xl border border-purple-900/40 bg-black/40 p-3">
                  <div className="text-slate-200">Select to learn more</div>
                  <div className="mt-1">Expand details per additive.</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-purple-900/40 pt-8 text-xs text-slate-500 lg:flex-row lg:items-center lg:justify-between">
          <span>Designed for quick, evidence-based ingredient checks.</span>
          <div className="flex gap-4">
            <span>Privacy-first OCR</span>
            <span>Open data sources</span>
            <span>Fast lookup</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export { Landing };
