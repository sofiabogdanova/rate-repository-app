import * as React from 'react';
import { Searchbar } from 'react-native-paper';

const SearchForm = ({setSearchKeyword, searchKeyword}) => {
    const onChangeSearch = query => setSearchKeyword(query);

    return (
        <Searchbar
            placeholder="Search"
            onChangeText={onChangeSearch}
            value={searchKeyword}
        />
    );
};

export default SearchForm;