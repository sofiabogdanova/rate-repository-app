import {useQuery} from "@apollo/client";
import {GET_REPOSITORIES} from "../graphql/queries";

const useRepositories = () => {
    const result = useQuery(GET_REPOSITORIES, {
        fetchPolicy: 'cache-and-network'
    });

    const repositories = result && result.data && result.data.repositories
        ? result.data.repositories
        : {edges: []}
//   const [repositories, setRepositories] = useState();
//   const [loading, setLoading] = useState(false);

//   const fetchRepositories = async () => {
//     setLoading(true);
//     useQuery(MY_QUERY, {
//         fetchPolicy: 'cache-and-network',
//         // Other options
//       });
//     const response = await fetch('http://192.168.10.190:5000/api/repositories');
//     const json = await response.json();

//     setLoading(false);
//     setRepositories(json);
//   };

//   useEffect(() => {
//     fetchRepositories();
//   }, []);

//   return { repositories, loading, refetch: fetchRepositories };
    return {repositories};
};

export default useRepositories;