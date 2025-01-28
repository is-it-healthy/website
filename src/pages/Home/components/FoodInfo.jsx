import { useState } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";

import useLoadJson from "../../../hooks/useLoadJson";
import { reactSelectCustomOptions, urlInsEachStart, urlInsSummary } from "../../../utils/consts";
import { Card } from "./Card";


const FoodInfo = () => {
  const [selectedData, setSelectedData] = useState([]);
  const {
    data: fetchedListData,
    fetchedListLoading,
    fetchedListError,
  } = useLoadJson(urlInsSummary);

  const animatedComponents = makeAnimated();

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
              className="shadow-xl text-lg"
              closeMenuOnSelect={false}
              components={animatedComponents}
              defaultValue={[]}
              isMulti
              options={fetchedListData?.map((item) => ({
                value: item.code,
                label: item.name,
                url: `${urlInsEachStart}${item.code}.json`,
              }))}
              onChange={setSelectedData}
              value={selectedData}
              styles={reactSelectCustomOptions}
              placeholder="Select INS codes"
            />
          )}
        </div>

        <div className="mt-10">
          {selectedData.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {selectedData.map((item) => (
                <Card key={item.value} item={item} />
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500">Select items to view details</div>
          )}
        </div>
      </div>
    </>
  );
};

export { FoodInfo };
