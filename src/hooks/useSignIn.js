import {useContext} from 'react';
import {useApolloClient, useMutation} from "@apollo/client";
import {LOGIN} from "../graphql/mutations";
import AuthStorageContext from '../contexts/AuthStorageContext';

const useSignIn = () => {
    const [mutate, result] = useMutation(LOGIN);
    const client = useApolloClient();
    const authStorage = useContext(AuthStorageContext);

    const signIn = async ({username, password}) => {
        const data = await mutate({variables: {username: username, password: password}});
        const token = data && data.authorize ? data.authorize.accessToken : '';
        await authStorage.setAccessToken(token);
        await client.resetStore();
        return data;
    };

    return [signIn, result];
};

export default useSignIn;