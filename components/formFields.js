import React, { useState } from 'react';
import { TextInput, View } from 'react-native';
import { CheckBox } from 'react-native-elements';
import DropDownPicker from 'react-native-dropdown-picker';
import { styles } from './formFields.styles';
import { TextSourceSans } from './TextSourceSans';
import IconFA from 'react-native-vector-icons/FontAwesome';
import { COLORS } from '../theme/colors';

/*  Setting list mode to scrollview globally
FIXME: to be checked if we want this */
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

export const LabelListContainer = (props) => {
  return (
    <View style={styles.customCheckBoxContainer}>
      <TextSourceSans style={styles.formLabel}>{props.field}</TextSourceSans>
      {props.children}
      {props.children.touched && <TextSourceSans style={styles.formError}>{props.error}</TextSourceSans>}
    </View>
  );
};

export const LabelList = props => {
  const [ selectedLabels, setSelectedLabels ] = useState(props.selectedLabels);

  const handleItemPressed = selectedLabel => {
    let selectedLabelsCopy = [...selectedLabels];
    /* the following code might be hard to read. It is comparing if the newly
     selected label was selected before or not. If yes, then it removes the label,
     if not it adds to the list. Then updating the state and sending to its parent
     Note: this has to be done separately because setting State does not immediately change
     the actual state (FIXME). */
    const labelIndex = selectedLabels.findIndex(sl => sl.id === selectedLabel.id);
    (labelIndex === -1) && (selectedLabelsCopy = [...selectedLabels, selectedLabel]);
    (labelIndex !== -1) && [...selectedLabelsCopy.splice(labelIndex, 1)];
    setSelectedLabels([...selectedLabelsCopy]);
    props.onIconPress(selectedLabelsCopy);
  };

  const getCheckState = (choice) => {
    return !!props.selectedLabels.find(sl => sl.id === choice.id);
  };

  return props.labelChoices.map(choice => (
    <LabelFormField
      key={`customCheckBox_${choice.value}`}
      label={choice}
      checked={getCheckState(choice)}
      onIconPress={selectedLabel => handleItemPressed(selectedLabel)}
    />
  ));
};

export const LabelFormField = props => {
  const [ checkState, setCheckState ] = useState(props.checked);
  const plusIcon = <IconFA name="plus" size={16} color={COLORS.text.main} />;
  const checkIcon = (
    <IconFA name='check' size={16} color={COLORS.text.inverted} />
  );

  const toggleCheckState = () => {
    setCheckState(!checkState);
    props.onIconPress(props.label);
  };

  return (
    <CheckBox
      center
      checked={checkState}
      onPress={toggleCheckState}
      title={props.label.name}
      titleProps={{}}
      textStyle={
        checkState ? (
          styles.customCheckBoxTitleChecked
        ) : (
          styles.customCheckBoxTitle
        )
      }
      checkedIcon={checkIcon}
      uncheckedIcon={plusIcon}
      containerStyle={
        checkState ? (
          styles.customCheckBoxButtonChecked
        ) : (
          styles.customCheckBoxButton
        )
      }
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
  const [ open, setOpen ] = useState(false);
  const [ selected, setSelected ] = useState(props.value);
  return (
    <View>
      <DropDownPicker
        style={styles.dropdownFormField}
        open={open}
        value={selected}
        items={props.items}
        setOpen={setOpen}
        setItems={props.setItems}
        setValue={setSelected}
        onChangeValue={value => props.onChangeValue(value)}
        containerStyle={{}}
      />
    </View>
  );
};
