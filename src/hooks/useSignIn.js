import {useContext} from 'react';
import {useApolloClient, useMutation} from "@apollo/client";
import {LOGIN} from "../graphql/mutations";
import AuthStorageContext from '../contexts/AuthStorageContext';

const useSignIn = () => {
    const [mutate, result] = useMutation(LOGIN);
    const client = useApolloClient();
    const authStorage = useContext(AuthStorageContext);

    const signIn = async ({username, password}) => {
        const payload = await mutate({variables: {username: username, password: password}});
        const {data} = payload;

        if (data && data.authorize) {
            await authStorage.setAccessToken(data.authorize.accessToken);
            client.resetStore();
        }

        return payload;
    };

    return [signIn, result];
};

export default useSignIn;