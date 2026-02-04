import { insDataSections } from "../../../utils/consts";
import { formatTextWithLineBreaks } from "../../../utils/support";
import useLoadJson from "../../../hooks/useLoadJson";

const Card = ({ item }) => {
  const { data: cardData, loading, error } = useLoadJson(item.url);

  return (
    <div className="group w-full rounded-2xl border border-purple-900/40 bg-[#0f0f14] p-5 shadow-xl shadow-purple-900/30 transition hover:-translate-y-0.5 hover:shadow-2xl">
        {loading ? (
          <div className="space-y-3">
            <div className="h-6 w-1/2 animate-pulse rounded-full bg-purple-900/40"></div>
            <div className="h-4 w-3/4 animate-pulse rounded-full bg-purple-900/40"></div>
            <div className="h-4 w-2/3 animate-pulse rounded-full bg-purple-900/40"></div>
            <div className="h-20 w-full animate-pulse rounded-xl bg-purple-900/40"></div>
            <div className="h-20 w-full animate-pulse rounded-xl bg-purple-900/40"></div>
            <div className="h-4 w-3/5 animate-pulse rounded-full bg-purple-900/40"></div>
          </div>
        ) : error ? (
          <>
            <div className="text-lg font-semibold text-red-300">
              Error loading data for {item.label}
            </div>
            <div className="text-sm text-slate-500">{error}</div>
          </>
        ) : cardData ? (
          <>
            {/* Main Info */}
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-lg font-semibold text-slate-100">
                  {cardData.display_name || item.label}
                </div>
                <div className="mt-1 text-xs uppercase tracking-wider text-purple-300">
                  {item.value}
                </div>
              </div>
              <span className="rounded-full border border-purple-800/50 bg-purple-900/30 px-3 py-1 text-xs font-semibold text-purple-200">
                INS
              </span>
            </div>
            {(cardData.function ? (
              <div className="mt-2 inline-flex items-center gap-2 rounded-full border border-purple-800/40 bg-black/40 px-3 py-1 text-xs text-slate-300">
                Function: <span className="text-slate-200">{cardData.function}</span>
              </div>
            ) : (
            <></>
            ))}
            <div className="mt-3 text-sm text-slate-300">
              {cardData.names || "No names available"}
            </div>
            <div className="mt-1 text-sm text-slate-400">
              {cardData.more_info?.banned_in || "No banned regions specified"}
            </div>

            {/* More Info */}
            <div className="mt-4 space-y-3">
              {insDataSections.map(
                (section) =>
                  cardData.more_info?.[section.key] && (
                    <details
                      key={section.key}
                      className="group/section rounded-xl border border-purple-900/40 bg-black/40 transition hover:border-purple-700/60"
                      open={section.key === "side_effects"}
                    >
                      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 text-sm font-semibold text-slate-200">
                        {section.title}
                        <span className="text-purple-300 transition group-open/section:rotate-180">
                          ▼
                        </span>
                      </summary>
                      <div className="border-t border-purple-900/40 px-4 pb-4 pt-3 text-sm text-slate-300">
                        <p
                          dangerouslySetInnerHTML={{
                            __html: formatTextWithLineBreaks(
                              cardData.more_info[section.key]
                            ),
                          }}
                        />
                      </div>
                    </details>
                  )
              )}
            </div>

            {/* Articles / Learn More */}
            {cardData.more_info?.articles ? (
              <div className="mt-4">
                <div className="text-sm font-semibold text-slate-200">Learn More</div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {Object.entries(cardData.more_info?.articles).map(([name, url]) => (
                    <a
                      key={url}
                      className="rounded-full border border-purple-800/50 bg-purple-900/30 px-3 py-1 text-xs font-semibold text-purple-200 transition hover:border-purple-600/70 hover:text-white"
                      href={url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {name}
                    </a>
                  ))}
                </div>
              </div>
            ) : (
              <div className="mt-3 text-sm text-slate-500">No articles available.</div>
            )}
          </>
        ) : (
          <div className="text-sm text-slate-500">
            No data available for {item.label}.
          </div>
        )}
    </div>
  );
};

export { Card };
