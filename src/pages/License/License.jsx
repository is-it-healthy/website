import { useEffect } from "react";
import { Link } from "react-router-dom";

const License = () => {
  useEffect(() => {
    document.title = `License | is it healthy?`;
  });

  return (
    <div className="relative overflow-x-hidden bg-black text-slate-100">
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
            <h2 className="text-xl font-semibold text-slate-100">MIT license</h2>
            <p className="mt-3 text-sm text-slate-400">
              Everything in the app—UI, source code, and core project assets—is released under
              the MIT license. You’re free to use, modify, and distribute it with attribution.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-slate-300">
              <li>• Permissive use for personal and commercial projects.</li>
              <li>• Attribution required when reusing or redistributing.</li>
              <li>• Contributions are welcome via pull requests.</li>
            </ul>
          </div>

          <div className="rounded-3xl border border-purple-900/40 bg-[#0f0f14] p-6 shadow-2xl shadow-purple-900/20">
            <h2 className="text-xl font-semibold text-slate-100">Community data aggregation</h2>
            <p className="mt-3 text-sm text-slate-400">
              Additive data is manually aggregated by individual contributors from public sources
              across the web. Each additive card includes references, and credit is given wherever
              sources are used.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-slate-300">
              <li>• Sources are linked and attributed in additive detail cards.</li>
              <li>• Data is provided as-is and may change over time.</li>
              <li>• Corrections and additions are welcome via support.</li>
            </ul>
          </div>
        </section>

        <section className="mt-10 grid gap-6 lg:grid-cols-3">
          {[
            {
              title: "What’s covered",
              text: "MIT applies to the application code, UI components, and project assets unless otherwise noted.",
            },
            {
              title: "What’s not",
              text: "Third‑party trademarks, brand names, and original source texts remain with their owners.",
            },
            {
              title: "Responsible use",
              text: "Use the data for informational purposes and verify critical details with primary sources.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-3xl border border-purple-900/40 bg-black/60 p-6 shadow-2xl shadow-purple-900/20"
            >
              <div className="text-sm font-semibold text-slate-100">{item.title}</div>
              <div className="mt-3 text-sm text-slate-400">{item.text}</div>
            </div>
          ))}
        </section>

        <section className="mt-10 grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-purple-900/40 bg-[#0f0f14] p-6 shadow-2xl shadow-purple-900/20">
            <h2 className="text-xl font-semibold text-slate-100">Contributing data</h2>
            <p className="mt-3 text-sm text-slate-400">
              Contributions are curated to keep entries consistent and well‑sourced. Submit new
              additives, corrections, or links with clear citations.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-slate-300">
              <li>• Include at least one reputable source link.</li>
              <li>• Note regional differences or bans explicitly.</li>
              <li>• Keep names and aliases structured and readable.</li>
            </ul>
          </div>

          <div className="rounded-3xl border border-purple-900/40 bg-black/60 p-6 shadow-2xl shadow-purple-900/20">
            <h2 className="text-xl font-semibold text-slate-100">Third‑party libraries</h2>
            <p className="mt-3 text-sm text-slate-400">
              This project relies on open source libraries. Each library maintains its own license.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-slate-300">
              <li>• Review licenses for bundled dependencies.</li>
              <li>• Follow each library’s attribution requirements.</li>
              <li>• See the repository for a full list of dependencies.</li>
            </ul>
          </div>
        </section>

        <section className="mt-10">
          <div className="rounded-3xl border border-purple-900/40 bg-[#0f0f14] p-6 shadow-2xl shadow-purple-900/20">
            <h2 className="text-xl font-semibold text-slate-100">Summary</h2>
            <p className="mt-3 text-sm text-slate-400">
              MIT covers the app. Data is community‑aggregated with source credit provided in each
              additive entry. If you need clarification or to report attribution issues, contact us.
            </p>
          </div>
        </section>
        <section className="mt-10 grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-purple-900/40 bg-[#0f0f14] p-6 shadow-2xl shadow-purple-900/20">
            <h2 className="text-xl font-semibold text-slate-100">Attribution & credits</h2>
            <p className="mt-3 text-sm text-slate-400">
              We recognize the work of public institutions, researchers, and community contributors.
              Source links are included to ensure proper credit and verifiability.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-slate-300">
              <li>• Credit is included for source material in each additive entry.</li>
              <li>• Contributors can submit new sources with citations.</li>
              <li>• If any attribution is missing, contact support to resolve it.</li>
            </ul>
          </div>

          <div className="rounded-3xl border border-purple-900/40 bg-black/60 p-6 shadow-2xl shadow-purple-900/20">
            <h2 className="text-xl font-semibold text-slate-100">Usage notes</h2>
            <p className="mt-3 text-sm text-slate-400">
              The platform is informational and should not replace professional advice. Always
              confirm critical decisions with official regulators and primary sources.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-slate-300">
              <li>• Verify claims with official regulatory bodies.</li>
              <li>• Use with caution for medical or dietary decisions.</li>
              <li>• Contact support if you spot inaccuracies.</li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
};

export { License };
