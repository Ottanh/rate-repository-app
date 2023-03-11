import Text from './Text';
import { Pressable, View, StyleSheet } from 'react-native';
import FormikTextInput from './FormikTextInput';

import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    padding: 12,
    backgroundColor: 'white',
  },
  singInButton: {
    flexGrow: 1,
    flexShrink: 1,
    padding: 12,
    borderRadius: 5,
    backgroundColor: theme.colors.primary,
    alignItems: 'center'
  },
  signIntext: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: theme.fontSizes.body
  },
});


const stylesTextInput = StyleSheet.create({
  textInput: {
    flexGrow: 1,
    flexShrink: 1,
    padding: 12,
    borderRadius: 5,
    borderColor: 'grey',
    borderWidth: 1,
    backgroundColor: 'white',
  },
  textInputError: {
    flexGrow: 1,
    flexShrink: 1,
    padding: 12,
    borderRadius: 5,
    borderColor: theme.colors.errorRed,
    borderWidth: 1,
    backgroundColor: 'white',
  },
  errorText: {
    color: theme.colors.errorRed,
    margin: 2
  },
});


const CreateUserForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <FormikTextInput name="username" placeholder="Username" style={stylesTextInput}/>      
      <FormikTextInput name="password" placeholder="Password" style={stylesTextInput} secureTextEntry={true} />      
      <FormikTextInput name="confirm" placeholder="Password confirmation" style={stylesTextInput} secureTextEntry={true} />   
      <Pressable onPress={onSubmit} style={styles.singInButton}>
        <Text style={styles.signIntext}>Create user</Text>
      </Pressable>
    </View>
  );
};

export default CreateUserForm;