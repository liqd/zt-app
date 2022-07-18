import React from 'react';
import { TouchableOpacity } from 'react-native';
import { styles } from './ButtonCounter.styles';
import { TextSourceSans } from './TextSourceSans';

export const ButtonCounter = (props) => {
  const textStyles = props.disabled
    ? [styles.text, styles.disableStyle]
    : !props.highlight || props.highlight === 0
      ? styles.text
      : props.highlight === 1
        ? [styles.text, styles.highlightUpStyle]
        : [styles.text, styles.highlightDownStyle];

  const iconStyles = props.disabled
    ? [styles.icon, styles.disableStyle]
    : !props.highlight || props.highlight === 0
      ? styles.icon
      : props.highlight === 1
        ? [styles.icon, styles.highlightUpStyle]
        : [styles.icon, styles.highlightDownStyle];

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={props.onPress}
      disabled={props.disabled}
    >
      <TextSourceSans style={textStyles}>
        {props.counter}
      </TextSourceSans>

      <TextSourceSans style={iconStyles}>
        {props.icon}
      </TextSourceSans>
    </TouchableOpacity>
  );
};
