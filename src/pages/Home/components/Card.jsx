import { insDataSections } from "../../../utils/consts";
import { formatTextWithLineBreaks } from "../../../utils/support";
import useLoadJson from "../../../hooks/useLoadJson";

const Card = ({ item }) => {
  const { data: cardData, loading, error } = useLoadJson(item.url);

  return (
    <div className="card card-compact bg-base-100 shadow-xl w-full">
      <div className="card-body">
        {loading ? (
          <div className="flex flex-col center gap-4 py-4 px-7 pt-10">
            <div className="skeleton h-8 w-1/2"></div>
            <div className="skeleton h-4 w-3/4"></div>
            <div className="skeleton h-4 w-3/4"></div>
            <div className="skeleton h-16 w-full"></div>
            <div className="skeleton h-16 w-full"></div>
            <div className="skeleton h-16 w-full"></div>
          </div>
        ) : error ? (
          <>
            <div className="card-title text-error">
              Error loading data for {item.label}
            </div>
            <div className="text-sm text-gray-500">{error}</div>
          </>
        ) : cardData ? (
          <>
            {/* Main Info */}
            <div className="card-title">{cardData.display_name || item.label}</div>
            <div>{cardData.names || "No names available"}</div>
            <div>{cardData.more_info?.banned_in || "No banned regions specified"}</div>

            {/* More Info */}
            {insDataSections.map(
              (section) =>
                cardData.more_info?.[section.key] && (
                  <div
                    key={section.key}
                    className="collapse collapse-arrow border-base-300 bg-base-200 border"
                  >
                    <input
                      type="checkbox"
                      defaultChecked={section.key === "side_effects"}
                    />
                    <div className="collapse-title text-md font-medium">
                      {section.title}
                    </div>
                    <div className="collapse-content">
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
                <div className="text-md font-medium">Learn More: </div>
                {Object.entries(cardData.more_info?.articles).map(([name, url]) => (
                  <a
                    key={url}
                    className="link"
                    href={url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {name}
                  </a>
                ))}
              </div>
            ) : (
              <div className="text-gray-500">No articles available.</div>
            )}
          </>
        ) : (
          <div className="text-gray-500">No data available for {item.label}.</div>
        )}
      </div>
    </div>
  );
};

export { Card };
