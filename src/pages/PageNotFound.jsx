import { House, Search } from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => {

  useEffect(() => {
    document.title = `Page Not Found! | is it healthy?`
  })

  return (
    <>
      <div className="relative min-h-screen bg-black text-slate-100">
        <div className="pointer-events-none absolute -top-24 right-0 h-72 w-72 rounded-full bg-purple-600/20 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 left-0 h-64 w-64 rounded-full bg-fuchsia-500/10 blur-3xl" />

        <div className="mx-auto flex min-h-screen max-w-5xl items-center px-6 py-16">
          <div className="grid w-full gap-10 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-purple-800/50 bg-purple-900/30 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-purple-200">
                Error 404
              </span>
              <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-100 lg:text-5xl">
                Page not found
              </h1>
              <p className="mt-4 max-w-xl text-sm text-slate-400 lg:text-base">
                The page you requested doesn't exist or may have been moved. Check the URL,
                or head back to the home page to continue exploring additives.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  to="/app"
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-fuchsia-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-purple-900/40 transition-all duration-300 hover:scale-[1.02] hover:shadow-purple-900/70 hover:brightness-110 active:translate-y-0 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/70"
                >
                  <Search className="text-base" />
                  Lookup
                </Link>
                <a
                  href="mailto:support@isithealthy.app"
                  className="inline-flex items-center gap-2 rounded-xl border border-purple-800/50 bg-black/40 px-4 py-2 text-sm font-semibold text-purple-200 transition-all duration-300 hover:scale-[1.02] hover:border-purple-600/70 hover:bg-purple-900/20 hover:text-white active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/70"
                >
                  <House className="text-base" />
                  Back to home
                </a>
              </div>
            </div>

            <div className="relative flex items-center justify-center">
              <div className="w-full rounded-3xl border border-purple-900/40 bg-[#0f0f14] p-8 shadow-2xl shadow-purple-900/30">
                <div className="flex items-center justify-between text-xs text-purple-300">
                  <span>Status</span>
                  <span className="rounded-full border border-purple-800/50 bg-purple-900/30 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider">
                    Missing route
                  </span>
                </div>
                <div className="mt-6 flex items-center justify-between">
                  <div>
                    <div className="text-5xl font-semibold text-slate-100">404</div>
                    <div className="mt-2 text-sm text-slate-400">No matching route found.</div>
                  </div>
                  <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-purple-600 to-fuchsia-500 shadow-lg shadow-purple-900/40" />
                </div>
                <div className="mt-6 space-y-2">
                  <div className="h-2 w-full rounded-full bg-purple-900/40">
                    <div className="h-2 w-2/3 rounded-full bg-purple-500" />
                  </div>
                  <div className="h-2 w-4/5 rounded-full bg-purple-900/40">
                    <div className="h-2 w-1/2 rounded-full bg-purple-700" />
                  </div>
                  <div className="h-2 w-2/3 rounded-full bg-purple-900/40">
                    <div className="h-2 w-1/3 rounded-full bg-fuchsia-500" />
                  </div>
                </div>
                <p className="mt-6 text-xs text-slate-500">
                  If this keeps happening, report the broken link so we can fix it.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export { PageNotFound }
