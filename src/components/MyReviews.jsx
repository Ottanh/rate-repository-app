import { useQuery } from "@apollo/client";
import ReviewItem from "./ReviewItem";
import { FlatList } from "react-native";
import { gql } from "@apollo/client";

export const GET_REVIEWS = gql`
  query Me {
    me {
      id
      username
      reviews {
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
      }
    }
  }
`;

const MyReviews = () => {
  const { data, refetch } = useQuery(GET_REVIEWS)
  console.log(data)
  const reviews = data?.me?.reviews
      ? data?.me?.reviews.edges.map(edge => edge.node)
      : [];

  return (
    <>
      <FlatList
        data={reviews}
        renderItem={({ item }) => <ReviewItem review={item} buttons={true} refetch={refetch}/>}
        keyExtractor={({ id }) => id} 
      />
    </>
  );
};

export default MyReviews;