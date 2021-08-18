import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { styles } from './ButtonCounter.styles';

export const ButtonCounter = (props) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={props.onPress}
      disabled={props.disabled}
    >
      <Text style={
        props.disabled
          ? styles.textDisabled
          : !props.highlight || props.highlight === 0
            ? styles.text
            : props.highlight === 1
              ? styles.textUpHighlight
              : styles.textDownHighlight
      }>
        {props.counter}
      </Text>
      <Text style={
        props.disabled
          ? styles.iconDisabled
          : !props.highlight || props.highlight === 0
            ? styles.icon
            : props.highlight === 1
              ? styles.iconUpHighlight
              : styles.iconDownHighlight
      }>
        {props.icon}
      </Text>
    </TouchableOpacity>
  );
};
