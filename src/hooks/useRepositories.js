import {useQuery} from "@apollo/client";
import {GET_REPOSITORIES} from "../graphql/queries";

const useRepositories = ({orderBy, orderDirection, searchKeyword}) => {
    const result = useQuery(GET_REPOSITORIES, {
        fetchPolicy: 'cache-and-network',
        variables: {
            orderDirection: orderDirection,
            orderBy: orderBy,
            searchKeyword: searchKeyword
        }
    });

    const repositories = result && result.data && result.data.repositories
        ? result.data.repositories
        : {edges: []}
    return {repositories};
};

export default useRepositories;