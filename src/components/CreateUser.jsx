import { Formik } from 'formik';
import { StyleSheet } from 'react-native';
import * as yup from 'yup';
import useSignIn from '../hooks/useSignIn';
import { useAuthStorage } from '../hooks/useAuthStorage';
import { useApolloClient } from '@apollo/client';
import { useNavigate } from 'react-router-native';
import CreateUserForm from './CreateUserForm';
import useCreateUser from '../hooks/useCreateUser';

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
   .required('Username is required')
   .min(1, "Username too short")
   .max(30, "Username too long"),  
  password: yup    
   .string()       
   .required('Password is required')
   .min(5, "Password too short")
   .max(50, "Password too long"),
  confirm: yup    
   .string()  
   .oneOf([yup.ref('password'), null], "Passwords don't match")     
   .required('Password confirmation is required')
  }
);


export const CreateUserContainer = ({ onSubmit }) => {
  const initialValues = {
    username: '',
    password: '',
    confirmation: '',
  };

  return (
    <Formik 
      initialValues={initialValues} 
      onSubmit={onSubmit} 
      style={styles.container}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <CreateUserForm onSubmit={handleSubmit} />}
    </Formik>
  );
}


const CreateUser = () => {
  const [signIn] = useSignIn();
  const [createUser] = useCreateUser();
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const navigate = useNavigate();
  
  const onSubmit = async values => {
    console.log(values)
    const { username, password } = values;

    try {
      await createUser({ username, password });
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
    <CreateUserContainer onSubmit={onSubmit} />
  );
};

export default CreateUser;