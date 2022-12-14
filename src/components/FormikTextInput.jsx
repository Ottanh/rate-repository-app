import { View } from 'react-native';
import { useField } from 'formik';

import TextInput from './TextInput';
import Text from './Text';





const FormikTextInput = ({ name, style, ...props }) => {
  const [field, meta, helpers] = useField(name);
  const showError = meta.touched && meta.error;

  return (
    <View>
      <TextInput
        onChangeText={value => helpers.setValue(value)}
        onBlur={() => helpers.setTouched(true)}
        value={field.value}
        error={showError}
        style={showError ? style.textInputError : style.textInput}
        {...props}
      />
      <Text style={style.errorText}>{meta.error}</Text>
    </View>
  );
};

export default FormikTextInput;