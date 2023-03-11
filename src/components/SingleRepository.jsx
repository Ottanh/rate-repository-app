import { useParams } from "react-router-native";
import RepositoryItem from "./RepositoryItem";
import { FlatList } from "react-native";
import useReviews from "../hooks/useReviews";
import ReviewItem from "./ReviewItem"


const SingleRepository = () => {
  const params = useParams();
  const { data, fetchMore } = useReviews(params.id)

  const reviews = data?.repository?.reviews
      ? data?.repository?.reviews.edges.map(edge => edge.node)
      : [];

  const onEndReach = () => {
    console.log('You have reached the end of the list');
    fetchMore();
  };


  return (
    <>
      <RepositoryItem id={params.id} button={true} />
      <FlatList
        data={reviews}
        renderItem={({ item }) => <ReviewItem review={item} />}
        keyExtractor={({ id }) => id} 
        onEndReached={onEndReach}
        onEndReachedThreshold={0}
      />
    </>
  );
};

export default SingleRepository;