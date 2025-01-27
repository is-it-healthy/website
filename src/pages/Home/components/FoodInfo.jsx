import { useState, useEffect } from "react";
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import useLoadJson from "../../../hooks/useLoadJson";
import { formatTextWithLineBreaks } from "../../../utils/support"
import { insDataSections, reactSelectCustomOptions } from "../../../utils/consts";

const FoodInfo = () => {

  const [selectedData, setSelectedData] = useState([]);
  const { data: fetchedListData, fetchedListLoading, fetchedListError } = useLoadJson('https://raw.githubusercontent.com/is-it-healthy/data/refs/heads/v2/dist/ins-summary.json');
  const { data: fetchedAllData, fetchedAllLoading, fetchedAllError } = useLoadJson(selectedData);

  const animatedComponents = makeAnimated();

  return (
    <>
      <div className="container mx-auto">
        <div className="text-center">
          <div className="text-2xl">Food Info</div>
        </div>
        <div className="">
          <Select
            className="shadow-xl"
            closeMenuOnSelect={false}
            components={animatedComponents}
            defaultValue={[]}
            isMulti
            // bring from {code, name} to {value, label}
            // TODO: change the data later to remove this
            options={fetchedListData?.map((item) => ({
              value: item.code,
              label: item.name,
              url: `https://raw.githubusercontent.com/is-it-healthy/data/v2/dist/single/${item.code}.json`
            }))}
            onChange={setSelectedData}
            value={selectedData}
            styles={reactSelectCustomOptions}
          />
        </div>
        <div className="mt-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {fetchedAllData?.map((item) => (
              <div className="card card-compact bg-base-100 shadow-xl w-full" key={item.code}>
                <div className="card-body">

                  {/* Main Stuff */}
                  <div className="card-title">{item.display_name}</div>
                  <div className="">{item.names}</div>
                  <div className="">{item.more_info?.banned_in}</div>

                  {/* More Info */}
                  {insDataSections.map(
                    (section) =>
                      item.more_info?.[section.key] && (
                        <div key={section.key} className="collapse collapse-arrow border-base-300 bg-base-200 border">
                          <input type="checkbox" defaultChecked={section.key === "side_effects"} />
                          <div className="collapse-title text-lg font-medium">{section.title}</div>
                          <div className="collapse-content">
                            <p
                              dangerouslySetInnerHTML={{
                                __html: formatTextWithLineBreaks(item.more_info[section.key]),
                              }}
                            />
                          </div>
                        </div>
                      )
                  )}

                  {/* Articles / Learn More */}
                  <div className="card-actions justify-start">
                    {Object.entries(item.more_info?.articles ?? {}).map(([name, url]) => (
                      <a key={url}
                        className="btn btn-sm btn-primary"
                        href={url}
                        target="_blank"
                        rel="noreferrer">
                        {name}
                      </a>
                    ))}
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export { FoodInfo }
