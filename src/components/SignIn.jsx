import { Formik } from 'formik';
import SignInForm from './SignInForm';
import { StyleSheet } from 'react-native';
import * as yup from 'yup';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    padding: 12,
    backgroundColor: 'black'
  },
});

const validationSchema = yup.object().shape({ 
  username: yup    
   .string()     
   .required('Username is required'),  
  password: yup    
   .string()       
   .required('Password is required'),}
);


const SignIn = () => {
  const initialValues = {
    username: '',
    password: '',
  };
  
  const onSubmit = values => {
    console.log(values)
  };


  return (
    <Formik 
      initialValues={initialValues} 
      onSubmit={onSubmit} 
      style={styles.container}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default SignIn;