import {useMutation} from "@apollo/client";
import {SIGN_UP} from "../graphql/mutations";
import useSignIn from "./useSignIn";

const useSignUp = () => {
    const [mutate, result] = useMutation(SIGN_UP);
    const [signIn] = useSignIn();

    const signUp = async ({username, password}) => {
        const user = {
            username: username,
            password: password
        };
        const payload = await mutate({
            variables: {
                user: user
            }
        });
        const {data} = payload;

        if (data && data.createUser) {
            await signIn({username, password});
        }

        return payload;
    };

    return [signUp, result];
};

export default useSignUp;