import { useState, useEffect } from "react";
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import useLoadJson from "../../../hooks/useLoadJson";

export const colorOptions = [
  { value: 'ocean', label: 'Ocean', color: '#00B8D9', isFixed: true },
  { value: 'blue', label: 'Blue', color: '#0052CC', isDisabled: true },
  { value: 'purple', label: 'Purple', color: '#5243AA' },
  { value: 'red', label: 'Red', color: '#FF5630', isFixed: true },
  { value: 'orange', label: 'Orange', color: '#FF8B00' },
  { value: 'yellow', label: 'Yellow', color: '#FFC400' },
  { value: 'green', label: 'Green', color: '#36B37E' },
  { value: 'forest', label: 'Forest', color: '#00875A' },
  { value: 'slate', label: 'Slate', color: '#253858' },
  { value: 'silver', label: 'Silver', color: '#666666' },
];

const FoodInfo = () => {

  const [selectedData, setSelectedData] = useState([]);
  const { data: fetchedListData, fetchedListLoading, fetchedListError } = useLoadJson('https://raw.githubusercontent.com/is-it-healthy/data/refs/heads/v2/dist/ins-summary.json');

  const animatedComponents = makeAnimated();

  return (
    <>
      <Select
        closeMenuOnSelect={false}
        components={animatedComponents}
        defaultValue={[]}
        isMulti
        // bring from {code, name} to {value, label}
        // TODO: change the data later to remove this
        options={fetchedListData.map((item) => ({
          value: item.code,
          label: item.name,
        }))}
        onChange={setSelectedData}
        value={selectedData}
      />
    </>
  );
};

export { FoodInfo }
