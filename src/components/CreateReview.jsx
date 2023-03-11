import { Formik } from 'formik';
import { StyleSheet } from 'react-native';
import * as yup from 'yup';
import { useNavigate } from 'react-router-native';
import CreateReviewFrom from "./CreateReviewForm"
import useCreateReviw from '../hooks/useCreateReview';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    padding: 12,
    backgroundColor: 'black'
  },
});

const validationSchema = yup.object().shape({ 
  owner: yup    
   .string()     
   .required('Owaner name is required'),  
  name: yup    
   .string()       
   .required('Repository name is required'),
  rating: yup    
   .string()       
   .required('Rating is required'),
  review: yup    
   .string()       
   .required('Review is required'),
  }
);


export const CreateReviewContainer = ({ onSubmit }) => {
  const initialValues = {
    owner: '',
    name: '',
    rating: '',
    review: ''
  };

  return (
    <Formik 
      initialValues={initialValues} 
      onSubmit={onSubmit} 
      style={styles.container}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <CreateReviewFrom onSubmit={handleSubmit} />}
    </Formik>
  );
}


const CreateReview = () => {
  const  [createReview] = useCreateReviw();
  const navigate = useNavigate();
  
  const onSubmit = async values => {
    console.log(values)
    const { owner, name, rating, review } = values;

    try {
      await createReview({ owner, name, rating, review });
      navigate(`/repository/${owner}.${name}`)
    } catch (e) {
      console.log(e);
    }
  };


  return (
    <CreateReviewContainer onSubmit={onSubmit} />
  );
};

export default CreateReview;