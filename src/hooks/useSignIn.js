import {useMutation} from "@apollo/client";
import {LOGIN} from "../graphql/mutations";

// const useSignIn = (user, password) => {
//     const [authorize] = useMutation(LOGIN);
//     const credentials = {
//         username: user,
//         password: password
//     };
//     const token = authorize({
//         variables: {
//             credentials: credentials
//         }
//     });
//     console.log(token);
//     return token;
// };

const useSignIn = () => {
    const [mutate, result] = useMutation(LOGIN);

    const signIn = async ({ username, password }) => {
        // const credentials = {
        //     username: username,
        //     password: password
        // };

        return await mutate({variables: {username: username, password: password}});
    };

    return [signIn, result];
};

export default useSignIn;