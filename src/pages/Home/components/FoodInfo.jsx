import { useState, useEffect } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import useLoadJson from "../../../hooks/useLoadJson";
import { formatTextWithLineBreaks } from "../../../utils/support";
import { insDataSections, reactSelectCustomOptions } from "../../../utils/consts";

const FoodInfo = () => {
  const [selectedData, setSelectedData] = useState([]);
  const {
    data: fetchedListData,
    fetchedListLoading,
    fetchedListError,
  } = useLoadJson(
    "https://raw.githubusercontent.com/is-it-healthy/data/refs/heads/v2/dist/ins-summary.json"
  );
  const {
    data: fetchedAllData,
    fetchedAllLoading,
    fetchedAllError,
  } = useLoadJson(selectedData);

  const animatedComponents = makeAnimated();

  console.log(fetchedAllData)

  return (
    <>
      <div className="container mx-auto">
        <div>
          {fetchedListLoading ? (
            <div className="flex justify-center items-center py-4">
              <span className="loading loading-spinner loading-lg"></span>
              <span className="ml-2">Loading options...</span>
            </div>
          ) : fetchedListError ? (
            <div className="alert alert-error shadow-lg">
              <span>Error loading options: {fetchedListError}</span>
            </div>
          ) : (
            <Select
              className="shadow-xl"
              closeMenuOnSelect={false}
              components={animatedComponents}
              defaultValue={[]}
              isMulti
              options={fetchedListData?.map((item) => ({
                value: item.code,
                label: item.name,
                url: `https://raw.githubusercontent.com/is-it-healthy/data/v2/dist/single/${item.code}.json`,
              }))}
              onChange={setSelectedData}
              value={selectedData}
              styles={reactSelectCustomOptions}
            />
          )}
        </div>

        <div className="mt-10">
          {fetchedAllLoading ? (
            <div className="flex justify-center items-center py-4">
              <span className="loading loading-spinner loading-lg"></span>
              <span className="ml-2">Loading details...</span>
            </div>
          ) : fetchedAllError ? (
            <div className="alert alert-error shadow-lg">
              <span>Error loading details: {fetchedAllError}</span>
            </div>
          ) : fetchedAllData?.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {fetchedAllData.map((item) => (
                <div
                  className="card card-compact bg-base-100 shadow-xl w-full"
                  key={item.code}
                >
                  <div className="card-body">
                    {item.error ? (
                      <>
                        <div className="card-title">Unable to fetch {item.item.label}</div>
                        <div>{item.error}</div>
                      </>
                    ) : (
                      <>
                        {/* Main Stuff */}
                        <div className="card-title">{item.display_name}</div>
                        <div>{item.names}</div>
                        <div>{item.more_info?.banned_in}</div>

                        {/* More Info */}
                        {insDataSections.map(
                          (section) =>
                            item.more_info?.[section.key] && (
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
                                        item.more_info[section.key]
                                      ),
                                    }}
                                  />
                                </div>
                              </div>
                            )
                        )}

                        {/* Articles / Learn More */}
                        <div className="card-actions flex justify-start items-center">
                          <div className="text-md font-medium">Learn More: </div>
                          {Object.entries(item.more_info?.articles ?? {}).map(
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
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500">No data found.</div>
          )}
        </div>
      </div>
    </>
  );
};

export { FoodInfo };
