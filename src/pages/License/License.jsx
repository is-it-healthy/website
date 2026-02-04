import { useEffect } from "react";
import { Link } from "react-router-dom";

const License = () => {
  useEffect(() => {
    document.title = `License | is it healthy?`;
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
            License
          </span>
          <h1 className="mt-3 text-3xl font-semibold text-slate-100 lg:text-4xl">
            Open data, open source.
          </h1>
          <p className="mt-4 max-w-2xl text-sm text-slate-400">
            The application is designed to be transparent. Here’s a simple summary of how the
            code and data are licensed.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to="/legal"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-fuchsia-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-purple-900/40 transition hover:brightness-110"
            >
              View legal
            </Link>
            <Link
              to="/app"
              className="inline-flex items-center gap-2 rounded-xl border border-purple-800/50 bg-black/40 px-5 py-2.5 text-sm font-semibold text-purple-200 transition hover:border-purple-600/70 hover:bg-purple-900/20"
            >
              Open the app
            </Link>
          </div>
        </div>

        <section className="mt-10 grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-purple-900/40 bg-black/60 p-6 shadow-2xl shadow-purple-900/20">
            <h2 className="text-xl font-semibold text-slate-100">Application code</h2>
            <p className="mt-3 text-sm text-slate-400">
              The app UI and source code are provided under an open source license. You can reuse
              and modify the code with attribution.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-slate-300">
              <li>• Permissive use for personal and commercial projects.</li>
              <li>• Attribution required when reusing or redistributing.</li>
              <li>• Contributions are welcome via pull requests.</li>
            </ul>
          </div>

          <div className="rounded-3xl border border-purple-900/40 bg-[#0f0f14] p-6 shadow-2xl shadow-purple-900/20">
            <h2 className="text-xl font-semibold text-slate-100">Data sources</h2>
            <p className="mt-3 text-sm text-slate-400">
              Additive information is collected from public sources and referenced in each card.
              Data is provided as-is and may change over time.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-slate-300">
              <li>• Source links are listed per additive.</li>
              <li>• Verify details with official regulators when needed.</li>
              <li>• Report corrections via support.</li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
};

export { License };
