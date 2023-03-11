import { Text, View, StyleSheet, Pressable, Alert } from "react-native";
import { useNavigate } from "react-router-native";
import useDeleteReview from "../hooks/useDeleteReview";
import theme from "../theme";

const styles = StyleSheet.create({
  container: {
    flexShrink: 1,
    padding: 12,
    backgroundColor: 'white',
    marginTop: 12,
  },
  text: {
    marginTop: 1,
    marginBottom: 1
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 1,
  },
  rating: {
    color: "#0366d6",
    fontSize: 24,
    marginRight: 12,
    borderColor: "#0366d6",
    borderStyle: "solid",
    borderWidth: 1,
    width: 50,
    height: 50,
    textAlign: "center",
    textAlignVertical: "center",
    borderRadius: 25
  },
  title: {
    fontSize: 24
  },
  nameAndDate: {
    marginBottom: 12
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 1,
  },
  repoButton: {
    flexGrow: 1,
    flexShrink: 1,
    padding: 12,
    borderRadius: 5,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    marginTop: 12,
    marginRight: 6
  },
  deleteButton: {
    flexGrow: 1,
    flexShrink: 1,
    padding: 12,
    borderRadius: 5,
    backgroundColor: theme.colors.errorRed,
    alignItems: 'center',
    marginTop: 12,
    marginLeft: 6
  },
  buttonText: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: theme.fontSizes.body
  },
});

const ReviewItem = ({ review, buttons = false, refetch }) => {
  const navigate = useNavigate()
  const [deleteReview] = useDeleteReview()
  const date = new Date(review.createdAt)

  const goToRepo = () => {
    navigate(`/repository/${review.repository.id}`)
  }

  const onDelete = () => {
    Alert.alert('Delete review', 'Are you sure you want to delete this review?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {text: 'OK', onPress: () => {
        deleteReview(review.id)
        refetch()
      }},
    ]);
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.nameAndDate}>
          <Text style={styles.title}>{review.user.username}</Text>
          <Text style={styles.text}>{date.toLocaleDateString()}</Text>
        </View>
        <Text style={styles.rating}>{review.rating}</Text>
      </View>
      <Text style={styles.text}>{review.text}</Text>
      {buttons &&
        <View style={styles.buttons}>
          <Pressable onPress={goToRepo} style={styles.repoButton}>
            <Text style={styles.buttonText}>View repository</Text>
          </Pressable>
          <Pressable onPress={onDelete} style={styles.deleteButton}>
            <Text style={styles.buttonText}>Delete review</Text>
          </Pressable>
        </View>
      }
    </View>
  )
};

export default ReviewItem;