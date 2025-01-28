import { useState, useEffect } from "react";
import { insDataSections } from "../../../utils/consts";
import { formatTextWithLineBreaks } from "../../../utils/support";

const Card = ({ item }) => {
  const [cardData, setCardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(item.url);
        if (!response.ok) {
          throw new Error(`Error fetching ${response.url}: ${response.statusText}`);
        }
        const data = await response.json();
        setCardData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [item.url]);

  return (
    <div className="card card-compact bg-base-100 shadow-xl w-full">
      <div className="card-body">
        {loading ? (
          <div className="flex justify-center items-center py-4">
            <span className="loading loading-spinner loading-lg"></span>
            <span className="ml-2">Loading details...</span>
          </div>
        ) : error ? (
          <>
            <div className="card-title">Unable to fetch {item.label}</div>
            <div>{error}</div>
          </>
        ) : (
          <>
            {/* Main Stuff */}
            <div className="card-title">{cardData.display_name}</div>
            <div>{cardData.names}</div>
            <div>{cardData.more_info?.banned_in}</div>

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
            {cardData.more_info?.articles && (
              <div className="card-actions flex justify-start items-center">
                <div className="text-md font-medium">Learn More: </div>
                {Object.entries(cardData.more_info?.articles ?? {}).map(
                  ([name, url]) => (
                    <a
                      key={url}
                      className="link"
                      href={url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {name}
                    </a>
                  )
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export { Card };
