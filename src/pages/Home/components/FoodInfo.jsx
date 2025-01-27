import { useState, useEffect } from "react";
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import useLoadJson from "../../../hooks/useLoadJson";

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
          />
        </div>
        <div className="mt-10">
          <div className="grid grid-cols-2 gap-4">
            {fetchedAllData?.map((item) => (
              <div className="card card-compact bg-base-100 shadow-xl w-full">
                <div className="card-body">
                  <h2 className="card-title">Shoes!</h2>
                  <p>If a dog chews shoes whose shoes does he choose?</p>
                  <div className="card-actions justify-end">
                    <button className="btn btn-sm btn-primary">Buy Now</button>
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
