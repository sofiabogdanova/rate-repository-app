const filterValues = [
    {
        label: 'Latest repositories', value: {
            orderBy: 'CREATED_AT',
            orderDirection: 'DESC'
        }
    },
    {
        label: 'Highest rated repositories', value: {
            orderBy: 'RATING_AVERAGE',
            orderDirection: 'DESC'
        }
    },
    {
        label: 'Lowest repositories', value: {
            orderBy: 'CREATED_AT',
            orderDirection: 'ASC'
        }
    }
];

export default filterValues;