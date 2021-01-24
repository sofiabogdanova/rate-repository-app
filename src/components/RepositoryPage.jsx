import React from 'react';
import RepositoryItem from "./RepositoryItem";
import {useParams} from "react-router-dom";
import {useQuery} from "@apollo/client";
import {GET_REPOSITORY} from "../graphql/queries";

const RepositoryPage = () => {

    let {id} = useParams();
    const result = useQuery(GET_REPOSITORY, {
        fetchPolicy: 'cache-and-network',
        variables: {
            id: id
        }
    });

    const repository = result && result.data && result.data.repository
        ? result.data.repository
        : {}
    return (<RepositoryItem repository={repository} showGitHubLink={true}/>);
};

export default RepositoryPage;