//import { useState, useEffect } from 'react';
import { gql, useQuery } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query Repositories($orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection, $searchKeyword: String, $first: Int, $after: String) {
    repositories(orderBy: $orderBy, orderDirection: $orderDirection, searchKeyword: $searchKeyword, first: $first, after: $after) {
      edges {
        cursor
        node {
          id
        }
      }
      pageInfo {
        endCursor
        startCursor
        hasNextPage
      }
    }
  }
`;

const useRepositories = (orderBy = "new", keyword) => {
  const { data, loading, fetchMore, ...result } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
    variables: { 
      orderBy: orderBy === "new" ? "CREATED_AT" : "RATING_AVERAGE",
      orderDirection:  orderBy === "low" ? "ASC" : "DESC",
      searchKeyword: keyword,
      first: 3,
    }
  });


  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,
        variables: { 
          after: data?.repositories.pageInfo.endCursor
        }
      },
    });
  };

  return {
    data,
    fetchMore: handleFetchMore,
    loading,
    ...result,
  };

};

export default useRepositories;