import React from 'react';
import { TextInput, View, Text } from 'react-native';
import { CheckBox } from 'react-native-elements';
import DropDownPicker from 'react-native-dropdown-picker';
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

export const CheckBoxFormFieldContainer = (props) => {
  return (
    <View style={styles.checkBoxFormFieldContainer}>
      <Text style={styles.formLabel}>{props.field}</Text>
      {props.children}
      {props.children.touched && <Text style={styles.formError}>{props.error}</Text>}
    </View>
  );
};

export const CheckBoxFormField = (props) => {
  return (
    <CheckBox
      checked={props.checked}
      onIconPress={props.onIconPress}
      onLongIconPress={() =>
        console.log('onLongIconPress()')
      }
      onLongPress={() => console.log('onLongPress()')}
      onPress={() => console.log('onPress()')}
      title={props.title}
      titleProps={{}}
      checkedColor='#a3ef90'
      uncheckedColor='#2d40cc'
      containerStyle={styles.checkBoxContainer}
    />
  );
};

export const DropdownFormFieldContainer = (props) => {
  return (
    <View>
      <Text style={styles.formLabel}>{props.field}</Text>
      {props.children}
    </View>
  );
};

export const DropdownFormField = (props) => {
  return (
    <View>
      <DropDownPicker
        style={styles.dropdownFormField}
        open={props.open}
        value={props.value}
        items={props.items}
        setOpen={props.setOpen}
        setValue={props.setValue}
        setItems={props.setItems}
        onChangeValue={props.onChangeValue}
        containerStyle={{}}
      />
    </View>
  );
};
