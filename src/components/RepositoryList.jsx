import React, {useState} from 'react';
import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import useRepositories from '../hooks/useRepositories';
import RepositoryItem from "./RepositoryItem";
import {useHistory} from "react-router-dom";
import theme from "../theme";
import Dropdown from "./FlatListDropDown";
import filterValues from "../filterValues";
import SearchForm from "./SearchForm";
import {useDebounce} from "use-debounce";

const styles = StyleSheet.create({
    separator: {
        height: 5,
        backgroundColor: theme.colors.separatorBackgroundL
    },
    listHeader: {
        zIndex: 11,
        position: 'relative'
    }
});

// const repositories = [
//     {
//         id: 'jaredpalmer.formik',
//         fullName: 'jaredpalmer/formik',
//         description: 'Build forms in React, without the tears',
//         language: 'TypeScript',
//         forksCount: 1589,
//         stargazersCount: 21553,
//         ratingAverage: 88,
//         reviewCount: 4,
//         ownerAvatarUrl: 'https://avatars2.githubusercontent.com/u/4060187?v=4',
//     },
//     {
//         id: 'rails.rails',
//         fullName: 'rails/rails',
//         description: 'Ruby on Rails',
//         language: 'Ruby',
//         forksCount: 18349,
//         stargazersCount: 45377,
//         ratingAverage: 100,
//         reviewCount: 2,
//         ownerAvatarUrl: 'https://avatars1.githubusercontent.com/u/4223?v=4',
//     },
//     {
//         id: 'django.django',
//         fullName: 'django/django',
//         description: 'The Web framework for perfectionists with deadlines.',
//         language: 'Python',
//         forksCount: 21015,
//         stargazersCount: 48496,
//         ratingAverage: 73,
//         reviewCount: 5,
//         ownerAvatarUrl: 'https://avatars2.githubusercontent.com/u/27804?v=4',
//     },
//     {
//         id: 'reduxjs.redux',
//         fullName: 'reduxjs/redux',
//         description: 'Predictable state container for JavaScript apps',
//         language: 'TypeScript',
//         forksCount: 13902,
//         stargazersCount: 52869,
//         ratingAverage: 0,
//         reviewCount: 0,
//         ownerAvatarUrl: 'https://avatars3.githubusercontent.com/u/13142323?v=4',
//     },
// ];

const ItemSeparator = () => <View style={styles.separator}/>;

export const RepositoryListContainer = ({repositories, options, setOptions}) => {
    let history = useHistory();
    const repositoryNodes = repositories
        ? repositories.edges.map((edge) => edge.node)
        : [];
    const onPress = (id) => {
        history.push(`/repository/${id}`)
    }
    return (
        <FlatList
            data={repositoryNodes}
            keyExtractor={({id}) => id}
            renderItem={({item}) => <TouchableOpacity onPress={() => onPress(item.id)}>
                <RepositoryItem repository={item} showGitHubLink={false}/>
            </TouchableOpacity>}
            ListHeaderComponent={() => <Dropdown selectedFilter={options} onSelect={setOptions}/>}
            ListHeaderComponentStyle={styles.listHeader}
            ItemSeparatorComponent={ItemSeparator}
        />
    );
};

const RepositoryList = () => {
    const defaultFilter = filterValues.find(filter => filter.label === 'Latest repositories');
    const [searchKeyword, setSearchKeyword] = useState('');
    const [orderOptions, setOrderOptions] = useState(defaultFilter);
    const [debounceSearchKeyword] = useDebounce(searchKeyword, 500);
    const {repositories} = useRepositories({...orderOptions.value, searchKeyword: debounceSearchKeyword});
    return (
        <View>
        <SearchForm searchKeyword={searchKeyword} setSearchKeyword={setSearchKeyword}/>
        <RepositoryListContainer repositories={repositories} options={orderOptions} setOptions={setOrderOptions}/>
        </View>);
};

export default RepositoryList;