import { useMutation, gql } from "@apollo/client";

const DELETE_REVIEW = gql`
  mutation DeleteReview($deleteReviewId: ID!) {
    deleteReview(id: $deleteReviewId)
  }
`;


const useDeleteReview = () => {
  const [mutate, result] = useMutation(DELETE_REVIEW);

  const deleteReview = async (id) => {
    return mutate({ variables: { deleteReviewId: id } });
  };

  return [deleteReview, result];
};

export default useDeleteReview;