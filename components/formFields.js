import React from 'react';
import { TextInput, View } from 'react-native';
import { CheckBox } from 'react-native-elements';
import DropDownPicker from 'react-native-dropdown-picker';
import { styles } from './formFields.styles';
import { TextSourceSans } from './TextSourceSans';
import IconFA from 'react-native-vector-icons/FontAwesome';
import { COLORS } from '../theme/colors';

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
      checkedColor={COLORS.primary}
      uncheckedColor={COLORS.primary}
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
  const plusIcon = (
    <IconFA name='plus' size={16} color={COLORS.text.main} />
  );
  const checkIcon = (
    <IconFA name='check' size={16} color={COLORS.text.inverted} />
  );
  return (
    <CheckBox
      center
      checked={props.checked}
      onPress={props.onIconPress}
      title={props.title}
      titleProps={{}}
      textStyle={ (props.checked) ? styles.customCheckBoxTitleChecked : styles.customCheckBoxTitle }
      checkedIcon={checkIcon}
      uncheckedIcon={plusIcon}
      containerStyle={ (props.checked) ? styles.customCheckBoxContainerChecked : styles.customCheckBoxContainer }
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
