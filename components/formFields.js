import React from 'react';
import { TextInput, View, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import CheckBox from '@react-native-community/checkbox';
import { styles } from './formFields.styles';

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

export const DropdownFormField = (props) => {

  return (
    <View>
      <Text style={styles.formLabel}>{props.field}</Text>
      <Picker
        mode="dropdown"
        style={styles.formPicker}
        selectedValue={props.selectedValue}
        onValueChange={itemValue => props.setSelectedItem(itemValue)}>
        <Picker.Item label={props.label} value={props.value} />
      </Picker>
      <Text>
        Selected: {props.selectedValue}
      </Text>
      {props.touched && <Text style={styles.formError}>{props.error}</Text>}
    </View>
  );
};

export const CheckBoxFormField = (props) => {
  return (
    <View>
      <Text style={styles.formLabel}>{props.field}</Text>
      <CheckBox
        type={'checkbox'}
        name={props.name}
        value={props.value}
        {...props}
      />
    </View>
  );
};
