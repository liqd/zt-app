import React from 'react';
import { Button, TextInput, View, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import CheckBox from '@react-native-community/checkbox';
import { Formik } from 'formik';
import * as yup from 'yup';

import { styles } from './formFields.styles';

export const DropdownFormField = (props) => {
  return (
    <Picker
      selectedValue={props.selectedValue}
      onValueChange={(itemValue, itemIndex) =>
        props.setSelectedLanguage(itemValue)
      }>
      <Picker.Item label="Java" value="java" />
      <Picker.Item label="JavaScript" value="js" />
    </Picker>
  );
};

export const CheckBoxFormField = (props) => {
  return (
    <View>
      <View>
        <CheckBox
          type={'checkbox'}
          {...props}
        />
        <Text>{children}</Text>
      </View>
    </View>
  );
};

export const TextInputFormField = (props) => {
  return (
    <View>
      <Text style={styles.formLabel}>{props.field}</Text>
      <TextInput
        style={styles.textInput}
        {...props}
      />
      {props.touched && <Text style={styles.formError}>{props.error}</Text>}
    </View>
  );
};
