import { useState, useEffect } from "react";
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

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
    const animatedComponents = makeAnimated();

    return (
        <>
            <Select
                closeMenuOnSelect={false}
                components={animatedComponents}
                defaultValue={[]}
                isMulti
                options={colorOptions}
            />
        </>
    );
};

export { FoodInfo }