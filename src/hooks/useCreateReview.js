import { useMutation, gql } from "@apollo/client";

const AUTHENTICATE = gql`
  mutation CreateReview($review: CreateReviewInput) {
    createReview(review: $review) {
      id
    }
  }
`;


const useCreateReviw = () => {
  const [mutate, result] = useMutation(AUTHENTICATE);

  const createReviw = async ({ owner, name, rating, review }) => {
    return mutate({ variables:  { review: { ownerName: owner, repositoryName: name, rating: parseInt(rating), text: review } } });
  };

  return [createReviw, result];
};

export default useCreateReviw;