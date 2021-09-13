import React from 'react';
import { TouchableOpacity } from 'react-native';
import { styles } from './ButtonCounter.styles';
import { TextSourceSans } from './TextSourceSans';

export const ButtonCounter = (props) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={props.onPress}
      disabled={props.disabled}
    >
      <TextSourceSans style={
        props.disabled
          ? styles.textDisabled
          : !props.highlight || props.highlight === 0
            ? styles.text
            : props.highlight === 1
              ? styles.textUpHighlight
              : styles.textDownHighlight
      }>
        {props.counter}
      </TextSourceSans>
      <TextSourceSans style={
        props.disabled
          ? styles.iconDisabled
          : !props.highlight || props.highlight === 0
            ? styles.icon
            : props.highlight === 1
              ? styles.iconUpHighlight
              : styles.iconDownHighlight
      }>
        {props.icon}
      </TextSourceSans>
    </TouchableOpacity>
  );
};
