import { gql, useQuery } from '@apollo/client';

export const GET_REVIEWS = gql`
  query Reviews($id: ID!,  $first: Int, $after: String) {
    repository(id: $id) {
      id
      fullName
      reviews (first: $first, after: $after) {
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
        }
        pageInfo {
          endCursor
          startCursor
          hasNextPage
        }
      }
    }
  }
`;

const useReviews = (id) => {
  const { data, loading, fetchMore, ...result } = useQuery(GET_REVIEWS, {
    fetchPolicy: 'cache-and-network',
    variables: { id, first: 3 }
  });

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repository.reviews.pageInfo.hasNextPage;
    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data?.repository.reviews.pageInfo.endCursor,
        variables: { 
          after: data?.repository.reviews.pageInfo.endCursor
        }
      },
    });
  };

  return { data, loading, fetchMore: handleFetchMore, ...result };
};

export default useReviews;