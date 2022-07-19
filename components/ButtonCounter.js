import React from 'react';
import { TouchableOpacity } from 'react-native';
import { styles } from './ButtonCounter.styles';
import { TextSourceSans } from './TextSourceSans';

export const ButtonCounter = (props) => {
  let btnStyle;
  if (props.disabled) {
    btnStyle = [styles.text, styles.disableStyle];
  }
  else {
    if (!props.highlight) {
      btnStyle = styles.text;
    }
    else {
      if (props.highlight === 1) {
        btnStyle = [styles.text, styles.highlightUpStyle];
      }
      else {
        btnStyle = [styles.text, styles.highlightDownStyle];
      }
    }
  }

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={props.onPress}
      accessibilityLabel={props.labelText}
      accessibilityHint={props.hintText}
      disabled={props.disabled}
    >
      <TextSourceSans style={btnStyle}>
        {props.counter}
      </TextSourceSans>

      <TextSourceSans style={btnStyle}>
        {props.icon}
      </TextSourceSans>
    </TouchableOpacity>
  );
};
