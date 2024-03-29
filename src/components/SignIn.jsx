import { Formik } from 'formik';
import SignInForm from './SignInForm';
import { StyleSheet } from 'react-native';
import * as yup from 'yup';
import useSignIn from '../hooks/useSignIn';
import { useAuthStorage } from '../hooks/useAuthStorage';
import { useApolloClient } from '@apollo/client';
import { useNavigate } from 'react-router-native';

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


export const SignInContainer = ({ onSubmit }) => {
  const initialValues = {
    username: '',
    password: '',
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
}


const SignIn = () => {
  const [signIn] = useSignIn();
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const navigate = useNavigate();
  
  const onSubmit = async values => {
    const { username, password } = values;

    try {
      const { data } = await signIn({ username, password });
      const token = data.authenticate.accessToken;
      await authStorage.setAccessToken(token);
      apolloClient.resetStore();
      navigate("/")
    } catch (e) {
      console.log(e);
    }
  };


  return (
    <SignInContainer onSubmit={onSubmit} />
  );
};

export default SignIn;