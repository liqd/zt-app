import React from 'react';
import { TextInput, View } from 'react-native';
import { CheckBox } from 'react-native-elements';
import DropDownPicker from 'react-native-dropdown-picker';
import { styles } from './formFields.styles';
import { TextSourceSans } from './TextSourceSans';

// Setting list mode to scrollview globally
// FIXME: to be checked if we want this
DropDownPicker.setListMode('SCROLLVIEW');

export const TextInputFormField = (props) => {
  return (
    <View>
      <TextSourceSans style={styles.formLabel}>{props.field}</TextSourceSans>
      <TextInput
        style={styles.textInput}
        {...props}
      />
      {props.touched && <TextSourceSans style={styles.formError}>{props.error}</TextSourceSans>}
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
      <TextSourceSans style={styles.formLabel}>{props.field}</TextSourceSans>
      {props.children}
      {props.children.touched && <TextSourceSans style={styles.formError}>{props.error}</TextSourceSans>}
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
      <TextSourceSans style={styles.formLabel}>{props.field}</TextSourceSans>
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
