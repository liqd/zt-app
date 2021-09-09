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

export const CheckBoxFormField = (props) => {
  return (
    <CheckBox
      checked={props.checked}
      onIconPress={props.onIconPress}
      title={props.title}
      titleProps={{}}
      checkedColor='#2a3cd4'
      uncheckedColor='#2a3cd4'
      containerStyle={styles.checkBoxContainer}
    >{props.children}</CheckBox>
  );
};

export const CustomCheckBoxContainerParent = (props) => {
  return (
    <View style={styles.customCheckBoxContainerParent}>
      <Text style={styles.formLabel}>{props.field}</Text>
      {props.children}
      {props.children.touched && <Text style={styles.formError}>{props.error}</Text>}
    </View>
  );
};

export const CustomCheckBoxFormField = (props) => {
  return (
    <CheckBox
      checked={props.checked}
      onIconPress={props.onIconPress}
      title={props.title}
      titleProps={{}}
      checkedColor='#2a3cd4'
      uncheckedColor='#2a3cd4'
      containerStyle={styles.customCheckBoxContainer}
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
  const [open, setOpen] = React.useState(false);
  return (
    <View>
      <DropDownPicker
        style={styles.dropdownFormField}
        open={open}
        value={props.value}
        items={props.items}
        setOpen={setOpen}
        setValue={props.setValue}
        setItems={props.setItems}
        onChangeValue={props.onChangeValue}
        containerStyle={{}}
      />
    </View>
  );
};
