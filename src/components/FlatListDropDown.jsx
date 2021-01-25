import React, {useState} from 'react';
import RNPickerSelect from 'react-native-picker-select';
import filterValues from "../filterValues";

const Dropdown = ({selectedFilter, onSelect}) => {
    return (
        <RNPickerSelect
            onValueChange={(value) => {
                const filter = filterValues.find(filter =>
                    filter.value.orderBy === value.orderBy &&
                    filter.value.orderDirection === value.orderDirection );
                onSelect(filter);
            }}
            value={selectedFilter.value}
            items={[
                filterValues[0],
                filterValues[1],
                filterValues[2]
            ]}

        />
    );
};

export default Dropdown;