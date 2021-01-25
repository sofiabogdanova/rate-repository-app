import {useMutation} from "@apollo/client";
import {CREATE_REVIEW} from "../graphql/mutations";

const useCreateReview = () => {
    const [mutate, result] = useMutation(CREATE_REVIEW);

    const createReview = async ({repositoryName, ownerName, rating, text}) => {
        console.log({repositoryName, ownerName, rating, text});
        const review = {
            repositoryName: repositoryName,
            ownerName: ownerName,
            rating: Number(rating),
            text: text
        };
        const payload = await mutate({
            variables: {
                review: review
            }
        });

        return payload;
    };

    return [createReview, result];
};

export default useCreateReview;