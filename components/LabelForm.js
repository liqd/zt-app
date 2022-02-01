import React, { useState } from 'react';
import { View } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { styles } from './LabelForm.styles';
import { TextSourceSans } from './TextSourceSans';
import IconFA from 'react-native-vector-icons/FontAwesome';
import { COLORS } from '../theme/colors';

export const LabelListContainer = (props) => {
  return (
    <View style={styles.labelContainer}>
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
      key={`label_${choice.name}`}
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
          styles.labelTitleChecked
        ) : (
          styles.labelTitle
        )
      }
      checkedIcon={checkIcon}
      uncheckedIcon={plusIcon}
      containerStyle={
        checkState ? (
          styles.labelButtonChecked
        ) : (
          styles.labelButton
        )
      }
    />
  );
};
