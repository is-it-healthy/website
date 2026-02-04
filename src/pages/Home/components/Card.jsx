import { insDataSections } from "../../../utils/consts";
import { formatTextWithLineBreaks } from "../../../utils/support";
import useLoadJson from "../../../hooks/useLoadJson";

const Card = ({ item }) => {
  const { data: cardData, loading, error } = useLoadJson(item.url);

  return (
    <div className="card card-compact w-full border border-purple-900/40 bg-[#0f0f14] shadow-xl shadow-purple-900/30 backdrop-blur transition hover:-translate-y-0.5 hover:shadow-2xl">
      <div className="card-body">
        {loading ? (
          <div className="flex flex-col center gap-4 py-4 px-7 pt-10">
            <div className="skeleton h-8 w-1/2 bg-purple-900/40"></div>
            <div className="skeleton h-4 w-3/4 bg-purple-900/40"></div>
            <div className="skeleton h-4 w-3/4 bg-purple-900/40"></div>
            <div className="skeleton h-16 w-full bg-purple-900/40"></div>
            <div className="skeleton h-16 w-full bg-purple-900/40"></div>
            <div className="skeleton h-16 w-full bg-purple-900/40"></div>
            <div className="skeleton h-4 w-3/4 bg-purple-900/40"></div>
          </div>
        ) : error ? (
          <>
            <div className="card-title text-red-300">
              Error loading data for {item.label}
            </div>
            <div className="text-sm text-slate-500">{error}</div>
          </>
        ) : cardData ? (
          <>
            {/* Main Info */}
            <div className="card-title text-slate-100">
              {cardData.display_name || item.label}
            </div>
            {(cardData.function ? (
              <div className="text-sm text-slate-400">
                Function: {cardData.function}
              </div>
            ) : (
            <></>
            ))}
            <div className="text-sm text-slate-300">
              {cardData.names || "No names available"}
            </div>
            <div className="text-sm text-slate-400">
              {cardData.more_info?.banned_in || "No banned regions specified"}
            </div>

            {/* More Info */}
            {insDataSections.map(
              (section) =>
                cardData.more_info?.[section.key] && (
                  <div
                    key={section.key}
                    className="collapse collapse-arrow border border-purple-900/40 bg-black/50"
                  >
                    <input
                      type="checkbox"
                      defaultChecked={section.key === "side_effects"}
                    />
                    <div className="collapse-title text-md font-medium text-slate-200">
                      {section.title}
                    </div>
                    <div className="collapse-content text-sm text-slate-300">
                      <p
                        dangerouslySetInnerHTML={{
                          __html: formatTextWithLineBreaks(
                            cardData.more_info[section.key]
                          ),
                        }}
                      />
                    </div>
                  </div>
                )
            )}

            {/* Articles / Learn More */}
            {cardData.more_info?.articles ? (
              <div className="card-actions flex justify-start items-center">
                <div className="text-md font-medium text-slate-200">Learn More: </div>
                {Object.entries(cardData.more_info?.articles).map(([name, url]) => (
                  <a
                    key={url}
                    className="link text-purple-300"
                    href={url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {name}
                  </a>
                ))}
              </div>
            ) : (
              <div className="text-sm text-slate-500">No articles available.</div>
            )}
          </>
        ) : (
          <div className="text-sm text-slate-500">
            No data available for {item.label}.
          </div>
        )}
      </div>
    </div>
  );
};

export { Card };
