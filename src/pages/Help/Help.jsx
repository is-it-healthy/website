import { useEffect } from "react";
import { Link } from "react-router-dom";

const Help = () => {
  useEffect(() => {
    document.title = `Help | is it healthy?`;
  });

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-black text-slate-100">
      <div className="pointer-events-none absolute -top-28 right-[-4rem] h-80 w-80 rounded-full bg-purple-600/25 blur-3xl animate-float-slow" />
      <div className="pointer-events-none absolute left-[-5rem] top-56 h-72 w-72 rounded-full bg-fuchsia-500/15 blur-3xl animate-float-reverse" />
      <div className="pointer-events-none absolute bottom-[-12rem] right-1/2 h-96 w-96 rounded-full bg-violet-500/10 blur-[140px] animate-shimmer" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(124,58,237,0.12),transparent_40%),radial-gradient(circle_at_85%_15%,rgba(217,70,239,0.12),transparent_35%),radial-gradient(circle_at_35%_85%,rgba(147,51,234,0.12),transparent_45%)]" />

      <div className="mx-auto max-w-5xl px-6 py-16 lg:py-20">
        <div className="rounded-3xl border border-purple-900/40 bg-[#0f0f14] p-8 shadow-2xl shadow-purple-900/30">
          <span className="text-xs font-semibold uppercase tracking-widest text-purple-300">
            Help & Support
          </span>
          <h1 className="mt-3 text-3xl font-semibold text-slate-100 lg:text-4xl">
            We’re here to help.
          </h1>
          <p className="mt-4 max-w-2xl text-sm text-slate-400">
            Find answers about scanning, data sources, and troubleshooting. If you’re stuck,
            contact us and we’ll get back to you quickly.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="mailto:support@isithealthy.app"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-fuchsia-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-purple-900/40 transition-all duration-300 hover:scale-[1.02] hover:shadow-purple-900/70 hover:brightness-110 active:translate-y-0 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/70"
            >
              Contact support
            </a>
            <Link
              to="/app"
              className="inline-flex items-center gap-2 rounded-xl border border-purple-800/50 bg-black/40 px-5 py-2.5 text-sm font-semibold text-purple-200 transition-all duration-300 hover:scale-[1.02] hover:border-purple-600/70 hover:bg-purple-900/20 hover:text-white active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/70"
            >
              Open the app
            </Link>
          </div>
        </div>

        <section className="mt-10 grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-purple-900/40 bg-black/60 p-6 shadow-2xl shadow-purple-900/20">
            <h2 className="text-xl font-semibold text-slate-100">How it works</h2>
            <p className="mt-3 text-sm text-slate-400">
              Upload or scan an ingredient label, confirm matches, and explore additive details.
            </p>
            <div className="mt-4 space-y-3 text-sm text-slate-300">
              {[
                "Use the camera button to scan a label.",
                "Review OCR matches and select additives.",
                "Open cards for bans, side effects, and sources.",
              ].map((item, index) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-xl border border-purple-900/40 bg-black/40 px-4 py-3"
                >
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-purple-900/40 text-xs font-semibold text-purple-200">
                    {index + 1}
                  </span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-purple-900/40 bg-[#0f0f14] p-6 shadow-2xl shadow-purple-900/20">
            <h2 className="text-xl font-semibold text-slate-100">Common questions</h2>
            <div className="mt-4 space-y-3">
              {[
                {
                  q: "Why is an additive missing?",
                  a: "Some labels use alternate names. Try manual search or add the INS code.",
                },
                {
                  q: "What are the sources?",
                  a: "We link to public references inside each additive card.",
                },
                {
                  q: "Is OCR accurate?",
                  a: "OCR quality depends on lighting and label clarity. Crop the image if needed.",
                },
              ].map((item) => (
                <details
                  key={item.q}
                  className="rounded-2xl border border-purple-900/40 bg-black/50 px-4 py-3"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-semibold text-slate-200">
                    {item.q}
                    <span className="text-xs text-purple-300">+</span>
                  </summary>
                  <p className="mt-3 text-xs text-slate-400">{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export { Help };
